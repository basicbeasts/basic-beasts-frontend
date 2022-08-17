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

  const { user } = useAuth()

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
      setAllHunterScores(res)
      console.log("all hunter scores" + res)
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
      setAllBeastsCollected(res)
      console.log("all beast collected" + res)
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
    console.log(hunterData)
    setHunterData(hunterData)
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
          <div>Hunter Scores</div>
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
          )}
        </>
      ) : (
        ""
      )}
      {hunterData != null ? (
        <>
          <div>Hunter Data</div>
          <pre>{JSON.stringify(hunterData, null, 2)}</pre>
        </>
      ) : (
        ""
      )}
    </div>
  )
}

export default Rankings
