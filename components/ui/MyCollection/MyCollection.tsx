import React, { FC, useState } from "react"
import styled from "styled-components"
import BeastDisplay from "@components/ui/BeastDisplay"

const Container = styled.div`
  min-height: 500px;
`

const MyCollection: FC = () => {
  //const [] make a tab switch for packs, items, beasts

  return (
    <Container>
      My Collection
      <BeastDisplay />
    </Container>
  )
}
export default MyCollection
