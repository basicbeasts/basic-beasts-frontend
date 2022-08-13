import type { NextPage } from "next"
import HeaderDark from "@components/ui/HeaderDark"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { useAuth } from "@components/auth/AuthProvider"
import { query } from "@onflow/fcl"

const Rankings: NextPage = () => {
  const [allHunterScores, setAllHunterScores] = useState()
  const [allBeastsCollected, setAllBeastsCollected] = useState<any>()

  const { user } = useAuth()

  useEffect(() => {
    if (user?.addr != null) {
      fetchAllHunterScores()
      fetchAllBeastsCollected()
    }
  }, [user?.addr])

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
      setAllBeastsCollected(res)
      console.log("all beast collected" + res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <HeaderDark title="Rankings" description="The top Beast Hunters at BB" />
      <div>Hunter Scores</div>
      <pre>{JSON.stringify(allHunterScores, null, 2)}</pre>
      <div>All Beasts Collected</div>
      <pre>
        {JSON.stringify(
          allBeastsCollected["0x805727b65285a84d"].length,
          null,
          2,
        )}
      </pre>
    </div>
  )
}

export default Rankings
