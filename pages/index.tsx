import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getAllPostIds, getAllPosts } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import { IPost } from '../lib/cli'

interface IHomeProps {
  allPosts: IPost[]
}
export default function Home({allPosts} : IHomeProps) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          An offline, searchable, personalized copy of{' '}
          <a href="https://stackoverflow.com/users/1366033/kylemit">
            StackOverflow
          </a>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Posts</h2>
        <ul className={utilStyles.list}>
          {allPosts.map(({ id, q, a }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/p/${id}`}>
                <a>{q?.data?.title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                {/* <Date dateString={date} /> */}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPosts()
  return {
    props: {
      allPosts
    }
  }
}
