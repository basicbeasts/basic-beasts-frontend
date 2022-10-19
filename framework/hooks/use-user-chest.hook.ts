import { useEffect, useReducer, useState } from "react"
import { GET_COLLECTION_OWNED_BEASTS } from "flow/scripts/script.get-collection-owned-beasts"
import { defaultReducer } from "reducer/defaultReducer"
import BeastClass from "utils/BeastClass"
import { query } from "@onflow/fcl"

export default function useUserChests(user: any) {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: [],
  })

  const [chestIDs, setChestIDs] = useState([])
  const [saleIDs, setSaleIDs] = useState([])
  const [totalUserChests, setTotalUserChests] = useState(0)

  useEffect(() => {
    if (user?.addr != null) {
      fetchUserChests()
    }
  }, [user?.addr])

  const getUserChestCollection = async () => {
    dispatch({ type: "PROCESSING" })

    try {
      let response = await query({
        cadence: `
        import NFTDayTreasureChest from 0xNFTDayTreasureChest
        
        pub fun main(address: Address) : [UInt64] {
            let account = getAccount(address)
        
            var IDs: [UInt64] = []
        
            let collectionRef = account.getCapability(NFTDayTreasureChest.CollectionPublicPath).borrow<&{NFTDayTreasureChest.NFTDayTreasureChestCollectionPublic}>() 
        
            if(collectionRef != nil) {
                IDs = collectionRef!.getIDs()
            }
            
            return IDs
        
        }`,
        args: (arg: any, t: any) => [arg(user?.addr, t.Address)],
      })
      dispatch({ type: "SUCCESS" })
      return response
    } catch (err) {
      dispatch({ type: "ERROR" })
      console.log(err)
    }
  }

  const getUserSaleCollection = async () => {
    dispatch({ type: "PROCESSING" })

    try {
      let response = await query({
        cadence: `
        import BlackMarketplace from 0xBlackMarketplace

        pub fun main(address: Address) : [UInt64] {
            let account = getAccount(address)

            var IDs: [UInt64] = []

            let collectionRef = account.getCapability(BlackMarketplace.CollectionPublicPath).borrow<&{BlackMarketplace.SalePublic}>() 

            if(collectionRef != nil) {
                IDs = collectionRef!.getIDs()
            }
            return IDs
        }
        `,
        args: (arg: any, t: any) => [arg(user?.addr, t.Address)],
      })
      dispatch({ type: "SUCCESS" })
      return response
    } catch (err) {
      dispatch({ type: "ERROR" })
      console.log(err)
    }
  }

  const fetchUserChests = async () => {
    dispatch({ type: "PROCESSING" })

    var chestCollection: any = []
    await getUserChestCollection().then((response: any) => {
      chestCollection = response
    })
    setChestIDs(chestCollection)

    var saleCollection: any = []
    await getUserSaleCollection().then((response: any) => {
      saleCollection = response
    })
    setSaleIDs(saleCollection)

    var total = chestCollection?.length + saleCollection?.length

    setTotalUserChests(total)
  }

  return {
    ...state,
    getUserChestCollection,
    getUserSaleCollection,
    chestIDs,
    saleIDs,
    totalUserChests,
    fetchUserChests,
  }
}
