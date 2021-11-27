import '../styles/global.css'
// import '../node_modules/@stackoverflow/stacks/dist/css/stacks.css'
import '../styles/stacks.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
