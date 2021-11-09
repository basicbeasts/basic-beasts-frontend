import React, { FC } from "react"
import styled from "styled-components"

const Container = styled.div`
  background: #272727;
  min-width: 40%;
  margin-top: 50px;
  box-shadow: 0px -6px 5px 4px #272727;
`

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const CollectionStorage: FC = () => {
  return (
    <Container>
      <Header>
        <div>Showing 0</div>

        <button>packs</button>
        <button>items</button>
      </Header>
      <div>BeastList</div>
    </Container>
  )
}
export default CollectionStorage
