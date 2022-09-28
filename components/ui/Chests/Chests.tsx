import type { NextPage } from "next"
import styled from "styled-components"
import { TypeAnimation } from "react-type-animation"
import chest from "public/nft-day-treasure-chest.png"
import { motion } from "framer-motion"
import { useAuth } from "@components/auth/AuthProvider"
import { useEffect, useState, FC, useRef } from "react"
import Countdown from "react-countdown"
import { ToastContainer, toast } from "react-toastify"
import * as fcl from "@onflow/fcl"
import {
  query,
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
import "react-toastify/dist/ReactToastify.css"
import ScrollIcon from "public/scroll_icon.png"
import ScrollModal from "@components/ui/ScrollModal"
import RewardsModal from "@components/ui/RewardsModal"

const Spacing = styled.div`
  @media (min-width: 1100px) {
    padding: 100px 0;
  }
`

const Container = styled.div`
  position: relative;
  background: black;
  color: white;
  height: 90vh;
  // height: 3000px;
  width: 100vw;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // flex-direction: column;
  font-size: 1em;
  text-align: center;
  z-index: 2;
`

const ChestDiv = styled.div<any>`
  --leftMid: ${(props) => props.randXMid}vw;
  --topMid: ${(props) => props.randYMid}%;

  --left: ${(props) => props.randXAfter}vw;
  --top: ${(props) => props.randYAfter}%;

  position: absolute;
  display: flex;
  justify-content: center;
  width: ${(props) => props.width}px;
  height: auto;
  left: ${(props) => props.randX || 0}vw;
  top: ${(props) => props.randY || 0}%;

  animation: move cubic-bezier(0.73, 0.29, 0.35, 0.78) infinite alternate;
  animation-delay: 5s;
  animation-duration: ${(props) => props.speed || 5}s;

  @keyframes move {
    50% {
      left: var(--leftMid);
      top: var(--topMid);
    }
    100% {
      left: var(--left);
      top: var(--top);
    }
  }
  &:hover {
    animation-play-state: paused;
    z-index: 100;
  }
`
const Img = styled.img`
  width: ${(props) => props.width}px;
  margin-bottom: -30px;
  ${ChestDiv}:hover & {
    filter: opacity(25%);
  }
`
const TextDiv = styled.div`
  position: absolute;
  display: grid;
  gap: 10px;
  margin: 20px;
  padding: 50px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
  font-size: 18px;
  color: white;
`
const ChestButton = styled.button`
  position: absolute;
  top: 58%;
  text-transform: uppercase;
  // padding: 5px;
  font-weight: 900;
  /* color: black; */
  // border-radius: 5px;
  border: none;
  transform: scale(0.2);
  transition: transform 0.2s ease-out;
  &:hover {
    color: #f3cb23;
  }

  opacity: 0;
  ${ChestDiv}:hover & {
    opacity: 1;
    transform: scale(1);
  }
`

const ChestText = styled.div<any>`
  position: absolute;
  width: ${(props) => props.width}px;
  top: 43%;
  text-transform: uppercase;
  color: #f3cb23;
  transform: scale(0.2);
  transition: transform 0.2s ease-out;
  opacity: 0;
  ${ChestDiv}:hover & {
    opacity: 1;
    transform: scale(1);
  }
`

const Button = styled.button`
  padding: 8px 24px 12px 26px;
  margin-top: 30px;
  margin-right: 2px;
  font-size: 26px;
  background-color: #feff95;
  box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
    0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset -3px -3px #f3cb23;
  color: #a75806;
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
      0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset 3px 3px #f3cb23;
  }
`
const ListingsButton = styled.button`
  color: white;
  border: 1px solid;
  border-radius: 5px;
  font-weight: 900;
  &:hover {
    color: #f3cb23;
  }
`

const BlackMarketButton = styled.button`
  padding: 8px 24px 10px 26px;
  margin-top: 30px;
  margin-right: 2px;
  font-size: 26px;
  background-color: #0ae890;
  box-shadow: -3px 0px 0px 0px #097248, 0px -3px 0px 0px #097248,
    0px 3px 0px 0px #097248, 3px 0px 0px 0px #097248, inset -3px -3px #0bc379;
  color: #095436;
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: -3px 0px 0px 0px #097248, 0px -3px 0px 0px #097248,
      0px 3px 0px 0px #097248, 3px 0px 0px 0px #097248, inset 3px 3px #0bc379;
  }
`

const Chests: FC = () => {
  const num: any = 20
  const rows: any = []
  const imgPositions: any = []
  const imgXs: any = []
  const imgYs: any = []
  const [whitelist, setWhitelist] = useState(true)
  let maxX: any, maxY: any

  const imageWidth = 220

  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const ref = useRef<any>(null)

  useEffect(() => {
    setHeight(ref.current.clientHeight)
    setWidth(ref.current.clientWidth)
  }, [ref])

  // function RandomNumberX() {
  //   var x = Math.floor(Math.random() * (80 - 10 + 1 + 10))

  //   return x
  // }
  // function RandomNumberY() {
  //   var y = Math.floor(Math.random() * (60 - 0 + 1 + 0))

  //   return y
  // }

  for (let index = 0; index < num; index++) {
    var randomX = Math.floor(Math.random() * (80 - 10 + 1 + 10))
    var randomY = Math.floor(Math.random() * (70 - 0 + 1 + 0))
    var randomXMid = Math.floor(Math.random() * (80 - 10 + 1 + 10))
    var randomYMid = Math.floor(Math.random() * (70 - 0 + 1 + 0))
    var randomXAfter = Math.floor(Math.random() * (80 - 10 + 1 + 10))
    var randomYAfter = Math.floor(Math.random() * (70 - 0 + 1 + 0))
    var speed = Math.floor(Math.random() * (10 - 2 + 1 + 2))

    // var j = 0
    // while (imgPositions.length > j) {
    //   console.log(imgPositions[j].randomX)
    //   var currentX = imgPositions[j].randomX
    //   var currentY = imgPositions[j].randomY

    //   var differenceInX = Math.abs(currentX - randomX)
    //   var differenceInY = Math.abs(currentY - randomY)

    //   if (differenceInX < 12 && differenceInY < 15) {
    //     randomX = Math.floor(Math.random() * (80 - 10 + 1 + 10))
    //     j = 0
    //     console.log("reroll")
    //   } else {
    //     j++
    //   }
    // }

    imgPositions.push({ randomX, randomY })
    {
      !imgPositions.includes({ randomX, randomY }) ? (
        rows.push(
          <ChestDiv
            id="a"
            key={index}
            randX={randomX}
            randY={randomY}
            randXMid={randomXMid}
            randYMid={randomYMid}
            randXAfter={randomXAfter}
            randYAfter={randomYAfter}
            speed={speed}
            width={imageWidth}
          >
            <Img
              width={imageWidth}
              src={
                "https://basicbeasts.mypinata.cloud/ipfs/QmUYVdSE1CLdcL8Z7FZdH7ye8tMdGnkbyVPpeQFW6tcYHy"
              }
            />
            <ChestText width={imageWidth}> This is just some text</ChestText>
            <ChestButton>Buy Now</ChestButton>
          </ChestDiv>,
        )
      ) : (
        <></>
      )
    }
  }

  return (
    <Container ref={ref}>
      <TextDiv>
        {" "}
        <div style={{ fontSize: "1.2em" }}>Floor Price: $10 ₣USD</div>
        {whitelist == true ? <div>You are whitelisted</div> : <></>}
        <ListingsButton>Chest Rewards</ListingsButton>
        <ListingsButton>List Chest</ListingsButton>
        <ListingsButton>Delist Chest</ListingsButton>
      </TextDiv>
      {rows}
    </Container>
  )
}

export default Chests
