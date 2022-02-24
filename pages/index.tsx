import type { NextPage } from "next"
import Head from "next/head"
import PackStore from "@components/ui/PackStore"
import Hero from "@components/ui/Hero"
import favicon from "public/favicon.ico"

const Home: NextPage = () => {
  return (
    <div>
      <Hero />
      <PackStore />
    </div>
  )
}

export default Home
