import type { NextPage } from "next"
import HeaderDark from "@components/ui/HeaderDark"
import MyCollection from "@components/ui/MyCollection"
import BeastList from "@components/ui/BeastList"
import { useUser } from "@components/user/UserProvider"

const Collection: NextPage = () => {
  const { userBeasts } = useUser()

  return (
    <div>
      <HeaderDark
        title="My Beast Collection"
        description="See your magnificent Beasts"
      />
      <MyCollection />
    </div>
  )
}

export default Collection
