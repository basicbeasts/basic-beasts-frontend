import { FC, useEffect, useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt, faTimes } from "@fortawesome/free-solid-svg-icons"
import NextLink from "next/link"
import { useAuth } from "@components/auth/AuthProvider"
import externalLinkIcon from "public/basic_external_link.png"
import PackRevealCard from "../PackRevealCard"
import StarterImg from "public/packs/pack_pf_v2/starter_pack_reveal.png"
import MetallicImg from "public/packs/pack_pf_v2/metallic_silver_pack_reveal.png"
import CursedImg from "public/packs/pack_pf_v2/cursed_black_pack_reveal.png"
import ShinyImg from "public/packs/pack_pf_v2/shiny_gold_pack_reveal.png"
import PackRevealModal from "../PackRevealModal"
import PersonalDexiconModal from "../PersonalDexiconModal"
import BeastModalView from "../BeastModalView"
import ChangeNicknameModal from "../ChangeNicknameModal"
import ChangeProfilePictureModal from "../ChangeProfilePictureModal"
import PackRevealManyModal from "../PackRevealManyModal"
import { useUser } from "@components/user/UserProvider"

const SideNavbarContainer = styled.div<{
  isSideNavbarOpen: boolean
}>`
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: #111823;
  align-items: center;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isSideNavbarOpen }) => (isSideNavbarOpen ? "100%" : "0")};
  top: ${({ isSideNavbarOpen }) => (isSideNavbarOpen ? "0" : "-100%")};
  visibility: ${({ isSideNavbarOpen }) =>
    isSideNavbarOpen ? "visible" : "hidden"};
`

const CloseIcon = styled(FontAwesomeIcon)`
  color: #fff;
`

const Icon = styled.div`
  position: absolute;
  /* top: 1.2rem; */
  background: transparent;
  font-size: 2rem;
  outline: none;
  color: #fff;
  font-size: 100px;
  left: 50px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  z-index: 19;
  //Responsive
  @media (max-width: 600px) {
    font-size: 70px;
    right: 10px;
  }
`

const SideNavbarWrapper = styled.div<{
  isSideNavbarOpen: boolean
}>`
  display: ${({ isSideNavbarOpen }) => (isSideNavbarOpen ? "grid" : "none")};
  padding: 35px 20vw 0px;
  z-index: 1;

  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;

  @media (max-width: 1140px) {
    width: 100%;
  }
  @media (max-width: 400px) {
    padding: 35px 5vw 0px;
  }
  //Scroll in div width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  height: 550px;
  margin-top: 20px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`

const Title = styled.div`
  text-transform: uppercase;
  color: #e4be23;
  text-align: center;
  font-size: 4em;
  margin: 100px 0 50px;
`

const ButtonWrapper = styled.div`
  margin: 50px 0 10px;
  text-align: center;
  width: 100%;
`

const Button = styled.button<{
  borderColor: string
  insetBorderColor: string
  bgColor: string
  fontColor: string
}>`
  text-transform: uppercase;
  padding: 2px 20px 5px;
  font-size: 1.5em;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fontColor};

  box-shadow: ${(props) =>
    `-3px 0px 0px 0px ${props.borderColor}, 0px -3px 0px 0px ${props.borderColor}, 0px 3px 0px 0px ${props.borderColor}, 
    3px 0px 0px 0px ${props.borderColor}, inset -3px -3px ${props.insetBorderColor}`};

  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  @media (max-width: 1010px) {
    font-size: 2em;
  }
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: ${(
      props,
    ) => `-3px 0px 0px 0px ${props.borderColor}, 0px -3px 0px 0px ${props.borderColor},
      0px 3px 0px 0px ${props.borderColor}, 3px 0px 0px 0px ${props.borderColor}, inset 3px 3px ${props.insetBorderColor}`};
  }
`

