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
import { NextRouter, useRouter } from "next/dist/client/router"

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
import ListBeastForSaleModal from "../ListBeastForSaleModal"
import { useUser } from "@components/user/UserProvider"
import PlaceABidModal from "../PlaceABidModal"
import router from "next/router"

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

const FilterButton = styled.button`
  background: #282e3a;
  border-radius: 10px;
  height: 40px;
  aspect-ratio: 1;
  color: white;
`
const FilterButtonMobile = styled.button`
  border-radius: 10px;
  background: #282e3a;
  outline: none;
  &::placeholder {
    color: #d0d8e1;
  }
  text-transform: uppercase;
  width: 45vw;
  gap: 7px;
  font-size: 1rem;
  color: #d0d8e1;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 8px;
  @media (max-width: 420px) {
    display: flex;
  }
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
  @media (max-width: 420px) {
    display: none;
  }
`

const SortByButtonMobile = styled.div`
  border-radius: 10px;
  background: #282e3a;
  outline: none;
  &::placeholder {
    color: #d0d8e1;
  }
  text-transform: uppercase;
  width: 45vw;
  gap: 7px;
  font-size: 1rem;
  color: #d0d8e1;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 8px;
  @media (max-width: 420px) {
    display: flex;
  }
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
    // flex-direction: column;
    // align-items: end;
    display: none;
  }
`

const MenuButton = styled<any>(Menu.Button)`
  @media (max-width: 440px) {
    width: 100%;
  }
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

const HeaderBeastCollectionMobile = styled.div`
  display: none;
  @media (max-width: 440px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 12px 16px 0;
    // margin: 20px 10px 0;
    position: relative;
    z-index: 5;
  }
`
const MobileWrapperFilters = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
`

