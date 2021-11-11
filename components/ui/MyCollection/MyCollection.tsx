import React, { FC, useState } from "react"
import styled from "styled-components"
import BeastDisplay from "@components/ui/BeastDisplay"
import CollectionStorage from "@components/ui/CollectionStorage"
import ShowcaseBeast from "@components/ui/ShowcaseBeast"
import ShowcaseNoBeastFound from "@components/ui/ShowcaseNoBeastFound"
import ShowcaseNoItemFound from "@components/ui/ShowcaseNoItemFound"
import ShowcaseNoPackFound from "@components/ui/ShowcaseNoPackFound"
import ShowcaseItem from "../ShowcaseItem"
import ShowcasePack from "../ShowcasePack"

const Container = styled.div`
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: -7px;
`

const Bg = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 600px;
  min-width: 1400px;

  // !!!!!
  background: #272727; //Should change color depending on state and beast, item, pack that is being displayed
  box-shadow: 0px 0px 5px 4px #272727; //Should change color depending on state and beast, item, pack that is being displayed
  // !!!!!

  //272727
  //ffd966

  @media (max-width: 1200px) {
    min-width: auto;
    justify-content: center;
  }
`

const MyCollection: FC = () => {
  const [selectedBeast, setSelectedBeast] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [selectedPack, setSelectedPack] = useState<string | null>(null)
  const [filter, setFilter] = useState<"beasts" | "items" | "packs">("beasts")

  return (
    <Container>
      <Bg>
        {/*When Beast Collection is empty. Otherwise show first beast*/}
        {filter === "beasts" &&
          (selectedBeast ? (
            <ShowcaseBeast id={selectedBeast} />
          ) : (
            <ShowcaseNoBeastFound />
          ))}

        {filter === "items" &&
          (selectedItem ? <ShowcaseItem /> : <ShowcaseNoItemFound />)}

        {filter === "packs" &&
          (selectedPack ? <ShowcasePack /> : <ShowcaseNoPackFound />)}

        <CollectionStorage
          selectBeast={setSelectedBeast}
          selectItem={setSelectedItem}
          selectPack={setSelectedPack}
          filter={filter}
          selectFilter={setFilter}
        />
      </Bg>
    </Container>
  )
}
export default MyCollection
