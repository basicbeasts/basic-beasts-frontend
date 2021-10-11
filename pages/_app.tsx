import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@components/common/Layout'
import AuthProvider from '@components/auth/AuthProvider'
import UserProvider from '@components/user/UserProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      	<AuthProvider>
      		<Layout>
            	<Component {...pageProps} />
        	</Layout>
        </AuthProvider>
    </UserProvider>
  )
}
export default MyApp
