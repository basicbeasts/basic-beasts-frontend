import styled from "styled-components"
import BeastTabCard from "../BeastTabCard"
import star from "public/basic_starLevel.png"
import BeastModalView from "../BeastModalView"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { FC, useState, Fragment, useEffect } from "react"
import EvolutionModal from "../EvolutionModal"
import Egg from "public/egg.png"
import GoldLight from "public/gold_light.png"
import EggViewModal from "../EggViewModal"

import eggDefault from "public/eggs/default_shine.png"
import eggElectric from "public/eggs/electric_shine.png"
import eggWater from "public/eggs/water_shine.png"
import eggGrass from "public/eggs/grass_shine.png"
import eggFire from "public/eggs/fire_shine.png"
import eggNormal from "public/eggs/normal_shine.png"
import { useHoursLeft } from "./useHoursLeft"
import incubatorDefault from "public/eggs/incubator_default_testnet.gif"
import incubatorElectric from "public/eggs/incubator_electric_testnet.gif"
import incubatorWater from "public/eggs/incubator_water_testnet.gif"
import incubatorGrass from "public/eggs/incubator_grass_testnet.gif"
import incubatorFire from "public/eggs/incubator_fire_testnet.gif"
import incubatorNormal from "public/eggs/incubator_normal_testnet.gif"

const Wrapper = styled.div`
  padding: 20px 20px 100px;
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
  position: absolute;
  top: 0;
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
  @media (max-width: 360px) {
    font-size: 0.7em;
  }
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
const SortByButton = styled.div`
  border-radius: 10px;
  border: solid #bc9d24 2px;
  background: transparent;
  outline: none;
  &::placeholder {
    color: #e4be23;
  }
  text-transform: uppercase;
  width: 160px;
  font-size: 1em;
  color: #e4be23;
  &:hover {
    background: transparent;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  padding-left: 15px;
  margin-left: 20px;
  // margin-right: 18px;
  @media (max-width: 440px) {
    width: 100%;
    margin: 0;
  }
  // @media (max-width: 391px) {
  //   width: 185px;
  //   margin: 0 5px;
  // }
  // @media (max-width: 361px) {
  //   width: 165px;
  //   margin-left: 5px;
  // }
`
const DropDownList = styled.div`
  /* z-index: 1; */
  width: 200px;
  margin-left: 24px;
  background-color: #212127;
  color: #e4be23;
  border-radius: 10px;
  @media (max-width: 440px) {
    width: 100%;
    margin: 0;
  }
`

const InputContainer = styled.div`
  @media (max-width: 570px) {
    width: 100%;
  }
  @media (max-width: 440px) {
    padding: 0 10px;
    width: 100%;
  }
`
const Img = styled.img`
  position: relative;
  max-width: 10rem;
`
const Light = styled.img`
  position: absolute;
  max-width: 18rem;
  bottom: -1.5rem;
`
const GradientDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  background-image: radial-gradient(#fcd240, #fcd240, transparent 60%);
  z-index: -1;
`

const FuncArgInput = styled.input`
  background: transparent;
  border-radius: 10px;
  border: solid #bc9d24 2px;
  color: #fff;
  font-size: 1em;
  padding: 8px;
  padding-left: 15px;
  width: 175px;
  height: 44px;
  cursor: pointer;
  margin-bottom: 0;
  outline: none;
  &::placeholder {
    color: #e4be23;
    text-transform: uppercase;
  }
  @media (max-width: 570px) {
    width: 100%;
  }
  @media (max-width: 440px) {
    width: 100%;
    margin-bottom: 8px;
  }
`

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

const A = styled.a`
  font-size: 1em;
`

const HeaderBeastCollection = styled.div`
  display: flex;
  width: 100%;
  justify-content: right;
  align-items: center;
  padding-right: 20px;
  padding-top: 8px;
  margin-top: 20px;
  position: relative;
  z-index: 5;
  @media (max-width: 570px) {
    justify-content: space-between;
    padding: 0 20px;
  }
  @media (max-width: 440px) {
    flex-direction: column;
    padding: 0;
  }
`

const MenuButton = styled<any>(Menu.Button)`
  @media (max-width: 440px) {
    width: 100%;
  }
`

const MenuWrapper = styled<any>(Menu)`
  @media (max-width: 440px) {
    width: 100%;
    padding: 0 10px;
  }
`

const MenuItems = styled<any>(Menu.Items)`
  @media (max-width: 440px) {
    width: 100%;
  }
`
const EggDiv = styled.div<any>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  background: ${(props) => props.backgroundColor || "#ffe8a3"};
  width: 10rem;
  aspect-ratio: 1;
  z-index: 1;
  overflow: hidden;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`
const EggTimer = styled.div`
  position: absolute;
  top: -3px;
  right: 6px;

  color: rgba(0, 0, 0, 65%);
  font-size: 1.5rem;

  margin-top: 0.25rem;
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
  evolvableBeasts: any
  allEvolutionPairs: any
  getPersonalDexicon: any
  walletAddress: any
  eggs: any
}

// const eggs = [
//   {
//     id: 1,
//     incubationDateEnding: 2,
//   },
//   {
//     id: 2,
//     incubationDateEnding: 2,
//   },
//   {
//     id: 3,
//     incubationDateEnding: 2,
//   },
//   {
//     id: 4,
//     incubationDateEnding: 0,
//   },
// ]

