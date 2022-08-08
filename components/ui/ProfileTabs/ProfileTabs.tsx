import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import styled from "styled-components"
import ShinyImg from "public/packs/pack_pf/shiny.png"

import TabButton from "../TabButton"
import BeastTab from "../BeastTab"
import ItemTab from "../ItemTab"
import PackTab from "../PackTab"
import { useAuth } from "@components/auth/AuthProvider"

const Container = styled.div`
  color: #fff;
  margin-top: 30px;

  height: 800px;
`

type Props = {
  selectBeast: Dispatch<SetStateAction<string | null>>
  currentBeast: string | null
  selectItem: Dispatch<SetStateAction<string | null>>
  currentItem: string | null
  selectPack: Dispatch<SetStateAction<string | null>>
  selectFilter: Dispatch<SetStateAction<"beast collection" | "items" | "packs">>
  currentPack: string | null
  filter: "beast collection" | "items" | "packs"
  beasts: any
  toggle: () => void
  selectPackType: Dispatch<SetStateAction<string | null>>
  packCount: any
  sushiBalance: any
  emptyPotionBottleBalance: any
  poopBalance: any
}

const ProfileTabs: FC<Props> = ({
  selectBeast,
  currentBeast,
  filter,
  selectFilter,
  selectItem,
  currentItem,
  selectPack,
  currentPack,
  beasts,
  toggle,
  selectPackType,
  packCount,
  sushiBalance,
  emptyPotionBottleBalance,
  poopBalance,
}) => {
  const [hasPacks, setHasPacks] = useState(false)

  const { user } = useAuth()

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
  }, [user?.addr])

  return (
    <Container>
      <TabButton
        selected={filter === "beast collection"}
        onClick={() => selectFilter("beast collection")}
        buttonText={"beast collection"}
      />
      <TabButton
        onClick={() => selectFilter("items")}
        selected={filter === "items"}
        buttonText={"Items"}
      />
      <TabButton
        onClick={() => selectFilter("packs")}
        selected={filter === "packs"}
        buttonText={"Packs"}
        notify={filter !== "packs" && hasPacks}
      />
      {filter === "beast collection" && (
        <BeastTab selectBeast={selectBeast} beasts={beasts} />
      )}
      {filter === "items" && (
        <ItemTab
          selectItem={selectItem}
          sushiBalance={sushiBalance}
          emptyPotionBottleBalance={emptyPotionBottleBalance}
          poopBalance={poopBalance}
        />
      )}
      {filter === "packs" && (
        <PackTab
          selectPack={selectPack}
          toggle={toggle}
          selectPackType={selectPackType}
          packCount={packCount}
        />
      )}
    </Container>
  )
}
export default ProfileTabs
