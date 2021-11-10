import React, { Dispatch, FC, SetStateAction } from "react"
import styled from "styled-components"
import BuyButton from "../BuyButton"
import FilterBeastButton from "../FilterBeastButton"
import FilterButton from "../FilterButton"
import star from "public/basic_starLevel.png"
import BeastThumbnail from "../BeastThumbnail"
import { useQuery } from "../../../gqty"
import ItemThumbnail from "../ItemThumbnail"
import PackThumbnail from "../PackThumbnail"

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

const ThumbnailList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 35px;
`

type CollectionStorageProps = {
  selectBeast: Dispatch<SetStateAction<string | null>>
}

// https://stackoverflow.com/a/60832642/11321732
function arrayChunk<T>(array: Array<T>, chunkSize: number): Array<Array<T>> {
  const arrayOfArrays = []

  if (array.length <= chunkSize) {
    arrayOfArrays.push(array)
  } else {
    for (let i = 0; i < array.length; i += chunkSize) {
      arrayOfArrays.push(array.slice(i, i + chunkSize))
    }
  }
  return arrayOfArrays
}

const CollectionStorage: FC<CollectionStorageProps> = ({
  selectBeast,
}: CollectionStorageProps) => {
  const query = useQuery()
  const user = query.user({ walletAddress: "0xdcdb8c9861a8e9d6" })
  const beasts = user
    ?.unopenedPacks()
    ?.edges?.map((edge) => edge?.node?.beast?.id!)
    .filter(Boolean)

  return (
    <Container>
      <Header>
        {/*
            Should display number of items/beasts/packs listed in collection storage depending on which filter/tab is currently selected. 
            */}
        {beasts && <Count>Showing {beasts?.length}</Count>}
        <FilterButtons>
          {/*
            Should display only two buttons and hide the one what is currently being displayed
            */}
          <FilterButton buttonText={"Packs"} />
          <FilterButton buttonText={"Items"} />
          <FilterBeastButton buttonText={"Beasts"} />
        </FilterButtons>
      </Header>
      {beasts &&
        arrayChunk(beasts, 5).map((innerArray, i) => (
          <BeastThumbnailList key={innerArray[0] + i}>
            {innerArray.map((beastId, j) => (
              <BeastThumbnail
                key={beastId + j + i}
                id={beastId}
                onClick={() => selectBeast(beastId)}
              />
            ))}
          </BeastThumbnailList>
        ))}
      <ThumbnailList>
        <ItemThumbnail />
        <ItemThumbnail />
        <ItemThumbnail />
      </ThumbnailList>
      <ThumbnailList>
        <PackThumbnail />
        <PackThumbnail />
        <PackThumbnail />
      </ThumbnailList>
    </Container>
  )
}
export default CollectionStorage
