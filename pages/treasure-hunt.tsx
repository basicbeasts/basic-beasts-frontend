import type { NextPage } from "next"
import styled from "styled-components"
import chest from "public/nft-day-treasure-chest.png"
import { motion } from "framer-motion"
import { useAuth } from "@components/auth/AuthProvider"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
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
import { useUser } from "@components/user/UserProvider"
import Chest from "public/chest.png"
import ChestGreenSparkle from "public/chest_green_sparkle.gif"
import Link from "next/link"
import FUSDClaimModal from "@components/ui/FUSDClaimModal"
import ListForSaleModal from "@components/ui/ListForSaleModal"
import DelistModal from "@components/ui/DelistModal"

const Container = styled.div`
  background: black;
  color: white;
  min-height: 80vh;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1em;
  text-align: center;
  gap: 40px;
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

const Scroll = styled.img`
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  margin-right: 20px;
`

const FindKeyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const NumberOfChests = styled.div`
  // style={{ background: "#111823" }}
  // className=" absolute rounded-full bottom-8 right-12 w-10 h-10 "
  position: absolute;
  display: flex;
  background: #111823;
  border-radius: 100%;
  bottom: 10px;
  right: 10px;
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  font-weight: 900;
  color: #f3cb23;
  padding: 0 0 2px 3px;
`

const AccordionDiv = styled.div`
  margin: 50px 0;
`
const Panel = styled.div`
  background: none;
  /* border: 1px solid gray;
  border-radius: 10px; */
  color: #fff;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  padding: 10px;
  margin: 10px 0;

  text-align: left;
  font-size: 16px;

  outline: none;
  transition: 0.4s;
  // min-width: 20vw;
  // max-width: 50vw;
  width: 80vw;
  @media (min-width: 1060px) {
    width: 961px;
  }
`
const AccordionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  margin-bottom: 5px;
  /* border-bottom: 1px solid rgba(220, 220, 220, 0.25); */
  line-height: 1;
`
//

