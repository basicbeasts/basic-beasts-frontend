import type { NextPage } from "next"
import HeaderDark from "@components/ui/HeaderDark"
import MyCollection from "@components/ui/MyCollection"
import BeastList from "@components/ui/BeastList"
import { useUser } from "@components/user/UserProvider"
import styled from "styled-components"

const Container = styled.div`
  border: solid 25px #111111;
  border-bottom: 0px;
  border-left: 0px;
  border-right: 0px;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
`

const Collection: NextPage = () => {
  const { userBeasts } = useUser()

  return (
    <Container>
      <HeaderDark
        title="My Beast Collection"
        description="See your magnificent Beasts"
      />
      <MyCollection />
    </Container>
  )
}

export default Collection
