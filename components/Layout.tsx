import Head from 'next/head'
import Link from 'next/link'

export const siteTitle = 'My Overflow'

const Layout: React.FC = ({ children }) => {
  return (
    <div >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="An offline, searchable, personalized copy of StackOverflow" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className="s-topbar">
          <div className="s-topbar--container">
              <Link href="/">
                <a className="s-topbar--menu-btn">
                  {siteTitle}
                </a>
              </Link>
          </div>
      </header>

      <main className="wmx10 mx-auto m8 p8">
        {children}
      </main>

      <footer >
        <a href="https://github.com/KyleMit/stack-posts">
          Source on Github
        </a>
      </footer>

    </div>
  )
}

export default Layout
