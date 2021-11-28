/* eslint-disable react/no-children-prop */
import ReactMarkdown from 'react-markdown'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Layout, Date, Tags } from '../../components/'
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

      <div className="s-page-title">
          <div className="s-page-title--text">
              <h2 className="s-page-title--header">
                {postData.q.title}
              </h2>
              <p className="s-page-title--description">
                <Date dateString={postData.q.creation_date} />
              </p>
              <Tags />
          </div>
      </div>

      <article>
        <h3>
          <a href={`https://stackoverflow.com/q/${postData.id}/${config.userId}`}>
          Question
          </a>

        </h3>
        <div className="s-prose" >
          <ReactMarkdown children={postData.q.body_markdown} />
        </div>
      </article>

      {Boolean(postData.a) && (
        <article>
          <h3>
            <a href={`https://stackoverflow.com/a/${postData?.a?.answer_id}/${config.userId}`}>
            Answer
            </a>
          </h3>
          <div className="s-prose" >
            <ReactMarkdown children={String(postData?.a?.body_markdown)} />
          </div>
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
