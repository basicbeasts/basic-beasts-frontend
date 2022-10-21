import styled from "styled-components"
import { FC, useState, Fragment, useEffect } from "react"
import star from "public/basic_starLevel.png"

import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import { useAuth } from "@components/auth/AuthProvider"
import BeastMarketThumbnail from "../BeastMarketThumbnail"
const Wrapper = styled.div`
  background: transparent;
  // border: solid #808080 0.5px;
  border-radius: 10px;
  // margin-left: 1.125rem;
  width: 100%;
  min-width: max-content;
  padding: 5px 15px;
  max-height: 750px;
`

const Header = styled.header`
  font-size: 1.5rem;
`

const H2 = styled.h2`
  font-size: 1rem;
  margin: 11px 0;
`

const InputContainer = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  background: #282e3a;
  justify-content: space-between;
  grid-template-columns: 1fr auto;
  border: 0.5px solid #808080;
  border-radius: 3px;
  padding: 0 10px;
  height: 35px;
`

const FuncArgInput = styled.input`
  display: flex;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1rem;
  /* padding-left: 7px; */
  width: 100%;
  cursor: pointer;
  margin-bottom: 0;
  outline: none;
  -webkit-appearance: none;
  &::placeholder {
    color: #d0d8e1;
    text-transform: uppercase;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button,
  &[type="number"] {
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;
  }
`

const InputDefaultText = styled.div`
  display: flex;
  width: 30px;
  align-items: center;
  justify-content: center;
`
const SliderDesign = styled<any>(Slider)`
  margin-bottom: 1rem;
  & *:not(.rc-slider-handle) {
    height: 10px;
  }
  .rc-slider-handle {
    margin-top: -7px;
    background: #1d1f2a;
    opacity: 1;
    border: 1px solid #d0d8e1;
    width: 1.5rem;
    height: 1.5rem;
  }
  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border: 2px solid #f9df51;

    box-shadow: none;
  }

  .rc-slider-rail {
    background: #292d3b;
  }
  .rc-slider-track {
    background: #f9df51;
  }
`

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
  margin: 1rem 0;
`
const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2.5px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`
const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${SwitchSlider} {
    background-color: #f9df51;
  }
  &:checked + ${SwitchSlider}:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
  }
`
const InfoCircle = styled.div`
  --size: 0.45rem;
  position: relative;
  border: 1px solid grey;
  border-radius: 50%;
  width: var(--size);
  height: var(--size);
  padding: var(--size);
  line-height: 0;
  font-size: 12px;
`
const InfoCircleText = styled.span`
  visibility: hidden;
  width: max-content;
  max-width: 26rem;
  background-color: rgb(41, 45, 59);
  color: #fff;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 99999;
  top: 225%;
  left: 50%;
  right: 50%;
  transform: translateX(-85%);

  line-height: 1;
  font-size: 1rem;
  text-transform: capitalize;

  ${InfoCircle}:hover & {
    visibility: visible;
  }
`
const Cart = styled.div`
  border-bottom: 1px solid grey;
  padding-bottom: 1rem;
  text-align: center;
  font-size: 1.5rem;
  color: rgb(127, 127, 129);
`
const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  font-size: 1.5rem;
`

const MobileConnect = styled.button`
  margin-right: 0px;
  color: #222427;
  font-size: 1.5rem;

  background: rgba(22, 22, 26, 0.04);
  line-height: 40px;
  min-width: auto;
  border: 1px solid;
  border-radius: 0.5rem;
  transition: all 0.15s ease-in-out 0s;
  transform-origin: center center;
  user-select: none;

  backdrop-filter: blur(20px) !important;
  background: #f9df51;
  border-color: #f9df51;

  width: 100%;

  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;

  &:hover {
    color: #f3cb23;
    background: #222427;
    border-color: #393b3d;
  }
`
const ConnectP = styled.p`
  max-width: 34ch;
  line-height: 1;
  margin: 0.5rem 0;
`
const BeastMarketThumbnailSmall = styled<any>(BeastMarketThumbnail)`
  width: 5rem;
  margin: 1rem 0;
  border-radius: 10px;
  overflow: hidden;
`

const StarLevel = styled.div`
  vertical-align: middle;
  position: absolute;
  top: 0;
`

const StarImg = styled.img`
  margin-top: 1.2rem;
  margin-left: 0.25rem;
  width: 0.8rem;
  user-drag: none;
  -webkit-user-drag: none;
  float: left;
`
const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: -1rem;
  z-index: 1;
  margin-top: 0.35rem;
  margin-right: 0.35rem;
  padding: 0.4rem;
  padding-top: calc((1 - 0.5) * 0.5em);
  width: min-content;
  color: lightgrey;
  font-size: 1.2rem;
  font-weight: 500;

  line-height: 0.5;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.75);
`
const BeastList = styled.div`
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`

type Props = {
  // count: any
  // selectedBeast: any
  beasts: any
}