type Props = {
  isSideNavbarOpen: boolean
  toggle: () => void
  selectedPackType: any
  starterPacks: any
  metallicPacks: any
  cursedPacks: any
  shinyPacks: any
  fetchUserBeasts: any
  fetchSushi: any
  fetchEmptyPotionBottle: any
  fetchPoop: any
  setNewBeast: any
  setNewTokens: any
  getPersonalDexicon: any
  packCount: any
}

const RevealOverlay: FC<Props> = ({
  isSideNavbarOpen,
  toggle,
  selectedPackType,
  starterPacks,
  metallicPacks,
  cursedPacks,
  shinyPacks,
  fetchUserBeasts,
  fetchSushi,
  fetchEmptyPotionBottle,
  fetchPoop,
  setNewBeast,
  setNewTokens,
  getPersonalDexicon,
  packCount,
}: Props) => {
  const { logIn, logOut, user, loggedIn } = useAuth()
  const [selectedPack, setSelectedPack] = useState<string | "0">("0")
  const [packsToUnpack, setPacksToUnpack] = useState<any>()
  const { fetchHunterData } = useUser()

  //Modal
  const [RevealModalOpen, setRevealModalOpen] = useState(false)
  const [RevealManyModalOpen, setRevealManyModalOpen] = useState(false)

  useEffect(() => {
    if (selectedPackType == "1") {
      setPacksToUnpack(starterPacks)
    }
    if (selectedPackType == "2") {
      setPacksToUnpack(metallicPacks)
    }
    if (selectedPackType == "3") {
      setPacksToUnpack(cursedPacks)
    }
    if (selectedPackType == "4") {
      setPacksToUnpack(shinyPacks)
    }
  }, [selectedPackType])

  const close = () => {
    setRevealModalOpen(false)
  }

  const open = () => {
    setRevealModalOpen(true)
  }

  let packType = "Starter"
  switch (parseInt(selectedPackType)) {
    case 2:
      packType = "Metallic Silver"
      break
    case 3:
      packType = "Cursed Black"
      break
    case 4:
      packType = "Shiny Gold"
      break
  }

  const handleManyPacksReveal = (selectedPackType: any) => {}

  return (
    <SideNavbarContainer isSideNavbarOpen={isSideNavbarOpen}>
      {/**TODO: On close. Refetch packs from blockchain.
       * This is to make sure we won't show unpacked beasts again.
       */}
      {RevealModalOpen && (
        <PackRevealModal
          RevealModalOpen={RevealModalOpen}
          handleClose={close}
          packId={selectedPack}
        />
      )}
      {RevealManyModalOpen && (
        <PackRevealManyModal
          open={RevealManyModalOpen}
          setOpen={setRevealManyModalOpen}
          packs={packsToUnpack}
          profile={null}
          profilePicture={null}
          setProfilePicture={null}
          getProfile={null}
        />
      )}
      <Icon
        onClick={() => {
          toggle()
          fetchHunterData()
        }}
      >
        {"<"}
      </Icon>
      <Title>{packType} Packs</Title>
      <SideNavbarWrapper isSideNavbarOpen={isSideNavbarOpen}>
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-1 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
        >
          {selectedPackType == "1" ? (
            <>
              {starterPacks.map(({ id }: any) => (
                <li key={id} className="relative">
                  <PackRevealCard
                    packImage={StarterImg}
                    pack={starterPacks[id]}
                    revealModalOpen={open}
                    selectPack={setSelectedPack}
                    fetchUserBeasts={fetchUserBeasts}
                    fetchSushi={fetchSushi}
                    fetchEmptyPotionBottle={fetchEmptyPotionBottle}
                    fetchPoop={fetchPoop}
                    setNewBeast={setNewBeast}
                    setNewTokens={setNewTokens}
                    getPersonalDexicon={getPersonalDexicon}
                  />
                </li>
              ))}
            </>
          ) : (
            ""
          )}
          {selectedPackType == "2" ? (
            <>
              {metallicPacks.map(({ id }: any) => (
                <li key={id} className="relative">
                  <PackRevealCard
                    packImage={MetallicImg}
                    pack={metallicPacks[id]}
                    revealModalOpen={open}
                    selectPack={setSelectedPack}
                    fetchUserBeasts={fetchUserBeasts}
                    fetchSushi={fetchSushi}
                    fetchEmptyPotionBottle={fetchEmptyPotionBottle}
                    fetchPoop={fetchPoop}
                    setNewBeast={setNewBeast}
                    setNewTokens={setNewTokens}
                    getPersonalDexicon={getPersonalDexicon}
                  />
                </li>
              ))}
            </>
          ) : (
            ""
          )}
          {selectedPackType == "3" ? (
            <>
              {cursedPacks.map(({ id }: any) => (
                <li key={id} className="relative">
                  <PackRevealCard
                    packImage={CursedImg}
                    pack={cursedPacks[id]}
                    revealModalOpen={open}
                    selectPack={setSelectedPack}
                    fetchUserBeasts={fetchUserBeasts}
                    fetchSushi={fetchSushi}
                    fetchEmptyPotionBottle={fetchEmptyPotionBottle}
                    fetchPoop={fetchPoop}
                    setNewBeast={setNewBeast}
                    setNewTokens={setNewTokens}
                    getPersonalDexicon={getPersonalDexicon}
                  />
                </li>
              ))}
            </>
          ) : (
            ""
          )}
          {selectedPackType == "4" ? (
            <>
              {shinyPacks.map(({ id }: any) => (
                <li key={id} className="relative">
                  <PackRevealCard
                    packImage={ShinyImg}
                    pack={shinyPacks[id]}
                    revealModalOpen={open}
                    selectPack={setSelectedPack}
                    fetchUserBeasts={fetchUserBeasts}
                    fetchSushi={fetchSushi}
                    fetchEmptyPotionBottle={fetchEmptyPotionBottle}
                    fetchPoop={fetchPoop}
                    setNewBeast={setNewBeast}
                    setNewTokens={setNewTokens}
                    getPersonalDexicon={getPersonalDexicon}
                  />
                </li>
              ))}
            </>
          ) : (
            ""
          )}
        </ul>
      </SideNavbarWrapper>
      {/* TODO: Hide reveal all button on mobile
        And remember to make sure the number in the button change when the packs.length decreasing after unpacking.
      */}
      <ButtonWrapper>
        <Button
          borderColor={
            selectedPackType === "1"
              ? "#2C323B"
              : selectedPackType === "2"
              ? "#5C6988"
              : selectedPackType === "3"
              ? "#751ad0"
              : "#a15813"
          }
          insetBorderColor={
            selectedPackType === "1"
              ? "#737374"
              : selectedPackType === "2"
              ? "#889AAF"
              : selectedPackType === "3"
              ? "#c746af"
              : "#f3cb23"
          }
          bgColor={
            selectedPackType === "1"
              ? "#ababac"
              : selectedPackType === "2"
              ? "#E6E8E9"
              : selectedPackType === "3"
              ? "#e3bfff"
              : "#feff95"
          }
          fontColor={
            selectedPackType === "1"
              ? "#fff"
              : selectedPackType === "2"
              ? "#5C6988"
              : selectedPackType === "3"
              ? "#751ad0"
              : "#a15813"
          }
          onClick={() => {
            setRevealManyModalOpen(true)
            handleManyPacksReveal(selectedPackType)
          }}
        >
          {selectedPackType === "1" && (
            <>{packCount[1] < 11 ? "Reveal All" : "Reveal 10"} </>
          )}
          {selectedPackType === "2" && (
            <>{packCount[2] < 11 ? "Reveal All" : "Reveal 10"} </>
          )}
          {selectedPackType === "3" && (
            <>{packCount[3] < 11 ? "Reveal All" : "Reveal 10"} </>
          )}
          {selectedPackType === "4" && (
            <>{packCount[4] < 11 ? "Reveal All" : "Reveal 10"} </>
          )}
        </Button>
      </ButtonWrapper>
    </SideNavbarContainer>
  )
}

export default RevealOverlay
