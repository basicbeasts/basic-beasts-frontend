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
    <MenuWrapper>
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
          <MenuItems className="origin-top-right absolute right-0 mt-2 w-56 rounded-md focus:outline-none">
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
          </MenuItems>
        </Transition>
      </Menu>
    </MenuWrapper>
  )
}

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
}

const eggs = [
  {
    id: 1,
    incubationDateEnding: 2,
  },
  {
    id: 2,
    incubationDateEnding: 2,
  },
  {
    id: 3,
    incubationDateEnding: 2,
  },
]

const EggTab: FC<Props> = ({
  beasts,
  fetchUserBeasts,
  userAddr,
  evolvableBeasts,
  allEvolutionPairs,
  getPersonalDexicon,
  walletAddress,
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
      <HeaderBeastCollection>
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
      </HeaderBeastCollection>
      <Wrapper>
        {/* example buttons start */}
        {/* <span>
          <Button onClick={console.log(filterElementElectric)}>electric</Button>
          <Button onClick={filterElementFire}>fire</Button>
          <Button onClick={filterElementNormal}>normal</Button>
          <Button onClick={filterElementAll}>all</Button>
        </span> */}

        {/* example buttons end */}

        <BeastModalView
          beast={selectedBeast}
          open={open}
          setOpen={setOpen}
          fetchUserBeasts={fetchUserBeasts}
          displayNickname={displayNickname}
          setDisplayNickname={setDisplayNickname}
          userAddr={userAddr}
          evolvableBeasts={evolvableBeasts}
          setEvolutionModalOpen={setEvolutionModalOpen}
          allEvolutionPairs={allEvolutionPairs}
          getPersonalDexicon={getPersonalDexicon}
          walletAddress={walletAddress}
        />
        <EvolutionModal
          handleClose={() => setEvolutionModalOpen(false)}
          RevealModalOpen={evolutionModalOpen}
          packId={selectedBeast?.beastTemplateID || "1"}
          evolvedBeastId={evolvedBeastId}
        />
        {displayBeasts != null ? (
          <ul
            role="list"
            className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5"
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
                      {beast.nickname.length < 13 ? (
                        <div style={{ fontSize: "1.3em" }}>
                          {beast.nickname}
                        </div>
                      ) : (
                        <div style={{ fontSize: "1em" }}>{beast.nickname}</div>
                      )}

                      <div style={{ fontSize: "1.3em" }}>
                        #{beast.serialNumber} |{" "}
                        {beast.maxAdminMintAllowed <= 1000 &&
                        beast.maxAdminMintAllowed != 0
                          ? beast.maxAdminMintAllowed
                          : "?"}
                      </div>
                    </ThumbnailLabel>
                    <ThumbnailLabel
                      style={{
                        float: "left",
                        marginTop: "18px",
                        marginLeft: "3px",
                        opacity: "0.2",
                      }}
                    >
                      <>{beast?.sex === "Male" ? "♂" : "♀"}</>
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
