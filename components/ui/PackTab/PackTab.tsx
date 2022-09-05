import React, { FC, Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import ItemTabCard from "../ItemTabCard"
import sushi from "public/fungible_tokens/fungible_tokens_thumbnails/sushi_thumbnail_v2.png"

import StarterImg from "public/packs/pack_pf/starter.png"
import MetallicImg from "public/packs/pack_pf/metallic.png"
import CursedImg from "public/packs/pack_pf/cursed.png"
import ShinyImg from "public/packs/pack_pf/shiny.png"

import PackTabCard from "../PackTabCard"

import BuyButton from "@components/ui/BuyButton"

const Wrapper = styled.div`
  padding: 35px 20px;
  z-index: 1;
  display: grid;

  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;

  @media (max-width: 1140px) {
    width: 100%;
  }
  @media (max-width: 1000px) {
    height: 650px;
  }
  //Scroll in div
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  height: 800px;
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
  width: 100%;
  padding: 5px 10px 25px;
  margin-bottom: -20px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`

const ThumbnailLabel = styled.div`
  margin: 10px 0;
  text-align: center;
  line-height: 1em;
  font-size: 1.8em;
`

const Text = styled.div`
  font-size: 1.2em;
  margin-bottom: 25px;
`

type ThumbnailDetails = {
  backgroundColor: string
}

type Props = {
  toggle: () => void
  selectPackType: Dispatch<SetStateAction<string | null>>
  packCount: any
}

const PackTab: FC<Props> = ({
  toggle,
  selectPackType,
  packCount,
}: {
  toggle: () => void
  selectPackType: Dispatch<SetStateAction<string | null>>
  packCount: any
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

  return (
    <Wrapper>
      {packCount != null ? (
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-1 xl:gap-x-7 xl:grid-cols-2 2xl:grid-cols-3"
        >
          {packCount[1] > 0 ? (
            <li className="relative">
              <div>
                <ThumbnailDetails
                  style={{ borderRadius: "12px 12px 0 0" }}
                  backgroundColor={"#737374"}
                >
                  <ThumbnailLabel>
                    <div>{"Starter" + " (" + packCount[1] + ")"}</div>
                  </ThumbnailLabel>
                </ThumbnailDetails>
              </div>
              <div
                style={{
                  borderRadius: "12px",
                }}
                className="group block w-full aspect-w-7 aspect-h-10 sm:aspect-h-11 md:aspect-h-10 lg:aspect-h-9 xl:aspect-h-10 bg-gray-100 overflow-hidden"
              >
                <PackTabCard
                  id={"1"}
                  className="object-cover group-hover:opacity-90"
                  image={StarterImg}
                  toggle={toggle}
                  selectPackType={selectPackType}
                  packCount={packCount[1]}
                />
              </div>
            </li>
          ) : packCount[1] == 0 &&
            packCount[2] == 0 &&
            packCount[3] == 0 &&
            packCount[4] == 0 ? (
            <div>
              <Text>
                You&apos;ll see unopened packs here. <br />
                Get your packs today!
              </Text>
              <BuyButton buttonText={"Buy Packs"} />
            </div>
          ) : (
            ""
          )}
          {packCount[2] > 0 ? (
            <li className="relative">
              <div>
                <ThumbnailDetails
                  style={{ borderRadius: "12px 12px 0 0" }}
                  backgroundColor={"#889AAF"}
                >
                  <ThumbnailLabel>
                    <div>{"Metallic Silver" + " (" + packCount[2] + ")"}</div>
                  </ThumbnailLabel>
                </ThumbnailDetails>
              </div>
              <div
                style={{
                  borderRadius: "12px",
                }}
                className="group block w-full aspect-w-7 aspect-h-10 sm:aspect-h-11 md:aspect-h-10 lg:aspect-h-9 xl:aspect-h-10 bg-gray-100 overflow-hidden"
              >
                <PackTabCard
                  id={"2"}
                  className="object-cover group-hover:opacity-90"
                  image={MetallicImg}
                  toggle={toggle}
                  selectPackType={selectPackType}
                  packCount={packCount[2]}
                />
              </div>
            </li>
          ) : (
            ""
          )}
          {packCount[3] > 0 ? (
            <li className="relative">
              <div>
                <ThumbnailDetails
                  style={{ borderRadius: "12px 12px 0 0" }}
                  backgroundColor={"#751AD0"}
                >
                  <ThumbnailLabel>
                    <div>{"Cursed Black" + " (" + packCount[3] + ")"}</div>
                  </ThumbnailLabel>
                </ThumbnailDetails>
              </div>
              <div
                style={{
                  borderRadius: "12px",
                }}
                className="group block w-full aspect-w-7 aspect-h-10 sm:aspect-h-11 md:aspect-h-10 lg:aspect-h-9 xl:aspect-h-10 bg-gray-100 overflow-hidden"
              >
                <PackTabCard
                  id={"3"}
                  className="object-cover group-hover:opacity-90"
                  image={CursedImg}
                  toggle={toggle}
                  selectPackType={selectPackType}
                  packCount={packCount[3]}
                />
              </div>
            </li>
          ) : (
            ""
          )}
          {packCount[4] > 0 ? (
            <li className="relative">
              <div>
                <ThumbnailDetails
                  style={{ borderRadius: "12px 12px 0 0" }}
                  backgroundColor={"#FFDA66"}
                >
                  <ThumbnailLabel>
                    <div style={{ color: "#A15813" }}>
                      {"Shiny Gold" + " (" + packCount[4] + ")"}
                    </div>
                  </ThumbnailLabel>
                </ThumbnailDetails>
              </div>
              <div
                style={{
                  borderRadius: "12px",
                }}
                className="group block w-full aspect-w-7 aspect-h-10 sm:aspect-h-11 md:aspect-h-10 lg:aspect-h-9 xl:aspect-h-10 bg-gray-100 overflow-hidden"
              >
                <PackTabCard
                  id={"4"}
                  className="object-cover group-hover:opacity-90"
                  image={ShinyImg}
                  toggle={toggle}
                  selectPackType={selectPackType}
                  packCount={packCount[4]}
                />
              </div>
            </li>
          ) : (
            ""
          )}
          <li></li>
          <li></li>
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
      ) : (
        "No packs found"
      )}
    </Wrapper>
  )
}

export default PackTab
