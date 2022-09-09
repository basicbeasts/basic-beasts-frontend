import { useEffect, useReducer, useCallback } from "react"
import { defaultReducer } from "reducer/defaultReducer"
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
import * as FlowTypes from "@onflow/types"
import profiles from "data/profiles"
import profilePictures from "data/profilePictures"

export default function useHunterData() {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null,
  })

  useEffect(() => {
    fetchHunterData()
    //eslint-disable-next-line
  }, [])

  // Script - Read Hunter Scores of all NFT holders
  const fetchAllHunterScores = async () => {
    try {
      let res = await query({
        cadence: `
        import HunterScore from 0xHunterScore

        pub fun main(): {Address: UInt32} {
          return HunterScore.getHunterScores()
        }
        `,
      })
      console.log("use-hunter-data.hook: fetchAllHunterScores()")
      return res
    } catch (error) {
      dispatch({ type: "ERROR" })
      console.log(error)
    }
  }

  // Script - Read All Beasts collected by each NFT holder
  const fetchAllBeastsCollected = async () => {
    try {
      let res = await query({
        cadence: `
        import HunterScore from 0xHunterScore

        pub fun main(): {Address: [UInt64]} {
          return HunterScore.getAllBeastsCollected()
        }
        `,
      })
      console.log("use-hunter-data.hook: fetchAllBeastsCollected()")
      return res
    } catch (error) {
      dispatch({ type: "ERROR" })
      console.log(error)
    }
  }

  const fetchHunterData = async () => {
    dispatch({ type: "PROCESSING" })

    var beastsCollected: any = null
    await fetchAllBeastsCollected().then((response: any) => {
      beastsCollected = response
    })

    var hunterScores: any = null
    await fetchAllHunterScores().then((response: any) => {
      hunterScores = response
    })

    var hunterData: any = []
    var addresses = Object.keys(beastsCollected)
    for (let item in addresses) {
      let address = addresses[item]
      // Check for .find profile name
      var name = address.slice(0, 6).concat("...").concat(address.slice(-4))
      if (profiles[address as keyof typeof profiles] != null) {
        if (profiles[address as keyof typeof profiles].name != null) {
          name = profiles[address as keyof typeof profiles].name
        }
      }
      var hunter = {
        address: address,
        numberOfBeastsCollected: beastsCollected[address].length,
        hunterScore: hunterScores[address],
        name: name,
      }
      hunterData.push(hunter)
    }

    // assign rank by hunter score
    hunterData.sort((a: any, b: any) => b.hunterScore - a.hunterScore)
    var hunterDataRanked: any = []
    var rank = 1
    for (let item in hunterData) {
      let data = hunterData[item]
      var updatedHunter = {
        address: data.address,
        numberOfBeastsCollected: data.numberOfBeastsCollected,
        hunterScore: data.hunterScore,
        name: data.name,
        rankByHunterScore: rank,
      }
      hunterDataRanked.push(updatedHunter)
      rank = rank + 1
    }

    // assign rank by hunter score
    hunterDataRanked.sort(
      (a: any, b: any) => b.numberOfBeastsCollected - a.numberOfBeastsCollected,
    )
    var hunterDataRankedByTotalBeasts: any = []
    var rankByTotalBeasts = 1
    for (let item in hunterDataRanked) {
      let data = hunterDataRanked[item]
      //check avatar
      var avatar = profilePictures[1].image

      if (profiles[data.address as keyof typeof profiles] != null) {
        for (let key in profilePictures) {
          let picture =
            profilePictures[key as unknown as keyof typeof profilePictures]
              .image
          if (
            profiles[data.address as keyof typeof profiles].image == picture
          ) {
            avatar = picture
          }
        }
      }

      //
      var newHunter = {
        address: data.address,
        numberOfBeastsCollected: data.numberOfBeastsCollected,
        hunterScore: data.hunterScore,
        name: data.name,
        rankByHunterScore: data.rankByHunterScore,
        rankByTotalBeasts: rankByTotalBeasts,
        avatar: avatar,
      }
      hunterDataRankedByTotalBeasts.push(newHunter)
      rankByTotalBeasts = rankByTotalBeasts + 1
    }

    // setHunterData(hunterDataRankedByTotalBeasts)

    dispatch({ type: "SUCCESS", payload: hunterDataRankedByTotalBeasts })
  }

  return {
    ...state,
    fetchHunterData,
  }
}
