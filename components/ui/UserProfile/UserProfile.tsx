import React, { FC, useState } from "react"
import styled from "styled-components"
import ProfileCard from "../ProfileCard"
import ProfileTabs from "../ProfileTabs"
//import beasts from "data/beast-collection-dummy-data"
import { useAuth } from "@components/auth/AuthProvider"
import { query } from "@onflow/fcl"
import { AnyNode } from "postcss"

const Container = styled.div`
  margin-top: 180px;
  background: #212127;
`

const Wrapper = styled.div`
  max-width: 80%;
  margin: 100px auto 0;
  display: flex;
  @media (max-width: 1024px) {
    max-width: 100%;
    margin: 20px auto 0;
  }
`

const LeftColumn = styled.div`
  /* background: black; */
  /* padding: 0 80px; */
  padding: 0 60px 0 0;
  @media (max-width: 1024px) {
    display: none;
  }
`

const RightColumn = styled.div`
  //background: black;
  width: 100%;
  overflow: hidden;
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
  lovePotionBalance: any
  newBeast: any
  setNewBeast: any
  newTokens: any
  setNewTokens: any
  fetchUserBeasts: any
  hunterScore: any
  dexicon: any
  userAddr: any
  profile: any
  profilePicture: any
  setProfilePicture: any
  getProfile: any
  evolvableBeasts: any
  allEvolutionPairs: any
  getPersonalDexicon: any
  walletAddress: any
}

const UserProfile: FC<FuncProps> = ({
  toggle,
  selectPackType,
  packCount,
  beasts,
  sushiBalance,
  emptyPotionBottleBalance,
  poopBalance,
  lovePotionBalance,
  newBeast,
  setNewBeast,
  newTokens,
  setNewTokens,
  fetchUserBeasts,
  hunterScore,
  dexicon,
  userAddr,
  profile,
  profilePicture,
  setProfilePicture,
  getProfile,
  evolvableBeasts,
  allEvolutionPairs,
  getPersonalDexicon,
  walletAddress,
}) => {
  const [filter, setFilter] = useState<
    "beast collection" | "items" | "packs" | "eggs"
  >("beast collection")

  return (
    <Container>
      <MobileProfileCardWrapper>
        <ProfileCard
          hunterScore={hunterScore}
          dexicon={dexicon}
          profile={profile}
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
          userAddr={userAddr}
          getProfile={getProfile}
          walletAddress={walletAddress}
        />
      </MobileProfileCardWrapper>
      <Wrapper>
        <LeftColumn>
          <ProfileCard
            hunterScore={hunterScore}
            dexicon={dexicon}
            profile={profile}
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
            userAddr={userAddr}
            getProfile={getProfile}
            walletAddress={walletAddress}
          />
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
            lovePotionBalance={lovePotionBalance}
            newBeast={newBeast}
            setNewBeast={setNewBeast}
            newTokens={newTokens}
            setNewTokens={setNewTokens}
            fetchUserBeasts={fetchUserBeasts}
            userAddr={userAddr}
            evolvableBeasts={evolvableBeasts}
            allEvolutionPairs={allEvolutionPairs}
            getPersonalDexicon={getPersonalDexicon}
            walletAddress={walletAddress}
          />
        </RightColumn>
      </Wrapper>
    </Container>
  )
}
export default UserProfile
