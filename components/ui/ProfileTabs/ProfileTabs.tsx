import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import styled from "styled-components"
import ShinyImg from "public/packs/pack_pf/shiny.png"

import TabButton from "../TabButton"
import BeastTab from "../BeastTab"
import ItemTab from "../ItemTab"
import PackTab from "../PackTab"
import { useAuth } from "@components/auth/AuthProvider"
import { useRouter } from "next/router"
import { IsAny } from "@tanstack/react-table"
import EggTab from "../EggTab"

const Container = styled.div`
  color: #fff;
  margin-top: 30px;
  height: 800px;
  overflow: hidden;
`

const TabButtons = styled.div<any>`
  overflow-x: scroll;
  display: flex;
  // -ms-overflow-style: none; /* IE and Edge */
  //scrollbar-width: none; /* Firefox */
  /* &::-webkit-scrollbar {
    display: none;
  } */
  @media (max-width: 570px) {
    flex-direction: column;
    /* overflow-x: scroll;
    width: 50vw; */
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`

const TabButtonContainer = styled.div`
  margin: 0 15px;

  @media (max-width: 570px) {
    display: flex;
    justify-content: center;
  }
`

type Props = {
  selectFilter: Dispatch<
    SetStateAction<"beast collection" | "items" | "packs" | "eggs">
  >
  filter: "beast collection" | "items" | "packs" | "eggs"
  beasts: any
  toggle: () => void
  selectPackType: Dispatch<SetStateAction<string | null>>
  packCount: any
  sushiBalance: any
  emptyPotionBottleBalance: any
  poopBalance: any
  lovePotionBalance: any
  newBeast: any
  setNewBeast: any
  newTokens: any
  setNewTokens: any
  fetchUserBeasts: any
  userAddr: any
  evolvableBeasts: any
  allEvolutionPairs: any
  getPersonalDexicon: any
  walletAddress: any
}

const ProfileTabs: FC<Props> = ({
  filter,
  selectFilter,
  beasts,
  toggle,
  selectPackType,
  packCount,
  sushiBalance,
  emptyPotionBottleBalance,
  poopBalance,
  lovePotionBalance,
  newBeast,
  setNewBeast,
  newTokens,
  setNewTokens,
  fetchUserBeasts,
  userAddr,
  evolvableBeasts,
  allEvolutionPairs,
  getPersonalDexicon,
  walletAddress,
}) => {
  const [hasPacks, setHasPacks] = useState(false)

  const { user } = useAuth()

  const router = useRouter()
  const { address }: any = router.query

  useEffect(() => {
    if (user?.addr != null) {
      if (packCount != null) {
        if (
          packCount[1] > 0 ||
          packCount[2] > 0 ||
          packCount[3] > 0 ||
          packCount[4] > 0
        ) {
          setHasPacks(true)
        }
      }
    }
  }, [user?.addr, packCount])

  return (
    <Container>
      <TabButtons currentUserCollection={user?.addr == walletAddress}>
        <TabButtonContainer>
          {beasts != null ? (
            <TabButton
              selected={filter === "beast collection"}
              onClick={() => {
                selectFilter("beast collection")
                setNewBeast(false)
              }}
              buttonText={"beast collection" + " (" + beasts.length + ")"}
              notify={filter !== "beast collection" && newBeast}
              // notify={true}
            />
          ) : (
            <TabButton
              selected={filter === "beast collection"}
              onClick={() => {
                selectFilter("beast collection")
                setNewBeast(false)
              }}
              buttonText={"beast collection"}
              notify={filter !== "beast collection" && newBeast}
              // notify={true}
            />
          )}
        </TabButtonContainer>
        {user?.addr == walletAddress ? (
          <>
            <TabButtonContainer>
              <TabButton
                onClick={() => {
                  selectFilter("items")
                  setNewTokens(false)
                }}
                selected={filter === "items"}
                buttonText={"Items"}
                notify={filter !== "items" && newTokens}
                // notify={true}
              />
            </TabButtonContainer>
            <TabButtonContainer>
              <TabButton
                onClick={() => selectFilter("packs")}
                selected={filter === "packs"}
                buttonText={"Packs"}
                notify={filter !== "packs" && hasPacks}
              />
            </TabButtonContainer>
            <TabButtonContainer>
              <TabButton
                onClick={() => {
                  selectFilter("eggs")
                  setNewTokens(false)
                }}
                selected={filter === "eggs"}
                buttonText={"Eggs"}
                // notify={filter !== "eggs" && newTokens}
              />
            </TabButtonContainer>
          </>
        ) : (
          <></>
        )}
      </TabButtons>

      {filter === "beast collection" && (
        <BeastTab
          beasts={beasts}
          fetchUserBeasts={fetchUserBeasts}
          userAddr={userAddr}
          evolvableBeasts={evolvableBeasts}
          allEvolutionPairs={allEvolutionPairs}
          getPersonalDexicon={getPersonalDexicon}
          walletAddress={walletAddress}
          sushiBalance={sushiBalance}
          emptyPotionBottleBalance={emptyPotionBottleBalance}
          poopBalance={poopBalance}
          lovePotionBalance={lovePotionBalance}
        />
      )}
      {user?.addr == walletAddress ? (
        <>
          {filter === "eggs" && (
            <EggTab
              beasts={beasts}
              fetchUserBeasts={fetchUserBeasts}
              userAddr={userAddr}
              evolvableBeasts={evolvableBeasts}
              allEvolutionPairs={allEvolutionPairs}
              getPersonalDexicon={getPersonalDexicon}
              walletAddress={walletAddress}
            />
          )}
          {filter === "items" && (
            <ItemTab
              sushiBalance={sushiBalance}
              emptyPotionBottleBalance={emptyPotionBottleBalance}
              poopBalance={poopBalance}
            />
          )}
          {filter === "packs" && (
            <PackTab
              toggle={toggle}
              selectPackType={selectPackType}
              packCount={packCount}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </Container>
  )
}
export default ProfileTabs
