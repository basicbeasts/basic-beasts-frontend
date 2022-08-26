import { FC, Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/outline"
import { useAuth } from "@components/auth/AuthProvider"
import { useUser } from "@components/user/UserProvider"
import { faCopy } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { toast } from "react-toastify"
import externalLinkIcon from "public/basic_external_link.png"
import Link from "next/link"

const OverlayBg = styled.div`
  backdrop-filter: blur(20px);
  background: rgba(33, 33, 39, 0.5);
`

const Container = styled.div``

const PanelBg = styled.div`
  background: #212127;
  border-radius: 16px;
  padding-right: 10px;
  padding-left: 10px;
  color: #f3cb23;
  box-shadow: 0px 0px 8px 1px #8f7a39;
  text-transform: uppercase;
  font-size: 20px;

  @media (max-width: 400px) {
    border-radius: 0px;
  }
`

const DialogPanel = styled<any>(Dialog.Panel)`
  margin: 24px;
  @media (max-width: 400px) {
    margin: 0px;
  }
`

const CloseContainer = styled.div`
  font-size: 40px;
  z-index: 999;
  justify-content: end;
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
  }
`

const CopyIcon = styled(FontAwesomeIcon)`
  font-size: 13px;
  margin-left: 2px;
  padding-bottom: 3px;
`

const ExternalLinkIcon = styled.img`
  width: 10px;
  margin-top: 10px;
  margin-left: 2px;
`

const SignIn = styled.div`
  margin-top: -30px;
  margin-right: 40px;
  line-height: 45px;
  font-size: 43px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  &:hover {
    opacity: 0.8;
  }
`

const Divider = styled.hr`
  margin: 10px 50px 10px 0;
  border-color: #5c5e6c;
`

const Header = styled.div`
  margin-top: -30px;
  margin-right: 40px;
  line-height: 45px;
  font-size: 30px;
  display: flex;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  &:hover {
    opacity: 0.8;
  }
`

const HeaderProfileName = styled.div`
  margin-left: 15px;
  margin-top: 8px;
  text-transform: none;
`

const CopyToClipboard = styled.div`
  text-transform: none;
  margin-top: 10px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  &:hover {
    opacity: 0.8;
  }
`

const LargeNavItem = styled.div`
  font-size: 35px;
  line-height: 43px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  &:hover {
    opacity: 0.8;
  }
`

const SmallNavItem = styled.div`
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  &:hover {
    opacity: 0.8;
  }
`
const RedDot = styled.span`
  color: #cc3333;
  padding-left: 2px;
  font-size: 20px;
  font-family: "Courier New", Courier, monospace;
`

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  profilePicture: any
  profile: any
  router: any
}

const SlideOverNavbar: FC<Props> = ({
  open,
  setOpen,
  profilePicture,
  profile,
  router,
}: Props) => {
  const { user, logIn, logOut, loggedIn } = useAuth()

  const { balance, centralizedInbox } = useUser()

  const currentPath = router.asPath

  const close = () => {
    setOpen(false)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <OverlayBg className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <Container className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-sm">
                  <PanelBg className="flex h-full flex-col py-6">
                    <div className="relative flex-1 px-4 sm:px-6">
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <CloseContainer className="ml-3 flex h-7 items-center">
                          <button
                            style={{ outline: "none" }}
                            type="button"
                            onClick={() => close()}
                          >
                            <span className="sr-only">Close panel</span>
                            <div>x</div>
                          </button>
                        </CloseContainer>
                        <div>
                          {!loggedIn ? (
                            <>
                              <SignIn
                                onClick={() => {
                                  logIn()
                                  close()
                                }}
                              >
                                Sign In
                              </SignIn>
                              <Divider />
                            </>
                          ) : (
                            <>
                              <Link href={"/profile/" + user?.addr}>
                                <Header onClick={() => close()}>
                                  <ProfileImg src={profilePicture} />
                                  <HeaderProfileName>
                                    {profile != null
                                      ? profile.name
                                      : user?.addr
                                          .slice(0, 6)
                                          .concat("...")
                                          .concat(user?.addr.slice(-4))}
                                  </HeaderProfileName>
                                </Header>
                              </Link>
                              <CopyToClipboard
                                onClick={() => {
                                  navigator.clipboard.writeText(user?.addr)
                                  toast("Copied to clipboard")
                                }}
                              >
                                {user?.addr}
                                <CopyIcon icon={faCopy} />
                              </CopyToClipboard>
                              <div>
                                FUSD:{" "}
                                {!balance
                                  ? "0.00"
                                  : balance.toLocaleString().slice(0, -6)}
                              </div>
                              <Divider />
                              <Link href={"/profile/" + user?.addr}>
                                <LargeNavItem onClick={() => close()}>
                                  Profile
                                </LargeNavItem>
                              </Link>
                              <Link href="/inbox">
                                <SmallNavItem onClick={() => close()}>
                                  Inbox
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
                                </SmallNavItem>
                              </Link>
                              <SmallNavItem
                                onClick={() => {
                                  logOut()
                                  close()
                                }}
                              >
                                Sign out
                              </SmallNavItem>
                              <Divider />
                            </>
                          )}
                        </div>
                        <Link href="/store">
                          <LargeNavItem onClick={() => close()}>
                            Store
                          </LargeNavItem>
                        </Link>
                        <Link href="/rankings">
                          <LargeNavItem onClick={() => close()}>
                            Rankings
                          </LargeNavItem>
                        </Link>
                        <Link href="/dexicon">
                          <LargeNavItem onClick={() => close()}>
                            Dexicon
                          </LargeNavItem>
                        </Link>

                        <a
                          target="_blank"
                          href="https://whitepaper.basicbeasts.io/"
                        >
                          <SmallNavItem
                            style={{ display: "flex", marginTop: "5px" }}
                          >
                            Whitepaper
                            <div>
                              <ExternalLinkIcon src={externalLinkIcon.src} />
                            </div>
                          </SmallNavItem>
                        </a>
                        <a target="_blank" href="https://discord.gg/xgFtWhwSaR">
                          <SmallNavItem style={{ display: "flex" }}>
                            <div>Discord</div>
                            <div>
                              <ExternalLinkIcon src={externalLinkIcon.src} />
                            </div>
                          </SmallNavItem>
                        </a>
                      </div>
                    </div>
                  </PanelBg>
                </DialogPanel>
              </Transition.Child>
            </Container>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SlideOverNavbar
