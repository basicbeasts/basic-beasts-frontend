import type { NextPage } from "next"
import HeaderDark from "@components/ui/HeaderDark"
import MyCollection from "@components/ui/MyCollection"
import DefaultHeroSection from "@components/ui/DefaultHeroSection"
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
          {/*
          {user.addr == "0x4065d1f7f1e3388c" ? (
            <DefaultHeroSection
              title="You have packs reserved"
              description="You didn't win the shiny gold draw but your order has been reserved for the next drop. You are guaranteed packs."
            />
          ) : (
            <></>
          )}
          {[
            "0x4742010dbfe107da",
            "0x01d63aa89238a559",
            "0x0bbfa46ca43d28a0",
            "0x0eb72c6284442bf4",
            "0x4f30c4082e0b8b27",
            "0x58bbc728329a01b7",
            "0x5a16175a09403578",
            "0x6ba1f6ffafcc3a56",
            "0x7aeb7853c084e2a3",
          ].includes(user.addr) ? (
            <DefaultHeroSection
              title="You unlocked the 'Double Down' achievement"
              description="You have unlocked the secret 'Double Down' achievement for participating in both drops. You have been rewarded 2x packs!"
            />
          ) : (
            <></>
          )} */}
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
