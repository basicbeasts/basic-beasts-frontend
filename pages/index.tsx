import type { NextPage } from 'next'
import ComingSoon from "@components/ui/ComingSoon"
import Head from 'next/head'
import PackStore from '@components/ui/PackStore'

const Home: NextPage = () => {
    return (
      	<div>
			<Head>
				<title>Basic Beasts</title>
				<meta name="description" content="Basic Beasts" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
        	<ComingSoon description="Welcome to Basic Beasts! Brought to you by the Delta variant."/>
			<PackStore/>
      	</div>
    )
  }
  
export default Home

  
