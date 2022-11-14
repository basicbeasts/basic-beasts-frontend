import { FC, useState } from "react"
import Navbar from "@components/common/Navbar"
import Footer from "@components/common/Footer"
import SideNavbar from "@components/common/SideNavbar"
import * as fcl from "@onflow/fcl"
import Head from "next/head"
import { useRouter } from "next/dist/client/router"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import SlideOverNavbar from "../SlideOverNavbar"
import profilePictures from "data/profilePictures"

//Configure FCL
fcl
  .config()
  .put("accessNode.api", process.env.NEXT_PUBLIC_ACCESS_NODE_API)
  .put("challenge.handshake", process.env.NEXT_PUBLIC_CHALLENGE_HANDSHAKE)
  // .put("discovery.wallet", process.env.NEXT_PUBLIC_CHALLENGE_HANDSHAKE)
  // .put("discovery.wallet.method", "HTTP/POST") // Needed for testnet to work as it does not allow iframe
  // .put("discovery.wallet.method", "IFRAME/RPC")
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
  .put("0xEvolution", process.env.NEXT_PUBLIC_EVOLUTION_ADDRESS)
  .put("0xProfile", process.env.NEXT_PUBLIC_PROFILE_ADDRESS)
  .put("0xFiatToken", process.env.NEXT_PUBLIC_FIAT_TOKEN_ADDRESS)
  .put("0xFlowToken", process.env.NEXT_PUBLIC_FLOW_TOKEN_ADDRESS)
  .put("0xFIND", process.env.NEXT_PUBLIC_FIND_ADDRESS)
  .put("0xFindMarket", process.env.NEXT_PUBLIC_FIND_MARKET_ADDRESS)
  .put("0xFindMarketSale", process.env.NEXT_PUBLIC_FIND_MARKET_SALE_ADDRESS)
  .put(
    "0xFindMarketDirectOfferEscrow",
    process.env.NEXT_PUBLIC_FIND_MARKET_DIRECT_OFFER_ESCROW_ADDRESS,
  )
  .put(
    "0xFindMarketDirectOfferSoft",
    process.env.NEXT_PUBLIC_FIND_MARKET_DIRECT_OFFER_SOFT_ADDRESS,
  )
  .put(
    "0xFindMarketAuctionEscrow",
    process.env.NEXT_PUBLIC_FIND_MARKET_AUCTION_ESCROW_ADDRESS,
  )
  .put(
    "0xFindMarketAuctionSoft",
    process.env.NEXT_PUBLIC_FIND_MARKET_AUCTION_SOFT_ADDRESS,
  )
  .put("0xDandy", process.env.NEXT_PUBLIC_DANDY_ADDRESS)
  .put(
    "0xFindLeaseMarketSale",
    process.env.NEXT_PUBLIC_FIND_LEASE_MARKET_SALE_ADDRESS,
  )
  .put(
    "0xFindLeaseMarketAuctionSoft",
    process.env.NEXT_PUBLIC_FIND_LEASE_MARKET_AUCTION_SOFT_ADDRESS,
  )
  .put(
    "0xFindLeaseMarketDirectOfferSoft",
    process.env.NEXT_PUBLIC_FIND_LEASE_MARKET_DIRECT_OFFER_SOFT_ADDRESS,
  )
  .put("0xFindLeaseMarket", process.env.NEXT_PUBLIC_FIND_LEASE_MARKET_ADDRESS)
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

const Layout: FC = ({ children }) => {
  const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(false)

  const [open, setOpen] = useState(false)

  const [profilePicture, setProfilePicture] = useState(profilePictures[1].image)
  const [profile, setProfile] = useState<any>()

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
      <ToastContainer position="bottom-right" pauseOnFocusLoss={false} />
      <SlideOverNavbar
        open={open}
        setOpen={setOpen}
        profilePicture={profilePicture}
        profile={profile}
        router={router}
      />
      <Navbar
        toggle={toggle}
        router={router}
        setOpen={setOpen}
        profilePicture={profilePicture}
        setProfilePicture={setProfilePicture}
        profile={profile}
        setProfile={setProfile}
      />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
