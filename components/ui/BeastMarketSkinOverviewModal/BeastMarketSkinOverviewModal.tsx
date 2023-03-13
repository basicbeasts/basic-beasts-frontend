import { FC, Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"

import styled from "styled-components"

import { toast } from "react-toastify"

const Container = styled.div`
  align-items: center;
  @media (max-width: 420px) {
    padding: 0;
  }
`
const ItemInfo = styled.div`
  display: flex;
  position: relative;
  padding: 1rem 2rem;
  align-items: center;
  // background-image: linear-gradient(to top, transparent, #ffdf7e);
  // height: 80px;
  justify-content: space-evenly;
  border-radius: 0.5rem;
  gap: 1px;
  @media (max-width: 839px) {
    padding: 0.5rem 10vw;
  }
  @media (max-width: 375px) {
    padding: 0.5rem 5vw;
  }
`
const Title = styled.h1`
  font-size: 3rem;
  line-height: 0;
  position: absolute;
  top: 12rem;
  left: -12rem;
  rotate: 270deg;
  color: aliceblue;
  @media (max-width: 340px) {
    left: -10rem;
  }
  @media (max-width: 839px) {
    display: none;
  }
`

const H2 = styled.h2`
  font-size: 2rem;
`
const Item = styled.div`
  display: flex;
  position: relative;
  width: 80px;

  min-width: 33.33%;
  color: black;
  font-size: 0.8rem;
  line-height: 1;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  @media (max-width: 460px) {
    align-items: center !important;
  }
`
const DialogPanel = styled(Dialog.Panel)<any>`
  padding: 80px;
  background: #1d1d21;
  color: white;
  @media (max-width: 1024px) {
    padding: 50px 60px;
  }
  @media (max-width: 839px) {
    padding: 5px 0;
    width: 90vw;
  }
  @media (max-width: 420px) {
    width: 95%;
  }
  @media (max-width: 375px) {
    width: 100%;
  }
`
const Panel = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 2.5rem;
  @media (min-width: 840px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 839px) {
    gap: 0;
  }
`

const Card = styled.div`
  padding: 1rem;
  border-radius: 10px;

  text-align: end;
  &:nth-child(3),
  &:nth-child(5) {
    text-align: start;
  }
  @media (min-width: 840px) {
    &:first-child {
      grid-column: 1/3;
    }
  }

  @media (max-width: 839px) {
    padding: 1rem 0;
  }
`
const P = styled.p`
  margin: 0 1.2rem;
  font-size: 1.75rem;
  line-height: 1;
  @media (max-width: 839px) {
    text-align: end;
  }
`

const Img = styled.img`
  position: absolute;
  width: 35%;
  top: -94.5%;

  &.Normal {
    transform: scaleX(-1) translateX(-10%);
    top: -94%;
  }

  &.Metallic,
  &.Normal {
    left: 0px;
  }

  &.Metallic {
    transform: translateX(-10%);
  }

  &.Cursed {
    left: 88.5%;
    top: 50%;
    transform: translateY(-62%) rotate(90deg);
  }

  &.Shiny {
    top: auto;
    bottom: -94.5%;
    rotate: 180deg;
    left: 0px;
  }

  &.Mythic {
    right: 0;
    transform: translateX(10%);
  }

  @media (max-width: 839px) {
    &.Mythic,
    &.Shiny,
    &.Cursed,
    &.Metallic,
    &.Normal {
      bottom: auto;
      right: auto;
      top: -108%;
      transform: translate(0, 0) rotate(0deg) scaleX(-1);
      rotate: 0deg;
      left: 0;
      width: 98.1px;
      height: 98.1px;
      // scale: scaleX(1)
    }
  }
`

const CloseModal = styled.div`
  @media (max-width: 421px) {
    transform: translateY(-5px);
  }
`

type Props = {
  // beastID: any
  open: boolean
  setOpen: any
  beasts: any // had to pass the beasts array
  // fetchUserBeasts: any
  // beastModalSetOpen: any
  // setDisplayNickname: any
  // beastName: any
}

const BeastMarketSkinItem: FC<{
  background: any
  beasts: any
  imgSrc: any
  imgClass: any
}> = ({ background, beasts, imgSrc, imgClass }) => {
  const getFloorPrice = () => {
    // function to get floor price
    const prices = beasts
      ?.filter(
        (beast: any) => beast.price !== null && beast.price !== undefined,
      ) //filter for the beasts that do have a price
      .map((beast: any) => parseFloat(beast.price)) // transform string into number

    return prices?.length > 0 ? "$" + formatNumber(Math.min(...prices)) : "--" // returns the price
  }

  // Alex: Format numbers everywhere, TODO
  const formatNumber = (number: number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M"
    } else if (number >= 100000) {
      return (number / 1000).toFixed(0) + "k"
    } else if (number >= 10000) {
      return (number / 1000).toFixed(1) + "k"
    } else if (number >= 1000) {
      return (number / 1000).toFixed(0) + "k"
    } else {
      return number.toString()
    }
  }

  const getHunters = () => {
    // function to get the nr. of hunters
    // returns new set (a set can only have unique values) of the array that contains all the currentOwners
    return [
      ...new Set(
        beasts
          ?.filter((beast: any) => beast.currentOwner)
          .map((beast: any) => beast.currentOwner),
      ),
    ].length
  }

  return (
    <ItemInfo style={{ background: background }}>
      <Item style={{ alignItems: "start" }}>
        <H2>{getHunters()}</H2>Hunters
      </Item>
      <Item>
        <H2>{beasts?.length}</H2>Beasts
      </Item>
      <Item style={{ alignItems: "end" }}>
        <H2>{getFloorPrice()}</H2>Floor
      </Item>
      <Img src={imgSrc} className={imgClass} alt="" />
    </ItemInfo>
  )
}

const BeastMarketSkinOverviewModal: FC<Props> = ({
  // beastID,
  open,
  setOpen,
  beasts,
  // fetchUserBeasts,
  // beastModalSetOpen,
  // setDisplayNickname,
  // beastName,
}) => {
  // Refactoring
  const skinsMap = [
    {
      name: "Normal",
      background: "#E4E8E7",
      src: "013_normal.png",
      class: "Normal",
    },
    {
      name: "Metallic Silver",
      background: "#C1D3E1",
      src: "013_metallic_silver_face.gif",
      class: "Metallic",
    },
    {
      name: "Cursed Black",
      background: "#FCECF8",
      src: "013_cursed_black_transparent_face.png",
      class: "Cursed",
    },
    {
      name: "Shiny Gold",
      background: "#FFF4CD",
      src: "013_shiny_gold_face.gif",
      class: "Shiny",
    },
    {
      name: "Mythic Diamond",
      background: "#BDEBFB",
      src: "013_mystery.png",
      class: "Mythic",
    },
  ]

  function getBeastsBySkin(skinName: string) {
    return beasts?.filter((beast: any) => beast.skin == skinName)
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
          <div className="fixed inset-0 bg-black bg-opacity-90 transition-opacity" />
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
              <DialogPanel
                style={{ borderRadius: "20px" }}
                className="relative rounded-lg text-left  shadow-xl transform transition-all "
              >
                <CloseModal
                  className="text-right absolute top-0 left-0 right-3 "
                  onClick={() => setOpen(false)}
                >
                  {/* <FontAwesomeIcon
                          
                            onClick={() => setOpen(false)}
                            icon={faChevronUp}
                          /> */}
                  <div style={{ fontSize: "2em" }}>x</div>
                </CloseModal>
                <Title>BASIC BEASTS SKINS</Title>{" "}
                <Panel>
                  {skinsMap.map((skin: any, idx: number) => {
                    //maps through the skinsMap and returns a new Card for each object
                    return (
                      <Card key={idx}>
                        <P style={{ color: skin.background }}>{skin.name}</P>
                        <BeastMarketSkinItem
                          beasts={getBeastsBySkin(skin.name)}
                          background={skin.background}
                          imgSrc={"teddies/" + skin.src}
                          imgClass={skin.class}
                        />
                      </Card>
                    )
                  })}
                </Panel>
              </DialogPanel>
            </Transition.Child>
          </Container>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default BeastMarketSkinOverviewModal
