import React, { FC } from "react"
import styled from "styled-components"
import BuyButton from "../BuyButton"
import FilterBeastButton from "../FilterBeastButton"
import FilterButton from "../FilterButton"
import star from "public/basic_starLevel.png"
import BeastThumbnail from "../BeastThumbnail"

const Container = styled.div`
  background: #111823; //Should change color depending on which filter/tab that has been selected
  box-shadow: 0px -6px 5px 4px #111823; //Should change color depending on which filter/tab that has been selected
  //#272727 - Color for when 1) Beast Collection is empty else
  // #111823 - for every other case
  min-width: 55%;
  margin-top: 50px;
  padding: 35px 40px 0px;
  z-index: 1;

  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
`

const Header = styled.div`
  display: table;
  clear: both;
  width: 100%;
  margin-bottom: 40px;
`

const Count = styled.div`
  font-size: 1.5em;
  color: #f3cb23;
  float: left;
`

const FilterButtons = styled.div`
  float: right;
`

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const BeastThumbnailList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 41px;
`

const BeastThumbnailLast = styled.div`
  width: 110px;
  height: 110px;
  background: #fff;

  box-shadow: -3px 0px 0px 0px #b3a068, 0px -3px 0px 0px #b3a068,
    0px 3px 0px 0px #b3a068, 3px 0px 0px 0px #b3a068;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`

const CollectionStorage: FC = () => {
  return (
    <Container>
      <Header>
        {/*
            Should display number of items/beasts/packs listed in collection storage depending on which filter/tab is currently selected. 
            */}
        <Count>Showing {0}</Count>
        <FilterButtons>
          {/*
            Should display only two buttons and hide the one what is currently being displayed
            */}
          <FilterButton buttonText={"Packs"} />
          <FilterButton buttonText={"Items"} />
          <FilterBeastButton buttonText={"Beasts"} />
        </FilterButtons>
      </Header>
      <BeastThumbnailList>
        <BeastThumbnail
          selected
          id="QmVhc3Q6Y2t2b2oydjNmMDAwMGQyOXh2cW1yam42aQ=="
        />
        <BeastThumbnail id="QmVhc3Q6Y2t2b2oydjNmMDAwMGQyOXh2cW1yam42aQ==" />
        <BeastThumbnail id="QmVhc3Q6Y2t2b2oydjNmMDAwMGQyOXh2cW1yam42aQ==" />
        <BeastThumbnail id="QmVhc3Q6Y2t2b2oydjNmMDAwMGQyOXh2cW1yam42aQ==" />
        <BeastThumbnailLast></BeastThumbnailLast>
      </BeastThumbnailList>
      <BeastThumbnailList>
        <BeastThumbnail id="QmVhc3Q6Y2t2b2oydjNmMDAwMGQyOXh2cW1yam42aQ==" />
        <BeastThumbnail id="QmVhc3Q6Y2t2b2oydjNmMDAwMGQyOXh2cW1yam42aQ==" />
        <BeastThumbnail id="QmVhc3Q6Y2t2b2oydjNmMDAwMGQyOXh2cW1yam42aQ==" />
        <BeastThumbnail id="QmVhc3Q6Y2t2b2oydjNmMDAwMGQyOXh2cW1yam42aQ==" />
        <BeastThumbnailLast></BeastThumbnailLast>
      </BeastThumbnailList>
    </Container>
  )
}
export default CollectionStorage
