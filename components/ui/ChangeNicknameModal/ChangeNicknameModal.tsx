import { FC, Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/outline"

import star from "public/basic_starLevel.png"
import styled from "styled-components"
import {
  send,
  transaction,
  args,
  arg,
  payer,
  proposer,
  authorizations,
  limit,
  authz,
  decode,
  tx,
} from "@onflow/fcl"
import * as t from "@onflow/types"
import { toast } from "react-toastify"
import { toastStatus } from "@framework/helpers/toastStatus"

const ActionItem = styled.div`
  padding: 10px 0;
  width: 100%;
`

const FuncArgInput = styled.input`
  background: transparent;
  border: 1px solid #222;
  color: #222;
  font-size: 1.5em;
  padding: 10px 0px 10px 20px;
  border-radius: 8px 0 0 8px;
  width: 50%;
  cursor: pointer;
  margin-right: -1px;

  outline: none;
  @media (max-width: 398px) {
    width: 100%;
    border-radius: 8px 8px 0 0;
  }
`

const FuncArgButton = styled.button`
  background: transparent;
  border: 1px solid #222;
  color: #222;
  font-size: 1.5em;
  padding: 10px 20px;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  &:hover {
    background: #000000;
    color: #fff;
  }
  &:disabled {
    background: gray;
    color: #fff;
    opacity: 0.35;
  }
  @media (max-width: 398px) {
    width: 100%;
    border-radius: 0 0 8px 8px;
    margin-top: -1px;
  }
`

const Title = styled.div`
  font-size: 2.5em;
  margin-bottom: 20px;
`

const Wrapper = styled.div`
  margin: 0 20px;
`

const Container = styled.div`
  align-items: center;
`

const NicknameLengthWarning = styled.div`
  color: red;
`

type Props = {
  beastID: any
  open: boolean
  setOpen: any
  fetchUserBeasts: any
  beastModalSetOpen: any
  setDisplayNickname: any
  beastName: any
}

const ChangeNicknameModal: FC<Props> = ({
  beastID,
  open,
  setOpen,
  fetchUserBeasts,
  beastModalSetOpen,
  setDisplayNickname,
  beastName,
}) => {
  const [nickname, setNickname] = useState<string | null>("")
  const [nicknameWarning, setNicknameWarning] = useState<string>("")
  const [nicknameValidity, setNicknameValidity] = useState(true)

  const changeNickname = async () => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
        import BasicBeasts from 0xBasicBeasts
        
        transaction(nickname: String, id: UInt64) {
        
            let beastRef: &BasicBeasts.NFT
        
            prepare(acct: AuthAccount) {
        
                let collectionRef = acct.borrow<&BasicBeasts.Collection>(from: BasicBeasts.CollectionStoragePath)
                    ?? panic("Could not borrow a reference to the stored Beast collection")
        
                self.beastRef = collectionRef.borrowEntireBeast(id: id)!
        
            }
            execute {
                self.beastRef.setNickname(nickname: nickname)
            }
        }
        `),
        args([arg(nickname, t.String), arg(beastID, t.UInt64)]),
        payer(authz),
        proposer(authz),
        authorizations([authz]),
        limit(9999),
      ]).then(decode)
      setOpen(false)
      if (nickname != "") {
        setDisplayNickname(nickname)
      } else {
        setDisplayNickname(beastName)
      }
      tx(res).subscribe((res: any) => {
        toastStatus(id, res.status)
      })
      await tx(res)
        .onceSealed()
        .then((result: any) => {
          toast.update(id, {
            render: "Transaction Sealed",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          })
        })
      setNickname("")
      await fetchUserBeasts()
    } catch (err) {
      toast.update(id, {
        render: () => <div>Error, try again later...</div>,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      })
      console.log(err)

      setNickname("")
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <Container className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                style={{ borderRadius: "20px", width: "100%" }}
                className="relative bg-white rounded-lg pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full md:max-w-xl"
              >
                <Wrapper>
                  <ActionItem>
                    <Title>Change Nickname</Title>
                    <FuncArgInput
                      placeholder="Nickname"
                      type="text"
                      onChange={(e: any) => {
                        if (e.target.value.length < 16) {
                          if (!e.target.value.startsWith(" ")) {
                            setNicknameValidity(true)
                            setNickname(e.target.value)
                            setNicknameWarning("")
                          } else {
                            setNicknameValidity(false)
                            setNicknameWarning(
                              "Nickname can't start with space",
                            )
                          }
                        } else {
                          setNicknameValidity(false)
                          setNicknameWarning(
                            "Nickname must be less than 16 characters",
                          )
                        }
                      }}
                    />
                    <FuncArgButton
                      disabled={!nicknameValidity}
                      onClick={() => {
                        if (nicknameValidity) {
                          changeNickname()
                        }
                      }}
                    >
                      Save on-chain
                    </FuncArgButton>
                    <NicknameLengthWarning>
                      {nicknameWarning}
                    </NicknameLengthWarning>
                  </ActionItem>
                </Wrapper>
              </Dialog.Panel>
            </Transition.Child>
          </Container>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default ChangeNicknameModal
