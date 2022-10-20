import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Layout, DateDisplay, Tags, MarkdownWrapper, UserCard } from '../../components/'
import { getPostsCached, IPost } from '../../lib/cli'
import { config } from '../../lib/config'

interface IPostProps {
  postData: IPost
}
export default function Post({ postData }: IPostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.q.title}</title>
      </Head>

      <header >
        <div className="s-page-title s-page-title--text">
          <a href={`https://stackoverflow.com/q/${postData.q.question_id}/${config.userId}`}>
            <h1 className="s-page-title--header">
              {postData.q.title}
            </h1>
          </a>
        </div>
        <p className="s-page-title--description mt12">
          <div className="d-flex jc-space-between">
            <div>
              <Tags tags={postData.q.tags} />
            </div>
            <div >
              <DateDisplay dateString={postData.q.creation_date} />
              <div className="s-user-card s-user-card__minimal mb24">
                <UserCard user={postData?.q?.owner} />
              </div>
            </div>
          </div>
        </p>
      </header>

      <article className="mt24">
        <MarkdownWrapper md={postData.q.body_markdown} />
      </article>

      {Boolean(postData.a) && (
        <article className="mt24">
          <div className="d-flex jc-space-between">
            <div>
              <a href={`https://stackoverflow.com/q/${postData.a?.answer_id}/${config.userId}`}>
                <h2 className="fs-headline1 mb6">Answer</h2>
              </a>
            </div>
            <div >
              <a href={`https://stackoverflow.com/a/${postData?.a?.answer_id}/${config.userId}`}>
                <DateDisplay dateString={postData?.a?.creation_date ?? ""} />
              </a>
              <div className="s-user-card s-user-card__minimal mb24">
                <UserCard user={postData?.a?.owner} />
              </div>
            </div>
          </div>

          <MarkdownWrapper md={postData?.a?.body_markdown} />
        </article>
      )}

    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getPostsCached()
  const paths = Object.keys(allPosts).map(id => ({
      params: { id }
  }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPosts = await getPostsCached()
  return {
    props: {
      postData: allPosts[String(params?.id)]
    }
  }
}
