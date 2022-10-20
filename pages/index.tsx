import Head from 'next/head'
import { Layout, PostList, siteTitle } from '../components/'
import Link from 'next/link'
import { DateDisplay, Tags } from '../components'
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

      <div className="s-page-title m16">
          <div className="s-page-title--text">
              <h1 className="s-page-title--header">
                An offline, searchable, personalized copy of{' '}
                <a href="https://stackoverflow.com/users/1366033/kylemit">
                  StackOverflow
                </a>
              </h1>
          </div>
      </div>

      <section >
        <h2 className="m16">
          All Posts
        </h2>
        <div>
          <PostList posts={allPosts} />
        </div>
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
