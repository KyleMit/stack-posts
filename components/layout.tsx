import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import layoutStyles from '../styles/layout.module.css';

const name = 'Kyle Mitofsky'
export const siteTitle = 'StackPosts.Kyle'

const Layout: React.FC = ({ children }) => {
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
      <main className={layoutStyles.main}>
        {children}
      </main>
      <footer className={layoutStyles.footer}>
        <a href="https://github.com/KyleMit/stack-posts">
          Source on Github
        </a>
      </footer>
    </div>
  )
}

export default Layout
