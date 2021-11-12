import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import styled from "styled-components"
import { useQuery } from "../../../gqty"
import FilterButton from "../FilterButton"
import BeastThumbnail from "../BeastThumbnail"
import ItemThumbnail from "../ItemThumbnail"
import PackThumbnail from "../PackThumbnail"

const Container = styled.div<{ bgColor: string }>`
  background: ${(props) => props.bgColor};
  box-shadow: ${(props) => `0px -6px 5px 4px ${props.bgColor}`};
  width: 55%;
  margin-top: 50px;
  padding: 35px 20px 0px;
  z-index: 1;

  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;

  //Responsive
  /* @media (max-width: 1350px) {
    width: 100%;
  } */
  @media (max-width: 1350px) {
    width: 49%;
  }

  @media (max-width: 1240px) {
    width: 45%;
  }
  @media (max-width: 1140px) {
    width: 100%;
    margin-top: 0px;
  }
`

const Wrapper = styled.div`
  padding: 35px 20px 0px;
  z-index: 1;

  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;

  @media (max-width: 1140px) {
    width: 100%;
  }
  //Scroll in div
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  height: 600px;
  margin-top: 20px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`

const Header = styled.div`
  display: table;
  clear: both;
  width: 100%;
  margin-bottom: 0px;
  padding: 0 20px;
`

const Count = styled.div`
  font-size: 1.5em;
  color: #f3cb23;
  float: left;

  //Responsive
  @media (max-width: 1240px) {
    margin-bottom: 20px;
  }
`

const FilterButtons = styled.div`
  float: right;
`

const BeastThumbnailList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 700px;
  margin-top: 0px;

  //responsive
  @media (max-width: 1350px) {
    width: 600px;
  }

  @media (max-width: 1240px) {
    width: 500px;
  }

  @media (max-width: 1140px) {
    width: 100%;
  }
`

const ThumbnailList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 700px;
  margin-bottom: 0px;

  //responsive
  @media (max-width: 1350px) {
    width: 600px;
  }

  @media (max-width: 1240px) {
    width: 500px;
  }

  @media (max-width: 1140px) {
    width: 100%;
  }
`

