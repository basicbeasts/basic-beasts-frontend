import React, { FC } from "react"
import styled from "styled-components"
import BeastDisplay from "@components/ui/BeastDisplay"

const Container = styled.div`
  min-height: 500px;
`

const MyCollection: FC = () => {
  return (
    <Container>
      My Collection
      <BeastDisplay />
    </Container>
  )
}
export default MyCollection
