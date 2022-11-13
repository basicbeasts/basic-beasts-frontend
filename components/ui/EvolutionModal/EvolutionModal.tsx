import React, { FC } from "react"
import styled from "styled-components"
import { motion, transform } from "framer-motion"
import Backdrop from "../Backdrop"
import star from "public/basic_starLevel.png"
import starEmpty from "public/basic_starLevel_empty.png"
import beastTemplates from "data/beastTemplates"
import temp from "public/temp/002_temp.png"
import effect from "public/temp/80557-reward-light-effect.gif"
import SpotLightAnimation from "../SpotLightAnimation"

const Container = styled(motion.div)`
  width: clamp(100%, 700px, 90%);
  height: 100%;
  z-index: 9999;

  top: 0;
  position: fixed;
`

//Maybe it should start with a plain black/grey background and transition to the actual color.
const Wrapper = styled.div`
  background: transparent;

  height: 100%;
`

//Change Bg color depending on Beast
const Bg = styled(motion.div)<{ beastBg: string }>`
  background: rgba(255, 255, 255, 0.1);
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

  //Responsive
  @media (max-width: 1240px) {
    margin-left: 0px;
  }
`
const ContentRight = styled.div`
  /* float: right;
  margin-left: -100px;
  margin-top: 5vw; */
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

const Star = styled(motion.div)``

const Beast = styled(motion.div)``

const BeastContainer = styled(motion.div)`
  position: absolute;
  width: 200px;
  top: 250px;

  margin-left: auto;
  margin-right: auto;

  left: 0;
  right: 0;

  @media (max-width: 600px) {
    width: 100px;
  }
`

const BeastContainer2 = styled(motion.div)`
  position: absolute;
  width: 200px;
  top: 250px;

  margin-left: auto;
  margin-right: auto;

  left: 0;
  right: 0;

  @media (max-width: 600px) {
    width: 100px;
  }
`
const BeastContainer3 = styled(motion.div)`
  position: absolute;
  width: 200px;
  top: 250px;

  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;

  @media (max-width: 600px) {
    width: 100px;
  }
`

const BeastImg = styled.img`
  //Responsive
  @media (max-width: 1240px) {
  }
  @media (max-width: 1000px) {
  }
  @media (max-width: 600px) {
  }
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

const Circle = styled(motion.div)`
  background: #fff;
  border-radius: 50%;
  position: absolute;

  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;

  top: 250px;

  width: 200px;
  height: 200px;
`

const EvolvedBeastImg = styled.img``

const EvolvedBeastContainer = styled(motion.div)`
  position: absolute;
  width: 400px;
  top: 150px;

  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;

  @media (max-width: 600px) {
    width: 300px;
  }
`

const BeastName = styled(motion.div)`
  position: absolute;
  text-align: center;
  top: 500px;

  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  font-size: 5em;

  //Responsive
  @media (max-width: 1240px) {
  }
  @media (max-width: 1000px) {
  }
  @media (max-width: 600px) {
  }
`

const StarLevel = styled.div`
  display: flex;

  position: absolute;
  top: 610px;

  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  width: 100px;
`

const StarImg = styled.img`
  /* width: 50px; */
  /* margin-left: 0px;
  margin-right: 10px; */
  padding: 1px;

  /* //Responsive
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
  } */
`

const AnimationContainer = styled.div`
  /* margin-top: 0px; */
  position: absolute;
  top: 200px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;

  transform: scale(3);
`

type FuncProps = {
  handleClose: () => void
  RevealModalOpen: boolean
  packId: string | "0"
  evolvedBeastId: any
}