type CollectionStorageProps = {
  selectBeast: Dispatch<SetStateAction<string | null>>
  currentBeast: string | null
  selectItem: Dispatch<SetStateAction<string | null>>
  currentItem: string | null
  selectPack: Dispatch<SetStateAction<string | null>>
  selectFilter: Dispatch<SetStateAction<"beasts" | "items" | "packs">>
  currentPack: string | null
  filter: "beasts" | "items" | "packs"
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

const ShowBeasts = ({
  selectBeast,
  count,
  selectedBeast,
}: {
  selectBeast: Dispatch<SetStateAction<string | null>>
  count: Dispatch<SetStateAction<number>>
  selectedBeast: string | null
}) => {
  const query = useQuery()
  const beasts = query.me
    ?.openedPacks()
    ?.edges?.map((edge) => edge?.node?.beast?.id!)
    .filter(Boolean)

  // When Beasts are in the collection. Showcase first BeastThumbnail by default
  useEffect(() => {
    if (beasts && beasts.length > 0) {
      selectBeast(beasts[0])
      count(beasts.length)
    }
    // This will re-run when the query updates with data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.$state.isLoading])

  return (
    <Wrapper>
      {beasts &&
        arrayChunk(beasts, 10).map((innerArray, i) => (
          <BeastThumbnailList key={innerArray[0] + i}>
            {innerArray.map((beastId, j) => (
              <BeastThumbnail
                key={beastId + j + i}
                id={beastId}
                selected={beastId === selectedBeast}
                onClick={() => selectBeast(beastId)}
              />
            ))}
          </BeastThumbnailList>
        ))}
    </Wrapper>
  )
}

const ShowItems = ({
  selectItem,
  count,
  selectedItem,
}: {
  selectItem: Dispatch<SetStateAction<string | null>>
  count: Dispatch<SetStateAction<number>>
  selectedItem: string | null
}) => {
  const query = useQuery()
  const items = (
    query?.me
      ?.openedPacks()
      ?.edges?.flatMap(
        (edge) =>
          edge?.node?.fungibleTokens()?.edges?.map((edge) => edge?.node!.id!) ??
          [],
      ) ?? []
  ).filter(Boolean)

  // When Items are in the collection. Showcase first Item by default
  useEffect(() => {
    if (items && items.length > 0) {
      selectItem(items[0] ?? null)
      count(items.length)
    }
    // This will re-run when the query updates with data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.$state.isLoading])

  return (
    <Wrapper>
      {items &&
        arrayChunk(items, 10).map((innerArray, i) => (
          <ThumbnailList key={innerArray[0] + i}>
            {innerArray.map((itemId, j) => (
              <ItemThumbnail
                key={itemId + j + i}
                id={itemId}
                selected={itemId === selectedItem}
                onClick={() => selectItem(itemId)}
              />
            ))}
          </ThumbnailList>
        ))}
    </Wrapper>
  )
}

const ShowPacks = ({
  selectPack,
  count,
  selectedPack,
}: {
  selectPack: Dispatch<SetStateAction<string | null>>
  count: Dispatch<SetStateAction<number>>
  selectedPack: string | null
}) => {
  const query = useQuery()
  const packs = (
    query?.me?.unopenedPacks()?.edges?.map((edge) => edge?.node?.id!) ?? []
  ).filter(Boolean)

  useEffect(() => {
    if (packs && packs.length > 0) {
      count(packs.length)
    }
    // This will re-run when the query updates with data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packs])

  // When unopened packs are in the collection. Showcase first packs by default
  useEffect(() => {
    if (packs && packs.length > 0) {
      selectPack(packs[0] ?? null)
    }
    // This will re-run when the query updates with data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.$state.isLoading])

  return (
    <Wrapper>
      {packs &&
        arrayChunk(packs, 10).map((innerArray, i) => (
          <ThumbnailList key={innerArray[0] + i}>
            {innerArray.map((packId, j) => (
              <PackThumbnail
                key={packId + j + i}
                id={packId}
                selected={packId === selectedPack}
                onClick={() => selectPack(packId)}
              />
            ))}
          </ThumbnailList>
        ))}
    </Wrapper>
  )
}

const CollectionStorage: FC<CollectionStorageProps> = ({
  selectBeast,
  currentBeast,
  filter,
  selectFilter,
  selectItem,
  currentItem,
  selectPack,
  currentPack,
}: CollectionStorageProps) => {
  const [count, setCount] = useState(0)

  return (
    <Container bgColor={filter === "beasts" ? "#272727" : "#111823"}>
      <Header>
        {/*
            Should display number of items/beasts/packs listed in collection storage depending on which filter/tab is currently selected. 
            */}
        <Count>Showing {count}</Count>
        <FilterButtons>
          {/*
            Should display only two buttons and hide the one what is currently being displayed
            */}
          <FilterButton
            selected={filter === "beasts"}
            onClick={() => selectFilter("beasts")}
            buttonText={"Beasts"}
          />
          <FilterButton
            onClick={() => selectFilter("items")}
            selected={filter === "items"}
            buttonText={"Items"}
          />

          <FilterButton
            onClick={() => selectFilter("packs")}
            selected={filter === "packs"}
            buttonText={"Packs"}
          />
        </FilterButtons>
      </Header>
      {filter === "beasts" && (
        <ShowBeasts
          selectedBeast={currentBeast}
          selectBeast={selectBeast}
          count={setCount}
        />
      )}
      {filter === "items" && (
        <ShowItems
          selectItem={selectItem}
          selectedItem={currentItem}
          count={setCount}
        />
      )}
      {filter === "packs" && (
        <ShowPacks
          selectPack={selectPack}
          count={setCount}
          selectedPack={currentPack}
        />
      )}
    </Container>
  )
}
export default CollectionStorage
