import React, { FC } from "react"
import styled from "styled-components"
import ShowcaseThumbnail from "@components/ui/ShowcaseThumbnail"
import BeastCard from "@components/ui/BeastCard"
import data from "data"
import CollectionStorage from "@components/ui/CollectionStorage"

const Container = styled.div`
  color: #fff;
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
`

const Bg = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 600px;
  min-width: 1400px;
  @media (max-width: 1300px) {
    min-width: auto;
    justify-content: center;
  }
`

const BeastDisplay: FC = () => {
  return (
    <Container>
      <Bg>
        <ShowcaseThumbnail />
        <CollectionStorage />
      </Bg>
    </Container>
  )
}
export default BeastDisplay
