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
  min-width: 1200px;
  min-height: 500px;
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
