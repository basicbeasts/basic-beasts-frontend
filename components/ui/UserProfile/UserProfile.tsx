import React, { FC, useState } from "react"
import styled from "styled-components"
import ProfileCard from "../ProfileCard"
import ProfileTabs from "../ProfileTabs"
import beasts from "data/beast-collection-dummy-data"

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

const UserProfile: FC = () => {
  const [selectedBeast, setSelectedBeast] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [selectedPack, setSelectedPack] = useState<string | null>(null)
  const [filter, setFilter] = useState<"beast collection" | "items" | "packs">(
    "beast collection",
  )

  return (
    <Container>
      <MobileProfileCardWrapper>
        <ProfileCard />
      </MobileProfileCardWrapper>
      <Wrapper>
        <LeftColumn>
          <ProfileCard />
        </LeftColumn>
        <RightColumn>
          <ProfileTabs
            selectBeast={setSelectedBeast}
            currentBeast={selectedBeast}
            selectItem={setSelectedItem}
            currentItem={selectedItem}
            selectPack={setSelectedPack}
            filter={filter}
            selectFilter={setFilter}
            currentPack={selectedPack}
            beasts={beasts}
          />
        </RightColumn>
      </Wrapper>
    </Container>
  )
}
export default UserProfile
