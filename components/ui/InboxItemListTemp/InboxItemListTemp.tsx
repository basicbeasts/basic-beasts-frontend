import React, { FC, useEffect, useState } from "react"
import styled from "styled-components"
import BeastCard from "@components/ui/BeastCard"
import data from "data"
import mails from "data/inbox-dummy-data"
import InboxPackItem from "../InboxPackItem"
import BuyButton from "../BuyButton"
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
import { useAuth } from "@components/auth/AuthProvider"
import { toast } from "react-toastify"
import NextLink from "next/link"

const Button = styled.button`
  padding: 8px 24px 12px 26px;
  margin-right: 2px;
  margin-top: 20px;
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

const Container = styled.div`
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 50px;
  line-height: 1.5em;
  margin-bottom: 120px;

  /* max-width: 1400px; */
  @media (min-width: 1750px) {
  }
`

const EmptyMessage = styled.div`
  font-size: 2em;
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
`

const PackContainer = styled.div`
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 50px;
`

const InboxItemListTemp: FC = () => {
  const [starterPacks, setStarterPacks] = useState(0)
  const [metallicPacks, setMetallicPacks] = useState(0)
  const [cursedPacks, setCursedPacks] = useState(0)
  const [shinyPacks, setShinyPacks] = useState(0)
  const [centralizedInbox, setCentralizedInbox] = useState<any>()

  const { user } = useAuth()

  useEffect(() => {
    fetchInbox()
    getNumberOfPacks()
  }, [user?.addr])

  const getNumberOfPacks = () => {
    let starterCount = 0
    let metallicCount = 0
    let cursedCount = 0
    let shinyCount = 0

    for (let pack in centralizedInbox) {
      let element = centralizedInbox[pack]
      if (element.packTemplate.name == "Starter") {
        starterCount = starterCount + 1
      }
      if (element.packTemplate.name == "Metallic Silver") {
        metallicCount = metallicCount + 1
      }
      if (element.packTemplate.name == "Cursed Black") {
        cursedCount = cursedCount + 1
      }
      if (element.packTemplate.name == "Shiny Gold") {
        shinyCount = shinyCount + 1
      }
    }

    setStarterPacks(starterCount)
    setMetallicPacks(metallicCount)
    setCursedPacks(cursedCount)
    setShinyPacks(shinyCount)
  }

  const claimAllMails = async () => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
        import Inbox from 0xInbox
        import Pack from 0xPack
        import NonFungibleToken from 0xNonFungibleToken
        import MetadataViews from 0xMetadataViews
        
        pub fun hasPackCollection(_ address: Address): Bool {
            return getAccount(address)
              .getCapability<&Pack.Collection{NonFungibleToken.CollectionPublic, Pack.PackCollectionPublic}>(Pack.CollectionPublicPath)
              .check()
          }
        
        transaction(adminAcct: Address) {
        
            let centralizedInboxRef: &Inbox.CentralizedInbox{Inbox.Public}
            let packCollectionRef: &Pack.Collection{NonFungibleToken.Receiver}
        
            prepare(acct: AuthAccount) {
                self.centralizedInboxRef = getAccount(adminAcct).getCapability(Inbox.CentralizedInboxPublicPath)
                .borrow<&Inbox.CentralizedInbox{Inbox.Public}>()
                ?? panic("Could not get Centralized Inbox reference")
        
                if !hasPackCollection(acct.address) {
                    if acct.borrow<&Pack.Collection>(from: Pack.CollectionStoragePath) == nil {
                      acct.save(<-Pack.createEmptyCollection(), to: Pack.CollectionStoragePath)
                    }
                    acct.unlink(Pack.CollectionPublicPath)
                    acct.link<&Pack.Collection{NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, Pack.PackCollectionPublic, MetadataViews.ResolverCollection}>(Pack.CollectionPublicPath, target: Pack.CollectionStoragePath)
                }
        
                self.packCollectionRef = acct.borrow<&Pack.Collection{NonFungibleToken.Receiver}>(from: Pack.CollectionStoragePath)
                ?? panic("No Pack Collection resource in storage")
        
            }
        
            execute {
                self.centralizedInboxRef.claimMails(recipient: self.packCollectionRef)
                
            }
        
        }
        `),
        args([arg("0x22fc0fd68c3857cf", t.Address)]), //Admin Account on testnet
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
      fetchInbox()
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

  const fetchInbox = async () => {
    try {
      let res = await query({
        cadence: `
        import Inbox from 0xInbox
import NonFungibleToken from 0xNonFungibleToken

pub fun main(adminAcct: Address, wallet: Address): &[NonFungibleToken.NFT]? {

    let centralizedInboxRef = getAccount(adminAcct).getCapability(Inbox.CentralizedInboxPublicPath)
        .borrow<&Inbox.CentralizedInbox{Inbox.Public}>()
        ?? panic("Could not get Centralized Inbox reference")

  return centralizedInboxRef.getWalletMails(wallet: wallet)
}
        `,

        args: (arg: any, t: any) => [
          arg("0x22fc0fd68c3857cf", t.Address),
          arg(user?.addr, t.Address),
        ],
      })
      setCentralizedInbox(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <>
        {centralizedInbox != null ? (
          <>
            {centralizedInbox.length > 0 ? (
              <>
                {starterPacks > 0 ? (
                  <>
                    <InboxPackItem
                      quantity={starterPacks}
                      description={"Starter Pack"}
                      value={10}
                    />
                  </>
                ) : (
                  ""
                )}
                {metallicPacks > 0 ? (
                  <>
                    <InboxPackItem
                      quantity={metallicPacks}
                      description={"Metallic Silver Pack"}
                      value={0}
                    />
                  </>
                ) : (
                  ""
                )}
                {cursedPacks > 0 ? (
                  <>
                    <InboxPackItem
                      quantity={cursedPacks}
                      description={"Cursed Black Pack"}
                      value={300}
                    />
                  </>
                ) : (
                  ""
                )}
                {shinyPacks > 0 ? (
                  <>
                    <InboxPackItem
                      quantity={shinyPacks}
                      description={"Shiny Gold Pack"}
                      value={999}
                    />
                  </>
                ) : (
                  ""
                )}
                <BuyButton
                  onClick={() => claimAllMails()}
                  buttonText={"Claim All"}
                />
                {/* <pre>{JSON.stringify(centralizedInbox, null, 2)}</pre> */}
              </>
            ) : (
              <>
                <EmptyMessage>Your inbox is empty.</EmptyMessage>
                <EmptyMessage>
                  If you recently participated in a drop,
                </EmptyMessage>{" "}
                <EmptyMessage>
                  you can expect to receive your packs latest 14 days after the
                  drop.
                </EmptyMessage>
                <div style={{ marginTop: "40px" }}>
                  <EmptyMessage>Check for packs in Profile.</EmptyMessage>
                </div>
                <EmptyMessage>
                  <Button>
                    <NextLink href={"/profile/" + user?.addr}>
                      Visit Profile
                    </NextLink>
                  </Button>
                </EmptyMessage>
              </>
            )}
          </>
        ) : (
          <EmptyMessage>No inbox found</EmptyMessage>
        )}
      </>
    </Container>
  )
}
export default InboxItemListTemp
