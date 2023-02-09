import { FC, Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CheckIcon, IdentificationIcon } from "@heroicons/react/outline"
import scroll from "public/scroll_icon.png"
import sushiPic from "public/fungible_tokens/fungible_tokens_images/basic_beasts_sushi.png"
import bottlePic from "public/fungible_tokens/fungible_tokens_images/basic_beasts_empy_potion_bottle.png"
import poopPic from "public/fungible_tokens/fungible_tokens_images/basic_beasts_poop.png"
import picture from "public/mysterious_old_lady.png"
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
  padding: 20px 0 0;
  background: #212127;
  color: #e4be23;
`

const Button = styled.button`
  margin-top: 30px;
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
  max-width: 5rem;
  aspect-ratio: 1;
  border-radius: 10px;
  box-shadow: ${(props) => (props.selected ? `0px 0px 5px 4px #8F7A39` : `0`)};
  margin: 20px 20px 0;

  transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -webkit-transition: all 0.3s ease 0s;
`
const ImgDiv = styled.div`
  border-radius: 1rem;
  padding: 0 1rem;
`
const LadyImg = styled.img`
  --size: 10rem;
  position: absolute;
  top: calc(var(--size) * -1);
  right: 0;
  max-height: var(--size);
  max-width: var(--size);
  border-radius: 10px;

  // margin: 20px 20px 0;

  transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -webkit-transition: all 0.3s ease 0s;
`
const TextDiv = styled.div`
  margin-top: 50px;
  text-align: start;
  font-size: 2rem;
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

type Props = {
  open: boolean
  setOpen: any
  sushiBalance: any
  emptyPotionBottleBalance: any
  poopBalance: any
}

const MakeLovePotionModal: FC<Props> = ({
  open,
  setOpen,
  sushiBalance,
  emptyPotionBottleBalance,
  poopBalance,
}) => {
  const SUSHI_REQUIRED = 5
  const POOP_REQUIRED = 5
  const BOTTLE_REQUIRED = 1

  const numberColors = () => {
    let sushiColor
    let bottleColor
    let poopColor
    {
      sushiBalance >= SUSHI_REQUIRED
        ? (sushiColor = "white")
        : (sushiColor = "red")
    }
    {
      emptyPotionBottleBalance >= 2
        ? (bottleColor = "white")
        : (bottleColor = "red")
    }
    {
      poopBalance >= POOP_REQUIRED ? (poopColor = "white") : (poopColor = "red")
    }
    return { sushiColor, bottleColor, poopColor }
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
                <div className="h-full">
                  <Title>Love Potion</Title>
                  <div>
                    <P>Required Materials</P>
                    <div className="grid mx-auto mt-2 gap-12 border-t border-gray-500 grid-cols-3 w-max">
                      <div>
                        <ImgDiv style={{ backgroundColor: "#fff1ef" }}>
                          <Img src={sushiPic.src} />
                        </ImgDiv>
                        <P>
                          <MaterialNumber numColor={numberColors().sushiColor}>
                            {parseInt(sushiBalance)}
                          </MaterialNumber>
                          /{SUSHI_REQUIRED}
                        </P>
                      </div>
                      <div>
                        <ImgDiv style={{ backgroundColor: "#dfece2" }}>
                          <Img
                            style={{ padding: ".5rem" }}
                            src={bottlePic.src}
                          />
                        </ImgDiv>

                        <P>
                          <MaterialNumber numColor={numberColors().bottleColor}>
                            {parseInt(emptyPotionBottleBalance)}
                          </MaterialNumber>
                          /{BOTTLE_REQUIRED}
                        </P>
                      </div>
                      <div>
                        <ImgDiv style={{ backgroundColor: "#ece6df" }}>
                          <Img src={poopPic.src} />
                        </ImgDiv>

                        <P>
                          <MaterialNumber numColor={numberColors().poopColor}>
                            {parseInt(poopBalance)}
                          </MaterialNumber>
                          /{POOP_REQUIRED}
                        </P>
                      </div>
                    </div>
                    <Button
                      disabled={
                        sushiBalance < SUSHI_REQUIRED ||
                        emptyPotionBottleBalance < BOTTLE_REQUIRED ||
                        poopBalance < POOP_REQUIRED
                      }
                    >
                      Make Love Potion
                    </Button>
                  </div>
                  <div className="relative">
                    <LadyImg src={picture.src} />
                    <TextDiv>
                      <H1>Mysterious Old Lady</H1>
                      <p>Hey there, young adventurer! Want a love potion?</p>
                    </TextDiv>
                  </div>
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
export default MakeLovePotionModal
