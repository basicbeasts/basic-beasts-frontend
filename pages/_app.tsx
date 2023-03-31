import "../styles/globals.css"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import Head from "next/head"
import favicon from "public/favicon.ico"
import Layout from "@components/common/Layout"
import AuthProvider from "@components/auth/AuthProvider"
import UserProvider from "@components/user/UserProvider"
import ru from "../styles/ru.module.css"

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter()
  console.log(locale)

  const translation = locale == "ru" ? ru : null

  return (
    <UserProvider>
      <AuthProvider>
        <div className={translation?.ruLang}>
          <Layout>
            <Head>
              <title>Basic Beasts | Play-2-Earn</title>
              <meta name="description" content="Basic Beasts | Play-2-Earn" />
              <link rel="icon" href={favicon.src} />

              {/* <meta name="twitter:widgets:autoload" content="off" />

              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:site" content="@basicbeastsnft" />
              <meta
                name="twitter:image"
                content="https://www.basicbeasts.io/temp/011_temp.png"
              />
              <meta
                name="twitter:description"
                content="Basic Beasts | Play-2-Earn - a very very very cool game"
              /> */}

              {/* <meta property="og:site_name" content="Basic Beasts" />
              <meta
                property="og:url"
                content={"https://www.basicbeasts.io" + router.asPath}
              />
              <meta
                property="og:image"
                content="https://www.basicbeasts.io/temp/011_temp.png"
              /> */}
            </Head>
            <Component {...pageProps} />
          </Layout>
        </div>
      </AuthProvider>
    </UserProvider>
  )
}
export default MyApp
