import { FC, Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CheckIcon, IdentificationIcon } from "@heroicons/react/outline"

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
import profilePictures from "data/profilePictures"
import { toast } from "react-toastify"
import beastTemplates from "data/beastTemplates"
import { motion } from "framer-motion"

const ActionItem = styled.div`
  padding: 10px 0;
  width: 100%;
`

const FuncArgInput = styled.input`
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  font-size: 1.5em;
  padding: 10px 0px 10px 20px;
  border-radius: 8px 0 0 8px;
  width: 50%;
  cursor: pointer;
  margin-right: -1px;

  outline: none;
`

const FuncArgButton = styled.button`
  background: transparent;
  border: 1px solid #e4be23;
  color: #e4be23;
  font-size: 1.5em;
  padding: 10px 20px;
  border-radius: 0 8px 8px 0;
  outline: none;
  cursor: pointer;

  transition: all 0.2s ease 0s;
  -moz-transition: all 0.2s ease 0s;
  -webkit-transition: all 0.2s ease 0s;
  &:hover {
    background: #e4be23;
    color: #212127;

    transition: all 0.2s ease 0s;
    -moz-transition: all 0.2s ease 0s;
    -webkit-transition: all 0.2s ease 0s;
  }
`

const DialogPanel = styled(Dialog.Panel)<any>`
  // className="relative pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:w-full md:w-full"

  padding: 20px 20px 40px;
  background: #212127;
  color: #e4be23;
`

const Button = styled.button`
  margin-top: 20px;
  background: transparent;
  border: 1px solid #e4be23;
  color: #e4be23;
  font-size: 1.5em;
  padding: 10px 20px;
  border-radius: 8px;
  outline: none;
  cursor: pointer;

  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  &:hover {
    background: #e4be23;
    color: #212127;

    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
  }
`

const Title = styled.div`
  font-size: 2.5em;
  margin-bottom: 20px;
  text-align: center;
`

const Wrapper = styled.div`
  margin: 20px 20vw 0;
  /* display: flex;
  flex-direction: row; */
  /* justify-content: center;
  align-items: center;
  display: flex; */
  text-align: center;
`

const BeastContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  align-items: center;
`

const Box = styled.div<any>`
  height: 50px;
  width: 50px;
  background: ${(props) => (props.selected ? "#ffe595" : "#425066")};
`

const Notice = styled.div`
  margin-top: 10px;
`

const Img = styled.img<any>`
  height: 100px;
  width: 100px;
  border-radius: 10px;
  box-shadow: ${(props) => (props.selected ? `0px 0px 5px 4px #8F7A39` : `0`)};
  margin: 20px 20px 0;

  transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -webkit-transition: all 0.3s ease 0s;
`

type Props = {
  open: boolean
  setOpen: any
}

const EggObtainedModal: FC<Props> = ({ open, setOpen }) => {
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
          <Container className="flex items-end sm:items-center justify-center min-h-full text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <motion.div
                style={{ width: "100%" }}
                initial={{ opacity: 0, top: -20 }}
                animate={{ opacity: 1, top: 0 }}
                transition={{ duration: 0.5 }}
              >
                <DialogPanel style={{ width: "100%" }}>
                  <div>
                    <Title>Obtained Beasts</Title>
                  </div>
                  {/* <Wrapper className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"></Wrapper> */}
                </DialogPanel>
              </motion.div>
            </Transition.Child>
          </Container>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default EggObtainedModal
