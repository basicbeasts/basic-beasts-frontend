import { Dispatch, FC, SetStateAction } from "react"
import styled from "styled-components"
import ShinyImg from "public/packs/pack_pf/shiny.png"

import TabButton from "../TabButton"
import BeastTab from "../BeastTab"
import ItemTab from "../ItemTab"

const Container = styled.div`
  color: #fff;
  margin-top: 30px;
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
}) => {
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
        notify={filter !== "packs"}
      />
      {filter === "beast collection" && <BeastTab selectBeast={selectBeast} />}
      {filter === "items" && <ItemTab selectItem={selectItem} />}
      {filter === "packs" && <div>show packs</div>}
    </Container>
  )
}
export default ProfileTabs
