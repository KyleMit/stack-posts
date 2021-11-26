import Layout from '../../components/layout'
import { getAllPostIds, getPostData, IPost } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'

interface IPostProps {
  postData: IPost
}
export default function Post({ postData }: IPostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.q.data.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.q.data.title}</h1>
        <div className={utilStyles.lightText}>
          {/* <Date dateString={postData.date} /> */}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.q.content }} />
      </article>
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
