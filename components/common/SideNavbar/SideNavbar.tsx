import { FC } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt, faTimes } from "@fortawesome/free-solid-svg-icons"
import NextLink from "next/link"
import { useAuth } from "@components/auth/AuthProvider"
import externalLinkIcon from "public/basic_external_link.png"

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
  color: #fff;
`

const SideNavbarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat() (6, 60px);
  text-align: center;
  padding-left: 0;
  @media screen and (min-width: 480px) {
    grid-template-rows: repeat() (6, 80px);
  }
`

const A = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  font-size: 46px;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #f3cb23;
    transition: 0.2s ease-in-out;
  }
`

const BuyNowBtn = styled.div`
  display: flex;
  justify-content: center;
`

const WalletConnect = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  font-size: 46px;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
`

const BtnLink = styled.a`
  background: #feff95;
  height: 60px;
  font-size: 26px;
  white-space: nowrap;
  color: #a15813;
  border-image-repeat: stretch;
  border: solid 4px #a15813;
  display: inline-block;
  //margin: 4px;
  padding: 14px 14px;
  position: relative;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  vertical-align: middle;
  box-shadow: inset -4px -4px #f3cb23;
  transition: all 0.1s;

  &:hover {
    transition: all 0.1s;
    //background: #f3cb23;
    color: #a15813;
  }
  &:active {
    transition: all 0.1s;
    box-shadow: inset 4px 4px #f3cb23;
  }
  // Remove bottom corners
  &:before {
    background-color: #111823;
    content: "";
    display: block;
    position: absolute;
    height: 6px;
    width: 6px;
    bottom: -6px;
    left: -6px;
  }
  &:after {
    background-color: #111823;
    content: "";
    display: block;
    position: absolute;
    height: 6px;
    width: 6px;
    bottom: -6px;
    right: -6px;
  }
`

const RemoveTopCorners = styled.div`
  border: 0px transparent;
  position: relative;
  margin-right: 10px;
  padding: 0;

  &:before {
    background-color: #111823;
    content: "";
    display: block;
    position: absolute;
    height: 6px;
    width: 6px;
    top: -2px;
    right: -2px;
    z-index: 1;
  }
  &:after {
    background-color: #111823;
    content: "";
    display: block;
    position: absolute;
    height: 6px;
    width: 6px;
    top: -2px;
    left: -2px;
  }
`
type Props = {
  isSideNavbarOpen: boolean
  toggle: () => void
}

const SideNavbar: FC<Props> = ({ isSideNavbarOpen, toggle }: Props) => {
  const { logIn, logOut, user, loggedIn } = useAuth()

  return (
    <SideNavbarContainer isSideNavbarOpen={isSideNavbarOpen}>
      <Icon onClick={toggle}>
        <CloseIcon icon={faTimes} />
      </Icon>
      <SideNavbarWrapper>
        <SideNavbarMenu>
          <NextLink href="/drop">
            <A onClick={toggle}>Store</A>
          </NextLink>

          {!loggedIn ? (
            <NextLink href="/marketplace">
              <A onClick={toggle}>Marketplace</A>
            </NextLink>
          ) : (
            <NextLink href="/collection">
              <A onClick={toggle}>Collection</A>
            </NextLink>
          )}
          {/* <NextLink href="/dexicon">
            <A onClick={toggle}>Dexicon</A>
          </NextLink> */}
          <A
            target="_blank"
            rel="noreferrer"
            href="https://whitepaper.basicbeasts.io/"
          >
            Whitepaper
          </A>
          <A
            target="_blank"
            rel="noreferrer"
            href="https://discord.gg/xgFtWhwSaR"
          >
            Discord
          </A>
        </SideNavbarMenu>
        {!loggedIn ? (
          <WalletConnect>
            <RemoveTopCorners>
              <BtnLink
                onClick={() => {
                  logIn()
                  toggle()
                }}
              >
                Connect Wallet
              </BtnLink>
            </RemoveTopCorners>
          </WalletConnect>
        ) : (
          <>
            <A
              onClick={() => {
                logOut()
                toggle()
              }}
            >
              Log Out
            </A>
          </>
        )}
      </SideNavbarWrapper>
    </SideNavbarContainer>
  )
}

export default SideNavbar
