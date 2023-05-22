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
import eggDefault from "public/eggs/default_shine.png"
import eggElectric from "public/eggs/electric_shine.png"
import eggWater from "public/eggs/water_shine.png"
import eggGrass from "public/eggs/grass_shine.png"
import eggFire from "public/eggs/fire_shine.png"
import eggNormal from "public/eggs/normal_shine.png"
import { toastStatus } from "@framework/helpers/toastStatus"
import { useUser } from "@components/user/UserProvider"
import { useHoursLeft } from "../EggTab/useHoursLeft"
import incubatorDefault from "public/eggs/incubator_default_testnet.gif"
import incubatorElectric from "public/eggs/incubator_electric_testnet.gif"
import incubatorWater from "public/eggs/incubator_water_testnet.gif"
import incubatorGrass from "public/eggs/incubator_grass_testnet.gif"
import incubatorFire from "public/eggs/incubator_fire_testnet.gif"
import incubatorNormal from "public/eggs/incubator_normal_testnet.gif"
import HatchingModal from "../HatchingModal"

const DialogPanel = styled(Dialog.Panel)<any>`
  position: relative;
  border-radius: 1.2rem;
  background: white;
  color: black;
  overflow: hidden;
  width: 500px;
  height: 600px;
`

const Button = styled.button<any>`
  margin-top: 20px;
  background: ${(props) => props.backgroundColor || "#ffe8a3"};
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

const Container = styled.div``

const Img = styled.img`
  position: relative;
  max-width: 20rem;
  margin-bottom: -120px;
  // z-index: 50;
  // aspect-ratio: 1;
  // border-radius: 10px;

  // transition: all 0.3s ease 0s;
  // -moz-transition: all 0.3s ease 0s;
  // -webkit-transition: all 0.3s ease 0s;
