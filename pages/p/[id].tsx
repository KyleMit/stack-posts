import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { IPost } from '../../lib/cli'

interface IPostProps {
  postData: IPost
}
export default function Post({ postData }: IPostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.q.data.title}</title>
      </Head>
      <h2 className={utilStyles.headingXl}>{postData.q.data.title}</h2>
      <summary>
        <Date dateString={postData.q.data.creation_date} />
      </summary>
      <article>
        <h3>Question</h3>
        <div dangerouslySetInnerHTML={{ __html: postData.q.content }} />
      </article>
      <article>
        <h3>Answer</h3>
        <div dangerouslySetInnerHTML={{ __html: postData.a.content }} />
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