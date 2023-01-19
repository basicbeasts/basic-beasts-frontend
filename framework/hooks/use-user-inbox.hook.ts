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
import { toastStatus } from "@framework/helpers/toastStatus"

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
    if (user?.addr) {
      fetchInbox()
    }
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

        transaction(adminAcct: Address, quantity: Int) {
            let centralizedInboxRef: &Inbox.CentralizedInbox{Inbox.Public}
            let packCollectionRef: &Pack.Collection{NonFungibleToken.Receiver}
            let length: Int
            let IDs: [UInt64]

            prepare(acct: AuthAccount) {

                self.centralizedInboxRef = getAccount(adminAcct).getCapability(Inbox.CentralizedInboxPublicPath)
                .borrow<&Inbox.CentralizedInbox{Inbox.Public}>()
                ?? panic("Could not get Centralized Inbox reference")

                self.IDs = self.centralizedInboxRef.getIDs(wallet: acct.address)!

                self.length = self.IDs.length

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
                
                var i = 0
                if (self.length < quantity) {
                    while i < self.length {
                        self.centralizedInboxRef.claimMail(recipient: self.packCollectionRef, id: self.IDs[i])
                        i = i + 1
                    } 
                } else {
                    while i < quantity {
                        self.centralizedInboxRef.claimMail(recipient: self.packCollectionRef, id: self.IDs[i])
                        i = i + 1
                    }
                }
                
                
            }

        }
        `),
        args([
          arg(process.env.NEXT_PUBLIC_INBOX_ADDRESS, t.Address),
          arg(500, t.Int),
        ]), //Admin Account on testnet
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
        import Pack from 0xPack

        pub fun main(adminAcct: Address, wallet: Address): [&Pack.NFT{Pack.Public}]? {

            let centralizedInboxRef = getAccount(adminAcct).getCapability(Inbox.CentralizedInboxPublicPath)
                .borrow<&Inbox.CentralizedInbox{Inbox.Public}>()
                ?? panic("Could not get Centralized Inbox reference")

            let IDs = centralizedInboxRef.getIDs(wallet: wallet)

            var packs: [&Pack.NFT{Pack.Public}] = []

            var i = 0

            if (IDs != nil) {
              for id in IDs! {
                let pack = centralizedInboxRef.borrowPack(wallet: wallet, id: id)!
                packs.append(pack)
              }
            }

            return packs

        }
        `,

        args: (arg: any, t: any) => [
          arg(process.env.NEXT_PUBLIC_INBOX_ADDRESS, t.Address), // Admin Centralized Inbox
          arg(user?.addr, t.Address),
        ],
      })
      setCentralizedInbox(res)
      // console.log("use-user-inbox.hook.ts: fetchInbox()")
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
