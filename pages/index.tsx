import Head from 'next/head'
import { Layout, PostList, siteTitle } from '../components/'
import { GetStaticProps } from 'next'
import { getPostsCached, IPost } from '../lib/cli'

interface IHomeProps {
  allPosts: IPost[]
}
export default function Home({ allPosts }: IHomeProps) {
  allPosts.sort((a,b) => new Date(b.q.creation_date).getTime() - new Date(a.q.creation_date).getTime())

  return (
    <Layout>

      <Head>
        <title>{siteTitle}</title>
      </Head>

      <header className="m16">
        <h1 className="s-page-title--header">
          An offline, searchable, personalized copy of{' '}
          <a href="https://stackoverflow.com/users/1366033/kylemit">
            StackOverflow
          </a>
        </h1>
      </header>

      <section>
        <PostList posts={allPosts} />
      </section>

    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getPostsCached()
  return {
    props: {
      allPosts: Object.values(allPosts)
    }
  }
}
