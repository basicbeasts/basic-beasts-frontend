import type { NextPage } from "next"
import HeaderDark from "@components/ui/HeaderDark"
import RankingList from "@components/ui/RankingList"
import { useUser } from "@components/user/UserProvider"

// TODO: highlight ranking list row if user has connected wallet to easier find themselves

const Rankings: NextPage = () => {
  const { hunterData } = useUser()

  return (
    <div>
      <HeaderDark title="Rankings" description="The top Beast Hunters at BB" />
      {hunterData != null ? (
        <>
          <RankingList hunterData={hunterData} />
        </>
      ) : (
        ""
      )}
    </div>
  )
}

export default Rankings
