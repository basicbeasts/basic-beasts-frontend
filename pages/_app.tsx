import "../styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import favicon from "public/favicon.ico"
import Layout from "@components/common/Layout"
import AuthProvider from "@components/auth/AuthProvider"
import UserProvider from "@components/user/UserProvider"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <AuthProvider>
        <Layout>
          <Head>
            <title>Basic Beasts | Play-2-Earn</title>
            <meta name="description" content="Basic Beasts | Play-2-Earn" />
            <link rel="icon" href={favicon.src} />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </UserProvider>
  )
}
export default MyApp