const EvolutionModal: FC<FuncProps> = ({
  handleClose,
  packId,
  RevealModalOpen,
  evolvedBeastId,
}) => {
  //TODO
  const num: any = parseInt(packId)
  const beast1 = beastTemplates[num as keyof typeof beastTemplates]
  const evolvedBeast =
    beastTemplates[evolvedBeastId as keyof typeof beastTemplates]

  return (
    <>
      {!RevealModalOpen ? (
        <></>
      ) : (
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
                  {/* <ContentLeft>
                    <BeastName
                      animate={{ x: [300, 0], opacity: [0, 1] }}
                      transition={{
                        delay: 4,
                      }}
                    >
                      {beast1.name}
                    </BeastName>
                    <StarLevelLabel
                      animate={{ x: [200, 0], opacity: [0, 1] }}
                      transition={{
                        delay: 4.3,
                      }}
                    >
                      Star Level
                    </StarLevelLabel>
                    <StarLevel>
                      {Array.from(Array(beast1.starLevel), (e, i) => {
                        return (
                          <Star
                            key={i}
                            animate={{
                              opacity: [0, 1],
                              x: [50, 0],
                              rotate: 360,
                            }}
                            transition={{
                              delay: 6,
                              duration: 0.8,
                            }}
                          >
                            <StarImg src={star.src} />
                          </Star>
                        )
                      })}
                      {Array.from(
                        Array(3 - (beast1.starLevel ?? 0)),
                        (e, i) => {
                          return (
                            <Star
                              key={i}
                              animate={{ opacity: [0, 1] }}
                              transition={{
                                delay: 6.6,
                              }}
                            >
                              <StarImg src={starEmpty.src} />
                            </Star>
                          )
                        },
                      )}
                    </StarLevel>
                  </ContentLeft> */}
                  <ContentRight>
                    <Beast
                      animate={{ opacity: [0, 1] }}
                      transition={{
                        delay: 1.4,
                      }}
                    >
                      <Beast
                        animate={{ opacity: [1, 0] }}
                        transition={{
                          duration: 0.5,
                          delay: 4,
                        }}
                      >
                        <BeastContainer3
                          style={{ top: 50 }}
                          animate={{ top: 250 }}
                          transition={{ delay: 3, duration: 1.5 }}
                        >
                          <motion.div
                            animate={{ filter: "brightness(0) invert(1)" }}
                            transition={{ delay: 3.3, duration: 1.2 }}
                          >
                            <BeastImg
                              src={
                                "https://basicbeasts.mypinata.cloud/ipfs/" +
                                beast1.imageTransparentBg
                              }
                            />
                          </motion.div>
                        </BeastContainer3>
                        <BeastContainer
                          style={{ right: "50%" }}
                          animate={{ right: 0 }}
                          transition={{ delay: 3, duration: 1.5 }}
                        >
                          <motion.div
                            animate={{ filter: "brightness(0) invert(1)" }}
                            transition={{ delay: 3.3, duration: 1.2 }}
                          >
                            <BeastImg
                              src={
                                "https://basicbeasts.mypinata.cloud/ipfs/" +
                                beast1.imageTransparentBg
                              }
                            />
                          </motion.div>
                        </BeastContainer>

                        <BeastContainer2
                          style={{ left: "50%" }}
                          animate={{ left: 0 }}
                          transition={{ delay: 3, duration: 1.5 }}
                        >
                          <motion.div
                            animate={{ filter: "brightness(0) invert(1)" }}
                            transition={{ delay: 3.3, duration: 1.2 }}
                          >
                            <BeastImg
                              src={
                                "https://basicbeasts.mypinata.cloud/ipfs/" +
                                beast1.imageTransparentBg
                              }
                            />
                          </motion.div>
                        </BeastContainer2>
                      </Beast>
                    </Beast>

                    <EvolvedBeastContainer
                      animate={{
                        opacity: [0, 1],
                        scale: [0.5, 2, 1],
                        top: [150, -50, 150],
                      }}
                      transition={{ duration: 1.2, delay: 4.2 }}
                    >
                      <AnimationContainer>
                        <SpotLightAnimation />
                      </AnimationContainer>
                    </EvolvedBeastContainer>
                    <EvolvedBeastContainer
                      animate={{ opacity: [0, 1], scale: [1.1, 0.8, 1] }}
                      transition={{ duration: 0.8, delay: 4.6 }}
                    >
                      <EvolvedBeastImg src={'https://basicbeasts.mypinata.cloud/ipfs/' +evolvedBeast?.imageTransparentBg} />
                    </EvolvedBeastContainer>

                    <EvolvedBeastContainer
                      style={{ filter: "brightness(0) invert(1)" }}
                      animate={{ opacity: [0, 1, 0], scale: [0.3, 1.2] }}
                      transition={{ duration: 1, delay: 3.9 }}
                    >
                      <EvolvedBeastImg src={'https://basicbeasts.mypinata.cloud/ipfs/' +evolvedBeast?.imageTransparentBg} />
                    </EvolvedBeastContainer>
                    <motion.div
                      animate={{ opacity: [0, 1] }}
                      transition={{
                        delay: 4,
                      }}
                    >
                      {/* <Circle
                        style={{ top: "300px", width: "50px", height: "50px" }}
                        animate={{
                          top: "250px",
                          width: "200px",
                          height: "200px",
                        }}
                        transition={{ delay: 4, duration: 1 }}
                      /> */}
                      <Circle
                        animate={{ opacity: [0, 1, 0], scale: [1, 2] }}
                        transition={{ duration: 1.2, delay: 3.7 }}
                      />
                    </motion.div>
                  </ContentRight>
                  <BeastName
                    animate={{ opacity: [0, 1] }}
                    transition={{
                      delay: 6,
                    }}
                  >
                    {evolvedBeast?.name}
                  </BeastName>
                  <StarLevel>
                    {Array.from(Array(evolvedBeast.starLevel), (e, i) => {
                      return (
                        <Star
                          key={i}
                          animate={{
                            opacity: [0, 1],
                          }}
                          transition={{
                            delay: 6.5,
                          }}
                        >
                          <StarImg src={star.src} />
                        </Star>
                      )
                    })}
                    {Array.from(
                      Array(3 - (evolvedBeast.starLevel ?? 0)),
                      (e, i) => {
                        return (
                          <Star
                            key={i}
                            animate={{ opacity: [0, 1] }}
                            transition={{
                              delay: 6.5,
                            }}
                          >
                            <StarImg src={starEmpty.src} />
                          </Star>
                        )
                      },
                    )}
                  </StarLevel>
                </Content>
              </Bg>
            </Wrapper>
          </Container>
        </Backdrop>
      )}
    </>
  )
}
export default EvolutionModal
