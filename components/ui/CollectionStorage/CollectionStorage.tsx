import React, { FC } from "react"
import styled from "styled-components"
import BuyButton from "../BuyButton"
import FilterButton from "../FilterButton"

const Container = styled.div`
  background: #272727;
  min-width: 55%;
  margin-top: 50px;
  box-shadow: 0px -6px 5px 4px #272727;
  padding: 25px 40px 25px;
`

const Header = styled.div`
  display: table;
  clear: both;
  width: 100%;
  margin-bottom: 20px;
`

const Count = styled.div`
  font-size: 1.5em;
  color: #f3cb23;
  float: left;
`

const FilterButtons = styled.div`
  float: right;
`

const CollectionStorage: FC = () => {
  return (
    <Container>
      <Header>
        <Count>Showing 0</Count>
        <FilterButtons>
          <FilterButton buttonText={"Packs"} />
          <FilterButton buttonText={"Items"} />
        </FilterButtons>
      </Header>
      <div>BeastList</div>
    </Container>
  )
}
export default CollectionStorage
