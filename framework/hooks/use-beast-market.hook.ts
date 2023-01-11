import { useEffect, useReducer, useState } from "react"
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

import { toastStatus } from "../helpers/toastStatus"

export default function useBeastMarket() {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null,
  })

  //   const [floorPrice, setFloorPrice] = useState(0.0)

  useEffect(() => {
    // getAllChestSaleOffers()
  }, [])

  //   const getAllChestSaleOffers = async () => {
  //     dispatch({ type: "PROCESSING" })
  //     try {
  //       let res = await query({
  //         cadence: `
  //         import FungibleToken from 0xFungibleToken
  //         import NonFungibleToken from 0xNonFungibleToken
  //         import FUSD from 0xFUSD
  //         import BlackMarketplace from 0xBlackMarketplace
  //         import NFTDayTreasureChest from 0xNFTDayTreasureChest

  //         // This script returns the available chest sales
  //         pub fun main() : {Address:{UInt64: UFix64}} {

  //             let addresses = BlackMarketplace.getSellers()

  //             var saleOffers: {Address:{UInt64: UFix64}} = {}

  //             for address in addresses {
  //                 let account = getAccount(address)
  //                 var addressSaleOffers: {UInt64: UFix64} = {}

  //                 let saleCollection = account.getCapability(BlackMarketplace.CollectionPublicPath).borrow<&{BlackMarketplace.SalePublic}>()
  //                 if(saleCollection != nil) {
  //                     let IDs = saleCollection!.getIDs()
  //                     for id in IDs {
  //                         addressSaleOffers[id] = saleCollection!.idPrice(tokenID: id)
  //                     }
  //                     saleOffers[address] = addressSaleOffers
  //                 }
  //             }

  //             return saleOffers

  //         }
  //         `,
  //       })
  //       let sales: any[] = []
  //       // let sales: any[] = [
  //       //   { address: "0x", id: "1", price: 5.0 },
  //       //   { address: "0x", id: "1", price: 1.0 },
  //       //   { address: "0x", id: "1", price: 7.0 },
  //       // ]

  //       for (let address in res) {
  //         const saleOffers = res[address]
  //         const keys = Object.keys(saleOffers)
  //         for (let key in keys) {
  //           var id = keys[key]
  //           var price = saleOffers[id]
  //           var newSaleOffer = {
  //             address: address,
  //             id: id,
  //             price: price,
  //           }
  //           sales.push(newSaleOffer)
  //         }
  //       }
  //       sales.sort((a: any, b: any) => a.price - b.price)
  //       if (sales.length > 0) {
  //         setFloorPrice(sales[0].price)
  //       }
  //       dispatch({ type: "SUCCESS", payload: sales })
  //     } catch (err) {
  //       dispatch({ type: "ERROR" })
  //       console.log(err)
  //     }
  //   }

  const purchaseBeast = async (
    address: String,
    beastID: number,
    purchaseAmount: number,
  ) => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
          import FungibleToken from 0xFungibleToken
          import FUSD from 0xFUSD
          import BasicBeasts from 0xBasicBeasts
          import BeastMarket from 0xBeastMarket

          transaction(sellerAddress: Address, beastID: UInt64, purchaseAmount: UFix64) {
              prepare(acct: AuthAccount) {
                  // borrow a reference to the signer's collection
                  let collection = acct.borrow<&BasicBeasts.Collection>(from: BasicBeasts.CollectionStoragePath)
                      ?? panic("Could not borrow reference to the Beast Collection")

                  // borrow a reference to the signer's fusd token Vault
                  let provider = acct.borrow<&FUSD.Vault{FungibleToken.Provider}>(from: /storage/fusdVault)!
                  
                  // withdraw tokens from the signer's vault
                  let tokens <- provider.withdraw(amount: purchaseAmount) as! @FUSD.Vault

                  // get the seller's public account object
                  let seller = getAccount(sellerAddress)

                  // borrow a public reference to the seller's sale collection
                  let saleCollection = seller.getCapability(BeastMarket.CollectionPublicPath)
                      .borrow<&BeastMarket.SaleCollection{BeastMarket.SalePublic}>()
                      ?? panic("Could not borrow public sale reference")
              
                  // purchase the moment
                  let purchasedBeast <- saleCollection.purchase(tokenID: beastID, buyTokens: <-tokens, buyer: acct.address)

                  // deposit the purchased moment into the signer's collection
                  collection.deposit(token: <-purchasedBeast)
              }

          }

        `),
        args([
          arg(address, t.Address),
          arg(beastID, t.UInt64),
          arg(purchaseAmount, t.UFix64),
        ]),
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
      // Add getters here
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

  const purchaseManyBeasts = async (beastIDs: number[]) => {}

  const listBeastForSale = async (
    address: String,
    beastID: number,
    purchaseAmount: number,
  ) => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
          import FungibleToken from 0xFungibleToken
          import FUSD from 0xFUSD
          import BasicBeasts from 0xBasicBeasts
          import BeastMarket from 0xBeastMarket

          transaction(beastID: UInt64, price: UFix64) {

              prepare(acct: AuthAccount) {
                  // check for FUSD vault
                  if acct.borrow<&FUSD.Vault>(from: /storage/fusdVault) == nil {
                      // Create a new FUSD Vault and put it in storage
                      acct.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)

                      // Create a public capability to the Vault that only exposes
                      // the deposit function through the Receiver interface
                      acct.link<&FUSD.Vault{FungibleToken.Receiver}>(
                          /public/fusdReceiver,
                          target: /storage/fusdVault
                      )

                      // Create a public capability to the Vault that only exposes
                      // the balance field through the Balance interface
                      acct.link<&FUSD.Vault{FungibleToken.Balance}>(
                          /public/fusdBalance,
                          target: /storage/fusdVault
                      )
                  }

                  // check to see if a sale collection already exists
                  if acct.borrow<&BeastMarket.SaleCollection>(from: BeastMarket.CollectionStoragePath) == nil {
                      // get the fungible token capabilities for the owner and beneficiary
                      let ownerCapability = acct.getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver)

                      let ownerCollection = acct.link<&BasicBeasts.Collection>(BasicBeasts.CollectionPrivatePath, target: BasicBeasts.CollectionStoragePath)!

                      // create a new sale collection
                      let saleCollection <- BeastMarket.createSaleCollection(ownerCollection: ownerCollection, ownerCapability: ownerCapability)
                      
                      // save it to storage
                      acct.save(<-saleCollection, to: BeastMarket.CollectionStoragePath)
                  
                      // create a public link to the sale collection
                      acct.link<&BeastMarket.SaleCollection{BeastMarket.SalePublic}>(BeastMarket.CollectionPublicPath, target: BeastMarket.CollectionStoragePath)
                  }

                  // borrow a reference to the sale
                  let saleCollection = acct.borrow<&BeastMarket.SaleCollection>(from: BeastMarket.CollectionStoragePath)
                      ?? panic("Could not borrow from sale in storage")
                  
                  // put the beast up for sale
                  saleCollection.listForSale(tokenID: beastID, price: price)
                  
              }
          }

        `),
        args([
          arg(address, t.Address),
          arg(beastID, t.UInt64),
          arg(purchaseAmount, t.UFix64),
        ]),
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
      // Add getters here
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

  return {
    ...state,
    purchaseBeast,
    listBeastForSale,
  }
}