const DropDown: FC<{
  beasts: any
  sortBy: any
  setSortBy: any
}> = ({ beasts, sortBy, setSortBy }) => {
  const sortByPriceLowHigh = () => {
    if (beasts != null) {
      beasts.sort((a: any, b: any) => a.beastTemplateID - b.beastTemplateID)
      beasts.sort((a: any, b: any) => {
        if (a.price == null || a.price === 0) {
          return 1
        } else if (b.price == null || b.price === 0) {
          return -1
        } else {
          return a.price - b.price
        }
      })
      // beasts.sort((a: any, b: any) => a.price - b.price)
    }
  }
  const sortByPriceHighLow = () => {
    if (beasts != null) {
      beasts.sort((a: any, b: any) => a.beastTemplateID - b.beastTemplateID)
      beasts.sort((a: any, b: any) => b.price - a.price)
    }
  }

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
          <SortByButtonMobile>
            <img className="w-6" src="/sort_icon.png" alt="Sort_Icon" />
            {sortBy}
          </SortByButtonMobile>
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
                      sortByPriceLowHigh()
                      setSortBy("Price (Low-High)")
                    }}
                    className={classNames(
                      active ? "bg-gray-700" : "",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Price (Low-High)
                  </A>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <A
                    onClick={() => {
                      sortByPriceHighLow()
                      setSortBy("Price (High-Low)")
                    }}
                    className={classNames(
                      active ? "bg-gray-700" : "",
                      "block px-4 py-2 text-sm",
                    )}
                  >
                    Price (High-Low)
                  </A>
                )}
              </Menu.Item>
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
  const [listBeastForSaleOpen, setListBeastForSaleOpen] = useState(false)
  const [placeABidOpen, setPlaceABidOpen] = useState(false)
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

  const [beastArray, setBeastArray] = useState<any>([])

  const [selectedBeasts, setSelectedBeasts] = useState<any>([])

  const [favoriteBeasts, setFavoriteBeasts] = useState<any>([])
  const [favoriteToggled, setFavoriteToggled] = useState(false)
  const [ownedToggled, setOwnedToggled] = useState(false)

  const { beasts, getAllBeasts, userBeasts } = useUser()

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
      // setDisplayBeasts(beasts) // Problem
      const newList = filterBeasts(beasts, selectedFilters)
      const checkFiltersResult = checkFilters(selectedFilters)

      setDisplayBeasts(checkFiltersResult ? beasts : newList)
    }
  }, [search])

  const filterSerial = (filters: any) => {
    if (beasts != null) {
      let testBeasts = displayBeasts
      const newBeasts = testBeasts.filter((beast: any) =>
        beast.serialNumber.toString().includes(filters.toString()),
      )
      // setElementFilter((elementFilter: any) => [...elementFilter, "Electric"])
      setDisplayBeasts(newBeasts)
    }
  }

  //
  useEffect(() => {
    if (favoriteToggled) {
      // const newBeasts = displayBeasts.filter((beast: any) => {
      //   favoriteBeasts.includes(beast.id)
      // })
      var newBeasts: any = []
      for (let key in displayBeasts) {
        var beast = displayBeasts[key]
        if (favoriteBeasts.includes(beast.id)) {
          newBeasts.push(beast)
        }
      }
      // setElementFilter((elementFilter: any) => [...elementFilter, "Electric"])
      setDisplayBeasts(newBeasts)
    } else if (ownedToggled) {
      var newBeasts: any = []
      for (let key in beasts) {
        var beast = beasts[key]
        if (userBeasts?.map((beast: any) => beast.id).includes(beast.id)) {
          newBeasts.push(beast)
        }
      }
      setDisplayBeasts(newBeasts)
    } else {
      setDisplayBeasts(beasts)
    }
  }, [favoriteToggled])

  useEffect(() => {
    if (ownedToggled) {
      var newBeasts: any = []
      for (let key in displayBeasts) {
        var beast = displayBeasts[key]
        if (userBeasts?.map((beast: any) => beast.id).includes(beast.id)) {
          newBeasts.push(beast)
        }
      }
      setDisplayBeasts(newBeasts)
    } else if (favoriteToggled) {
      var newBeasts: any = []
      for (let key in beasts) {
        var beast = beasts[key]
        if (favoriteBeasts.includes(beast.id)) {
          newBeasts.push(beast)
        }
      }
      setDisplayBeasts(newBeasts)
    } else {
      setDisplayBeasts(beasts)
    }
  }, [ownedToggled])

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

  useEffect(() => {
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

  const router = useRouter()

  // Takes the values of the selectedFilters and returns it as a string
  const showFilterKeyPlusValue = () => {
    let filtersPlusValue = []
    for (let i in selectedFilters) {
      if (selectedFilters[i].length >= 1) {
        filtersPlusValue.push(`${i}=${selectedFilters[i].join(",")}`)
      }
    }
    return filtersPlusValue
  }

  const [sortObj, setSortObj] = useState({})

  // Change the url string based on filter and sort states
  useEffect(() => {
    let activeFilters = showFilterKeyPlusValue()
    let filterObject: Record<string, any> = {}

    activeFilters?.forEach((activeFilter) => {
      const [key, value] = activeFilter.split("=")
      filterObject[key] = value
    })

    if (Object.keys(filterObject).length > 0) {
      // If not empty then add the filter object and sort object
      router.replace(
        {
          pathname: "/marketplace",
          query: { ...filterObject, ...sortObj },
        },
        undefined,
        { shallow: true },
      ) // shallow true, to avoid page from doing hard-reload when selecting filters
    } else if (Object.keys(filterObject).length === 0 && router.query) {
      // If empty, then add only sort object
      router.replace(
        {
          pathname: "/marketplace",
          query: { ...sortObj },
        },
        undefined,
        { shallow: true },
      )
    }
  }, [selectedFilters, sortObj])

  // Set sort object
  useEffect(() => {
    if (sortBy !== "SORT BY") {
      setSortObj({ sort: sortBy })
    }
  }, [sortBy])

  const { query } = router
  // Reads the url and update the filters and sort state.
  useEffect(() => {
    const { sort } = query
    let changeValues = query
    if (sort) {
      setSortBy(typeof query.sort === "string" ? query.sort : "Sort By")
      changeValues = Object.entries(query)
        .filter(([key]) => key !== "sort")
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
    }
    handleMassChange(changeValues)
    // handleMassChange(query) // if anything breaks cuz of the sorting just comment the code above and uncomment this one
  }, [query])

  useEffect(() => {
    const { sort } = query
    if (!beasts || !beasts.length) {
      return
    }
    switch (sort) {
      case "Price (Low-High)":
        beasts.sort((a: any, b: any) => a.beastTemplateID - b.beastTemplateID)
        beasts.sort((a: any, b: any) => {
          if (a.price == null || a.price === 0) {
            return 1
          } else if (b.price == null || b.price === 0) {
            return -1
          } else {
            return a.price - b.price
          }
        })
        break

      case "Price (High-Low)":
        beasts.sort((a: any, b: any) => a.beastTemplateID - b.beastTemplateID)
        beasts.sort((a: any, b: any) => b.price - a.price)
        break

      case "Dex No. (Low-High)":
        beasts.sort((a: any, b: any) => a.beastTemplateID - b.beastTemplateID)
        beasts.sort((a: any, b: any) => a.dexNumber - b.dexNumber)
        break

      case "Dex No. (High-Low)":
        beasts.sort((a: any, b: any) => a.beastTemplateID - b.beastTemplateID)
        beasts.sort((a: any, b: any) => b.dexNumber - a.dexNumber)
        break

      case "Nickname A-Z":
        beasts.sort((a: any, b: any) => (a.nickname > b.nickname ? 1 : -1))
        break

      case "Nickname Z-A":
        beasts.sort((a: any, b: any) => (a.nickname < b.nickname ? 1 : -1))
        break

      case "Serial (Low-High)":
        beasts.sort((a: any, b: any) => a.beastTemplateID - b.beastTemplateID)
        beasts.sort((a: any, b: any) => a.serialNumber - b.serialNumber)
        break

      case "Serial (High-Low)":
        beasts.sort((a: any, b: any) => a.beastTemplateID - b.beastTemplateID)
        beasts.sort((a: any, b: any) => b.serialNumber - a.serialNumber)
        break

      case "Skin (Low-High)":
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
        break

      case "Skin (High-Low)":
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
        break

      case "Element Type":
        const dict = { Electric: 1, Water: 2, Grass: 3, Fire: 4, Normal: 5 }
        if (beasts != null) {
          beasts.sort((a: any, b: any) => {
            var aValue = 0
            var bValue = 0
            aValue = dict[a.elements[0] as keyof typeof dict]
            bValue = dict[b.elements[0] as keyof typeof dict]
            if (aValue < bValue) return -1
            if (aValue > bValue) return 1
            return 0
          })
        }
        break
    }
  }, [beasts, query])

  const handleMassChange = (query?: any) => {
    if (Object.keys(query).length > 0) {
      const selectedFiltersMockup: any = {
        dexNumber: [],
        skin: [],
        starLevel: [],
        element: [],
        serialNumber: [],
      }
      for (const i in query) {
        if (!query[i].includes(",")) {
          selectedFiltersMockup[i].push(query[i])
        } else {
          const valuesArr = query[i].split(",")
          for (const k in valuesArr) {
            selectedFiltersMockup[i].push(valuesArr[k])
          }
        }
      }
      if (
        JSON.stringify(selectedFilters) !==
        JSON.stringify(selectedFiltersMockup)
      ) {
        setSelectedFilters(selectedFiltersMockup)
      }
    }
  }

  const filterBeasts = (beasts: any, filters: any) => {
    return beasts.filter((beast: any) => {
      return (
        (filters.dexNumber?.length == 0 ||
          filters.dexNumber?.includes(beast.dexNumber)) &&
        (filters.skin?.length == 0 || filters.skin?.includes(beast.skin)) &&
        (filters.starLevel?.length == 0 ||
          filters.starLevel?.includes(beast.starLevel)) &&
        (filters.element?.length == 0 ||
          filters.element?.every((e: any) => beast.elements.includes(e))) &&
        (filters.serialNumber?.length == 0 ||
          filters.serialNumber?.includes(beast.serialNumber))
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

  // SETS BEASTS FOR DISPLAY AFTER FILTERS
  useEffect(() => {
    const newList = filterBeasts(beasts, selectedFilters)
    const checkFiltersResult = checkFilters(selectedFilters)
    setDisplayBeasts(checkFiltersResult ? beasts : newList)
  }, [selectedFilters, beasts])

  // const getAllBeasts = async () => {
  //   try {
  //     let res = await query({
  //       cadence: `
  //       import HunterScore from 0xHunterScore
  //       import BasicBeasts from 0xBasicBeasts

  //       pub fun main(): [{String:AnyStruct}] {

  //         let addresses = HunterScore.getHunterScores().keys
  //         var beasts: [{String: AnyStruct}] = []

  //         for address in addresses {
  //           let collectionRef = getAccount(address).getCapability(BasicBeasts.CollectionPublicPath)
  //           .borrow<&{BasicBeasts.BeastCollectionPublic}>()
  //           if (collectionRef != nil) {
  //             let IDs = collectionRef!.getIDs()
  //             var i = 0
  //             while i < IDs.length {
  //               let token = collectionRef!.borrowBeast(id: IDs[i])
  //               ?? panic("Couldn't borrow a reference to the specified beast")

  //               let beastTemplate = token.getBeastTemplate()

  //               var price: UFix64? = nil

  //               if (i%2==0) {
  //                 price = 69.0 + UFix64(i)
  //               }

  //               let beast = {
  //                 "name" : beastTemplate.name,
  //                 "nickname" : token.getNickname(),
  //                 "serialNumber" : token.serialNumber,
  //                 "dexNumber" : beastTemplate.dexNumber,
  //                 "skin" : beastTemplate.skin,
  //                 "starLevel" : beastTemplate.starLevel,
  //                 "elements" : beastTemplate.elements,
  //                 "basicSkills" : beastTemplate.basicSkills,
  //                 "ultimateSkill" : beastTemplate.ultimateSkill,
  //                 "currentOwner" : address,
  //                 "firstOwner" : token.getFirstOwner(),
  //                 "sex" : token.sex,
  //                 "breedingCount" : 0,
  //                 "numberOfMintedBeastTemplates" : 100,
  //                 "beastTemplateID" : beastTemplate.beastTemplateID,
  //                 "price" : price,
  //                 "id": token.id
  //               }

  //               beasts.insert(at:i, beast)

  //               i = i + 1
  //             }
  //           }
  //         }

  //         return beasts
  //       }
  //       `,
  //     })
  //     setBeasts(res)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <>
      <ListBeastForSaleModal
        open={listBeastForSaleOpen}
        setOpen={setListBeastForSaleOpen}
        beast={selectedBeast}
      />
      <PlaceABidModal
        open={placeABidOpen}
        setOpen={setPlaceABidOpen}
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
        {/* Wait with bulk buy, bulk bid, sweep */}
        {/* <div className=" hidden md:flex gap-2">
          <BuyButton
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
          </BuyButton>
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
          <BuyButton
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
          </BuyButton>
        </div> */}
      </HeaderBeastCollection>
      <HeaderBeastCollectionMobile>
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
        <MobileWrapperFilters>
          <FilterButtonMobile
            style={{
              background: "#282e3a",
              color: "#d0d8e1",
            }}
            className="lg:hidden"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <img className="w-6" src="/sort_icon.png" alt="Sort_Icon" />
            <span className="not-sr-only">Filters</span>
            {/* <FilterIcon className="mx-auto h-5 w-5" /> */}
          </FilterButtonMobile>

          <DropDown
            beasts={displayBeasts}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </MobileWrapperFilters>
      </HeaderBeastCollectionMobile>

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
                ownedToggled={ownedToggled}
                setOwnedToggled={setOwnedToggled}
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
              setListBeastForSaleOpen={setListBeastForSaleOpen}
              favoriteBeasts={favoriteBeasts}
              setFavoriteBeasts={setFavoriteBeasts}
              setPlaceABidOpen={setPlaceABidOpen}
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
        {/* wait with this */}
        {/* <MobileMarket className="flex md:hidden">
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
        </MobileMarket> */}
      </Wrapper>
    </>
  )
}

export default BeastMarket
