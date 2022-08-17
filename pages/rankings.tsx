import type { NextPage } from "next"
import HeaderDark from "@components/ui/HeaderDark"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { useAuth } from "@components/auth/AuthProvider"
import { query } from "@onflow/fcl"
import RankingList from "@components/ui/RankingList"
import profiles from "data/profiles"

// TODO: highlight ranking list row if user has connected wallet to easier find themselves
// Add check leaderboard rank on profile page

const Rankings: NextPage = () => {
  const [hunterData, setHunterData] = useState<any>()
  const [allHunterScores, setAllHunterScores] = useState<any>()
  const [allBeastsCollected, setAllBeastsCollected] = useState<any>()

  useEffect(() => {
    fetchHunterData()
  }, [])

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
      return res
    } catch (error) {
      console.log(error)
    }
  }

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
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const fetchHunterData = async () => {
    var beastsCollected: any = null
    await fetchAllBeastsCollected().then((response: any) => {
      beastsCollected = response
    })
    setAllBeastsCollected(beastsCollected)

    var hunterScores: any = null
    await fetchAllHunterScores().then((response: any) => {
      hunterScores = response
    })
    setAllHunterScores(hunterScores)

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
      var newHunter = {
        address: data.address,
        numberOfBeastsCollected: data.numberOfBeastsCollected,
        hunterScore: data.hunterScore,
        name: data.name,
        rankByHunterScore: data.rankByHunterScore,
        rankByTotalBeasts: rankByTotalBeasts,
      }
      hunterDataRankedByTotalBeasts.push(newHunter)
      rankByTotalBeasts = rankByTotalBeasts + 1
    }

    setHunterData(hunterDataRankedByTotalBeasts)
  }

  return (
    <div>
      <HeaderDark title="Rankings" description="The top Beast Hunters at BB" />
      {allHunterScores != null && allBeastsCollected != null ? (
        <>
          <RankingList
            allHunterScores={allHunterScores}
            allBeastsCollected={allBeastsCollected}
            hunterData={hunterData}
          />
          {/* <div>Hunter Scores</div>
          <pre>{JSON.stringify(allHunterScores, null, 2)}</pre>
          <div>All Beasts Collected</div>
          <pre>{JSON.stringify(allBeastsCollected, null, 2)}</pre>
          {allBeastsCollected["0x805727b65285a84d"] != null ? (
            <pre>
              {JSON.stringify(
                allBeastsCollected["0x805727b65285a84d"].length,
                null,
                2,
              )}
            </pre>
          ) : (
            ""
          )} */}
        </>
      ) : (
        ""
      )}
      {/* {hunterData != null ? (
        <>
          <div>Hunter Data</div>
          <pre>{JSON.stringify(hunterData, null, 2)}</pre>
        </>
      ) : (
        ""
      )} */}
    </div>
  )
}

export default Rankings
