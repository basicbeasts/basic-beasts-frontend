import { FC, Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CheckIcon, IdentificationIcon } from "@heroicons/react/outline"
import poopPic from "public/fungible_tokens/fungible_tokens_images/basic_beasts_poop.png"
import eggImage from "public/egg.png"
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
import eggDefault from "public/eggs/default_shine.png"
import eggElectric from "public/eggs/electric_shine.png"
import eggWater from "public/eggs/water_shine.png"
import eggGrass from "public/eggs/grass_shine.png"
import eggFire from "public/eggs/fire_shine.png"
import eggNormal from "public/eggs/normal_shine.png"

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
  position: relative;
  bottom: 0;
  padding: 2rem 0;
  background: #212127;
  color: #e4be23;
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

const Img = styled.img<any>`
  z-index: 50;
  max-width: 20rem;
  aspect-ratio: 1;
  border-radius: 10px;
  box-shadow: ${(props) => (props.selected ? `0px 0px 5px 4px #8F7A39` : `0`)};
  margin: auto;

  transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -webkit-transition: all 0.3s ease 0s;
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
  color: white;
  font-size: 1.2rem;
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

type Props = {
  open: boolean
  setOpen: any
  beast: any
}

const EggObtainedModal: FC<Props> = ({ open, setOpen, beast }) => {
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
              <DialogPanel style={{ width: "100%" }}>
                <div className="flex flex-col items-center h-full">
                  <Title>Congratulations!</Title>
                  <Title>You have recieved an egg!</Title>
                  <div className="relative z-10">
                    <Img
                      src={
                        beast?.elements[0] == "Electric"
                          ? eggElectric.src
                          : beast?.elements[0] == "Water"
                          ? eggWater.src
                          : beast?.elements[0] == "Grass"
                          ? eggGrass.src
                          : beast?.elements[0] == "Fire"
                          ? eggFire.src
                          : beast?.elements[0] == "Normal"
                          ? eggNormal.src
                          : eggDefault.src
                      }
                    />
                    {/* <Backshine /> */}
                  </div>
                  <Button>Go To Your Egg Collection</Button>
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
export default EggObtainedModal