`
const IncubatorImg = styled.img`
  position: relative;
  max-width: 25rem;
  margin-bottom: -170px;
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
const Header = styled.div<any>`
  position: relative;
  background: ${(props) => props.colorCode};
  width: 100%;
  height: 9rem;
  display: flex;
  justify-content: center;
  margin-bottom: 10rem;
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
  egg: any
}

const EggViewModal: FC<Props> = ({ open, setOpen, egg }) => {
  const { fetchHunterData } = useUser()
  const [openHatchingModal, setOpenHatchingModal] = useState(true)

  const eggTimer = egg?.incubationTimer?.incubationDateEnding
  const { hoursLeft, hasPassed } = useHoursLeft(eggTimer ? eggTimer : 0)

  const incubate = async () => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
        import Egg from 0xEgg

        transaction(eggID: UInt64) {
        
            prepare(acct: AuthAccount) {
        
                let eggCollectionRef = acct.borrow<&Egg.Collection>(from: Egg.CollectionStoragePath)
                    ?? panic("Couldn't get a reference to the egg collection")
                    
                let eggRef = eggCollectionRef.borrowEntireEgg(id: eggID)
        
                eggRef!.incubate()
                
            }
        
        }
        `),
        args([arg(egg?.id, t.UInt64)]),
        payer(authz),
        proposer(authz),
        authorizations([authz]),
        limit(9999),
      ]).then(decode)
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
      fetchHunterData()
      setOpen()
    } catch (err) {
      toast.update(id, {
        render: () => <div>Error, try again later...</div>,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      })
      console.log(err)
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
                <HatchingModal
                  handleClose={() => setOpenHatchingModal(false)}
                  RevealModalOpen={openHatchingModal}
                  packId={"1" || "1"}
                  evolvedBeastId={
                    egg?.beast[Object.keys(egg?.beast ?? {})[0]]?.beastTemplate
                      .beastTemplateID
                  }
                  egg={egg}
                />
                <Header
                  colorCode={
                    egg?.elementType == "Electric"
                      ? "linear-gradient(180deg, rgba(255,232,163,1) 0%, rgba(255,217,102,1) 100%)"
                      : egg?.elementType == "Water"
                      ? "linear-gradient(180deg, #c8daf8 0%, #A4C2F4 100%)"
                      : egg?.elementType == "Grass"
                      ? "linear-gradient(180deg, #D4E7CB 0%, #B7D7A8 100%)"
                      : egg?.elementType == "Fire"
                      ? "linear-gradient(180deg, #F2C2C2 0%, #EA9999 100%)"
                      : "linear-gradient(180deg, #E6CAD7 0%, #D5A6BD 100%)"
                  }
                >
                  <div className="absolute -bottom-5">
                    <EggDiv>
                      {/* <Light src={GoldLight.src} /> */}
                      {egg?.incubationTimer != null ? (
                        <IncubatorImg
                          src={
                            egg?.elementType == "Electric"
                              ? incubatorElectric.src
                              : egg?.elementType == "Water"
                              ? incubatorWater.src
                              : egg?.elementType == "Grass"
                              ? incubatorGrass.src
                              : egg?.elementType == "Fire"
                              ? incubatorFire.src
                              : egg?.elementType == "Normal"
                              ? incubatorNormal.src
                              : incubatorDefault.src
                          }
                        />
                      ) : (
                        <Img
                          src={
                            egg?.elementType == "Electric"
                              ? eggElectric.src
                              : egg?.elementType == "Water"
                              ? eggWater.src
                              : egg?.elementType == "Grass"
                              ? eggGrass.src
                              : egg?.elementType == "Fire"
                              ? eggFire.src
                              : egg?.elementType == "Normal"
                              ? eggNormal.src
                              : eggDefault.src
                          }
                        />
                      )}
                    </EggDiv>
                  </div>
                </Header>
                <div className="flex flex-col items-center h-full">
                  {egg?.incubationTimer != null ? (
                    <>
                      {/** TODO make opposite */}
                      {Math.floor(Date.now() / 1000) >
                      egg?.incubationTimer?.incubationDateEnding ? (
                        <>
                          <P>Your egg is incubating</P>
                          <P>Hours left: {hoursLeft}</P>
                        </>
                      ) : (
                        <>
                          <P>Your egg is ready to hatch!</P>
                          <Button
                            onClick={() => {
                              setOpenHatchingModal(true)
                              console.log(
                                egg?.beast[Object.keys(egg?.beast ?? {})[0]]
                                  ?.beastTemplate.beastTemplateID,
                              )
                            }}
                            backgroundColor={
                              egg?.elementType == "Electric"
                                ? "#FFE595"
                                : egg?.elementType == "Water"
                                ? "#A4C2F4"
                                : egg?.elementType == "Grass"
                                ? "#B7D7A8"
                                : egg?.elementType == "Fire"
                                ? "#EA9999"
                                : "#D5A6BD"
                            }
                          >
                            Hatch
                          </Button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <P>Incubate your egg to hatch it</P>
                      <Button
                        onClick={() => incubate()}
                        backgroundColor={
                          egg?.elementType == "Electric"
                            ? "#FFE595"
                            : egg?.elementType == "Water"
                            ? "#A4C2F4"
                            : egg?.elementType == "Grass"
                            ? "#B7D7A8"
                            : egg?.elementType == "Fire"
                            ? "#EA9999"
                            : "#D5A6BD"
                        }
                      >
                        Incubate
                      </Button>
                    </>
                  )}
                  {/* <P>Your egg is ready to hatch!</P>
                  <Button
                    backgroundColor={
                      egg?.elementType == "Electric"
                        ? "#FFE595"
                        : egg?.elementType == "Water"
                        ? "#A4C2F4"
                        : egg?.elementType == "Grass"
                        ? "#B7D7A8"
                        : egg?.elementType == "Fire"
                        ? "#EA9999"
                        : "#D5A6BD"
                    }
                  >
                    Hatch
                  </Button> */}
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