function EggTimerComponent({ egg }: any) {
  const targetTimestamp = egg?.incubationTimer?.incubationDateEnding
  const { hoursLeft, hasPassed } = useHoursLeft(
    targetTimestamp ? targetTimestamp : 0,
  )

  if (hasPassed) {
    return <EggTimer>Ready</EggTimer>
  }

  if (!targetTimestamp) {
    return null
  }

  return <EggTimer>{hoursLeft}h</EggTimer>
}

const EggTab: FC<Props> = ({
  beasts,
  fetchUserBeasts,
  userAddr,
  evolvableBeasts,
  allEvolutionPairs,
  getPersonalDexicon,
  walletAddress,
  eggs,
}) => {
  const [displayBeasts, setDisplayBeasts] = useState<any>(null)
  const [selectedBeast, setSelectedBeast] = useState<any>(null)
  const [open, setOpen] = useState(false)
  const [displayNickname, setDisplayNickname] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("SORT BY")

  const [evolutionModalOpen, setEvolutionModalOpen] = useState(false)
  const [search, setSearch] = useState<string | null>("")
  const [evolvedBeastId, setEvolvedBeastId] = useState(null)

  useEffect(() => {
    if (beasts != null) {
      setDisplayBeasts(beasts)
    }
  }, [beasts])

  useEffect(() => {
    if (allEvolutionPairs != null && selectedBeast != null) {
      setEvolvedBeastId(allEvolutionPairs[selectedBeast.beastTemplateID])
    }
  }, [selectedBeast])

  useEffect(() => {
    if (search != "") {
      filterNickname(search)
    } else {
      setDisplayBeasts(beasts)
    }
  }, [search])

  const filterNickname = (filters: any) => {
    if (beasts != null) {
      const newBeasts = beasts.filter((beast: any) =>
        beast.nickname.toLowerCase().includes(filters.toString()),
      )
      // setElementFilter((elementFilter: any) => [...elementFilter, "Electric"])
      setDisplayBeasts(newBeasts)
    }
  }
  // const filterElementElectric = beasts.filter((Beast: any) => {
  //   if (beasts != null) {
  //     return Beast.element === "Electric"
  //   }
  // })

  // const filterElementFire = () => {
  //   if (beasts != null) {
  //   }
  // }

  // const filterElementNormal = () => {
  //   if (beasts != null) {
  //   }
  // }

  // const filterElementAll = () => {
  //   if (beasts != null) {
  //   }
  // }

  return (
    <>
      {/* <HeaderBeastCollection>
        <InputContainer>
          <FuncArgInput
            placeholder="Search"
            type="text"
            onChange={(e: any) => setSearch(e.target.value.toLowerCase())}
          />
        </InputContainer>
        <DropDown
          beasts={displayBeasts}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </HeaderBeastCollection> */}
      <Wrapper>
        {/* example buttons start */}
        {/* <span>
          <Button onClick={console.log(filterElementElectric)}>electric</Button>
          <Button onClick={filterElementFire}>fire</Button>
          <Button onClick={filterElementNormal}>normal</Button>
          <Button onClick={filterElementAll}>all</Button>
        </span> */}

        {/* example buttons end */}

        <EggViewModal open={open} setOpen={setOpen} egg={selectedBeast} />
        <EvolutionModal
          handleClose={() => setEvolutionModalOpen(false)}
          RevealModalOpen={evolutionModalOpen}
          packId={selectedBeast?.beastTemplateID || "1"}
          evolvedBeastId={evolvedBeastId}
        />
        {eggs != null ? (
          <ul
            role="list"
            className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          >
            {eggs.map((egg: any) => (
              <li
                key={egg.id}
                className="relative"
                onClick={() => {
                  setOpen(true)
                  setSelectedBeast(egg)
                  setDisplayNickname(null)
                }}
              >
                <EggDiv
                  backgroundColor={
                    egg?.elementType == "Electric"
                      ? "#FFE595"
                      : egg?.elementType == "Water"
                      ? "#A4C2F4"
                      : egg?.elementType == "Grass"
                      ? "#B7D7A8"
                      : egg?.elementType == "Fire"
                      ? "#EA9999"
                      : "#D5A6BD"
                  }
                >
                  {/* <Light src={GoldLight.src} /> */}
                  {egg?.incubationTimer != null ? (
                    <Img
                      src={
                        egg?.elementType == "Electric"
                          ? incubatorElectric.src
                          : egg?.elementType == "Water"
                          ? incubatorWater.src
                          : egg?.elementType == "Grass"
                          ? incubatorGrass.src
                          : egg?.elementType == "Fire"
                          ? incubatorFire.src
                          : egg?.elementType == "Normal"
                          ? incubatorNormal.src
                          : incubatorDefault.src
                      }
                    />
                  ) : (
                    <Img
                      src={
                        egg?.elementType == "Electric"
                          ? eggElectric.src
                          : egg?.elementType == "Water"
                          ? eggWater.src
                          : egg?.elementType == "Grass"
                          ? eggGrass.src
                          : egg?.elementType == "Fire"
                          ? eggFire.src
                          : egg?.elementType == "Normal"
                          ? eggNormal.src
                          : eggDefault.src
                      }
                    />
                  )}

                  {egg?.incubationTimer != null && (
                    <EggTimer>
                      <EggTimerComponent key={egg.id} egg={egg} />
                    </EggTimer>
                  )}
                </EggDiv>
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
      </Wrapper>
    </>
  )
}

export default EggTab
