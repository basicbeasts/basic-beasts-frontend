import { FC, Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"

import styled from "styled-components"

import { toast } from "react-toastify"

const Container = styled.div`
  align-items: center;
`
const ItemInfo = styled.div`
  display: flex;
  padding: 1rem 2rem;
  align-items: center;
  // background-image: linear-gradient(to top, transparent, #ffdf7e);
  // height: 80px;
  justify-content: space-evenly;
  border-radius: 0.5rem;
  gap: 1px;
  @media (max-width: 460px) {
    flex-direction: column;
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
  padding: 20px;
  background: #1d1d21;
  color: white;
`
const Panel = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 2.5rem;
  @media (min-width: 840px) {
    grid-template-columns: 1fr 1fr;
  }
`

const Card = styled.div`
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  @media (min-width: 840px) {
    &:first-child {
      grid-column: 1/3;
    }
  }
`
const P = styled.p`
  margin: 0 1.2rem;
  font-size: 1.75rem;
  line-height: 1;
`

type Props = {
  // beastID: any
  open: boolean
  setOpen: any
  // fetchUserBeasts: any
  // beastModalSetOpen: any
  // setDisplayNickname: any
  // beastName: any
}

const BeastMarketSkinItem: FC<{ background: any }> = ({ background }) => {
  return (
    <ItemInfo style={{ background: background }}>
      <Item style={{ alignItems: "start" }}>
        <H2>78K</H2>Beasts
      </Item>
      <Item>
        <H2>78K</H2>Floor
      </Item>
      <Item style={{ alignItems: "end" }}>
        <H2>78K</H2>Highest Sale
      </Item>
    </ItemInfo>
  )
}
const BeastMarketSkinOverviewModal: FC<Props> = ({
  // beastID,
  open,
  setOpen,
  // fetchUserBeasts,
  // beastModalSetOpen,
  // setDisplayNickname,
  // beastName,
}) => {
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
                <div
                  className="text-right absolute top-0 left-0 right-3 sm:hidden"
                  onClick={() => setOpen(false)}
                >
                  {/* <FontAwesomeIcon
                          
                            onClick={() => setOpen(false)}
                            icon={faChevronUp}
                          /> */}
                  <div style={{ fontSize: "2em" }}>x</div>
                </div>
                <Title>BASIC BEASTS SKINS</Title>{" "}
                <Panel>
                  <Card style={{ textAlign: "end" }}>
                    <P>Normal</P> <BeastMarketSkinItem background={"#E4E8E7"} />
                  </Card>
                  <Card style={{ textAlign: "end" }}>
                    <P>Metallic Silver</P>
                    <BeastMarketSkinItem background={" #C1D3E1"} />
                  </Card>
                  <Card style={{ textAlign: "start" }}>
                    <P>Cursed Black</P>
                    <BeastMarketSkinItem background={"#FCECF8"} />
                  </Card>
                  <Card style={{ textAlign: "end" }}>
                    {" "}
                    <P>Shiny Gold</P>
                    <BeastMarketSkinItem background={" #FFF4CD"} />
                  </Card>
                  <Card style={{ textAlign: "start" }}>
                    <P>Mythic Diamond</P>
                    <BeastMarketSkinItem background={"#BDEBFB"} />
                  </Card>{" "}
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
