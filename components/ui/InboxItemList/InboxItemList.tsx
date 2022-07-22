import React, { FC, useEffect, useState } from "react"
import styled from "styled-components"
import BeastCard from "@components/ui/BeastCard"
import data from "data"
import mails from "data/inbox-dummy-data"
import InboxPackItem from "../InboxPackItem"
import BuyButton from "../BuyButton"

const Container = styled.div`
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 50px;
  line-height: 1.5em;
  margin-bottom: 120px;

  /* max-width: 1400px; */
  @media (min-width: 1750px) {
  }
`

const PackContainer = styled.div`
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 50px;
`

const InboxItemList: FC = () => {
  const [starterPacks, setStarterPacks] = useState(0)
  const [metallicPacks, setMetallicPacks] = useState(0)
  const [cursedPacks, setCursedPacks] = useState(0)
  const [shinyPacks, setShinyPacks] = useState(0)

  useEffect(() => {
    getNumberOfPacks()
  }, [])

  const getNumberOfPacks = () => {
    let starterCount = 0
    let metallicCount = 0
    let cursedCount = 0
    let shinyCount = 0

    for (let pack in mails) {
      let element = mails[pack]
      if (element.packTemplate.name == "Starter") {
        starterCount = starterCount + 1
      }
      if (element.packTemplate.name == "Metallic Silver") {
        metallicCount = metallicCount + 1
      }
      if (element.packTemplate.name == "Cursed Black") {
        cursedCount = cursedCount + 1
      }
      if (element.packTemplate.name == "Shiny Gold") {
        shinyCount = shinyCount + 1
      }
    }

    setStarterPacks(starterCount)
    setMetallicPacks(metallicCount)
    setCursedPacks(cursedCount)
    setShinyPacks(shinyCount)
  }

  return (
    <Container>
      {starterPacks > 0 ? (
        <>
          <InboxPackItem
            quantity={starterPacks}
            description={"Starter Pack"}
            value={10}
          />
        </>
      ) : (
        ""
      )}
      {metallicPacks > 0 ? (
        <>
          <InboxPackItem
            quantity={metallicPacks}
            description={"Metallic Silver Pack"}
            value={0}
          />
        </>
      ) : (
        ""
      )}
      {cursedPacks > 0 ? (
        <>
          <InboxPackItem
            quantity={cursedPacks}
            description={"Cursed Black Pack"}
            value={300}
          />
        </>
      ) : (
        ""
      )}
      {shinyPacks > 0 ? (
        <>
          <InboxPackItem
            quantity={shinyPacks}
            description={"Shiny Gold Pack"}
            value={999}
          />
        </>
      ) : (
        ""
      )}
      <BuyButton buttonText={"Claim All"} />
    </Container>
  )
}
export default InboxItemList
