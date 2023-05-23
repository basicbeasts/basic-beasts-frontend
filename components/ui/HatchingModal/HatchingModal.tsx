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
import eggAnimation from "public/eggAnimation.gif"
import eggDefault from "public/eggs/egg_hatching_default.gif"
import eggElectric from "public/eggs/egg_hatching_electric.gif"
import eggWater from "public/eggs/egg_hatching_water.gif"
import eggGrass from "public/eggs/egg_hatching_grass.gif"
import eggFire from "public/eggs/egg_hatching_fire.gif"
import eggNormal from "public/eggs/egg_hatching_normal.gif"

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
  margin-top: 4vw; */
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
  right: 0px;
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
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  border-radius: 50%;
  position: absolute;

  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;

  top: 250px;

  width: 150px;
  height: 150px;
`

const HatchingCircle = styled(motion.div)`
  background: #fff;
  border-radius: 50%;
  position: absolute;

  margin: auto auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  width: 200px;
  height: 200px;
`

const EggImg = styled.img`
  scale: 1.5;
  position: relative;
  z-index: 100;
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
  top: 515px;
  color: white;
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
  z-index: -1;

  transform: scale(5);
`

type FuncProps = {
  handleClose: () => void
  RevealModalOpen: boolean
  packId: string | "0"
  evolvedBeastId: any
  egg: any
}

const HatchingModal: FC<FuncProps> = ({
  handleClose,
  packId,
  RevealModalOpen,
  evolvedBeastId,
  egg,
}) => {
  //TODO
  const num: any = parseInt(packId)

  Object.entries(beastTemplates).forEach(([key, beastTemplate]) => {
    const dexNumberFormatted = String(beastTemplate.dexNumber).padStart(3, "0")
    let fileFormat = ".png"

    if (
      beastTemplate.skin === "Metallic Silver" ||
      beastTemplate.skin === "Shiny Gold"
    ) {
      fileFormat = ".gif"
    }

    let imageTransparentBgCenter = `https://raw.githubusercontent.com/basicbeasts/basic-beasts-frontend/main/public/beasts/${dexNumberFormatted}_${beastTemplate.skin
      .toLowerCase()
      .replace(" ", "_")}${fileFormat}`

    ;(beastTemplate as any).imageTransparentBgCenter = imageTransparentBgCenter
  })

  const beast1 = beastTemplates[num as keyof typeof beastTemplates]
  const evolvedBeast: any =
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
                {/* <CloseIcon onClick={handleClose}>x</CloseIcon> */}
                <Content>
                  <EvolvedBeastContainer
                    animate={{ opacity: [0, 1], scale: [1.1, 0.8, 1] }}
                    transition={{ duration: 2, delay: 0 }}
                  ></EvolvedBeastContainer>
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
                          delay: 6,
                        }}
                      >
                        <BeastContainer3 transition={{ delay: 2, duration: 2 }}>
                          <motion.div
                            animate={{ filter: "brightness(0) invert(1)" }}
                            transition={{ delay: 4.9, duration: 1.5 }}
                          >
                            <EggImg
                              src={
                                egg?.elementType == "Electric"
                                  ? eggElectric.src
                                  : egg?.elementType == "Water"
                                  ? eggWater.src
                                  : egg?.elementType == "Grass"
                                  ? eggGrass.src
                                  : egg?.elementType == "Fire"
                                  ? eggFire.src
                                  : egg?.elementType == "Normal"
                                  ? eggNormal.src
                                  : eggDefault.src
                              }
                            />
                          </motion.div>
                        </BeastContainer3>
                      </Beast>
                    </Beast>

                    <EvolvedBeastContainer
                      animate={{
                        opacity: [0, 1],
                        scale: [0.5, 2, 1],
                        top: [150, -50, 150],
                      }}
                      transition={{ duration: 1.2, delay: 6.2 }}
                    >
                      <AnimationContainer>
                        <SpotLightAnimation />
                      </AnimationContainer>
                    </EvolvedBeastContainer>

                    <EvolvedBeastContainer
                      animate={{ opacity: [0, 1], scale: [1.1, 0.8, 1] }}
                      transition={{ duration: 0.8, delay: 6.6 }}
                    >
                      <EvolvedBeastImg
                        src={evolvedBeast?.imageTransparentBgCenter}
                      />
                    </EvolvedBeastContainer>

                    <EvolvedBeastContainer
                      style={{ filter: "brightness(0) invert(1)" }}
                      animate={{ opacity: [0, 1, 0], scale: [0.3, 1.5] }}
                      transition={{ duration: 1, delay: 5.9 }}
                    >
                      <EvolvedBeastImg
                        src={evolvedBeast?.imageTransparentBgCenter}
                      />
                    </EvolvedBeastContainer>
                    <motion.div
                      animate={{ opacity: [0, 1] }}
                      transition={{
                        delay: 6,
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
                        animate={{ opacity: [0, 0.8, 0], scale: [10, 2] }}
                        transition={{ duration: 1.2, delay: 5.7 }}
                      />
                    </motion.div>
                  </ContentRight>
                  <BeastName
                    animate={{ opacity: [0, 1] }}
                    transition={{
                      delay: 6,
                    }}
                  >
                    {/* {evolvedBeast?.name} */}
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
export default HatchingModal
