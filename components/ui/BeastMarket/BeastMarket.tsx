import styled from "styled-components"
import BeastMarketThumbnail from "../BeastMarketThumbnail"
import star from "public/basic_starLevel.png"
import BeastModalView from "../BeastModalView"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon, FilterIcon } from "@heroicons/react/solid"
import { faHeart as heartFull } from "@fortawesome/free-solid-svg-icons"
import { faHeart as heartEmpty } from "@fortawesome/free-regular-svg-icons"
import { FC, useState, Fragment, useEffect } from "react"
import EvolutionModal from "../EvolutionModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import BeastMarketFilters from "../BeastMarketFilters"
import BeastMarketBulkBuy from "../BeastMarketBulkBuy"
import BeastMarketBulkBid from "../BeastMarketBulkBid"
import beastTemplates from "data/beastTemplates"
import BeastMarketMobileCartModal from "../BeastMarketMobileCartModal"
import BeastMarketBeastList from "../BeastMarketBeastList"

import {
  query,
  send,
  transaction,
  args,
  arg,
  payer,
  proposer,
  authorizations,
  limit,
  authz,
  decode,
  tx,
} from "@onflow/fcl"
import BeastMarketSweep from "../BeastMarketSweep"
import QuickBidModal from "../QuickBidModal"

const Wrapper = styled.div`
  padding: 20px 20px 100px 20px;
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
  // overflow: hidden;
  // overflow-y: scroll;
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
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: space-between;
  clear: both;
  width: 100%;

  padding: 10px;
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
  color: #808080;
  line-height: 1.2em;
  @media (max-width: 360px) {
    font-size: 0.7em;
  }
`
const FilterButton = styled.button`
  background: #282e3a;
  border-radius: 10px;
  height: 40px;
  aspect-ratio: 1;
  color: white;
`
const BuyButton = styled.button`
  min-width: max-content;
  background: #f9df51;
  border-radius: 10px;
  height: 40px;
  color: black;
  font-size: 1.125rem;
  padding: 0 20px;
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
  // border: solid #808080 0.5px;
  background: #282e3a;
  outline: none;
  &::placeholder {
    color: #d0d8e1;
  }
  text-transform: uppercase;
  width: 200px;
  font-size: 1rem;
  color: #d0d8e1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  // padding-left: 15px;
  // margin-left: 20px;
  // margin-right: 18px;
  @media (max-width: 490px) {
    width: 150px;
    // margin: 0 15px;
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
  width: 200px;
  margin-left: 24px;
  background-color: #111823;
  color: #d0d8e1;
  border: solid #808080 0.5px;
  border-radius: 10px;
  @media (max-width: 490px) {
    width: 150px;
    // margin: 0 15px;
  }
`

const InputContainer = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  background: #282e3a;
  justify-content: space-between;
  grid-template-columns: 1fr auto;
  // border: 0.5px solid #808080;
  border-radius: 10px;
  padding: 0 10px;
