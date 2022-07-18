import React, { FC, Dispatch, SetStateAction, useState } from "react"
import styled from "styled-components"
import ItemTabCard from "../ItemTabCard"
import poop from "public/fungible_tokens/fungible_tokens_thumbnails/poop_thumbnail_v2.png"
import sushi from "public/fungible_tokens/fungible_tokens_thumbnails/sushi_thumbnail_v2.png"
import emptyPotionBottle from "public/fungible_tokens/fungible_tokens_thumbnails/empty_potion_bottle_thumbnail_v2.png"

import star from "public/basic_starLevel.png"
import ItemModalView from "../ItemModalView"
import items from "data/items"

const Wrapper = styled.div`
  padding: 35px 20px 0px;
  z-index: 1;
  display: grid;

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

const ThumbnailDetails = styled.div<ThumbnailDetails>`
  color: #fff;
  background: ${(props) => props.backgroundColor || "white"};
  display: table;
  clear: both;
  width: 100%;
  padding: 0px 10px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`

const StarLevel = styled.div`
  vertical-align: middle;
`

const StarImg = styled.img`
  margin-top: 10px;
  width: 1.2em;
  float: right;
  user-drag: none;
  -webkit-user-drag: none;
  float: left;
`

const ThumbnailLabel = styled.div`
  margin: 10px 0;
  float: right;
  text-align: right;
  line-height: 1.3em;
`

type Props = {
  selectItem: any
  count: any
  selectedItem: any
}

const ItemTab: FC<Props> = ({
  selectItem,
  count,
  selectedItem,
}: {
  selectItem: Dispatch<SetStateAction<string | null>>
  count: Dispatch<SetStateAction<number>>
  selectedItem: string | null
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

  const name = "MoonMoon"

  type ThumbnailDetails = {
    backgroundColor: string
  }

  const [item, setItem] =
    useState<
      SetStateAction<{
        name: string
        description: string
        image: string
      } | null>
    >()
  const [open, setOpen] = useState(false)

  return (
    <Wrapper>
      <ItemModalView item={item} open={open} setOpen={setOpen} />
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-2 xl:gap-x-7 xl:grid-cols-3 2xl:grid-cols-4"
      >
        <li
          key={1}
          className="relative"
          onClick={() => {
            setOpen(true)
            setItem(items[0])
          }}
        >
          <div
            style={{
              borderRadius: "20px 20px 0 0",
            }}
            className="group block w-full aspect-w-6 aspect-h-6 bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"
          >
            <ItemTabCard
              id={"1"}
              className="object-cover group-hover:opacity-90"
              image={sushi}
            />
          </div>
          <div>
            <ThumbnailDetails
              style={{ borderRadius: "0 0 20px 20px" }}
              backgroundColor={"#E4A9A2"}
            >
              <ThumbnailLabel>
                <div style={{ fontSize: "2em" }}>20x</div>
              </ThumbnailLabel>
            </ThumbnailDetails>
          </div>
        </li>
        <li
          key={2}
          className="relative"
          onClick={() => {
            setOpen(true)
            setItem(items[1])
          }}
        >
          <div
            style={{
              borderRadius: "20px 20px 0 0",
            }}
            className="group block w-full aspect-w-6 aspect-h-6 bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"
          >
            <ItemTabCard
              id={"2"}
              className="object-cover group-hover:opacity-90"
              image={emptyPotionBottle}
            />
          </div>
          <div>
            <ThumbnailDetails
              style={{ borderRadius: "0 0 20px 20px" }}
              backgroundColor={"#396042"}
            >
              <ThumbnailLabel>
                <div style={{ fontSize: "2em" }}>20x</div>
              </ThumbnailLabel>
            </ThumbnailDetails>
          </div>
        </li>
        <li
          key={3}
          className="relative"
          onClick={() => {
            setOpen(true)
            setItem(items[2])
          }}
        >
          <div
            style={{
              borderRadius: "20px 20px 0 0",
            }}
            className="group block w-full aspect-w-6 aspect-h-6 bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"
          >
            <ItemTabCard
              id={"3"}
              className="object-cover group-hover:opacity-90"
              image={poop}
            />
          </div>
          <div>
            <ThumbnailDetails
              style={{ borderRadius: "0 0 20px 20px" }}
              backgroundColor={"#604E39"}
            >
              <ThumbnailLabel>
                <div style={{ fontSize: "2em" }}>20x</div>
              </ThumbnailLabel>
            </ThumbnailDetails>
          </div>
        </li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
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

export default ItemTab