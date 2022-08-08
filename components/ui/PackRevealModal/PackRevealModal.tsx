import React, { FC } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import Backdrop from "../Backdrop"
import star from "public/basic_starLevel.png"
import starEmpty from "public/basic_starLevel_empty.png"
import { useQuery } from "../../../gqty"
import beastTemplates from "data/beastTemplates"

const Container = styled(motion.div)`
  width: clamp(100%, 700px, 90%);
  height: 100%;
  z-index: 9999;
`

//Maybe it should start with a plain black/grey background and transition to the actual color.
const Wrapper = styled.div`
  background: white;

  height: 100%;
`

//Change Bg color depending on Beast
const Bg = styled(motion.div)<{ beastBg: string }>`
  background: ${(props) => props.beastBg};
  height: 100%;
  /* display: flex; */
  justify-content: center;

  //Responsive
  @media (max-width: 1240px) {
    padding-left: 50px;
    padding-right: 150px;
  }
  @media (max-width: 600px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`

const Content = styled.div`
  /* background: grey; */
  padding-left: 20px;
  display: table;
  clear: both;
`

const ContentLeft = styled.div`
  float: left;
  color: #fff;
  margin-left: 100px;
`
const ContentRight = styled.div`
  float: right;
  margin-left: -100px;
  margin-top: 5vw;
`

const BeastName = styled(motion.div)`
  font-size: 26em;
  height: 1em;

  //Responsive
  @media (max-width: 1240px) {
    font-size: 20em;
    height: 250px;
  }
  @media (max-width: 1000px) {
    font-size: 13em;
    height: 180px;
  }
  @media (max-width: 600px) {
    font-size: 8em;
    height: 120px;
    margin-top: 80px;
  }
`

const StarLevelLabel = styled(motion.div)`
  font-size: 10em;

  //Responsive
  @media (max-width: 1240px) {
    font-size: 8em;
  }
  @media (max-width: 1000px) {
    font-size: 5em;
  }
  @media (max-width: 600px) {
    font-size: 3em;
  }
`

const StarLevel = styled.div`
  display: flex;
`

const Star = styled(motion.div)``

const StarImg = styled.img`
  width: 100px;
  margin-left: 0px;
  margin-right: 10px;

  //Responsive
  @media (max-width: 1240px) {
    width: 70px;
    margin-left: 0px;
    margin-right: 5px;
    margin-top: 10px;
  }
  @media (max-width: 1000px) {
    width: 50px;
    margin-left: 0px;
    margin-right: 5px;
    margin-top: 20px;
  }
  @media (max-width: 600px) {
    width: 30px;
    margin-left: 0px;
    margin-right: 5px;
    margin-top: 20px;
  }
`

const Beast = styled(motion.div)``

const BeastImg = styled.img`
  width: 40vw;
`

const CloseIcon = styled.div`
  color: #fff;
  position: absolute;
  font-size: 100px;
  right: 50px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  z-index: 30;
  //Responsive
  @media (max-width: 600px) {
    font-size: 70px;
    right: 10px;
  }
`

const dropIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 4 } },
  exit: {},
}

type FuncProps = {
  handleClose: () => void
  RevealModalOpen: boolean
  packId: string | "0"
}

const PackRevealModal: FC<FuncProps> = ({ handleClose, packId }) => {
  //TODO
  const num: any = parseInt(packId)
  const beast1 = beastTemplates[num as keyof typeof beastTemplates]

  return (
    <Backdrop onClick={handleClose}>
      {false ? (
        <div>Loading...</div>
      ) : (
        <Container
          onClick={(e) => e.stopPropagation()}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Wrapper>
            <Bg
              beastBg={
                beast1.elements[0] == "Electric"
                  ? "#ffd966"
                  : beast1.elements[0] == "Water"
                  ? "#A4C2F4"
                  : beast1.elements[0] == "Grass"
                  ? "#B7D7A8"
                  : beast1.elements[0] == "Fire"
                  ? "#EA9999"
                  : "#D5A6BD"
              }
              animate={{ opacity: [0, 1] }}
              transition={{
                duration: 1,
              }}
            >
              <CloseIcon onClick={handleClose}>x</CloseIcon>
              <Content>
                <ContentLeft>
                  <BeastName
                    animate={{ x: [300, 0], opacity: [0, 1] }}
                    transition={{
                      delay: 1,
                    }}
                  >
                    {beast1.name}
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
                    {Array.from(Array(beast1.starLevel), (e, i) => {
                      return (
                        <Star
                          key={i}
                          animate={{ opacity: [0, 1], x: [50, 0], rotate: 360 }}
                          transition={{
                            delay: 3,
                            duration: 0.8,
                          }}
                        >
                          <StarImg src={star.src} />
                        </Star>
                      )
                    })}
                    {Array.from(Array(3 - (beast1.starLevel ?? 0)), (e, i) => {
                      return (
                        <Star
                          key={i}
                          animate={{ opacity: [0, 1] }}
                          transition={{
                            delay: 3.6,
                          }}
                        >
                          <StarImg src={starEmpty.src} />
                        </Star>
                      )
                    })}
                  </StarLevel>
                </ContentLeft>
                <ContentRight>
                  <Beast
                    animate={{ opacity: [0, 1] }}
                    transition={{
                      delay: 2.4,
                    }}
                  >
                    <BeastImg src={beast1.imageTransparentBg} />
                  </Beast>
                </ContentRight>
              </Content>
            </Bg>
          </Wrapper>
        </Container>
      )}
    </Backdrop>
  )
}
export default PackRevealModal