const Treasure: NextPage = () => {
  const { logIn, logOut, user, loggedIn } = useAuth()

  const [open, setOpen] = useState(false)
  const [openRewards, setOpenRewards] = useState(false)
  const [openFUSDClaim, setOpenFUSDClaim] = useState(false)
  const [IDsWithRewards, setIDsWithRewards] = useState([])
  const [openListForSale, setOpenListForSale] = useState(false)
  const [openDelist, setOpenDelist] = useState(false)

  const {
    totalUserChests,
    saleIDs,
    chestIDs,
    claimedFUSDRewards,
    getClaimedFUSDRewards,
    getAllChestSaleOffers,
    fetchUserChests,
  } = useUser()

  useEffect(() => {
    checkClaimedFUSDRewards()
  }, [chestIDs])

  const checkClaimedFUSDRewards = () => {
    var IDs: any = []
    for (let key in chestIDs) {
      if (!claimedFUSDRewards.includes(chestIDs[key])) {
        IDs.push(chestIDs[key])
      }
    }
    setIDsWithRewards(IDs)
  }

  useEffect(() => {
    getClaimedFUSDRewards()
    getAllChestSaleOffers()
    fetchUserChests()
  }, [])

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

  const accordionData = [
    {
      defaultActive: true,
      title: "What is an NFT?",
      content: `It means non fungible token`,
    },
    {
      defaultActive: false,
      title: "What is BB Merch?",
      content: `It's a digital merch item that can be burned to get a physical version shipped to you. It's a limited edition item so this merch will never be minted again.
      `,
    },
    {
      defaultActive: false,
      title: "What is a BB Pack?",
      content: `A BB pack contains a random 1-star beast. The skin of the beast depends on the pack.`,
    },
    {
      defaultActive: false,
      title: "What is a BB Voucher?",
      content: `Probably nothing.`,
    },
    {
      defaultActive: false,
      title: "What does whitelisted mean?",
      content: `Everyone who claimed the NFT Day Treasure Chest FLOAT or own a beast but did not inspect the chest. Now have a second chance to acquire a treasure chest on the black market.`,
    },
    {
      defaultActive: false,
      title: "Why can't I buy a chest?",
      content: `If you have sold or listed all your chests and used your whitelist you cannot buy a new one.`,
    },
  ]

  const Accordion = ({
    title,
    content,
    defaultActive,
  }: {
    title: any
    content: any
    defaultActive: Boolean
  }) => {
    const [isActive, setIsActive] = useState(defaultActive)

    return (
      <Panel className="accordion-item" onClick={() => setIsActive(!isActive)}>
        <AccordionTitle>
          <div>{title}</div>
          <div>{isActive ? "-" : "+"}</div>
        </AccordionTitle>
        {isActive && (
          <div
            style={{ marginLeft: "10px", fontSize: "1.2em" }}
            className="accordion-content"
          >
            {content}
          </div>
        )}
      </Panel>
    )
  }

  return (
    <Container>
      {/* <ToastContainer autoClose={4000} position="bottom-right" theme="dark" /> */}
      {/* <Button onClick={() => mint()}>Temp Mint</Button> */}
      <ScrollModal open={open} setOpen={setOpen} />
      <RewardsModal open={openRewards} setOpen={setOpenRewards} />
      <FUSDClaimModal
        open={openFUSDClaim}
        setOpen={setOpenFUSDClaim}
        IDs={IDsWithRewards}
        checkClaimedFUSDRewards={checkClaimedFUSDRewards}
      />
      <ListForSaleModal
        open={openListForSale}
        setOpen={setOpenListForSale}
        IDs={chestIDs}
      />
      <DelistModal open={openDelist} setOpen={setOpenDelist} IDs={saleIDs} />

      {user?.addr != null ? (
        <>
          {totalUserChests > 0 ? (
            <>
              <div className="relative">
                {IDsWithRewards.length > 0 ? (
                  <a onClick={() => setOpenFUSDClaim(true)}>
                    <img
                      style={{ width: "220px", padding: "20px" }}
                      src={ChestGreenSparkle.src}
                    />
                    <NumberOfChests>{totalUserChests}</NumberOfChests>
                  </a>
                ) : (
                  <>
                    <img
                      style={{ width: "220px", padding: "20px" }}
                      src={Chest.src}
                    />
                    <NumberOfChests>{totalUserChests}</NumberOfChests>
                  </>
                )}
              </div>

              <div style={{ fontSize: "4em", color: "#0ae890" }}>
                {/* <Countdown date={1664218800000}>
                  <Completionist />
                </Countdown> */}
                <div
                //  style={{ marginLeft: "auto", marginRight: "auto" }}
                >
                  <FindKeyContainer>
                    <Scroll
                      onClick={() => setOpen(true)}
                      style={{ width: "80px" }}
                      src={ScrollIcon.src}
                    />
                    <div>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://floats.city/basicbeasts.find/event/602209501"
                      >
                        →
                      </a>
                    </div>
                  </FindKeyContainer>
                  <Button onClick={() => setOpenRewards(true)}>Rewards</Button>
                  <br />
                  {/* TODO: Remove Temp buttons when black market opens */}
                  {chestIDs?.length > 0 ? (
                    <Button onClick={() => setOpenListForSale(true)}>
                      List Chest
                    </Button>
                  ) : (
                    <></>
                  )}
                  {saleIDs?.length > 0 ? (
                    <Button onClick={() => setOpenDelist(true)}>
                      Delist Chest
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: "2em", marginTop: "50px" }}>
                You don&apos;t own any chests
              </div>
              <BlackMarketButton>
                <Link href="/black-market">
                  <a>Visit Black Market</a>
                </Link>
              </BlackMarketButton>
            </>
          )}
        </>
      ) : (
        <>
          <h2 style={{ fontSize: "2em" }}>Connect your wallet to view chest</h2>
          <Button onClick={() => logIn()}>Connect Wallet</Button>
        </>
      )}
      <AccordionDiv className="accordion">
        {accordionData.map(({ title, content, defaultActive }, id: any) => (
          <Accordion
            key={id}
            title={title}
            content={content}
            defaultActive={defaultActive}
          />
        ))}
      </AccordionDiv>
    </Container>
  )
}

export default Treasure
