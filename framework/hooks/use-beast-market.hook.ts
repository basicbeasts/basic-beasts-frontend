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

  const purchaseBeast = async (beastID: number) => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
        import 
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
      //   fetchInbox()
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

  return {
    ...state,
    // getAllChestSaleOffers,
    // floorPrice,
  }
}
