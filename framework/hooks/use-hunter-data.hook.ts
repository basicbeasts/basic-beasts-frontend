import { useEffect, useReducer, useState } from "react"
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

  const [findNames, setFindNames] = useState(null)

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
      // console.log("use-hunter-data.hook: fetchAllHunterScores()")
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
      // console.log("use-hunter-data.hook: fetchAllBeastsCollected()")
      return res
    } catch (error) {
      dispatch({ type: "ERROR" })
      console.log(error)
    }
  }

  const getAllFindProfiles = async (addresses: any) => {
    try {
      let res = await query({
        cadence: `
        import Profile from 0xProfile

        pub fun main(addresses: [Address]) : {Address: Profile.UserProfile} {
            var profiles: {Address: Profile.UserProfile} = {}
            for address in addresses {
                let user = getAccount(address)
                    .getCapability<&{Profile.Public}>(Profile.publicPath)
                    .borrow()?.asProfile()
                if (user != nil) {
                    profiles[user?.address!] = user
                }
            }
            return profiles
        }
        
        
        `,
        args: (arg: any, t: any) => [arg(addresses, t.Array(t.Address))],
      })
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
    var addresses: any = []
    if (beastsCollected != null) {
      addresses = Object.keys(beastsCollected)
    }

    var findProfiles: any = null
    await getAllFindProfiles(addresses).then((response: any) => {
      findProfiles = response
    })

    var findNames: any = {}

    for (let item in addresses) {
      let address = addresses[item]

      // Check for .find profile name and avatar
      // First initiate name to shortened wallet address
      var name = address.slice(0, 6).concat("...").concat(address.slice(-4))
      var findName = ""

      if (findProfiles[address] != null) {
        if (findProfiles[address].name != "") {
          name = findProfiles[address].name
        }
        if (findProfiles[address].findName != "") {
          name = findProfiles[address].findName + ".find"
          findName = name
          findNames[findName] = address
        }
      }

      // Check for .find default .find name
      //var findName

      var hunter = {
        address: address,
        numberOfBeastsCollected: beastsCollected[address].length,
        hunterScore: hunterScores[address],
        name: name,
        findName: findName,
      }
      hunterData.push(hunter)
    }

    setFindNames(findNames)
    // console.log("findNames", findNames)

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
        findName: data.findName,
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

      if (findProfiles[data.address] != null) {
        for (let key in profilePictures) {
          let picture =
            profilePictures[key as unknown as keyof typeof profilePictures]
              .image
          if (findProfiles[data.address].avatar == picture) {
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
        findName: data.findName,
        rankByHunterScore: data.rankByHunterScore,
        rankByTotalBeasts: rankByTotalBeasts,
        avatar: avatar,
      }
      hunterDataRankedByTotalBeasts.push(newHunter)
      rankByTotalBeasts = rankByTotalBeasts + 1
    }

    // setHunterData(hunterDataRankedByTotalBeasts)
    hunterDataRankedByTotalBeasts.sort(
      (a: any, b: any) => b.rankByHunterScore - a.rankByHunterScore,
    )

    // console.log("hunterData", hunterDataRankedByTotalBeasts)

    // console.log(
    //   "hunterData",
    //   hunterDataRankedByTotalBeasts.filter(
    //     (hunter: any) => hunter.address == "0x9b4180f13bbc9e4d",
    //   )?.[0],
    // )

    dispatch({ type: "SUCCESS", payload: hunterDataRankedByTotalBeasts })
  }

  return {
    ...state,
    fetchHunterData,
    findNames,
  }
}
