import type { NextPage } from "next"
import ComingSoon from "@components/ui/ComingSoon"
import BeastList from "@components/ui/BeastList"
import { useUser } from "@components/user/UserProvider"

const Collection: NextPage = () => {
  const { userBeasts, fetchUserBeasts } = useUser()

  return (
    <div>
      <ComingSoon
        title="Collection"
        description="The collection shows the Beasts you own"
      />
      <button onClick={() => fetchUserBeasts()}>update</button>
      <BeastList beasts={userBeasts} />
    </div>
  )
}

export default Collection
