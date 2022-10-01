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
  .put("0xFlowToken", process.env.NEXT_PUBLIC_FLOW_TOKEN_ADDRESS)
  .put(
    "0xNFTDayTreasureChest",
    process.env.NEXT_PUBLIC_NFT_DAY_TREASURE_CHEST_ADDRESS,
  )
  .put(
    "0xTreasureChestFUSDReward",
    process.env.NEXT_PUBLIC_NFT_DAY_TREASURE_CHEST_ADDRESS,
  )
  .put(
    "0xBlackMarketplace",
    process.env.NEXT_PUBLIC_NFT_DAY_TREASURE_CHEST_ADDRESS,
  )
  .put("0xProfile", process.env.NEXT_PUBLIC_PROFILE_ADDRESS)
// .put("0xBasicBeast", process.env.NEXT_PUBLIC_BASIC_BEAST_ADDRESS)

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
