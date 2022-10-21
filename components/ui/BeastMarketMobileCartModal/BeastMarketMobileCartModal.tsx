import { FC, Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import BeastMarketBulkBid from "../BeastMarketBulkBid"
import BeastMarketBulkBuy from "../BeastMarketBulkBuy"
import BeastMarketSweep from "../BeastMarketSweep"
import styled from "styled-components"

import { toast } from "react-toastify"

const Container = styled.div`
  // align-items: center;
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
  margin: 0;
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
  width: 100%;
  border-radius: 5px 5px 0 0;
  height: 25.0625rem;
  overflow: scroll;
  @media (max-width: 340px) {
    padding: 0.5rem;
  }
`
const Panel = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  // justify-items: center;
  // gap: 2.5rem;
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
const BuyButton = styled.button`
  width: 5rem;
  background: #f9df51;
  border-radius: 10px;
  height: 40px;
  color: black;
  font-size: 1.125rem;
  @media (max-width: 340px) {
    width: 3.5rem;
  }
`

type Props = {
  // beastID: any
  open: boolean
  setOpen: any
  beasts: any
  // fetchUserBeasts: any
  // beastModalSetOpen: any
  // setDisplayNickname: any
  // beastName: any
}

const BeastMarketMobileCartModal: FC<Props> = ({
  // beastID,
  open,
  setOpen,
  beasts,
  // fetchUserBeasts,
  // beastModalSetOpen,
  // setDisplayNickname,
  // beastName,
}) => {
  const [sweepOpen, setSweepOpen] = useState(false)
  const [bulkBuyOpen, setBulkBuyOpen] = useState(true)
  const [bulkBidOpen, setBulkBidOpen] = useState(false)

  const buttonColor = (clrOpen: any) => {
    var btnColor = "none"
    var fontColor = "white"
    {
      clrOpen == true
        ? ((btnColor = "#FEDD64"), (fontColor = "black"))
        : ((btnColor = "#262935"), (fontColor = "white"))
    }
    return { btnColor, fontColor }
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

        <div className="fixed z-10  inset-0 overflow-y-auto">
          <Container className="flex  items-end sm:justify-center min-h-full  text-center sm:p-0">
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
                // style={{ borderRadius: "20px" }}
                className="relative  text-left shadow-xl transform transition-all  "
              >
                <div
                  style={{ fontSize: "2em", lineHeight: "1" }}
                  className=" absolute top-0 right-3 sm:hidden"
                  onClick={() => setOpen(false)}
                >
                  x
                </div>

                <Panel>
                  <H2>My Cart</H2>
                  <div className="flex gap-5 mx-auto">
                    <BuyButton
                      style={{
                        background: buttonColor(bulkBuyOpen).btnColor,
                        color: buttonColor(bulkBuyOpen).fontColor,
                      }}
                      id="bulk"
                      onClick={() => (
                        setBulkBuyOpen(!bulkBuyOpen),
                        setSweepOpen(false),
                        setBulkBidOpen(false)
                      )}
                    >
                      Buy
                    </BuyButton>
                    <BuyButton
                      style={{
                        background: buttonColor(bulkBidOpen).btnColor,
                        color: buttonColor(bulkBidOpen).fontColor,
                      }}
                      id="bid"
                      onClick={() => (
                        setBulkBidOpen(!bulkBidOpen),
                        setSweepOpen(false),
                        setBulkBuyOpen(false)
                      )}
                    >
                      Bid
                    </BuyButton>
                    <BuyButton
                      style={{
                        background: buttonColor(sweepOpen).btnColor,
                        color: buttonColor(sweepOpen).fontColor,
                      }}
                      id="sweep"
                      onClick={() => (
                        setSweepOpen(!sweepOpen),
                        setBulkBuyOpen(false),
                        setBulkBidOpen(false)
                      )}
                    >
                      Sweep
                    </BuyButton>
                  </div>
                  <div className="mx-auto w-full">
                    {bulkBuyOpen && (
                      <div
                        style={{ color: "white", width: "100%" }}
                        className="h-max flex sticky justify-center top-0"
                      >
                        <BeastMarketBulkBuy beasts={beasts} />
                      </div>
                    )}
                    {bulkBidOpen && (
                      <div
                        style={{ color: "white" }}
                        className="h-max sticky top-0"
                      >
                        <BeastMarketBulkBid beasts={beasts} />
                      </div>
                    )}
                    {sweepOpen && (
                      <div
                        style={{ color: "white" }}
                        className="h-max sticky top-0"
                      >
                        <BeastMarketSweep beasts={beasts} />
                      </div>
                    )}
                  </div>
                </Panel>
              </DialogPanel>
            </Transition.Child>
          </Container>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default BeastMarketMobileCartModal
