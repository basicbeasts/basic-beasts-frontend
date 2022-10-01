import { useEffect, useReducer, useState } from "react"
import { GET_COLLECTION_OWNED_BEASTS } from "flow/scripts/script.get-collection-owned-beasts"
import { defaultReducer } from "reducer/defaultReducer"
import BeastClass from "utils/BeastClass"
import { query } from "@onflow/fcl"

export default function useChestSales() {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null,
  })

  const [floorPrice, setFloorPrice] = useState(0.0)

  useEffect(() => {
    getAllChestSaleOffers()
  }, [])

  const getAllChestSaleOffers = async () => {
    dispatch({ type: "PROCESSING" })
    try {
      let res = await query({
        cadence: `
        import FungibleToken from 0xFungibleToken
        import NonFungibleToken from 0xNonFungibleToken
        import FUSD from 0xFUSD
        import BlackMarketplace from 0xBlackMarketplace
        import NFTDayTreasureChest from 0xNFTDayTreasureChest

        // This script returns the available chest sales
        pub fun main() : {Address:{UInt64: UFix64}} {

            let addresses = BlackMarketplace.getSellers()

            var saleOffers: {Address:{UInt64: UFix64}} = {}

            for address in addresses {
                let account = getAccount(address)
                var addressSaleOffers: {UInt64: UFix64} = {}

                let saleCollection = account.getCapability(BlackMarketplace.CollectionPublicPath).borrow<&{BlackMarketplace.SalePublic}>() 
                if(saleCollection != nil) {
                    let IDs = saleCollection!.getIDs()
                    for id in IDs {
                        addressSaleOffers[id] = saleCollection!.idPrice(tokenID: id)
                    }
                    saleOffers[address] = addressSaleOffers
                }
            }

            return saleOffers

        }
        `,
      })
      let sales: any[] = []
      // let sales: any[] = [
      //   { address: "0x", id: "1", price: 5.0 },
      //   { address: "0x", id: "1", price: 1.0 },
      //   { address: "0x", id: "1", price: 7.0 },
      // ]

      for (let address in res) {
        const saleOffers = res[address]
        const keys = Object.keys(saleOffers)
        for (let key in keys) {
          var id = keys[key]
          var price = saleOffers[id]
          var newSaleOffer = {
            address: address,
            id: id,
            price: price,
          }
          sales.push(newSaleOffer)
        }
      }
      sales.sort((a: any, b: any) => a.price - b.price)
      if (sales.length > 0) {
        setFloorPrice(sales[0].price)
      }
      dispatch({ type: "SUCCESS", payload: sales })
    } catch (err) {
      dispatch({ type: "ERROR" })
      console.log(err)
    }
  }

  return {
    ...state,
    getAllChestSaleOffers,
    floorPrice,
  }
}
