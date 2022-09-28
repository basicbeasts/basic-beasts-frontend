import type { NextPage } from "next"
import styled from "styled-components"
import { TypeAnimation } from "react-type-animation"
import chest from "public/nft-day-treasure-chest.png"
import { motion } from "framer-motion"
import { useAuth } from "@components/auth/AuthProvider"
import { useEffect, useState } from "react"
import Countdown from "react-countdown"
import { ToastContainer, toast } from "react-toastify"
import * as fcl from "@onflow/fcl"
import {
  query,
  send,
  transaction,
  args,
  arg,
  payer,
  proposer,
  authorizations,
  limit,
  authz,
  decode,
  tx,
} from "@onflow/fcl"
import * as t from "@onflow/types"
import "react-toastify/dist/ReactToastify.css"
import ScrollIcon from "public/scroll_icon.png"
import ScrollModal from "@components/ui/ScrollModal"
import RewardsModal from "@components/ui/RewardsModal"
import Chests from "@components/ui/Chests"

const Spacing = styled.div`
  @media (min-width: 1100px) {
    padding: 100px 0;
  }
`

const Container = styled.div`
  background: black;
  color: white;
  height: 90vh;
  // height: 3000px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1em;
  text-align: center;
`

const Img = styled.img`
  margin: 0;
`

const Button = styled.button`
  padding: 8px 24px 12px 26px;
  margin-top: 30px;
  margin-right: 2px;
  font-size: 26px;
  background-color: #feff95;
  box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
    0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset -3px -3px #f3cb23;
  color: #a75806;
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
      0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset 3px 3px #f3cb23;
  }
`

const BlackMarketButton = styled.button`
  padding: 8px 24px 10px 26px;
  margin-top: 30px;
  margin-right: 2px;
  font-size: 26px;
  background-color: #0ae890;
  box-shadow: -3px 0px 0px 0px #097248, 0px -3px 0px 0px #097248,
    0px 3px 0px 0px #097248, 3px 0px 0px 0px #097248, inset -3px -3px #0bc379;
  color: #095436;
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: -3px 0px 0px 0px #097248, 0px -3px 0px 0px #097248,
      0px 3px 0px 0px #097248, 3px 0px 0px 0px #097248, inset 3px 3px #0bc379;
  }
`

