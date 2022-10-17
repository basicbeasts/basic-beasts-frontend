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
import beastTemplates from "data/beastTemplates"

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
  font-size: 1em;
  color: #d0d8e1;
  &:hover {
    background: transparent;
  }
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
  font-size: 1em;
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
const Dialog = styled.dialog`
  position: absolute;
  left: 50%;
  right: 50%;
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
  beasts: any
}

const DialogInfo: FC<{ dialogOpen: any; beast: any }> = ({
  dialogOpen,
  beast,
}) => {
  let centerX = document.documentElement.clientWidth / 2
  let centerY = document.documentElement.clientHeight / 2
  var right = 50
  var left = 50
  console.log(centerX, centerY)

  return dialogOpen == true ? (
    <Dialog id="some-element" open>
      <div className="flex gap-2 leading-none">
        {beast.nickname.length < 13 ? (
          <div style={{ fontSize: "1.3em" }}>{beast.nickname}</div>
        ) : (
          <div style={{ fontSize: "1em" }}>{beast.nickname}</div>
        )}
        <div style={{ fontSize: "1.3em" }}>#{beast.serialNumber}</div>
      </div>
      <div style={{ marginLeft: "5px" }}>
        Dex {"#" + ("00" + beast.dexNumber).slice(-3)}
      </div>
      <p style={{ color: "grey" }}>Attributes</p>
      <Attributes>
        <AttributeBlock>
          <P>Skin</P>
          <div>{beast.skin}</div>
          <TraitCount>% have this trait</TraitCount>
        </AttributeBlock>
        <AttributeBlock>
          <P>Element</P>
          <div>{beast.elements}</div>
          <TraitCount>% have this trait</TraitCount>
        </AttributeBlock>
        <AttributeBlock>
          <P>Star Level</P>
          <div>{beast.starLevel}</div>
          <TraitCount>% have this trait</TraitCount>
        </AttributeBlock>
        <AttributeBlock>
          <P>Gender</P>
          <div>{beast.sex}</div>
          <TraitCount>
            % of {beast.name} <br /> have this trait
          </TraitCount>
        </AttributeBlock>
        <AttributeBlock>
          <P>Breeding Count</P>
          <div>{beast.breedingCount}</div>
          <TraitCount>% have this trait</TraitCount>
        </AttributeBlock>
        <AttributeBlock>
          <P>Serial</P>
          <div>{beast.serialNumber}</div>
          <TraitCount>% have this trait</TraitCount>
        </AttributeBlock>
        <AttributeBlock>
          <P>Number of Existing {beast.name}s</P>
          <div>{beast.numberOfMintedBeastTemplates}</div>
        </AttributeBlock>
      </Attributes>
      <p style={{ color: "grey" }}>Details</p>
      <div className="flex w-full justify-between">
        <p>Mint address</p>
        <p style={{ color: "grey" }}>0x23948</p>
      </div>
    </Dialog>
  ) : (
    <></>
  )
}
const ThumbnailDetailsFC: FC<{
  beast: any
}> = ({ beast }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [heart, setHeart] = useState<any>(heartEmpty)
  const buttonColor = () => {
    var color = "none"
    {
      dialogOpen == true ? (color = "#FEDD64") : (color = "none")
    }
    return color
  }
  var btnColor = buttonColor()
  const heartChange = () => {
    {
      heart == heartEmpty ? setHeart(heartFull) : setHeart(heartEmpty)
    }
  }
  return (
    <div>
      <ThumbnailDetails
        style={{ borderRadius: "0 0 20px 20px" }}
        bgColor={
          beast.elements[0] == "Electric"
            ? "#fff"
            : beast.elements[0] == "Water"
            ? "#fff"
            : beast.elements[0] == "Grass"
            ? "#fff"
            : beast.elements[0] == "Fire"
            ? "#fff"
            : "#fff"
        }
      >
        <ThumbnailLabel>
          <div style={{ fontSize: "1.3em" }}>#{beast.serialNumber}</div>
          {beast.nickname.length < 13 ? (
            <div style={{ fontSize: "1.3em", color: "black" }}>
              {beast.nickname}
            </div>
          ) : (
            <div style={{ fontSize: "1em" }}>{beast.nickname}</div>
          )}
        </ThumbnailLabel>
        <DetailButton
          style={{ background: btnColor }}
          onClick={() => setDialogOpen(!dialogOpen)}
        >
          Details
          <DialogInfo dialogOpen={dialogOpen} beast={beast} />
        </DetailButton>
        <div className="flex gap-1 items-center">
          <FontAwesomeIcon
            onClick={() => heartChange()}
            style={{ color: "grey" }}
            icon={heart}
          />{" "}
          76
        </div>
        <div className="flex gap-1 justify-end">760050</div>
        <StarLevel>
          {Array(beast.starLevel)
            .fill(0)
            .map((_, i) => (
              <StarImg key={i} src={star.src} />
            ))}
        </StarLevel>
      </ThumbnailDetails>
    </div>
  )
}

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

const BeastMarket: FC<Props> = ({ beasts }) => {
  const [displayBeasts, setDisplayBeasts] = useState<any>(null)
  const [selectedBeast, setSelectedBeast] = useState<any>(null)
  const [open, setOpen] = useState(false)
  const [displayNickname, setDisplayNickname] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("SORT BY")

  const [search, setSearch] = useState<string | null>("")
  const [evolvedBeastId, setEvolvedBeastId] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(true)

  useEffect(() => {
    if (beasts != null) {
      setDisplayBeasts(beasts)
    }
  }, [beasts])

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

  // const [filters, setFilters] = useState()

  // const createFiltersFromNfts = (nfts: any[]) => {
  //   const filters = nfts.reduce((acc, curr) => {
  //     const { metadata } = curr
  //     console.log("Metadata" + metadata)
  //     // const { cid, mimetype, path, uri, ...usefulMetadata } = metadata

  //     Object.entries(metadata).forEach(([category, trait]) => {
  //       let item = acc.get(category as any)

  //       // If the category doesn't exist, create it for future collections
  //       if (!item) {
  //         acc.set(category as any, new Map())
  //         item = acc.get(category as any)
  //       }

  //       const traitCount = (item?.get(trait) || 0) + 1
  //       item?.set(trait, traitCount)
  //     })

  //     return acc
  //   }, new Map())

  //   setFilters(filters)
  //   console.log(filters)
  // }

  const [filter, setFilter] = useState<any>()

  // var filters = [
  //   {
  //     id: "sex",
  //     name: "Gender",
  //     options: [
  //       { value: "Male", label: "Male", checked: false },
  //       { value: "Female", label: "Female", checked: false },
  //       { value: "Asexual", label: "Asexual", checked: false },
  //     ],
  //   },
  // ]

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

  const [bilters, setBilters] = useState<any>([
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

    console.log(elements)

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
    setFilters([
      { id: "skin", name: "Skin", options: skinOptions },
      { id: "starLevel", name: "Star Level", options: starLevelOptions },
      { id: "dexNumber", name: "Dex Numbers", options: dexNumberOptions },
    ])
  }, [])

  return (
    <>
      <HeaderBeastCollection>
        <Button onClick={() => setFilterOpen(!filterOpen)}>Filter</Button>

        <InputContainer>
          <FuncArgInput
            placeholder="Search beasts serial number"
            type="text"
            value={search?.toString()}
            onChange={(e: any) => setSearch(e.target.value.toLowerCase())}
          />
          <ClearButton onClick={() => setSearch("")}>x</ClearButton>
        </InputContainer>
        <DropDown
          beasts={displayBeasts}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </HeaderBeastCollection>

      <Wrapper>
        <div className="flex">
          {filterOpen && (
            <div style={{ color: "white" }}>
              {/* <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {filterOptions.map((option, i) => {
                  return (
                    <option value={option.value} key={i}>
                      {option.label}
                    </option>
                  )
                })}
              </select> */}
              <BeastMarketFilters filters={filters} />
              {/* <pre>{JSON.stringify(bilters, null, 2)}</pre> */}
            </div>
          )}
          {/* example buttons start */}
          {/* <span>
            <Button onClick={console.log(filterElementElectric)}>electric</Button>
            <Button onClick={filterElementFire}>fire</Button>
            <Button onClick={filterElementNormal}>normal</Button>
            <Button onClick={filterElementAll}>all</Button>
          </span> */}
          {/* example buttons end */}
          {/* <BeastModalView
            beast={selectedBeast}
            open={open}
            setOpen={setOpen}
            displayNickname={displayNickname}
            setDisplayNickname={setDisplayNickname}
            userAddr={userAddr}
            evolvableBeasts={evolvableBeasts}
            setEvolutionModalOpen={setEvolutionModalOpen}
            allEvolutionPairs={allEvolutionPairs}
            walletAddress={walletAddress}
          /> */}
          {displayBeasts != null ? (
            <MarketUl
              role="list"
              // className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5"
            >
              {displayBeasts.map((beast: any) => (
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
                    <BeastMarketThumbnail
                      id={beast.id}
                      className="object-cover group-hover:opacity-90"
                      beastTemplateID={beast.beastTemplateID}
                    />
                  </div>
                  {/* Make thumbnail details into a component and useState inside that component and add DialogInfo to it */}
                  <ThumbnailDetailsFC beast={beast} />
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
            </MarketUl>
          ) : (
            "No beasts found"
          )}
        </div>
      </Wrapper>
    </>
  )
}

export default BeastMarket
