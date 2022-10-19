import { FC, Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/outline"
import star from "public/basic_starLevel.png"
import styled from "styled-components"
import ChangeNicknameModal from "../ChangeNicknameModal"
import BgImage from "public/big_scroll_2.png"

const ContainerDiv = styled.div`
  align-items: center;
`

const Container = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
`

const Bg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`

const Text = styled.div`
  font-size: 2em;
  color: white;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: fit-content;
  margin: auto;
`

type Props = {
  open: boolean
  setOpen: any
}

const RewardsModal: FC<Props> = ({ open, setOpen }) => {
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
          <ContainerDiv className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
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
                style={{
                  borderRadius: "20px",
                }}
                className="relative rounded-lg pb-4 text-left overflow-hidden transform transition-all sm:my-8 sm:max-w-md sm:w-full md:max-w-xl"
              >
                <Container>
                  <Bg src={BgImage.src} />
                </Container>
              </Dialog.Panel>
            </Transition.Child>
          </ContainerDiv>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default RewardsModal
