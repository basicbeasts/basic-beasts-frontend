import { FC, useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt, faTimes } from "@fortawesome/free-solid-svg-icons"
import NextLink from "next/link"
import { useAuth } from "@components/auth/AuthProvider"
import externalLinkIcon from "public/basic_external_link.png"
import PackRevealCard from "../PackRevealCard"
import StarterImg from "public/packs/pack_pf/starter.png"
import MetallicImg from "public/packs/pack_pf/metallic.png"
import CursedImg from "public/packs/pack_pf/cursed.png"
import ShinyImg from "public/packs/pack_pf/shiny.png"
import PackRevealModal from "../PackRevealModal"

const SideNavbarContainer = styled.aside<{
  isSideNavbarOpen: boolean
}>`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #111823;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isSideNavbarOpen }) => (isSideNavbarOpen ? "100%" : "0")};
  top: ${({ isSideNavbarOpen }) => (isSideNavbarOpen ? "0" : "-100%")};
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

const SideNavbarWrapper = styled.div`
  padding: 35px 20vw 0px;
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

const Title = styled.div`
  text-transform: uppercase;
  color: #e4be23;
  text-align: center;
  font-size: 4em;
  margin: 100px 0 50px;
`

const ButtonWrapper = styled.div`
  margin: 15px 0 10px;
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
  font-size: 1.5vw;
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
    font-size: 7vw;
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
}: Props) => {
  const { logIn, logOut, user, loggedIn } = useAuth()
  const [selectedPack, setSelectedPack] = useState<string | "0">("0")

  //Modal
  const [RevealModalOpen, setRevealModalOpen] = useState(false)

  const close = () => {
    setRevealModalOpen(false)
  }

  const open = () => {
    setRevealModalOpen(true)
    if (selectedPack) {
      openPack()
    }
  }

  const openPack = () => {}

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
      <Icon onClick={toggle}>{"<"}</Icon>
      <Title>{packType} Packs</Title>
      <SideNavbarWrapper>
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-1 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-3 xl:gap-x-6 xl:grid-cols-3 2xl:grid-cols-3"
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
                  />
                </li>
              ))}
            </>
          ) : (
            ""
          )}

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
      </SideNavbarWrapper>
      <ButtonWrapper>
        <Button
          borderColor={
            selectedPackType === "1"
              ? "#2C323B"
              : selectedPackType === "3"
              ? "#751ad0"
              : "#a15813"
          }
          insetBorderColor={
            selectedPackType === "1"
              ? "#737374"
              : selectedPackType === "3"
              ? "#c746af"
              : "#f3cb23"
          }
          bgColor={
            selectedPackType === "1"
              ? "#ababac"
              : selectedPackType === "3"
              ? "#e3bfff"
              : "#feff95"
          }
          fontColor={
            selectedPackType === "1"
              ? "#fff"
              : selectedPackType === "3"
              ? "#751ad0"
              : "#a15813"
          }
          onClick={() => {
            open()
          }}
        >
          Reveal All
        </Button>
      </ButtonWrapper>
    </SideNavbarContainer>
  )
}

export default RevealOverlay
