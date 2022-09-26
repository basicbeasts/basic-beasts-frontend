import type { NextPage } from "next"
import styled from "styled-components"
import { TypeAnimation } from "react-type-animation"
import chest from "public/nft-day-treasure-chest.png"
import { motion } from "framer-motion"
import { useAuth } from "@components/auth/AuthProvider"
import { useEffect, useState, FC } from "react"
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
  height: 80vh;
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1em;
  text-align: center;
`

const Img = styled.img<any>`
  position: absolute;
  // top: ${(props) => props.randNum};
  animation: move 10s linear infinite;
  @keyframes move {
    0% {
      top: randNum;
    }
    100% {
      top: 100px;
    }
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
  const num: any = 10

  const rows: any = []
  for (let index = 0; index < num; index++) {
    var randNum = Math.random() * (744 - 300)
    var randNum2 = Math.random() * (1920 - 300)
    console.log("number:" + randNum)
    rows.push(
      <Img
        randNum={randNum}
        style={{
          width: "300px",
          top: randNum,
          left: randNum2,
          marginBottom: "-30px",
        }}
        src={
          "https://basicbeasts.mypinata.cloud/ipfs/QmUYVdSE1CLdcL8Z7FZdH7ye8tMdGnkbyVPpeQFW6tcYHy"
        }
      />,
    )
  }

  return <Container>{rows}</Container>
}

export default Chests
