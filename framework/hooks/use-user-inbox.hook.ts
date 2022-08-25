import { useEffect, useReducer, useCallback, useState } from "react"
import { defaultReducer } from "reducer/defaultReducer"
import { toast } from "react-toastify"
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

export default function useInbox(user: any) {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null,
  })

  const [starterPacks, setStarterPacks] = useState(0)
  const [metallicPacks, setMetallicPacks] = useState(0)
  const [cursedPacks, setCursedPacks] = useState(0)
  const [shinyPacks, setShinyPacks] = useState(0)
  const [centralizedInbox, setCentralizedInbox] = useState<any>()

  useEffect(() => {
    fetchInbox()
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
        render: "Error, try again later...",
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
          arg("0x22fc0fd68c3857cf", t.Address), // Admin Centralized Inbox
          arg(user?.addr, t.Address),
        ],
      })
      setCentralizedInbox(res)
    } catch (err) {
      console.log(err)
    }
  }

  return {
    ...state,
    centralizedInbox,
    starterPacks,
    metallicPacks,
    cursedPacks,
    shinyPacks,
    claimAllMails,
    fetchInbox,
    getNumberOfPacks,
  }
}
