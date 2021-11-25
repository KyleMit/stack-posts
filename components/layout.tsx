import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Kyle Mitofsky'
export const siteTitle = 'StackPosts.Kyle'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="An offline, searchable, personalized copy of StackOverflow" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <h1>
          <Link href="/">
            <a>
              {siteTitle}
            </a>
          </Link>
        </h1>
      </header>
      <main>{children}</main>
      <footer>
        <a href="https://github.com/KyleMit/stack-posts">
          Source on Github
        </a>
      </footer>
    </div>
  )
}