const BlackMarket: NextPage = () => {
  const { logIn, logOut, user, loggedIn } = useAuth()

  const [NFT, setNFT] = useState(null)

  const [whitelist, setWhitelist] = useState<any>(["0x16af873a66616a17"])

  const [open, setOpen] = useState(false)

  const [openRewards, setOpenRewards] = useState(false)

  useEffect(() => {
    setNFT(null)
    getChestCollection()
    getWhitelist()
  }, [user?.addr])

  const mint = async () => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
        import NonFungibleToken from 0xNonFungibleToken
        import MetadataViews from 0xMetadataViews
        import NFTDayTreasureChest from 0xNFTDayTreasureChest

        pub fun hasChestCollection(_ address: Address): Bool {
          return getAccount(address)
            .getCapability<&NFTDayTreasureChest.Collection{NonFungibleToken.CollectionPublic, NFTDayTreasureChest.NFTDayTreasureChestCollectionPublic}>(NFTDayTreasureChest.CollectionPublicPath)
            .check()
        }

        transaction() {
          let chestReceiverRef: &{NonFungibleToken.CollectionPublic}

          prepare(signer: AuthAccount) {

            // Return early if the account already has a collection
            if signer.borrow<&NFTDayTreasureChest.Collection>(from: NFTDayTreasureChest.CollectionStoragePath) == nil {
              // Create a new empty collection
              let collection <- NFTDayTreasureChest.createEmptyCollection()
  
              // save it to the account
              signer.save(<-collection, to: NFTDayTreasureChest.CollectionStoragePath)
  
              // create a public capability for the collection
              signer.link<&{NonFungibleToken.CollectionPublic, NFTDayTreasureChest.NFTDayTreasureChestCollectionPublic, MetadataViews.ResolverCollection}>(
                  NFTDayTreasureChest.CollectionPublicPath,
                  target: NFTDayTreasureChest.CollectionStoragePath
              )
            }

            self.chestReceiverRef = signer
            .getCapability(NFTDayTreasureChest.CollectionPublicPath)
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

          }

          execute {

            NFTDayTreasureChest.mintNFT(recipient: self.chestReceiverRef)

          }

        }

        `),
        payer(authz),
        proposer(authz),
        authorizations([authz]),
        limit(9999),
      ]).then(decode)

      tx(res).subscribe((res: any) => {
        if (res.status === 1) {
          toast.update(id, {
            render: "Pending...",
            type: "default",
            isLoading: true,
            autoClose: 5000,
          })
        }
        if (res.status === 2) {
          toast.update(id, {
            render: "Finalizing...",
            type: "default",
            isLoading: true,
            autoClose: 5000,
          })
        }
        if (res.status === 3) {
          toast.update(id, {
            render: "Executing...",
            type: "default",
            isLoading: true,
            autoClose: 5000,
          })
        }
      })
      await tx(res)
        .onceSealed()
        .then((result: any) => {
          toast.update(id, {
            render: "Transaction Sealed",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          })
        })
      getWhitelist()
      getChestCollection()
    } catch (err) {
      toast.update(id, {
        render: () => <div>Error, try again later...</div>,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      })
      console.log(err)
    }
  }

  const getChestCollection = async () => {
    try {
      let response = await query({
        cadence: `
        import NFTDayTreasureChest from 0xNFTDayTreasureChest
        import NonFungibleToken from 0xNonFungibleToken

        // This script borrows an NFT from a collection
        pub fun main(address: Address): &NonFungibleToken.NFT {
          let account = getAccount(address)

          let collectionRef = account
              .getCapability(NFTDayTreasureChest.CollectionPublicPath)
              .borrow<&{NonFungibleToken.CollectionPublic}>()
              ?? panic("Could not borrow capability from public collection")
          
          let ids = collectionRef.getIDs()
          
          return collectionRef.borrowNFT(id: ids[0])
        }
        `,
        args: (arg: any, t: any) => [arg(user?.addr, t.Address)],
      })
      setNFT(response)
    } catch (err) {
      console.log(err)
    }
  }

  const getWhitelist = async () => {
    try {
      let response = await query({
        cadence: `
        import NFTDayTreasureChest from 0xNFTDayTreasureChest
        
        pub fun main(): [Address] {
          return NFTDayTreasureChest.getWhitelist()
        }
        `,
      })
      setWhitelist(response)
    } catch (err) {
      console.log(err)
    }
  }

  // Add Action button to direct to Black Market
  const Completionist = () => {
    return (
      <div>
        <img
          onClick={() => setOpen(true)}
          style={{ width: "80px" }}
          src={ScrollIcon.src}
        />
        <Button onClick={() => setOpenRewards(true)}>FUSD Rewards</Button>
      </div>
    )
  }

  return (
    <Container>
      <ToastContainer
        autoClose={4000}
        hideProgressBar
        position="top-center"
        theme="dark"
      />
      <ScrollModal open={open} setOpen={setOpen} />
      <RewardsModal open={openRewards} setOpen={setOpenRewards} />
      {loggedIn ? (
        <>
          {NFT != null ? (
            <>{<Chests />}</>
          ) : (
            <>
              <Img src={chest.src} />
              <div style={{ fontSize: "2em" }}>
                The Inspected Treausure Chest can no longer be claimed.
              </div>
              <Button>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://discord.gg/CG3kfkxb65"
                >
                  Seek Help
                </a>
              </Button>
            </>
          )}
        </>
      ) : (
        <>
          <h2 style={{ fontSize: "2em" }}>Connect your wallet to view chest</h2>
          <Button onClick={() => logIn()}>Connect Wallet</Button>
        </>
      )}
    </Container>
  )
}

export default BlackMarket
