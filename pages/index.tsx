import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import { getPostsCached, IPost } from '../lib/cli'

interface IHomeProps {
  allPosts: IPost[]
}
export default function Home({allPosts} : IHomeProps) {
  return (
    <Layout>

      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className="s-page-title">
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
        <h2>Posts</h2>
        <ul>
          {allPosts.map(({ id, q, a }) => (
            <li key={id}>
              <Link href={`/p/${id}`}>
                <a>{q.title}</a>
              </Link>
              <br />
              <small >
                <Date dateString={q.creation_date} />
              </small>
            </li>
          ))}
        </ul>
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