`

const FuncArgInput = styled.input`
  background: transparent;

  border: none;
  color: #fff;
  font-size: 1rem;
  padding: 8px;
  padding-left: 15px;
  width: 100%;
  cursor: pointer;
  margin-bottom: 0;
  outline: none;
  &::placeholder {
    color: #d0d8e1;
    text-transform: uppercase;
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
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 12px 16px 0;
  // margin: 20px 10px 0;
  position: relative;
  z-index: 5;
  @media (max-width: 570px) {
    justify-content: space-between;
    padding: 0 20px;
  }
  @media (max-width: 440px) {
    flex-direction: column;
    align-items: end;
  }
`

const MenuButton = styled<any>(Menu.Button)`
  @media (max-width: 440px) {
    width: 100%;
  }
`
const DetailButton = styled.button<any>`
  position: relative;
  border: solid #808080 0.5px;
  border-radius: 10px;
  font-size: 16px;
  background: ${(props) => props.buttonColor};

  padding: 0 15px;
  &:hover {
    box-shadow: 2px 2px 5px 1px black;
  }
`
const Dialog = styled.dialog<any>`
  // position: absolute;
  // left: ${(props) => props.left}%;
  // right: ${(props) => props.right}%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: start;
  color: #fff;
  background: #111823;
  /* border: solid #808080 0.5px; */
  border-radius: 10px;
  min-width: max-content;
  z-index: 99999;

  @media (max-width: 420px) {
    position: fixed;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    border-radius: 0;
  }
`
const Attributes = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 75px;
  @media (max-width: 420px) {
    margin-bottom: 0;
  }
`
const AttributeBlock = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
  align-items: start;
  gap: 5px;
  font-size: 1.5rem;
  background: #212127;
  border-radius: 10px;
  color: grey;
  &:last-child {
    grid-column: 1 / 3;
    align-items: center;
    color: #f3cb23;
  }
  div {
    color: white;
  }
`
const P = styled.p`
  line-height: 0.5;
  text-transform: uppercase;
`
const TraitCount = styled.div`
  color: #f3cb23 !important;
  line-height: 0.75;
  font-size: 1.2rem;
`
const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 10px;
  color: lightgrey;
  width: 30px;
  height: 30px;
  font-size: 30px;
  padding: 0 0 6.5px 2px;
`
const MarketUl = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;

  // @media (min-width: 420px) {
  //   grid-template-columns: repeat(2, 1fr);
  // }
  // @media (min-width: 640px) {
  //   grid-template-columns: repeat(3, 1fr);
  // }
  // @media (min-width: 890px) {
  //   grid-template-columns: repeat(4, 1fr);
  // }
  // @media (min-width: 1080px) {
  //   grid-template-columns: repeat(5, 1fr);
  // }
`
const MobileMarket = styled.div`
  position: fixed;
  // display: flex;
  columns: 2;
  width: 100vw;
  justify-content: space-evenly;
  align-items: center;
  bottom: 0;
  left: 0;
  color: white;
  background: #111823;
  border-top: 1px solid grey;
  border-radius: 10px 10px 0 0;
  height: 5rem;
  z-index: 10;
`
const CartButton = styled.button`
  background: goldenrod;
  background-image: linear-gradient(
    -45deg,
    transparent,
    rgba(255, 255, 255, 0.5) 25%,
    transparent 90%
  );
  color: black;
  font-size: 1.2rem;
  padding: 1rem;
  height: max-content;
  border-radius: 8px;
`
const DropDown: FC<{
  beasts: any
  sortBy: any
  setSortBy: any
}> = ({ beasts, sortBy, setSortBy }) => {
  const sortByDexLowHigh = () => {
    if (beasts != null) {
      beasts.sort((a: any, b: any) => a.beastTemplateID - b.beastTemplateID)
      beasts.sort((a: any, b: any) => a.dexNumber - b.dexNumber)
    }
  }

  const sortByDexHighLow = () => {
    if (beasts != null) {
      beasts.sort((a: any, b: any) => a.beastTemplateID - b.beastTemplateID)
      beasts.sort((a: any, b: any) => b.dexNumber - a.dexNumber)
    }
  }

  const sortBySerialLowHigh = () => {
    if (beasts != null) {
      beasts.sort((a: any, b: any) => a.beastTemplateID - b.beastTemplateID)
      beasts.sort((a: any, b: any) => a.serialNumber - b.serialNumber)
    }
  }

  const sortBySerialHighLow = () => {
    if (beasts != null) {
      beasts.sort((a: any, b: any) => a.beastTemplateID - b.beastTemplateID)
      beasts.sort((a: any, b: any) => b.serialNumber - a.serialNumber)
    }
  }

  const sortByElement = () => {
    const dic = { Electric: 1, Water: 2, Grass: 3, Fire: 4, Normal: 5 }
    if (beasts != null) {
      beasts.sort((a: any, b: any) => {
        var aValue = 0
        var bValue = 0
        aValue = dic[a.elements[0] as keyof typeof dic]
        bValue = dic[b.elements[0] as keyof typeof dic]
        if (aValue < bValue) return -1
        if (aValue > bValue) return 1
        return 0
      })
    }
  }

  const sortByNicknameAZ = () => {
    if (beasts != null) {
      beasts.sort((a: any, b: any) => (a.nickname > b.nickname ? 1 : -1))
    }
  }

  const sortByNicknameZA = () => {
    if (beasts != null) {
      beasts.sort((a: any, b: any) => (a.nickname < b.nickname ? 1 : -1))
    }
  }

  const sortBySkinLowHigh = () => {
    const dic = {
      Normal: 1,
      "Metallic Silver": 2,
      "Cursed Black": 3,
      "Shiny Gold": 4,
      "Mythic Diamond": 5,
    }
    if (beasts != null) {
      beasts.sort((a: any, b: any) => {
        var aValue = 0
        var bValue = 0
        aValue = dic[a.skin as keyof typeof dic]
        bValue = dic[b.skin as keyof typeof dic]
        if (aValue < bValue) return -1
        if (aValue > bValue) return 1
        return 0
      })
    }
  }

  const sortBySkinHighLow = () => {
    const dic = {
      Normal: 1,
      "Metallic Silver": 2,
      "Cursed Black": 3,
      "Shiny Gold": 4,
      "Mythic Diamond": 5,
    }
    if (beasts != null) {
      beasts.sort((a: any, b: any) => {
        var aValue = 0
        var bValue = 0
        aValue = dic[a.skin as keyof typeof dic]
        bValue = dic[b.skin as keyof typeof dic]
        if (aValue < bValue) return 1
        if (aValue > bValue) return -1
        return 0
      })
    }
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton>
          <SortByButton>
            {sortBy}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </SortByButton>
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2  rounded-md focus:outline-none">
          <DropDownList>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <A
                    onClick={() => {
                      sortByDexLowHigh()
                      setSortBy("Dex No. (Low-High)")
                    }}
                    className={classNames(
                      active ? "bg-gray-700" : "",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Dex No. (Low-High)
                  </A>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <A
                    onClick={() => {
                      setSortBy("Dex No. (High-Low)")
                      sortByDexHighLow()
                    }}
                    className={classNames(
                      active ? "bg-gray-700" : "",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Dex No. (High-Low)
                  </A>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <A
                    onClick={() => {
                      setSortBy("Nickname (A-Z)")
                      sortByNicknameAZ()
                    }}
                    className={classNames(
                      active ? "bg-gray-700" : "",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Nickname A-Z
                  </A>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <A
                    onClick={() => {
                      setSortBy("Nickname (Z-A)")
                      sortByNicknameZA()
                    }}
                    className={classNames(
                      active ? "bg-gray-700" : "",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Nickname Z-A
                  </A>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <A
                    onClick={() => {
                      setSortBy("Serial (Low-High)")
                      sortBySerialLowHigh()
                    }}
                    className={classNames(
                      active ? "bg-gray-700" : "",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Serial (Low-High)
                  </A>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <A
                    onClick={() => {
                      setSortBy("Serial (High-Low)")
                      sortBySerialHighLow()
                    }}
                    className={classNames(
                      active ? "bg-gray-700" : "",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Serial (High-Low)
                  </A>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <A
                    onClick={() => {
                      setSortBy("Skin (High-Low)")
                      sortBySkinHighLow()
                    }}
                    className={classNames(
                      active ? "bg-gray-700" : "",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Skin (High-Low)
                  </A>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <A
                    onClick={() => {
                      setSortBy("Skin (Low-High)")
                      sortBySkinLowHigh()
                    }}
                    className={classNames(
                      active ? "bg-gray-700" : "",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Skin (Low-High)
                  </A>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <A
                    onClick={() => {
                      setSortBy("Element Type")
                      sortByElement()
                    }}
                    className={classNames(
                      active ? "bg-gray-700" : "",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Element Type
                  </A>
                )}
              </Menu.Item>
            </div>
          </DropDownList>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

type Color = {
  bgColor: any
}

type Props = {
  // count: any
  // selectedBeast: any
  // beasts: any
}

// const DialogInfo: FC<{
//   id: any
//   dialogOpen: any
//   beast: any
//   // left: any
//   // right: any
// }> = ({
//   id,
//   dialogOpen,
//   beast,
//   //  left, right
// }) => {
//   let centerX = document.documentElement.clientWidth / 2
//   let centerY = document.documentElement.clientHeight / 2

//   // console.log("X: " + centerX, "Y: " + centerY)

//   // const elem = document.getElementById(id)
//   // const box = elem?.getBoundingClientRect()
//   // console.log("Box: " + box?.x)
//   // var right = 50
//   // var left = 50
//   // if (box != null && box?.x > centerX) {
//   //   right = 0
//   // } else if (box != null && box?.x < centerX) {
//   //   left = 0
//   // } else {
//   //   left = 50
//   //   right = 50
//   // }

//   // console.log("left: " + left, "right: " + right)

//   return dialogOpen == true ? (
//     <Dialog
//       id={id}
//       //  left={left} right={right}
//     >
//       <div className="flex gap-2 leading-none">
//         {beast.nickname.length < 13 ? (
//           <div style={{ fontSize: "1.3em" }}>{beast.nickname}</div>
//         ) : (
//           <div style={{ fontSize: "1em" }}>{beast.nickname}</div>
//         )}
//         <div style={{ fontSize: "1.3em" }}>#{beast.serialNumber}</div>
//       </div>
//       <div style={{ marginLeft: "5px" }}>
//         Dex {"#" + ("00" + beast.dexNumber).slice(-3)}
//       </div>
//       <p style={{ color: "grey" }}>Attributes</p>
//       <Attributes>
//         <AttributeBlock>
//           <P>Skin</P>
//           <div>{beast.skin}</div>
//           <TraitCount>% have this trait</TraitCount>
//         </AttributeBlock>
//         <AttributeBlock>
//           <P>Element</P>
//           <div>{beast.elements}</div>
//           <TraitCount>% have this trait</TraitCount>
//         </AttributeBlock>
//         <AttributeBlock>
//           <P>Star Level</P>
//           <div>{beast.starLevel}</div>
//           <TraitCount>% have this trait</TraitCount>
//         </AttributeBlock>
//         <AttributeBlock>
//           <P>Gender</P>
//           <div>{beast.sex}</div>
//           <TraitCount>
//             % of {beast.name} <br /> have this trait
//           </TraitCount>
//         </AttributeBlock>
//         <AttributeBlock>
//           <P>Breeding Count</P>
//           <div>{beast.breedingCount}</div>
//           <TraitCount>% have this trait</TraitCount>
//         </AttributeBlock>
//         <AttributeBlock>
//           <P>Serial</P>
//           <div>{beast.serialNumber}</div>
//           <TraitCount>% have this trait</TraitCount>
//         </AttributeBlock>
//         <AttributeBlock>
//           <P>Number of Existing {beast.name}s</P>
//           <div>{beast.numberOfMintedBeastTemplates}</div>
//         </AttributeBlock>
//       </Attributes>
//       <p style={{ color: "grey" }}>Details</p>
//       <div className="flex w-full justify-between">
//         <p>Mint address</p>
//         <p style={{ color: "grey" }}>0x23948</p>
//       </div>
//     </Dialog>
//   ) : (
//     <></>
//   )
// }
// const ThumbnailDetailsFC: FC<{
//   beast: any
// }> = ({ beast }) => {
//   const [dialogOpen, setDialogOpen] = useState(false)
//   const [heart, setHeart] = useState<any>(heartEmpty)
//   const buttonColor = () => {
//     var color = "none"
//     {
//       dialogOpen == true ? (color = "#FEDD64") : (color = "none")
//     }
//     return color
//   }
//   var btnColor = buttonColor()
//   const heartChange = () => {
//     {
//       heart == heartEmpty ? setHeart(heartFull) : setHeart(heartEmpty)
//     }
//   }

//   // let centerX = document.documentElement.clientWidth / 2
//   // let centerY = document.documentElement.clientHeight / 2
//   // const elem = document.getElementById("element")
//   // const box = elem?.getBoundingClientRect()
//   // console.log("Box: " + box?.x)
//   // var right = 50
//   // var left = 50
//   // if (box != null && box?.x > centerX) {
//   //   right = 0
//   // } else if (box != null && box?.x < centerX) {
//   //   left = 0
//   // } else {
//   //   left = 50
//   //   right = 50
//   // }

//   return (
//     <div>
//       <ThumbnailDetails
//         style={{ borderRadius: "0 0 20px 20px" }}
//         bgColor={
//           beast.elements[0] == "Electric"
//             ? "#fff"
//             : beast.elements[0] == "Water"
//             ? "#fff"
//             : beast.elements[0] == "Grass"
//             ? "#fff"
//             : beast.elements[0] == "Fire"
//             ? "#fff"
//             : "#fff"
//         }
//       >
//         <ThumbnailLabel>
//           <div style={{ fontSize: "1.3em" }}>#{beast.serialNumber}</div>
//           {beast.nickname.length < 13 ? (
//             <div style={{ fontSize: "1.3em", color: "black" }}>
//               {beast.nickname}
//             </div>
//           ) : (
//             <div style={{ fontSize: "1em" }}>{beast.nickname}</div>
//           )}
//         </ThumbnailLabel>
//         <DetailButton
//           style={{ background: btnColor }}
//           onClick={() => setDialogOpen(!dialogOpen)}
//         >
//           Details
//           <DialogInfo
//             id="element"
//             dialogOpen={dialogOpen}
//             beast={beast}
//             // left={left} right={right}
//           />
//         </DetailButton>
//         <div className="flex gap-1 items-center">
//           <FontAwesomeIcon
//             onClick={() => heartChange()}
//             style={{ color: "grey" }}
//             icon={heart}
//           />{" "}
//           76
//         </div>
//         <div className="flex gap-1 justify-end">
//           {beast.price != null
//             ? parseFloat(beast.price).toFixed(2)
//             : "not for sale"}
//         </div>
//         <StarLevel>
//           {Array(beast.starLevel)
//             .fill(0)
//             .map((_, i) => (
//               <StarImg key={i} src={star.src} />
//             ))}
//         </StarLevel>
//       </ThumbnailDetails>
//     </div>
//   )
// }

const filterOptions = [
  {
    value: "",
    label: "All Genre",
  },
  {
    value: "skin",
    label: "Skin",
  },
  {
    value: "sex",
    label: "Gender",
  },
]

const BeastMarket: FC<Props> = () => {
  const [displayBeasts, setDisplayBeasts] = useState<any>(null)
  const [selectedBeast, setSelectedBeast] = useState<any>(null)
  const [quickBidOpen, setQuickBidOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [displayNickname, setDisplayNickname] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("SORT BY")

  const [search, setSearch] = useState<string | null>("")
  const [evolvedBeastId, setEvolvedBeastId] = useState(null)
  // const [dialogOpen, setDialogOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(true)
  const [sweepOpen, setSweepOpen] = useState(false)
  const [bulkBuyOpen, setBulkBuyOpen] = useState(false)
  const [bulkBidOpen, setBulkBidOpen] = useState(false)
  const [mobileCartOpen, setMobileCartOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [selectedFilters, setSelectedFilters] = useState<any>({
    dexNumber: [],
    skin: [],
    starLevel: [],
    element: [],
    serialNumber: [],
  })
  const [beasts, setBeasts] = useState<any>([])

  const [beastArray, setBeastArray] = useState<any>([])
  // console.log(beastArray)

  const [selectedBeasts, setSelectedBeasts] = useState<any>([])

  const [favoriteBeasts, setFavoriteBeasts] = useState<any>([])
  const [favoriteToggled, setFavoriteToggled] = useState(false)

  const selectBeast = (beast: any) => {
    if (!selectedBeasts.includes(beast)) {
      setSelectedBeasts((selectedBeasts: any) => [...selectedBeasts, beast])
    }
  }

  const deselectBeast = (beast: any) => {
    if (selectedBeasts.includes(beast)) {
      //remove
      setSelectedBeasts(selectedBeasts.filter((id: any) => beast != id))
    }
  }

  const openBulkBuy = () => {
    setBulkBuyOpen(true)
    setBulkBidOpen(false)
    setSweepOpen(false)
  }

  const openBulkBid = () => {
    setBulkBuyOpen(false)
    setBulkBidOpen(true)
    setSweepOpen(false)
  }

  const openSweep = () => {
    setBulkBuyOpen(false)
    setBulkBidOpen(false)
    setSweepOpen(true)
  }

  const buttonColor = (clrOpen: any) => {
    var btnColor = "none"
    var fontColor = "white"
    {
      clrOpen == true
        ? ((btnColor = "#FEDD64"), (fontColor = "black"))
        : ((btnColor = "#262935"), (fontColor = "white"))
    }
    return { btnColor, fontColor }
  }

  useEffect(() => {
    getAllBeasts()
  }, [])

  //When beasts changes
  useEffect(() => {
    if (beasts != null) {
      setDisplayBeasts(beasts)
    }
  }, [beasts])

  // When search changes
  useEffect(() => {
    if (search != "") {
      filterSerial(search)
    } else {
      setDisplayBeasts(beasts)
    }
  }, [search])

  const filterSerial = (filters: any) => {
    if (beasts != null) {
      const newBeasts = beasts.filter((beast: any) =>
        beast.serialNumber.toString().includes(filters.toString()),
      )
      // setElementFilter((elementFilter: any) => [...elementFilter, "Electric"])
      setDisplayBeasts(newBeasts)
    }
  }

  useEffect(() => {
    if (favoriteToggled) {
      console.log(favoriteToggled)
      // const newBeasts = displayBeasts.filter((beast: any) => {
      //   favoriteBeasts.includes(beast.id)
      // })
      console.log(favoriteBeasts)
      var newBeasts: any = []
      for (let key in displayBeasts) {
        var beast = displayBeasts[key]
        if (favoriteBeasts.includes(beast.id)) {
          newBeasts.push(beast)
        }
      }
      // setElementFilter((elementFilter: any) => [...elementFilter, "Electric"])
      setDisplayBeasts(newBeasts)
    } else {
      setDisplayBeasts(displayBeasts)
    }
    // console.log(favoriteBeasts.toString())
    // console.log(favoriteBeasts)
  }, [favoriteToggled])

  const [filter, setFilter] = useState<any>()

  const [filters, setFilters] = useState<any>([
    {
      id: "sex",
      name: "Gender",
      options: [
        { value: "Male", label: "Male", checked: false },
        { value: "Female", label: "Female", checked: false },
        { value: "Asexual", label: "Asexual", checked: false },
      ],
    },
  ])

  // useEffect(() => {
  //   alert("filters changed")
  // }, [filters.dexNumberOptions])

  useEffect(() => {
    // beasts.map((beast: any) => console.log("Nickname: " + beast.nickname))
    // Get skins
    const skins = beasts
      .map((beast: any) => beast.skin)
      .filter(
        (value: any, index: any, self: any) => self.indexOf(value) === index,
      )
    var skinOptions: any = []
    for (let key in skins) {
      let skin = skins[key]
      skinOptions.push({ value: skin, label: skin, checked: false })
    }
    const dic = {
      Normal: 1,
      "Metallic Silver": 2,
      "Cursed Black": 3,
      "Shiny Gold": 4,
      "Mythic Diamond": 5,
    }
    if (skinOptions.length > 0) {
      skinOptions.sort((a: any, b: any) => {
        var aValue = 0
        var bValue = 0
        aValue = dic[a.value as keyof typeof dic]
        bValue = dic[b.value as keyof typeof dic]
        if (aValue < bValue) return -1
        if (aValue > bValue) return 1
        return 0
      })
    }

    // Get element
    var elements: any = []
    beasts.map((beast: any) => {
      let beastElements = beast.elements
      for (let key in beastElements) {
        let element = beastElements[key]
        elements.push(element)
      }
    })
    elements = elements.filter(
      (value: any, index: any, self: any) => self.indexOf(value) === index,
    )
    var elementOptions: any = []
    for (let key in elements) {
      let element = elements[key]
      elementOptions.push({
        value: element,
        label: element,
        checked: false,
      })
    }
    const elementsDic = {
      Electric: 1,
      Water: 2,
      Grass: 3,
      Fire: 4,
      Normal: 5,
    }
    if (elementOptions.length > 0) {
      elementOptions.sort((a: any, b: any) => {
        var aValue = 0
        var bValue = 0
        aValue = elementsDic[elementOptions.value as keyof typeof elementsDic]
        bValue = elementsDic[elementOptions.value as keyof typeof elementsDic]
        if (aValue < bValue) return -1
        if (aValue > bValue) return 1
        return 0
      })
    }

    // Get star level
    const starLevels = beasts
      .map((beast: any) => beast.starLevel)
      .filter(
        (value: any, index: any, self: any) => self.indexOf(value) === index,
      )
    var starLevelOptions: any = []
    for (let key in starLevels) {
      let starLevel = starLevels[key]
      starLevelOptions.push({
        value: starLevel,
        label: starLevel,
        checked: false,
      })
    }
    // console.log(starLevels)

    // Get Dex Number e.g. value 1, label #001 Moon
    const dexNumbers = beasts
      .map((beast: any) => beast.dexNumber)
      .filter(
        (value: any, index: any, self: any) => self.indexOf(value) === index,
      )
    const beastNames: any = []
    beasts.map((beast: any) => (beastNames[beast.dexNumber] = beast.name))
    var dexNumberOptions: any = []
    for (let key in dexNumbers) {
      let dexNumber = dexNumbers[key]
      dexNumberOptions.push({
        value: dexNumber,
        label: "#" + ("00" + dexNumber).slice(-3) + " " + beastNames[dexNumber],
        checked: false,
      })
    }
    dexNumberOptions.sort((a: any, b: any) => a.value - b.value)

    // Get serial number
    const serialNumbers = beasts
      .map((beast: any) => beast.serialNumber)
      .filter(
        (value: any, index: any, self: any) => self.indexOf(value) === index,
      )
    var serialNumberOptions: any = []
    for (let key in serialNumbers) {
      let serialNumber = serialNumbers[key]
      serialNumberOptions.push({
        value: serialNumber,
        label: "#" + serialNumber,
        checked: false,
      })
    }

    serialNumberOptions.sort((a: any, b: any) => a.value - b.value)

    setFilters([
      { id: "dexNumber", name: "Dex Number", options: dexNumberOptions },
      { id: "skin", name: "Skin", options: skinOptions },
      { id: "starLevel", name: "Star Level", options: starLevelOptions },
      { id: "element", name: "Element", options: elementOptions },
      {
        id: "serialNumber",
        name: "Serial Number",
        options: serialNumberOptions,
      },
    ])
  }, [beasts])

  //function that filter beasts
  //(selectedFilter: any){}
  //beats.filter()

  const filterBeasts = (beasts: any, filters: any) => {
    return beasts.filter((beast: any) => {
      return (
        filters.dexNumber?.includes(beast.dexNumber) ||
        filters.skin?.includes(beast.skin) ||
        filters.starLevel?.includes(beast.starLevel) ||
        filters.element?.includes(beast.element) ||
        filters.serialNumber?.includes(beast.serialNumber)
      )
    })
  }

  const checkFilters = (filters: any): boolean => {
    return (
      filters.dexNumber.length == 0 &&
      filters.skin.length == 0 &&
      filters.starLevel.length == 0 &&
      filters.element.length == 0 &&
      filters.serialNumber.length == 0
    )
  }

  //useCallback
  //useMemo

  useEffect(() => {
    console.log("selectedFilters changed", selectedFilters)
    //{SELECTED FILTER}

    const newList = filterBeasts(beasts, selectedFilters)
    const checkFiltersResult = checkFilters(selectedFilters)

    setDisplayBeasts(checkFiltersResult ? beasts : newList)

    console.log("NEWLIST", newList)

    console.log("BEASTS", beasts)

    //setDisplayBeasts()
  }, [selectedFilters, beasts])

  const getAllBeasts = async () => {
    try {
      let res = await query({
        cadence: `
        import HunterScore from 0xHunterScore
        import BasicBeasts from 0xBasicBeasts

        pub fun main(): [{String:AnyStruct}] {

          let addresses = HunterScore.getHunterScores().keys
          var beasts: [{String: AnyStruct}] = []

          for address in addresses {
            let collectionRef = getAccount(address).getCapability(BasicBeasts.CollectionPublicPath)
            .borrow<&{BasicBeasts.BeastCollectionPublic}>()
            if (collectionRef != nil) {
              let IDs = collectionRef!.getIDs()
              var i = 0
              while i < IDs.length {
                let token = collectionRef!.borrowBeast(id: IDs[i])
                ?? panic("Couldn't borrow a reference to the specified beast")

                let beastTemplate = token.getBeastTemplate()

                var price: UFix64? = nil

                if (i%2==0) {
                  price = 69.0 + UFix64(i)
                }
                
                let beast = {
                  "name" : beastTemplate.name,
                  "nickname" : token.getNickname(),
                  "serialNumber" : token.serialNumber,
                  "dexNumber" : beastTemplate.dexNumber,
                  "skin" : beastTemplate.skin,
                  "starLevel" : beastTemplate.starLevel,
                  "elements" : beastTemplate.elements,
                  "basicSkills" : beastTemplate.basicSkills,
                  "ultimateSkill" : beastTemplate.ultimateSkill,
                  "currentOwner" : address,
                  "firstOwner" : token.getFirstOwner(),
                  "sex" : token.sex,
                  "breedingCount" : 0,
                  "numberOfMintedBeastTemplates" : 100,
                  "beastTemplateID" : beastTemplate.beastTemplateID,
                  "price" : price,
                  "id": token.id
                }

                beasts.insert(at:i, beast)
            
                i = i + 1
              }
            }
          }

          return beasts
        }
        `,
      })
      setBeasts(res)
      // console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <QuickBidModal
        open={quickBidOpen}
        setOpen={setQuickBidOpen}
        beast={selectedBeast}
      />
      <HeaderBeastCollection>
        <FilterButton
          style={{
            background: buttonColor(filterOpen).btnColor,
            color: buttonColor(filterOpen).fontColor,
          }}
          className="hidden lg:block"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          {" "}
          <FilterIcon className="mx-auto h-5 w-5" />
        </FilterButton>
        <FilterButton
          style={{
            background: buttonColor(filterOpen).btnColor,
            color: buttonColor(filterOpen).fontColor,
          }}
          className="lg:hidden"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <span className="sr-only">Filters</span>
          <FilterIcon className="mx-auto h-5 w-5" />
        </FilterButton>

        <InputContainer>
          <FuncArgInput
            placeholder="Search beasts serial number"
            type="text"
            value={search?.toString()}
            onChange={(e: any) => setSearch(e.target.value.toLowerCase())}
          />
          {search != "" && (
            <ClearButton onClick={() => setSearch("")}>x</ClearButton>
          )}
        </InputContainer>
        <DropDown
          beasts={displayBeasts}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <div className=" hidden md:flex gap-2">
          {/* <BuyButton
            style={{
              background: buttonColor(bulkBuyOpen).btnColor,
              color: buttonColor(bulkBuyOpen).fontColor,
            }}
            id="bulk"
            onClick={() => (
              setBulkBuyOpen(!bulkBuyOpen),
              setSweepOpen(false),
              setBulkBidOpen(false)
            )}
          >
            Bulk Buy
          </BuyButton> */}
          <BuyButton
            style={{
              background: buttonColor(bulkBidOpen).btnColor,
              color: buttonColor(bulkBidOpen).fontColor,
            }}
            id="bid"
            onClick={() => (
              setBulkBidOpen(!bulkBidOpen),
              setSweepOpen(false),
              setBulkBuyOpen(false)
            )}
          >
            Bulk Bid
          </BuyButton>
          {/* <BuyButton
            style={{
              background: buttonColor(sweepOpen).btnColor,
              color: buttonColor(sweepOpen).fontColor,
            }}
            id="sweep"
            onClick={() => (
              setSweepOpen(!sweepOpen),
              setBulkBuyOpen(false),
              setBulkBidOpen(false)
            )}
          >
            Sweep
          </BuyButton> */}
        </div>
      </HeaderBeastCollection>

      <Wrapper>
        <div className="flex ">
          {(filterOpen || mobileFiltersOpen) && (
            <div style={{ color: "white" }} className="h-max sticky top-0">
              <BeastMarketFilters
                filters={filters}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                mobileFiltersOpen={mobileFiltersOpen}
                setMobileFiltersOpen={setMobileFiltersOpen}
                favoriteToggled={favoriteToggled}
                setFavoriteToggled={setFavoriteToggled}
              />
            </div>
          )}
          {displayBeasts != null ? (
            <BeastMarketBeastList
              displayBeasts={displayBeasts}
              openBulkBid={openBulkBid}
              selectedBeasts={selectedBeasts}
              setSelectedBeasts={setSelectedBeasts}
              setSelectedBeast={setSelectedBeast}
              setQuickBidOpen={setQuickBidOpen}
              favoriteBeasts={favoriteBeasts}
              setFavoriteBeasts={setFavoriteBeasts}
              // setOpen={setOpen}
              // setDisplayNickname={setDisplayNickname}
            />
          ) : (
            // <MarketUl
            //   role="list"
            //   // className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5"
            // >
            //   {displayBeasts.map((beast: any) => (
            //     <li
            //       key={beast.id}
            //       className="relative"
            //       onClick={() => {
            //         setOpen(true)
            //         setSelectedBeast(beast)
            //         setDisplayNickname(null)
            //       }}
            //     >
            //       <div
            //         style={{
            //           borderRadius: "20px 20px 0 0",
            //         }}
            //         className="group block w-full aspect-w-9 aspect-h-7 bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"
            //       >
            //         <BeastMarketThumbnail
            //           onClick={() => setBeastArray([...beastArray, beast])}
            //           id={beast.id}
            //           className="object-cover group-hover:opacity-90"
            //           beastTemplateID={beast.beastTemplateID}
            //         />
            //       </div>
            //       {/* Make thumbnail details into a component and useState inside that component and add DialogInfo to it */}
            //       <ThumbnailDetailsFC beast={beast} />
            //     </li>
            //   ))}
            //   {/* To prevent big gap due to fixed height, which is needed for the scroll */}
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            //   <li></li>
            // </MarketUl>
            "No beasts found"
          )}

          {/* <div
            style={{
              border: ".5px solid #808080",
              borderRadius: "10px",
              maxWidth: "280px",
            }}
            className="h-max ml-5"
          > */}
          {bulkBuyOpen && (
            <div
              style={{
                color: "white",
                border: ".5px solid #808080",
                borderRadius: "10px",
                width: "280px",
              }}
              className="hidden md:block h-max ml-5 sticky top-0 "
            >
              <BeastMarketBulkBuy beastArray={beastArray} beasts={beasts} />
            </div>
          )}
          {bulkBidOpen && (
            <div
              style={{
                color: "white",
                border: ".5px solid #808080",
                borderRadius: "10px",
                width: "280px",
              }}
              className="hidden md:block h-max ml-5 sticky top-0"
            >
              <BeastMarketBulkBid
                selectedBeasts={selectedBeasts}
                deselectBeast={deselectBeast}
                setSelectedBeasts={setSelectedBeasts}
                beasts={beasts}
              />
            </div>
          )}
          {sweepOpen && (
            <div
              style={{
                color: "white",
                border: ".5px solid #808080",
                borderRadius: "10px",
                width: "280px",
              }}
              className="hidden md:block h-max ml-5 sticky top-0"
            >
              <BeastMarketSweep beasts={beasts} />
            </div>
          )}
          {/* </div> */}
        </div>
        <MobileMarket className="flex md:hidden">
          <div>Information is coming here</div>
          <CartButton onClick={() => setMobileCartOpen(true)}>
            View Cart
          </CartButton>
          <BeastMarketMobileCartModal
            beastArray={beastArray}
            beasts={beasts}
            open={mobileCartOpen}
            setOpen={setMobileCartOpen}
          />
        </MobileMarket>
      </Wrapper>
    </>
  )
}

export default BeastMarket
