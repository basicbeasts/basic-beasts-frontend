import React, { FC, useEffect, useState } from "react"
import styled from "styled-components"
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
import { toastStatus } from "@framework/helpers/toastStatus"

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

const PackContainer = styled.div`
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 50px;
`

const InboxItemList: FC = () => {
  const [starterPacks, setStarterPacks] = useState(0)
  const [metallicPacks, setMetallicPacks] = useState(0)
  const [cursedPacks, setCursedPacks] = useState(0)
  const [shinyPacks, setShinyPacks] = useState(0)

  const { user } = useAuth()

  useEffect(() => {
    getNumberOfPacks()
  }, [])

  const getNumberOfPacks = () => {
    let starterCount = 0
    let metallicCount = 0
    let cursedCount = 0
    let shinyCount = 0

    for (let pack in mails) {
      let element = mails[pack]
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
        args([arg(process.env.NEXT_PUBLIC_INBOX_ADDRESS, t.Address)]), //Admin Account on testnet
        payer(authz),
        proposer(authz),
        authorizations([authz]),
        limit(9999),
      ]).then(decode)

      tx(res).subscribe((res: any) => {
        toastStatus(id, res.status)
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

  return (
    <Container>
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
      <BuyButton onClick={() => claimAllMails()} buttonText={"Claim All"} />
    </Container>
  )
}
export default InboxItemList
