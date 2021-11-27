import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import { GetStaticProps, GetStaticPaths } from 'next'
import { IPost } from '../../lib/cli'
import config from '../../lib/config'

interface IPostProps {
  postData: IPost
}
export default function Post({ postData }: IPostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.q.data.title}</title>
      </Head>

      <div className="s-page-title">
          <div className="s-page-title--text">
              <h2 className="s-page-title--header">
                {postData.q.data.title}
              </h2>
              <p className="s-page-title--description">
                <Date dateString={postData.q.data.creation_date} />
              </p>
              <div className="d-flex gs4">
                {postData.q.data.tags.map((tag) => (
                  <a key={tag} className="flex--item s-tag s-tag__muted" href="#">{tag}</a>
                ))}
              </div>
          </div>
      </div>

      <article>
        <h3>
          <a href={`https://stackoverflow.com/q/${postData.id}/${config.userId}`}>
          Question
          </a>

        </h3>
        <div dangerouslySetInnerHTML={{ __html: postData.q.content }} className="s-prose" />
      </article>

      {Boolean(postData.a) && (
        <article>
          <h3>
            <a href={`https://stackoverflow.com/a/${postData.a.data.answer_id}/${config.userId}`}>
            Answer
            </a>
          </h3>
          <div dangerouslySetInnerHTML={{ __html: postData.a.content }} className="s-prose" />
        </article>
      )}

    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(String(params?.id))
  return {
    props: {
      postData
    }
  }
}
