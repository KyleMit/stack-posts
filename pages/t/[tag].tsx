import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Layout, PostList } from '../../components/'
import { getPostsCached, IPost } from '../../lib/cli'

interface IPostProps {
  tag: string;
  posts: IPost[]
}
export default function Post({ tag, posts }: IPostProps) {
  return (
    <Layout>
      <Head>
        <title>
          {tag.length} posts tagged {tag}
        </title>
      </Head>

      <div className="s-page-title m16">
          <div className="s-page-title--text">
              <h1 className="s-page-title--header">
                {tag.length} posts tagged <span className="s-tag s-tag__muted fs-title">{tag}</span>
              </h1>
          </div>
      </div>


      <section >
        <PostList posts={posts} />
      </section>

    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getPostsCached()
  const allTags = Object.values(allPosts).flatMap(p => p.q.tags)
  const uniqueTags = [...new Set(allTags)]
  const paths = uniqueTags.map(tag => ({
    params: { tag }
  }));
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = String(params?.tag)
  const allPosts = await getPostsCached()
  const posts = Object.values(allPosts).filter(post => post.q.tags.includes(tag))
  return {
    props: {
      tag,
      posts
    }
  }
}
