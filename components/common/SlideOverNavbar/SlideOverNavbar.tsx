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

const DialogTitle = styled<any>(Dialog.Title)`
  color: #f3cb23;
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
    opacity: 0.9;
  }
`

const CopyIcon = styled(FontAwesomeIcon)`
  font-size: 9px;
  margin-left: 2px;
`

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  profilePicture: any
}

const SlideOverNavbar: FC<Props> = ({
  open,
  setOpen,
  profilePicture,
}: Props) => {
  const { user, logIn, logOut, loggedIn } = useAuth()

  const { balance, centralizedInbox } = useUser()

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
                          <button type="button" onClick={() => setOpen(false)}>
                            <span className="sr-only">Close panel</span>
                            <div>x</div>
                          </button>
                        </CloseContainer>
                        <div>
                          {!loggedIn ? (
                            <>
                              <div
                                style={{
                                  marginTop: "-30px",
                                  lineHeight: "45px",
                                  fontSize: "43px",
                                }}
                              >
                                Sign In
                              </div>
                              <hr
                                style={{
                                  margin: "10px 50px 10px 0",
                                  borderColor: "#5c5e6c",
                                }}
                              />
                            </>
                          ) : (
                            <>
                              <div
                                style={{
                                  marginTop: "-30px",
                                  lineHeight: "45px",
                                  fontSize: "43px",
                                  display: "flex",
                                }}
                              >
                                <ProfileImg src={profilePicture} />
                                <div
                                  style={{
                                    marginLeft: "10px",
                                    marginTop: "5px",
                                  }}
                                >
                                  williblue
                                </div>
                              </div>
                              <div
                                style={{
                                  textTransform: "none",
                                  marginTop: "10px",
                                }}
                                onClick={() => {
                                  navigator.clipboard.writeText(user?.addr)
                                  toast("Copied to clipboard")
                                }}
                              >
                                {user?.addr}
                                <CopyIcon icon={faCopy} />
                              </div>
                              <div>
                                FUSD:{" "}
                                {!balance
                                  ? "0.00"
                                  : balance.toLocaleString().slice(0, -6)}
                              </div>
                              <hr
                                style={{
                                  margin: "10px 50px 10px 0",
                                  borderColor: "#5c5e6c",
                                }}
                              />
                              <div
                                style={{
                                  fontSize: "35px",
                                  lineHeight: "43px",
                                }}
                              >
                                Profile
                              </div>
                              <div>Inbox</div>
                              <div>Sign out</div>
                              <hr
                                style={{
                                  margin: "10px 50px 10px 0",
                                  borderColor: "#5c5e6c",
                                }}
                              />
                            </>
                          )}
                        </div>
                        <div
                          style={{
                            fontSize: "35px",
                            lineHeight: "43px",
                          }}
                        >
                          Store
                        </div>
                        <div
                          style={{
                            fontSize: "35px",
                            lineHeight: "43px",
                          }}
                        >
                          Rankings
                        </div>
                        <div
                          style={{
                            fontSize: "35px",
                            lineHeight: "43px",
                          }}
                        >
                          Dexicon
                        </div>
                        <div style={{ marginTop: "5px" }}>Whitepaper</div>
                        <div>Discord</div>
                        {/* {!loggedIn ? <></> : <div>Sign out</div>} */}
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
