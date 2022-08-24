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
  margin-right: 40px;
  margin-top: 10px;
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

const ProfileImg = styled.img`
  width: 60px;
  max-width: none;
  border-radius: 15px;
  margin-right: 5px;

  border: solid 2px #f3cb23;
  background: #f3cb23;
  @media (max-width: 800px) {
    width: 40px;
  }
  &:hover {
    opacity: 0.9;
  }
`

const Img = styled.img`
  width: 70px;
  max-width: none;
  border-radius: 6px;
  margin: 0 5px 0;
  @media (max-width: 800px) {
    width: 40px;
  }
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

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

type FuncProps = {
  toggle: () => void
  router: NextRouter
}

const Navbar: FC<FuncProps> = ({ toggle, router }) => {
  const { logIn, logOut, user, loggedIn } = useAuth()
  const [profile, setProfile] = useState<any>()
  const [profilePicture, setProfilePicture] = useState(profilePictures[1].image)

  const { balance } = useUser()

  let { t, lang } = useTranslation()

  useEffect(() => {
    if (user != null) {
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
                <LoggedInContainer>
                  <LeftBox>
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full">
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
                            <Balance
                              style={{
                                textTransform: "none",
                              }}
                              className={"block px-4 text-md"}
                            >
                              {profile != null ? profile.name : <></>}
                            </Balance>
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
                                Inbox
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
                        <Img src={InboxIcon.src} />
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
