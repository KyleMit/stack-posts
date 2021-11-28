import Head from 'next/head'
import { Layout, siteTitle } from '../components/'
import Link from 'next/link'
import { Date, Tags } from '../components'
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
          {allPosts.map(({ id, q, a }) => (
            <div key={id} className="s-post-summary s-post-summary__minimal bbw0">
              <div className="s-post-summary--content">
                  <Link href={`/p/${id}`}>
                    <a  className="s-post-summary--content-title s-link">{q.title}</a>
                  </Link>
                  <div className="s-post-summary--meta">
                      <div className="s-post-summary--meta-tags">
                        {q.tags.map((tag) => (
                              <a key={tag} className="s-tag s-tag__muted" href="#">{tag}</a>
                          ))}
                      </div>

                      <div className="s-user-card s-user-card__minimal">
                          <Date
                            dateString={q.creation_date}
                            className="s-user-card--time"
                          />
                      </div>

                  </div>
              </div>
          </div>
          ))}
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
