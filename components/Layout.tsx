import Head from 'next/head'
import Link from 'next/link'

export const siteTitle = 'My Overflow'
export const siteDesc = 'An offline, searchable, personalized copy of StackOverflow'

const Layout: React.FC = ({ children }) => {
  return (
    <div >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={siteDesc} />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="s-topbar">
          <div className="s-topbar--container wmx8 mx-auto">
              <Link href="/">
                <a className="s-topbar--logo s-link__inherit fs-body3 ml16">
                  <span className='mr1'>my</span>
                  <span className="fw-bold">overflow</span>
                </a>
              </Link>
          </div>
      </div>

      <main className="wmx8 mx-auto m8 p8">
        {children}
      </main>

      <footer className="bg-black-025 fc-black-400 p32 ta-center">
        {'Built on '}
        <a href="https://github.com/KyleMit/stack-posts" className="s-anchors td-underline">
          Github
        </a>
        {' with '}
        <a href="https://api.stackexchange.com/" className="s-anchors td-underline">
          Stack Exchange API
        </a>
        {', '}
        <a href="https://stackoverflow.design/" className="s-anchors td-underline">
          Stacks Design System
        </a>
        {', & '}
        <a href="https://nextjs.org/" className="s-anchors td-underline">
          NextJS
        </a>
      </footer>

    </div>
  )
}

export default Layout
