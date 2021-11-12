import React, { FC, useState } from "react"
import styled from "styled-components"
import CollectionStorage from "@components/ui/CollectionStorage"
import ShowcaseBeast from "@components/ui/ShowcaseBeast"
import ShowcaseNoBeastFound from "@components/ui/ShowcaseNoBeastFound"
import ShowcaseNoItemFound from "@components/ui/ShowcaseNoItemFound"
import ShowcaseNoPackFound from "@components/ui/ShowcaseNoPackFound"
import ShowcaseItem from "../ShowcaseItem"
import ShowcasePack from "../ShowcasePack"

//For BeastRevealModal
import FilterButton from "../FilterButton"
import { motion } from "framer-motion"
import BeastRevealModal from "../BeastRevealModal"

const Container = styled.div`
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: -7px;
`

const Bg = styled.div<{ containerBg: string }>`
  display: flex;
  flex-wrap: wrap;
  min-height: 600px;
  width: 1400px;

  // !!!!!
  background: ${(props) =>
    props.containerBg}; //Should change color depending on state and beast, item, pack that is being displayed
  box-shadow: 0px 0px 5px 4px ${(props) => props.containerBg}; //Should change color depending on state and beast, item, pack that is being displayed
  // !!!!!

  //272727
  //ffd966

  //Responsive
  @media (max-width: 1150px) {
    justify-items: center;
    align-items: center;
    justify-content: center;
  }
`

const MyCollection: FC = () => {
  const [selectedBeast, setSelectedBeast] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [selectedPack, setSelectedPack] = useState<string | null>(null)
  const [containerBg, setContainerBg] = useState<string | null>(null)
  const [filter, setFilter] = useState<"beasts" | "items" | "packs">("beasts")

  //Modal
  const [RevealModalOpen, setRevealModalOpen] = useState(false)

  const close = () => setRevealModalOpen(false)

  const open = () => setRevealModalOpen(true)

  return (
    <Container>
      <Bg containerBg={containerBg ?? "#272727"}>
        {RevealModalOpen && (
          <BeastRevealModal
            RevealModalOpen={RevealModalOpen}
            handleClose={close}
            text={""}
          />
        )}
        {/*When Beast Collection is empty. Otherwise show first beast*/}
        {filter === "beasts" &&
          (selectedBeast ? (
            <ShowcaseBeast setContainerBg={setContainerBg} id={selectedBeast} />
          ) : (
            <ShowcaseNoBeastFound setContainerBg={setContainerBg} />
          ))}

        {filter === "items" &&
          (selectedItem ? (
            <ShowcaseItem id={selectedItem} setContainerBg={setContainerBg} />
          ) : (
            <ShowcaseNoItemFound setContainerBg={setContainerBg} />
          ))}

        {filter === "packs" &&
          (selectedPack ? (
            <ShowcasePack id={selectedPack} setContainerBg={setContainerBg} />
          ) : (
            <ShowcaseNoPackFound
              RevealModalOpen={open}
              setContainerBg={setContainerBg}
            />
          ))}

        <CollectionStorage
          selectBeast={setSelectedBeast}
          currentBeast={selectedBeast}
          selectItem={setSelectedItem}
          currentItem={selectedItem}
          selectPack={setSelectedPack}
          filter={filter}
          selectFilter={setFilter}
          currentPack={selectedPack}
        />
      </Bg>
    </Container>
  )
}
export default MyCollection
