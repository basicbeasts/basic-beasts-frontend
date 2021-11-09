import React, { FC, useState } from "react"
import styled from "styled-components"
import BeastDisplay from "@components/ui/BeastDisplay"
import CollectionStorage from "@components/ui/CollectionStorage"
import ShowcaseBeast from "@components/ui/ShowcaseBeast"
import ShowcaseNoBeastFound from "@components/ui/ShowcaseNoBeastFound"
import ShowcaseNoItemFound from "@components/ui/ShowcaseNoItemFound"
import ShowcaseNoPackFound from "@components/ui/ShowcaseNoPackFound"

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
  background: #ffd966; //Should change color depending on state and beast, item, pack that is being displayed
  box-shadow: 0px 0px 5px 4px #ffd966; //Should change color depending on state and beast, item, pack that is being displayed
  // !!!!!

  @media (max-width: 1200px) {
    min-width: auto;
    justify-content: center;
  }
`

const MyCollection: FC = () => {
  return (
    <Container>
      <Bg>
        {/*When Beast Collection is empty. Otherwise show first beast*/}
        {/*<ShowcaseNoBeastFound />*/}

        {/*When Item Inventory is empty. Otherwise show first item*/}
        {/*<ShowcaseNoItemFound />*/}

        {/*When Pack Inventory is empty. Otherwise show first pack*/}
        {/*<ShowcaseNoPackFound />*/}

        {/*When Beasts are in the collection. Showcase first BeastThumbnail by default*/}
        {/*<ShowcaseBeast />*/}
        <ShowcaseBeast />

        <CollectionStorage />
      </Bg>
    </Container>
  )
}
export default MyCollection
