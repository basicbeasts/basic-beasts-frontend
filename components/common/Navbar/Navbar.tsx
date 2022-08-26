import { FC, useEffect, useRef, useState, Fragment } from "react"
import styled from "styled-components"
import NextLink from "next/link"
import {
  faBars,
  faEllipsisV,
  faGlobe,
  faCopy,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "@components/auth/AuthProvider"
import { useUser } from "@components/user/UserProvider"
import externalLinkIcon from "public/basic_external_link.png"
import { NextRouter } from "next/dist/client/router"
import useTranslation from "next-translate/useTranslation"
import LanguageSwitcher from "@components/ui/LanguageSwitcher"
import profilePictures from "data/profilePictures"
import { query } from "@onflow/fcl"
import InboxIcon from "public/basic_inbox_icon.png"
import { Menu, Transition } from "@headlessui/react"
import { toast } from "react-toastify"

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

const NavLogoContainer = styled.div`
  margin-left: 20px;
  margin-top: 15px;
  @media (max-width: 1024px) {
    display: none;
  }
`

const MobileNavLogoContainer = styled.div`
  margin-left: 20px;
  margin-top: 28px;
  @media (min-width: 1025px) {
    display: none;
  }
`

const NavLogo = styled.a`
  color: #f3cb23;
  cursor: pointer;
  font-size: 50px;
  line-height: 5px;
  text-transform: capitalize;
`

const MobileMenuIcon = styled(FontAwesomeIcon)`
  width: 18px !important;
  max-width: none;
  border-radius: 6px;
  margin: 2px 5px 0;
  /* @media (max-width: 800px) {
width: 40px;
} */
  &:hover {
    opacity: 0.9;
  }
`

const NavMenu = styled.ul`
  display: none;
  @media (min-width: 1025px) {
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

  /* @media (max-width: 1024px) {
    display: none;
  } */
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
  @media (max-width: 1024px) {
    display: none;
  }
`

const RightNav = styled.div`
  display: flex;
  margin-top: 5px;
  @media (min-width: 1025px) {
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-top: 0px;
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
  &:after {
    display: table;
    clear: both;
  }
  margin-right: 0px;
  margin-top: 10px;

  @media (max-width: 1024px) {
    display: none;
  }
`

const LeftBox = styled.div`
  float: left;

  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`

const RightBox = styled.div`
  float: right;

  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`

const ExternalLinkIcon = styled.img`
  width: 15px;
`

const MobileLanguageSwitcher = styled.div`
  @media (min-width: 1025px) {
    display: none;
  }
`

const MobileInboxButton = styled.button`
  @media (min-width: 1025px) {
    display: none;
  }
  margin-top: 3px;
  margin-right: 10px;

  // Stuff
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-flow: row nowrap;
  position: relative;
  white-space: nowrap;
  background: rgba(22, 22, 26, 0.04);
  line-height: 40px;
  /* padding-right: 11px; */
  min-width: auto;
  border: 1px solid;
  border-radius: 20px;
  transition: all 0.15s ease-in-out 0s;
  transform-origin: center center;
  user-select: none;

  backdrop-filter: blur(20px) !important;
  background: #222427;
  border-color: #393b3d;

  height: 50px;
  width: 50px;

  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;

  &:hover {
    color: #f3c923ce;
  }
`

const MobileMenuButton = styled.button`
  @media (min-width: 1025px) {
    display: none;
  }
  margin-top: 3px;
  margin-right: 15px;

  // Stuff
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-flow: row nowrap;
  position: relative;
  white-space: nowrap;
  background: rgba(22, 22, 26, 0.04);
  line-height: 40px;
  /* padding-right: 11px; */
  min-width: auto;
  border: 1px solid;
  border-radius: 20px;
  transition: all 0.15s ease-in-out 0s;
  transform-origin: center center;
  user-select: none;

  backdrop-filter: blur(20px) !important;
  background: #222427;
  border-color: #393b3d;

  height: 50px;
  width: 65px;

  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;

  &:hover {
    color: #f3c923ce;
  }
`

const MobileInboxIcon = styled.img`
  width: 40px;
  max-width: none;
  border-radius: 6px;
  margin: 2px 5px 0;
  /* @media (max-width: 800px) {
  width: 40px;
} */
  &:hover {
    opacity: 0.9;
  }
`

const MobileRedDot = styled.span`
  color: #cc3333;
  position: absolute;
  padding-left: 24px;
  top: 0px;
  font-size: 22px;
  font-family: "Courier New", Courier, monospace;
`

const ProfileImg = styled.img`
  width: 60px;
  max-width: none;
  border-radius: 13px;
  margin-right: 0px;

  border: solid 2px #f3cb23;
  background: #f3cb23;
  /* @media (max-width: 800px) {
    width: 40px;
  } */
  &:hover {
    opacity: 0.9;
  }
`

const Img = styled.img`
  width: 70px;
  max-width: none;
  border-radius: 6px;
  margin: 0 5px 0;
  /* @media (max-width: 800px) {
    width: 40px;
  } */
  &:hover {
    opacity: 0.9;
  }
`

const MenuItems = styled<any>(Menu.Items)`
  background-color: #212127;
  color: #f3cb23;
  border-radius: 10px;
  text-align: left;
  font-size: 22px;
  padding: 10px 0;
`

const CopyIcon = styled(FontAwesomeIcon)`
  font-size: 9px;
  margin-left: 2px;
`

const Divider = styled.hr`
  margin: 5px 15px;
  border-color: #5c5e6c;
`

const Balance = styled.div`
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABFklEQVRYR9WXURLDIAhE6/0PbSdOtUpcd1Gnpv1KGpTHBpCE1/cXq+vrMph7dGvXZTtpfW10DCA5jrH1H0Jhs5E0hnZdCR+vb5S8Nn8mQCeS9BdSalYJqMBjAGzq59xAESN7VFVUgV8AZB/dZBR7QTFDCqGquvUBVVoEtgIwpQRzmANSFHgWQKExHdIrPeuMvQNDarXe6nC/AutgV3JW+6bgqQLeV8FekRtgV+ToDKEKnACYKsfZjjkam7a0ZpYTytwmgainpC3HvwBocgKOxqRjehoR9DFKNFYtOwCGYCszobeCbl26N6yyQ6g8X/Wex/rBPsNEV6qAMaJPMynIHQCoSqS9JSMmwef51LflTgCRszU7DvAGiV6mHWfsaVUAAAAASUVORK5CYII=),
    auto !important;
`

const RedDot = styled.span`
  color: #cc3333;
  position: absolute;
  padding-left: 8px;
  top: 18px;
  font-size: 30px;
  font-family: "Courier New", Courier, monospace;
`

const RedDotDropDown = styled.span`
  color: #cc3333;
  position: absolute;
  padding-left: 1px;
  margin-top: 2px;
  font-size: 25px;
  font-family: "Courier New", Courier, monospace;
`

const MobileLoggedInContainer = styled.div`
  display: flex;
  margin-right: 10px;
  margin-top: 10px;
  @media (min-width: 1025px) {
    display: none;
  }
`
const MobileConnect = styled.button`
  @media (min-width: 1025px) {
    display: none;
  }
  margin-top: 13px;
  margin-right: 0px;
  color: #222427;
  font-size: 20px;

  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-flow: row nowrap;
  position: relative;
  white-space: nowrap;
  background: rgba(22, 22, 26, 0.04);
  line-height: 40px;
  /* padding-right: 11px; */
  min-width: auto;
  border: 1px solid;
  border-radius: 20px;
  transition: all 0.15s ease-in-out 0s;
  transform-origin: center center;
  user-select: none;

  backdrop-filter: blur(20px) !important;
  background: #f3cb23;
  border-color: #f3cb23;

  height: 50px;
  width: 100px;

  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;

  &:hover {
    color: #f3cb23;
    background: #222427;
    border-color: #393b3d;
  }
`

const MobileProfileIconContainer = styled.div`
  margin-top: -3px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

type FuncProps = {
  toggle: () => void
  router: NextRouter
  setOpen: any
  profilePicture: any
  setProfilePicture: any
}

const Navbar: FC<FuncProps> = ({
  toggle,
  router,
  setOpen,
  profilePicture,
  setProfilePicture,
}) => {
  const { logIn, logOut, user, loggedIn } = useAuth()
  const [profile, setProfile] = useState<any>()
  // const [profilePicture, setProfilePicture] = useState(profilePictures[1].image)

  const { balance, centralizedInbox } = useUser()

  const currentPath = router.asPath

  let { t, lang } = useTranslation()

  useEffect(() => {
    if (user?.addr != null) {
      getProfile()
    }
  }, [user?.addr])

  const getProfile = async () => {
    try {
      let res = await query({
        cadence: `
        import Profile from 0xProfile

        pub fun main(address: Address) :  Profile.UserProfile? {
          return getAccount(address)
            .getCapability<&{Profile.Public}>(Profile.publicPath)
            .borrow()?.asProfile()
        }
        
        `,
        args: (arg: any, t: any) => [arg(user?.addr, t.Address)],
      })
      //Resolve Profile
      setProfile(res)

      //Resolve Profile Picture
      let avatar = res.avatar
      for (let key in profilePictures) {
        let element =
          profilePictures[key as unknown as keyof typeof profilePictures]
        if (avatar == element.image) {
          setProfilePicture(element.image)
        }
      }
      console.log("Navbar.ts: getProfile()")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Nav
        font={
          lang === "ru" ? "arial, sans-serif" : "Pixelar, sans-serif, arial"
        }
        fontSize={lang === "ru" ? "18px" : "26px"}
      >
        <NavbarContainer>
          <NavLogoContainer>
            <NextLink href="/">
              <NavLogo>
                Basic
                <br />
                <div>Beasts</div>
              </NavLogo>
            </NextLink>
          </NavLogoContainer>

          <MobileNavLogoContainer>
            <NextLink href="/">
              <NavLogo>BB</NavLogo>
            </NextLink>
          </MobileNavLogoContainer>

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

            {/* {!loggedIn ? (
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
            )} */}

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
              <NextLink href={"/rankings/"}>
                <A
                  font={
                    lang === "ru"
                      ? "arial, sans-serif"
                      : "Pixelar, sans-serif, arial"
                  }
                >
                  Rankings
                </A>
              </NextLink>
            </NavItem>
            {user?.addr != null ? (
              <NavItem>
                <NextLink href={"/profile/" + user?.addr}>
                  <A
                    font={
                      lang === "ru"
                        ? "arial, sans-serif"
                        : "Pixelar, sans-serif, arial"
                    }
                  >
                    Collection
                  </A>
                </NextLink>
              </NavItem>
            ) : (
              <></>
            )}

            {/* <NavItem>
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
            </NavItem> */}
            <LanguageSwitcher router={router} />
          </NavMenu>

          <RightNav>
            {!loggedIn ? (
              <MobileConnect onClick={() => logIn()}>Connect</MobileConnect>
            ) : (
              <></>
            )}
            <MobileLanguageSwitcher>
              <LanguageSwitcher router={router} />
            </MobileLanguageSwitcher>
            {!loggedIn ? (
              <>
                <MobileLoggedInContainer>
                  <MobileMenuButton onClick={() => setOpen(true)}>
                    <MobileMenuIcon icon={faBars} />
                  </MobileMenuButton>
                </MobileLoggedInContainer>
                {/* <MobileIcon icon={faBars} onClick={toggle} /> */}
                <RemoveTopCorners>
                  <BtnLink
                    onClick={() => logIn()}
                    fontSize={lang === "ru" ? "18px" : "26px"}
                    padding={lang === "ru" ? "14px" : "7px 14px 14px 14px"}
                  >
                    {t("common:connect-wallet")}
                  </BtnLink>
                </RemoveTopCorners>
              </>
            ) : (
              <>
                <MobileLoggedInContainer>
                  {centralizedInbox != null ? (
                    <>
                      {currentPath != "/inbox" &&
                      centralizedInbox.length > 0 ? (
                        <>
                          <NextLink href="/inbox">
                            <a>
                              <MobileInboxButton>
                                <MobileInboxIcon src={InboxIcon.src} />
                                <MobileRedDot>•</MobileRedDot>
                              </MobileInboxButton>
                            </a>
                          </NextLink>
                        </>
                      ) : (
                        <>
                          <NextLink href="/inbox">
                            <a>
                              <MobileInboxButton>
                                <MobileInboxIcon src={InboxIcon.src} />
                              </MobileInboxButton>
                            </a>
                          </NextLink>
                        </>
                      )}{" "}
                    </>
                  ) : (
                    <></>
                  )}
                  <MobileProfileIconContainer onClick={() => setOpen(true)}>
                    <ProfileImg src={profilePicture} />
                  </MobileProfileIconContainer>
                </MobileLoggedInContainer>
                <LoggedInContainer>
                  <LeftBox>
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="flex text-sm rounded-full">
                          <span className="sr-only">Open user menu</span>

                          <ProfileImg src={profilePicture} />
                        </Menu.Button>
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
                        <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                style={{ textTransform: "none" }}
                                href={"/profile/" + user?.addr}
                                className={classNames(
                                  active ? "bg-gray-700" : "",
                                  "block px-4 text-md",
                                )}
                              >
                                {profile != null ? profile.name : <></>}
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                style={{ textTransform: "capitalize" }}
                                onClick={() => {
                                  navigator.clipboard.writeText(user?.addr)
                                  toast("Copied to clipboard")
                                }}
                                className={classNames(
                                  active ? "bg-gray-700" : "",
                                  "block px-4 text-sm",
                                )}
                              >
                                {user?.addr
                                  .slice(0, 6)
                                  .concat("...")
                                  .concat(user?.addr.slice(-4))}
                                <CopyIcon icon={faCopy} />
                              </div>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            <Balance
                              style={{
                                textTransform: "capitalize",
                              }}
                              className={"block px-4 text-sm"}
                            >
                              FUSD:{" "}
                              {!balance
                                ? "0.00"
                                : balance.toLocaleString().slice(0, -6)}
                            </Balance>
                          </Menu.Item>
                          <Divider />
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href={"/profile/" + user?.addr}
                                className={classNames(
                                  active ? "bg-gray-700" : "",
                                  "block px-4 text-sm",
                                )}
                              >
                                Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/inbox"
                                className={classNames(
                                  active ? "bg-gray-700" : "",
                                  "block px-4 text-sm",
                                )}
                              >
                                {centralizedInbox != null ? (
                                  <>
                                    {currentPath != "/inbox" &&
                                    centralizedInbox.length > 0 ? (
                                      <>
                                        Inbox<RedDotDropDown>•</RedDotDropDown>
                                      </>
                                    ) : (
                                      "Inbox"
                                    )}
                                  </>
                                ) : (
                                  "Inbox"
                                )}
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={() => logOut()}
                                className={classNames(
                                  active ? "bg-gray-700" : "",
                                  "block px-4 text-sm",
                                )}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </LeftBox>
                  <RightBox>
                    <NextLink href="/inbox">
                      <a>
                        <Img src={InboxIcon.src} />{" "}
                        {centralizedInbox != null ? (
                          <>
                            {currentPath != "/inbox" &&
                            centralizedInbox.length > 0 ? (
                              <RedDot>•</RedDot>
                            ) : (
                              <></>
                            )}{" "}
                          </>
                        ) : (
                          <></>
                        )}
                      </a>
                    </NextLink>
                  </RightBox>
                  {/* <LeftBox>
                    <UserAddress>{user.addr}</UserAddress>
                    <A
                      font={
                        lang === "ru"
                          ? "arial, sans-serif"
                          : "Pixelar, sans-serif, arial"
                      }
                    >
                      {!balance ? <></> : balance.slice(0, -6)} ₣USD
                    </A>
                  </LeftBox>
                  <RightBox>
                    <DropDownIcon icon={faEllipsisV} />
                  </RightBox> */}
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
