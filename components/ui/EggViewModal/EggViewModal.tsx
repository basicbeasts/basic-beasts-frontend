import { FC, Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CheckIcon, IdentificationIcon } from "@heroicons/react/outline"
import poopPic from "public/fungible_tokens/fungible_tokens_images/basic_beasts_poop.png"
import picture from "public/001_normal.png"
import star from "public/basic_starLevel.png"
import styled from "styled-components"
import Egg from "public/egg.png"
import GoldLight from "public/gold_light.png"

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
  position: relative;
  border-radius: 1.2rem;
  background: white;
  color: black;
  overflow: hidden;
  width: 500px;
  height: 600px;
`

const Button = styled.button`
  margin-top: 20px;
  background: #ffd966;
  // border: 1px solid #e4be23;
  color: black;
  font-size: 1.5em;
  padding: 10px 20px;
  border-radius: 8px;
  outline: none;
  cursor: pointer;

  &:disabled {
    background: #b69c50;
  }

  // transition: all 0.1s ease 0s;
  // -moz-transition: all 0.1s ease 0s;
  // -webkit-transition: all 0.1s ease 0s;
  // &:hover {
  //   background: #e4be23;
  //   color: #212127;

  //   transition: all 0.1s ease 0s;
  //   -moz-transition: all 0.1s ease 0s;
  //   -webkit-transition: all 0.1s ease 0s;
  // }
`

const Title = styled.div`
  font-size: 2.5em;
  text-align: center;
  line-height: 1;
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

const Container = styled.div``

const Box = styled.div<any>`
  height: 50px;
  width: 50px;
  background: ${(props) => (props.selected ? "#ffe595" : "#425066")};
`

const Notice = styled.div`
  margin-top: 10px;
`

const Img = styled.img`
  position: relative;
  max-width: 5rem;
  // z-index: 50;
  // aspect-ratio: 1;
  // border-radius: 10px;

  // transition: all 0.3s ease 0s;
  // -moz-transition: all 0.3s ease 0s;
  // -webkit-transition: all 0.3s ease 0s;
`
const ImgDiv = styled.div`
  border-radius: 1rem;
  padding: 0 1rem;
`

const TextDiv = styled.div`
  margin-top: 1rem;
  text-align: start;
  font-size: 1.2rem;
  border: 0.45rem solid white;
  padding: 2rem;
  width: 100%;
  background: #111823;
`
const H1 = styled.h1`
  line-height: 1;
  color: yellow;
`
const P = styled.p`
  font-size: 1.5rem;
`
const MaterialNumber = styled.span<any>`
  color: ${(props) => props.numColor};
`

const Backshine = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 1rem;
  background-color: #edb72c;
  // background-image: linear-gradient(
  //   to right,
  //   transparent,
  //   #edb72c,
  //   transparent
  // );
  width: 15rem;
  height: 1px;
  z-index: -1;
  box-shadow: 0 0 15px 1px gold;
`
const Header = styled.div`
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(255, 232, 163, 1) 0%,
    rgba(255, 217, 102, 1) 100%
  );
  width: 100%;
  height: 9rem;
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;
`
const Light = styled.img`
  position: absolute;
  max-width: 18rem;
  bottom: -3.8rem;
`
const EggDiv = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`

type Props = {
  open: boolean
  setOpen: any
}

const EggViewModal: FC<Props> = ({ open, setOpen }) => {
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
          <Container className="flex items-center sm:items-center justify-center min-h-full text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel>
                <Header>
                  <div className="absolute -bottom-5">
                    <EggDiv>
                      <Light src={GoldLight.src} />
                      <Img src={Egg.src} />
                    </EggDiv>
                  </div>
                </Header>
                <div className="flex flex-col items-center h-full">
                  <P>Your egg is ready to hatch!</P>

                  <Button>Hatch!</Button>
                </div>
                {/* <Wrapper className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"></Wrapper> */}
              </DialogPanel>
            </Transition.Child>
          </Container>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default EggViewModal
