import type { NextPage } from "next"
import HeaderDark from "@components/ui/HeaderDark"
import MyCollection from "@components/ui/MyCollection"
import BeastList from "@components/ui/BeastList"
import { useUser } from "@components/user/UserProvider"
import styled from "styled-components"
import { useAuth } from "@components/auth/AuthProvider"

const Container = styled.div`
  /* border: solid 25px #111111;
  border-bottom: 0px;
  border-left: 0px;
  border-right: 0px; */
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
`

const Collection: NextPage = () => {
  const { user } = useAuth()

  return (
    <Container>
      {user.addr ? (
        <>
          <HeaderDark
            title="My Beast Collection"
            description="See your magnificent Beasts"
          />
          <MyCollection />
        </>
      ) : (
        <HeaderDark
          title="Login to continue"
          description="See your magnificent Beasts"
        />
      )}
    </Container>
  )
}

export default Collection
