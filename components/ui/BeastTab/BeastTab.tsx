import React, { FC, Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import BeastTabCard from "../BeastTabCard"

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

const BeastTabCardWrapper = styled.div`
  max-width: 110px;
`

type Props = {
  selectBeast: any
  count: any
  selectedBeast: any
}

const BeastTab: FC<Props> = ({
  selectBeast,
  count,
  selectedBeast,
}: {
  selectBeast: Dispatch<SetStateAction<string | null>>
  count: Dispatch<SetStateAction<number>>
  selectedBeast: string | null
}) => {
  //   const query = useQuery()
  //   const beasts =
  //     query.me
  //       ?.openedPacks()
  //       ?.edges?.map((edge) => edge?.node?.beast?.id!)
  //       .filter(Boolean) ?? []

  //   useEffect(() => {
  //     count(beasts?.length ?? 0)
  //     // This will re-run when the query updates with data
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [beasts])

  //   // When Beasts are in the collection. Showcase first BeastThumbnail by default
  //   useEffect(() => {
  //     if (beasts && beasts.length > 0) {
  //       selectBeast(beasts[0])
  //     }
  //     // This will re-run when the query updates with data
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [query.$state.isLoading])

  return (
    <Wrapper>
      <BeastTabCardWrapper>
        <BeastTabCard />
      </BeastTabCardWrapper>

      <BeastTabCardWrapper>
        <BeastTabCard />
      </BeastTabCardWrapper>
      {/* Example of loading */}
      {/* {query.$state.isLoading ? (
        <Spinner />
      ) : (
        <BeastThumbnailList>
          {beasts.map((beastId, i) => (
            <BeastThumbnail
              key={beastId + i}
              id={beastId}
              selected={beastId === selectedBeast}
              onClick={() => selectBeast(beastId)}
            />
          ))}
        </BeastThumbnailList>
      )} */}
    </Wrapper>
  )
}

export default BeastTab