const BeastMarketSweep: FC<Props> = ({ beasts }) => {
  // const [value, setValue] = useState(50)

  const [disabled, setDisabled] = useState(false)
  const [range, setRange] = useState(false)
  const [reverse, setReverse] = useState(false)
  const [vertical, setVertical] = useState(false)
  const [value, setValue] = useState(0)
  const { logIn, logOut, user, loggedIn } = useAuth()
  const [overviewOpen, setOverviewOpen] = useState(false)
  const [displayBeasts, setDisplayBeasts] = useState<any>(null)
  // const [beasts, setBeasts] = useState<any>([])
  const [selectedBeast, setSelectedBeast] = useState<any>(null)
  const [open, setOpen] = useState(false)
  const [displayNickname, setDisplayNickname] = useState<string | null>(null)
  const [possibleBeastsToCart, setPossibleBeastToCart] = useState<any>()
  const [max, setMax] = useState(0)
  const [beastsToSweep, setBeastsToSweep] = useState()

  useEffect(() => {
    if (beasts != null) {
      setDisplayBeasts(beasts)
    }
  }, [beasts])

  useEffect(() => {
    if (displayBeasts != null) {
      setDisplayBeasts(displayBeasts)
    }
  }, [displayBeasts])

  const areWeLoggedIn = () => {
    let logInInfo = "h-96 overflow-scroll"
    {
      !loggedIn
        ? (logInInfo = "max-h-72 overflow-scroll")
        : (logInInfo = "max-h-96 overflow-scroll")
    }

    return logInInfo
  }

  useEffect(() => {
    let beastsForSale = displayBeasts?.filter(
      (beast: any) => beast.price != null,
    )
    let sortedBeastsByPrice = beastsForSale?.sort(
      (a: any, b: any) => a.price - b.price,
    )
    setMax(sortedBeastsByPrice?.length)
    setPossibleBeastToCart(sortedBeastsByPrice)
    // console.log(sortedBeastsByPrice)
  }, [value])

  return (
    <>
      <Wrapper>
        <div className="flex justify-between">
          <Header>
            Sweep
            {value != 0 ? " (" + value + ")" : <></>}
          </Header>
          <button>clear</button>
        </div>
        <H2>Max price per item (optional)</H2>
        <InputContainer>
          <FuncArgInput />
          <InputDefaultText>FUSD</InputDefaultText>
        </InputContainer>
        <H2>Number of items</H2>
        <SliderDesign
          // count={2}
          // disabled={disabled}
          // reverse={reverse}
          // vertical={vertical}
          // range={range}
          // defaultValue={value}
          // dots
          // step={5}
          // draggableTrack
          // pushable={5}
          // allowCross={false}
          onChange={(nextValues: any) => {
            // console.log("Change:", nextValues)
            setValue(nextValues as any)
          }}
          value={value}
          min={0}
          max={max}
          // defaultValue={0.81}
          step={1}
        />

        {/* <div>
          <FuncArgInput type="range" min="1" max="100" step={1} id="myRange" />
        </div> */}
        <InputContainer>
          <FuncArgInput
            value={value}
            type="number"
            onChange={(e) => setValue(Number(e.target.value))}
            min={0}
            max={max}
          />
          <InputDefaultText>Items</InputDefaultText>
        </InputContainer>
        <div className="flex items-center gap-2">
          <Switch>
            <SwitchInput type="checkbox" />
            <SwitchSlider></SwitchSlider>
          </Switch>

          <p>Auto swap items</p>
          <InfoCircle>
            i
            <InfoCircleText>
              Automatically swap items that are sold or delisted while sweeping.
              Each transaction attempt will need wall approval.
            </InfoCircleText>
          </InfoCircle>
        </div>

        {/* Insert Cart Here */}

        {possibleBeastsToCart != null ? (
          <BeastList className={areWeLoggedIn()}>
            {possibleBeastsToCart?.slice(0, value).map((beast: any) => (
              <li
                key={beast.id}
                className="flex items-center justify-between relative list-none"
                onClick={() => {
                  setOpen(true)
                  setSelectedBeast(beast)
                  setDisplayNickname(null)
                }}
              >
                <div className="flex items-center gap-3 ">
                  <div className="relative">
                    <BeastMarketThumbnailSmall
                      id={beast.id}
                      className="object-cover group-hover:opacity-90"
                      beastTemplateID={beast.beastTemplateID}
                    />
                    <RemoveButton
                      onClick={() => displayBeasts.splice(beast, 1)}
                    >
                      x
                    </RemoveButton>
                    <StarLevel>
                      {Array(beast.starLevel)
                        .fill(0)
                        .map((_, i) => (
                          <StarImg key={i} src={star.src} />
                        ))}
                    </StarLevel>
                  </div>

                  <div>price</div>
                </div>
                <div>
                  {beast.price != null
                    ? parseFloat(beast.price).toFixed(2)
                    : "not for sale"}
                </div>
              </li>
            ))}
          </BeastList>
        ) : (
          <Cart>(Cart is empty)</Cart>
        )}

        <TotalPrice>
          <p>Total price</p>
          <span>0</span>
        </TotalPrice>
        {!loggedIn ? (
          <>
            <MobileConnect onClick={() => logIn()}>
              Connect wallet
            </MobileConnect>
            <ConnectP>
              By clicking &quot;Connect wallet&quot;, you agree to the Basic
              Beasts Terms of Service Bla Lalallaa A
            </ConnectP>
          </>
        ) : (
          <MobileConnect>Sweep</MobileConnect>
        )}
      </Wrapper>
    </>
  )
}

export default BeastMarketSweep
