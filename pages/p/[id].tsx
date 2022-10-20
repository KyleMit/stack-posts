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

      <header className="s-page-title">
          <div className="s-page-title--text">
              <h1 className="s-page-title--header">
                {postData.q.title}
              </h1>
              <p className="s-page-title--description">
                <Tags tags={postData.q.tags} />
                <DateDisplay dateString={postData.q.creation_date} />
              </p>
          </div>
      </header>

      <article className="mt24">
        <h2 className="fs-headline1 mb6">Question</h2>
        <div className="s-user-card s-user-card__minimal mb24">
            <UserCard user={postData?.q?.owner} />
            <span className="mr4 fc-black-200">·</span>
            <a href={`https://stackoverflow.com/q/${postData.id}/${config.userId}`}>
              <time className="s-user-card--time">{postData.q.creation_date}</time>
            </a>
        </div>
        <MarkdownWrapper md={postData.q.body_markdown} />
      </article>

      {Boolean(postData.a) && (
        <article className="mt24">
          <h2 className="fs-headline1 mb6">Answer</h2>
          <div className="s-user-card s-user-card__minimal mb24">
            <UserCard user={postData?.a?.owner} />
            <span className="mr4 fc-black-200">·</span>
            <a href={`https://stackoverflow.com/a/${postData?.a?.answer_id}/${config.userId}`}>
              <time className="s-user-card--time">{postData?.a?.creation_date}</time>
            </a>
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
