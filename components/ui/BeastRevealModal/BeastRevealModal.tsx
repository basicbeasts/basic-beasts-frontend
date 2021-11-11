import React, { FC } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import Backdrop from "../Backdrop"
import star from "public/basic_starLevel.png"
import starEmpty from "public/basic_starLevel_empty.png"
import beast from "public/001_normal.png"

const Container = styled(motion.div)`
  width: clamp(100%, 700px, 90%);
  height: min(50%, 600px);
`

//Maybe it should start with a plain black/grey background and transition to the actual color.
const Wrapper = styled.div`
  background: white;
  height: min(100%, 600px);
`

//Change Bg color depending on Beast
const Bg = styled.div`
  background: #ffd966;
  height: min(100%, 600px);

  display: flex;
  justify-content: center;
  /* 
  transition: opacity 10s ease-out;
  opacity: 1; */

  /* &:active {
    opacity: 0;
  } */
`

const Content = styled.div`
  width: 1200px;
  /* background: grey; */
  padding-left: 20px;
`

const BeastName = styled(motion.div)`
  font-size: 26em;
  height: 350px;
`

const StarLevelLabel = styled.div`
  font-size: 10em;
`

const StarLevel = styled.div`
  display: flex;
`

const StarImg = styled.img`
  width: 100px;
  margin-left: 0px;
  margin-right: 10px;
`

// const BeastOverlay = styled.div`
//   width: 1200px;
//   background: white;
//   padding-left: 20px;
// `

const BeastImg = styled.img`
  position: absolute;
  bottom: 260px;
  right: clamp(15%, 700px, 0%);
  width: 750px;
`

const CloseIcon = styled.img``

const dropIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 4 } },
  exit: {},
}

type FuncProps = {
  handleClose: () => void
  text: string
  RevealModalOpen: boolean
}

const BeastRevealModal: FC<FuncProps> = ({ handleClose, text }) => {
  return (
    <Backdrop onClick={handleClose}>
      <Container
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Wrapper>
          <Bg>
            <Content>
              <BeastName variants={dropIn} initial="hidden" animate="visible">
                Moon
              </BeastName>
              <StarLevelLabel>Star Level</StarLevelLabel>
              <StarLevel>
                <StarImg src={star.src} />
                <StarImg src={starEmpty.src} />
                <StarImg src={starEmpty.src} />
              </StarLevel>
            </Content>
            <BeastImg src={beast.src} />
          </Bg>
        </Wrapper>
      </Container>
    </Backdrop>
  )
}
export default BeastRevealModal
