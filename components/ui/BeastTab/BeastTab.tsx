import React, { FC, useState } from "react"
import styled from "styled-components"
import BeastTabCard from "../BeastTabCard"
import star from "public/basic_starLevel.png"
import BeastModalView from "../BeastModalView"
import beastTemplates from "data/beastTemplates"

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
  height: 800px;
  margin-top: 20px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`

const ThumbnailDetails = styled.div<Omit<Color, "background">>`
  color: #000000;
  background: ${(props) => props.bgColor || "#FFD966"};
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
  user-drag: none;
  -webkit-user-drag: none;
  float: left;
`

const ThumbnailLabel = styled.div`
  margin: 8px 0;
  float: right;
  text-align: right;
  line-height: 1.2em;
`

const Button = styled.button`
  padding: 8px 24px 12px 26px;
  margin-right: 2px;
  font-size: 26px;
  background-color: #feff95;
  box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
    0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset -3px -3px #f3cb23;
  color: #a75806;
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
      0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset 3px 3px #f3cb23;
  }
`

type Color = {
  bgColor: any
}

type Props = {
  // count: any
  // selectedBeast: any
  beasts: any
  fetchUserBeasts: any
  userAddr: any
}

type Beast = {
  beastTemplateID: number
  generation: number
  dexNumber: number
  name: String
  description: String
  image: String
  imageTransparentBg: String
  animationUrl: String
  externalUrl: String
  rarity: String
  skin: String
  starLevel: number
  asexual: boolean
  breedableBeastTemplateID: number
  maxAdminMintAllowed: number
  ultimateSkill: String
  basicSkills: String[]
  elements: String[]
  data: any
}

const BeastTab: FC<Props> = ({
  beasts,
  fetchUserBeasts,
  userAddr,
}: {
  fetchUserBeasts: any
  // count: Dispatch<SetStateAction<number>>
  // selectedBeast: string | null
  beasts: any[]
  userAddr: any
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

  const [selectedBeast, setSelectedBeast] = useState<Beast | null>(null)
  const [open, setOpen] = useState(false)
  const [displayNickname, setDisplayNickname] = useState<string | null>(null)
  const [sort, setSort] = useState("")

  const sortBeasts = () => {
    if (beasts != null) {
      beasts.sort((a, b) => a.dexNumber - b.dexNumber)
      beasts.sort((a, b) => a.beastTemplateID - b.beastTemplateID)
    }
    setSort("Sort by Dex Number")
  }

  return (
    <Wrapper>
      {/* example buttons start */}
      <span>
        <Button onClick={() => sortBeasts()}>
          Sort by dex number low-high
        </Button>
      </span>

      <div style={{ marginTop: "30px" }} />
      {/* example buttons end */}

      <BeastModalView
        beast={selectedBeast}
        open={open}
        setOpen={setOpen}
        fetchUserBeasts={fetchUserBeasts}
        displayNickname={displayNickname}
        setDisplayNickname={setDisplayNickname}
        userAddr={userAddr}
      />
      {beasts != null ? (
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-2 xl:gap-x-6 xl:grid-cols-3 2xl:grid-cols-4"
        >
          {beasts.map((beast) => (
            <li
              key={beast.id}
              className="relative"
              onClick={() => {
                setOpen(true)
                setSelectedBeast(beast)
                setDisplayNickname(null)
              }}
            >
              <div
                style={{
                  borderRadius: "20px 20px 0 0",
                }}
                className="group block w-full aspect-w-9 aspect-h-7 bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"
              >
                <BeastTabCard
                  id={beast.id}
                  className="object-cover group-hover:opacity-90"
                  beastTemplateID={beast.beastTemplateID}
                />
              </div>
              <div>
                <ThumbnailDetails
                  style={{ borderRadius: "0 0 20px 20px" }}
                  bgColor={
                    beast.elements[0] == "Electric"
                      ? "#FFD966"
                      : beast.elements[0] == "Water"
                      ? "#A4C2F4"
                      : beast.elements[0] == "Grass"
                      ? "#B7D7A8"
                      : beast.elements[0] == "Fire"
                      ? "#EA9999"
                      : "#D5A6BD"
                  }
                >
                  <ThumbnailLabel>
                    <div style={{ fontSize: "1.3em" }}>{beast.nickname}</div>
                    <div style={{ fontSize: "1.3em" }}>
                      #{beast.serialNumber} |{" "}
                      {beast.maxAdminMintAllowed <= 1000
                        ? beast.maxAdminMintAllowed
                        : "?"}
                    </div>
                  </ThumbnailLabel>
                  <StarLevel>
                    {Array(beast.starLevel)
                      .fill(0)
                      .map((_, i) => (
                        <StarImg key={i} src={star.src} />
                      ))}
                  </StarLevel>
                </ThumbnailDetails>
              </div>
            </li>
          ))}
          {/* To prevent big gap due to fixed height, which is needed for the scroll */}
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
        "No beasts found"
      )}

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
