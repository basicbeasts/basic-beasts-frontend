import { FC, useRef, useState } from "react"
import styled from "styled-components"
import NextLink from "next/link"
import { faBars, faEllipsisV, faGlobe } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "@components/auth/AuthProvider"
import { useUser } from "@components/user/UserProvider"
import externalLinkIcon from "public/basic_external_link.png"
import { NextRouter } from "next/dist/client/router"
import useTranslation from "next-translate/useTranslation"
import LanguageSwitcher from "@components/ui/LanguageSwitcher"

const Nav = styled.header<{ font: string; fontSize: string }>`
  background: #111823;
  height: 90px;
  max-height: 90px;
  font-size: ${(props) => props.fontSize};
  text-transform: uppercase;
  font-family: ${(props) => props.font};
  font-weight: 400;
  letter-spacing: 1px;
  top: 0;
  z-index: 10;
  color: #f3cb23;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  z-index: 1;
  height: 90px;
  max-height: 90px;
`

const NavLogo = styled.a`
  color: #f3cb23;
  cursor: pointer;
  font-size: 50px;
  line-height: 30px;
  margin-left: 20px;
  margin-top: 10px;
  text-transform: capitalize;
`

const MobileIcon = styled(FontAwesomeIcon)`
  display: block;
  position: absolute;
  top: 0;
  right: 0%;
  transform: translate(-100%, 60%);
  font-size: 2.8rem;
  cursor: pointer;
  color: #fff;
  z-index: 3;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  @media (min-width: 1100px) {
    display: none;
  }
`

const NavMenu = styled.ul`
  display: none;
  @media (min-width: 1100px) {
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-left: 18px;
  }
`

const NavItem = styled.li``

const A = styled.a<{ font: string }>`
  font-family: ${(props) => props.font};
  color: #f3cb23 !important;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  @media (max-width: 1010px) {
    padding: 0 0.5rem;
  }
`

const WalletConnect = styled.div``

const BtnLink = styled.a<{ fontSize: string; padding: string }>`
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  background: #feff95;
  height: 60px;
  font-size: ${(props) => props.fontSize};
  white-space: nowrap;
  color: #a15813;
  border-image-repeat: stretch;
  border: solid 4px #a15813;
  display: inline-block;
  //margin: 4px;
  padding: ${(props) => props.padding};
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
    //background: #f5f500;
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

  @media (max-width: 1099px) {
    display: none;
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

const RightNav = styled.div`
  display: flex;
  @media (min-width: 900px) {
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
  }
`

const UserAddress = styled.div`
  font-size: 12px;
  padding: 2px 10px 2px 15px;
  margin-top: 5px;
  text-transform: lowercase;
`

const DropDownIcon = styled(FontAwesomeIcon)`
  display: block;
  margin-top: 20px;
  margin-right: 15px;
  font-size: 16px;
`

const LoggedInContainer = styled.div`
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  &:after {
    display: table;
    clear: both;
  }
  @media (max-width: 899px) {
    padding-top: 15px;
  }
`

const LeftBox = styled.div`
  float: left;
`

const RightBox = styled.div`
  float: right;
`

const ExternalLinkIcon = styled.img`
  width: 15px;
`

const MobileLanguageSwitcher = styled.div`
  @media (min-width: 1100px) {
    display: none;
  }
  margin-top: 28px;
  margin-right: 80px;
`

type FuncProps = {
  toggle: () => void
  router: NextRouter
}

const Navbar: FC<FuncProps> = ({ toggle, router }) => {
  const { logIn, logOut, user, loggedIn } = useAuth()

  const { balance } = useUser()

  let { t, lang } = useTranslation()

  return (
    <>
      <Nav
        font={
          lang === "ru" ? "arial, sans-serif" : "Pixelar, sans-serif, arial"
        }
        fontSize={lang === "ru" ? "18px" : "26px"}
      >
        <NavbarContainer>
          <NextLink href="/">
            <NavLogo>
              Basic
              <br />
              Beasts
            </NavLogo>
          </NextLink>

          <NavMenu>
            <NavItem>
              <NextLink href="/store">
                <A
                  font={
                    lang === "ru"
                      ? "arial, sans-serif"
                      : "Pixelar, sans-serif, arial"
                  }
                >
                  {t("common:store")}
                </A>
              </NextLink>
            </NavItem>

            {!loggedIn ? (
              <NavItem>
                <NextLink href="/marketplace">
                  <A
                    font={
                      lang === "ru"
                        ? "arial, sans-serif"
                        : "Pixelar, sans-serif, arial"
                    }
                  >
                    {t("common:marketplace")}
                  </A>
                </NextLink>
              </NavItem>
            ) : (
              <NavItem>
                <NextLink href="/collection">
                  <A
                    font={
                      lang === "ru"
                        ? "arial, sans-serif"
                        : "Pixelar, sans-serif, arial"
                    }
                  >
                    {t("common:collection")}
                  </A>
                </NextLink>
              </NavItem>
            )}

            <NavItem>
              <NextLink href="/dexicon">
                <A
                  font={
                    lang === "ru"
                      ? "arial, sans-serif"
                      : "Pixelar, sans-serif, arial"
                  }
                >
                  Dexicon
                </A>
              </NextLink>
            </NavItem>
            <NavItem>
              <A
                font={
                  lang === "ru"
                    ? "arial, sans-serif"
                    : "Pixelar, sans-serif, arial"
                }
                target="_blank"
                href="https://whitepaper.basicbeasts.io/"
              >
                {t("common:whitepaper")}&nbsp;
                <ExternalLinkIcon src={externalLinkIcon.src} />
              </A>
            </NavItem>
            <NavItem>
              <A
                font={
                  lang === "ru"
                    ? "arial, sans-serif"
                    : "Pixelar, sans-serif, arial"
                }
                target="_blank"
                href="https://discord.gg/xgFtWhwSaR"
              >
                Discord&nbsp;
                <ExternalLinkIcon src={externalLinkIcon.src} />
              </A>
            </NavItem>
            <LanguageSwitcher router={router} />

            {/* {router.locales.map((locale) => (
              <NavItem key={locale}>
                <NextLink href={router.asPath} locale={locale}>
                  <A>
                    {locale == "en-US" ? (
                      <>English</>
                    ) : locale == "ru" ? (
                      <>Русский</>
                    ) : (
                      ""
                    )}
                  </A>
                </NextLink>
              </NavItem>
            ))} */}
          </NavMenu>

          <RightNav>
            <MobileLanguageSwitcher>
              <LanguageSwitcher router={router} />
            </MobileLanguageSwitcher>
            {!loggedIn ? (
              <WalletConnect>
                <MobileIcon icon={faBars} onClick={toggle} />
                <RemoveTopCorners>
                  <BtnLink
                    onClick={() => logIn()}
                    fontSize={lang === "ru" ? "18px" : "26px"}
                    padding={lang === "ru" ? "14px" : "7px 14px 14px 14px"}
                  >
                    {t("common:connect-wallet")}
                  </BtnLink>
                </RemoveTopCorners>
              </WalletConnect>
            ) : (
              <>
                <LoggedInContainer onClick={toggle}>
                  <LeftBox>
                    <UserAddress>{user.addr}</UserAddress>
                    <A>{!balance ? <></> : balance.slice(0, -6)} ₣USD</A>
                  </LeftBox>
                  <RightBox>
                    <DropDownIcon icon={faEllipsisV} />
                  </RightBox>
                </LoggedInContainer>
              </>
            )}
          </RightNav>
        </NavbarContainer>
      </Nav>
    </>
  )
}

export default Navbar
