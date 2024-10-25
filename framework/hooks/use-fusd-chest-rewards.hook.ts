import { useEffect, useReducer, useState } from "react"
import { GET_COLLECTION_OWNED_BEASTS } from "flow/scripts/script.get-collection-owned-beasts"
import { defaultReducer } from "reducer/defaultReducer"
import BeastClass from "utils/BeastClass"
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
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export default function useFUSDChestRewards() {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null,
  })

  useEffect(() => {
    getClaimedFUSDRewards()
  }, [])

  const [claimedFUSDRewards, setClaimedFUSDRewards] = useState([])

  const getClaimedFUSDRewards = async () => {
    try {
      let response = await query({
        cadence: `
        import TreasureChestFUSDReward from 0xTreasureChestFUSDReward
        
        access(all) fun main(adminAcct: Address): [UInt64] {
          let centralizedInboxRef = getAccount(adminAcct).getCapability(TreasureChestFUSDReward.CentralizedInboxPublicPath)
        .borrow<&TreasureChestFUSDReward.CentralizedInbox{TreasureChestFUSDReward.Public}>()
        ?? panic("Could not get Centralized Inbox reference")

          return centralizedInboxRef.getClaimed().keys
        }
        `,
        args: (arg: any, t: any) => [
          arg(
            process.env.NEXT_PUBLIC_NFT_DAY_TREASURE_CHEST_ADDRESS,
            t.Address,
          ),
        ],
      })
      setClaimedFUSDRewards(response)
    } catch (err) {
      console.log(err)
    }
  }

  return {
    ...state,
    getClaimedFUSDRewards,
    claimedFUSDRewards,
  }
}
