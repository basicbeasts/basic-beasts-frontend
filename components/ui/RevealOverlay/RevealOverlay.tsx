import { FC } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt, faTimes } from "@fortawesome/free-solid-svg-icons"
import NextLink from "next/link"
import { useAuth } from "@components/auth/AuthProvider"
import externalLinkIcon from "public/basic_external_link.png"
import PackRevealCard from "../PackRevealCard"
import StarterImg from "public/packs/pack_pf/starter.png"
import CursedImg from "public/packs/pack_pf/cursed.png"
import ShinyImg from "public/packs/pack_pf/shiny.png"

const SideNavbarContainer = styled.aside<Omit<Props, "toggle">>`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #111823;
  display: grid;
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
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  outline: none;
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

type Props = {
  isSideNavbarOpen: boolean
  toggle: () => void
  selectedPackType: any
  starterPacks: any
  metallicPacks: any
  cursedPacks: any
  shinyPacks: any
}

const RevealOverlay: FC<Props> = ({
  isSideNavbarOpen,
  toggle,
  selectedPackType,
  starterPacks,
  metallicPacks,
  cursedPacks,
  shinyPacks,
}: Props) => {
  const { logIn, logOut, user, loggedIn } = useAuth()

  return (
    <SideNavbarContainer isSideNavbarOpen={isSideNavbarOpen}>
      <Icon onClick={toggle}>
        <CloseIcon icon={faTimes} />
      </Icon>
      <div>Starter Packs</div>
      {selectedPackType != null ? <div>Pack Type: {selectedPackType}</div> : ""}
      <SideNavbarWrapper>
        <ul
          role="list"
          className="grid grid-cols-3 gap-x-5 gap-y-5 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-3 xl:gap-x-6 xl:grid-cols-3 2xl:grid-cols-3"
        >
          {selectedPackType == "1" ? (
            <>
              {starterPacks.map(({ uuid }: any) => (
                <li className="relative">
                  <pre>{JSON.stringify(uuid, null, 2)}</pre>
                  <button onClick={() => console.log(uuid)}>
                    testing stuff
                  </button>
                  <PackRevealCard
                    packImage={StarterImg}
                    pack={starterPacks[uuid]}
                  />
                </li>
              ))}
            </>
          ) : (
            ""
          )}
          {selectedPackType == "2" ? (
            <>
              {metallicPacks.map(({ uuid }: any) => (
                <li className="relative">
                  <PackRevealCard
                    packImage={StarterImg}
                    pack={metallicPacks[uuid]}
                  />
                </li>
              ))}
            </>
          ) : (
            ""
          )}
          {selectedPackType == "3" ? (
            <>
              {cursedPacks.map(({ uuid }: any) => (
                <li className="relative">
                  <PackRevealCard
                    packImage={CursedImg}
                    pack={cursedPacks[uuid]}
                  />
                </li>
              ))}
            </>
          ) : (
            ""
          )}
          {selectedPackType == "4" ? (
            <>
              {shinyPacks.map(({ uuid }: any) => (
                <li className="relative">
                  <PackRevealCard
                    packImage={ShinyImg}
                    pack={shinyPacks[uuid]}
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
      <div>Reveal all</div>
    </SideNavbarContainer>
  )
}

export default RevealOverlay