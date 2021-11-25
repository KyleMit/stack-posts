import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData, IPostData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

interface IHomeProps {
  allPosts: IPostData[]
}
export default function Home({allPosts} : IHomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>StackOverflow.Kyle</p>
        <p>
          An offline, searchable, personalized copy of{' '}
          <a href="https://stackoverflow.com/">StackOverflow</a>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPosts.map(({ id }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/p/${id}`}>
                <a>{id}</a>
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
  const allPosts = getSortedPostsData()
  return {
    props: {
      allPosts
    }
  }
}
