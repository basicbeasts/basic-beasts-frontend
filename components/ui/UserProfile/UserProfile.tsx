import React, { FC, useState } from "react"
import styled from "styled-components"
import ProfileCard from "../ProfileCard"
import ProfileTabs from "../ProfileTabs"
//import beasts from "data/beast-collection-dummy-data"
import { useAuth } from "@components/auth/AuthProvider"
import { query } from "@onflow/fcl"
import { AnyNode } from "postcss"

const Container = styled.div`
  margin-top: 150px;
  background: #212127;
`

const Wrapper = styled.div`
  max-width: 80%;
  margin: 100px auto 0;
  display: flex;
  @media (max-width: 1024px) {
    max-width: 100%;
    margin: none;
  }
`

const LeftColumn = styled.div`
  /* background: black; */
  padding: 0 80px;
  @media (max-width: 1024px) {
    display: none;
  }
`

const RightColumn = styled.div`
  //background: black;
  width: 100%;
`

const MobileProfileCardWrapper = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: block;
  }
`

type FuncProps = {
  toggle: () => void
  selectPackType: any
  packCount: any
  beasts: any
  sushiBalance: any
  emptyPotionBottleBalance: any
  poopBalance: any
  newBeast: any
  setNewBeast: any
  newTokens: any
  setNewTokens: any
  fetchUserBeasts: any
  hunterScore: any
  dexicon: any
}

const UserProfile: FC<FuncProps> = ({
  toggle,
  selectPackType,
  packCount,
  beasts,
  sushiBalance,
  emptyPotionBottleBalance,
  poopBalance,
  newBeast,
  setNewBeast,
  newTokens,
  setNewTokens,
  fetchUserBeasts,
  hunterScore,
  dexicon,
}) => {
  const [filter, setFilter] = useState<"beast collection" | "items" | "packs">(
    "beast collection",
  )

  return (
    <Container>
      <MobileProfileCardWrapper>
        <ProfileCard hunterScore={hunterScore} dexicon={dexicon} />
      </MobileProfileCardWrapper>
      <Wrapper>
        <LeftColumn>
          <ProfileCard hunterScore={hunterScore} dexicon={dexicon} />
        </LeftColumn>
        <RightColumn>
          <ProfileTabs
            filter={filter}
            selectFilter={setFilter}
            beasts={beasts}
            toggle={toggle}
            selectPackType={selectPackType}
            packCount={packCount}
            sushiBalance={sushiBalance}
            emptyPotionBottleBalance={emptyPotionBottleBalance}
            poopBalance={poopBalance}
            newBeast={newBeast}
            setNewBeast={setNewBeast}
            newTokens={newTokens}
            setNewTokens={setNewTokens}
            fetchUserBeasts={fetchUserBeasts}
          />
        </RightColumn>
      </Wrapper>
    </Container>
  )
}
export default UserProfile
