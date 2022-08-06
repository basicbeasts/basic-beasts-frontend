import { FC, useState } from "react"
import Navbar from "@components/common/Navbar"
import Footer from "@components/common/Footer"
import SideNavbar from "@components/common/SideNavbar"
import * as fcl from "@onflow/fcl"
import Head from "next/head"
import { useRouter } from "next/dist/client/router"

//Configure FCL
fcl
  .config()
  .put("accessNode.api", process.env.NEXT_PUBLIC_ACCESS_NODE_API)
  .put("challenge.handshake", process.env.NEXT_PUBLIC_CHALLENGE_HANDSHAKE)
  .put("0xFungibleToken", process.env.NEXT_PUBLIC_FUNGIBLE_TOKEN_ADDRESS)
  .put("0xFUSD", process.env.NEXT_PUBLIC_FUSD_ADDRESS)
  .put("0xNonFungibleToken", process.env.NEXT_PUBLIC_NON_FUNGIBLE_TOKEN_ADDRESS)
  .put("0xMetadataViews", process.env.NEXT_PUBLIC_METADATA_VIEWS_ADDRESS)
  .put("0xBasicBeasts", process.env.NEXT_PUBLIC_BASIC_BEASTS_ADDRESS)
  .put(
    "0xEmptyPotionBottle",
    process.env.NEXT_PUBLIC_EMPTY_POTION_BOTTLE_ADDRESS,
  )
  .put("0xSushi", process.env.NEXT_PUBLIC_SUSHI_ADDRESS)
  .put("0xPoop", process.env.NEXT_PUBLIC_POOP_ADDRESS)
  .put("0xHunterScore", process.env.NEXT_PUBLIC_HUNTER_SCORE_ADDRESS)
  .put("0xPack", process.env.NEXT_PUBLIC_PACK_ADDRESS)
  .put("0xInbox", process.env.NEXT_PUBLIC_INBOX_ADDRESS)

const Layout: FC = ({ children }) => {
  const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(false)

  const toggle = () => {
    setIsSideNavbarOpen(!isSideNavbarOpen)
  }

  let router = useRouter()

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/Pixelar/Pixelar-Regular-W01-Regular.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <SideNavbar isSideNavbarOpen={isSideNavbarOpen} toggle={toggle} />
      <Navbar toggle={toggle} router={router} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
