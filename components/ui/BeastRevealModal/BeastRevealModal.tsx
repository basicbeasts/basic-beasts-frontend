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
const Bg = styled(motion.div)`
  background: #ffd966; //TODO: Should change color depending on beast type
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

const StarLevelLabel = styled(motion.div)`
  font-size: 10em;
`

const StarLevel = styled.div`
  display: flex;
`

const Star = styled(motion.div)``

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

const Beast = styled(motion.div)``

const BeastImg = styled.img`
  position: absolute;
  bottom: 200px;
  right: 10px;
  width: 700px;
`

const CloseIcon = styled.div`
  position: absolute;
  font-size: 100px;
  right: 50px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  z-index: 30;
`

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
          <Bg
            animate={{ opacity: [0, 1] }}
            transition={{
              duration: 1,
            }}
          >
            <CloseIcon onClick={handleClose}>x</CloseIcon>
            <Content>
              <BeastName
                animate={{ x: [300, 0], opacity: [0, 1] }}
                transition={{
                  delay: 1,
                }}
              >
                Moon
              </BeastName>
              <StarLevelLabel
                animate={{ x: [200, 0], opacity: [0, 1] }}
                transition={{
                  delay: 1.3,
                }}
              >
                Star Level
              </StarLevelLabel>
              <StarLevel>
                <Star
                  animate={{ opacity: [0, 1], x: [50, 0], rotate: 360 }}
                  transition={{
                    delay: 3,
                    duration: 0.8,
                  }}
                >
                  <StarImg src={star.src} />
                </Star>
                <Star
                  animate={{ opacity: [0, 1] }}
                  transition={{
                    delay: 3.6,
                  }}
                >
                  <StarImg src={starEmpty.src} />

                  <StarImg src={starEmpty.src} />
                </Star>
              </StarLevel>
            </Content>
            <Beast
              animate={{ opacity: [0, 1] }}
              transition={{
                delay: 2.4,
              }}
            >
              <BeastImg src={beast.src} />
            </Beast>
          </Bg>
        </Wrapper>
      </Container>
    </Backdrop>
  )
}
export default BeastRevealModal