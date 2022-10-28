import { useAuth } from "@components/auth/AuthProvider"
import { useUser } from "@components/user/UserProvider"
import React, { FC, useEffect, useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import EvolvableBeastThumbnail from "../EvolvableBeastThumbnail"

import { faHeart } from "@fortawesome/free-solid-svg-icons"

import picture from "public/beasts/001_normal.png"
import scroll from "public/scroll_icon.png"
import potion from "/public/fungible_tokens/fungible_tokens_images/basic_beasts_empy_potion_bottle.png"
import { toast } from "react-toastify"
import MakeLovePotionModal from "../MakeLovePotionModal"
import EggObtainedModal from "../EggObtainedModal"
import beastTemplates from "data/beastTemplates"

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  // height: 100%;
  padding-bottom: 2rem;
  margin-top: 1rem;
`
const H2 = styled.h2`
  color: grey;
`
const BreedingSpot = styled.div`
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  justify-items: center;
  align-items: start;
  gap: 2rem;
  margin-top: 1rem;
`
const Img = styled.img`
  max-width: 10rem;
`
const ImgDiv = styled.div`
  text-align: center;
`
const PotionDiv = styled.div`
  width: max-content;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`
const Potion = styled.div`
  position: relative;

  border: 2px solid #ebebe9;
  border-radius: 0.375rem;
  padding: 1rem;
  width: max-content;
  margin: 0 auto;
  text-align: center;
  background: white;
  z-index: 1;
  line-height: 1;
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: -51%;
    width: 3.5rem;
    height: 1px;
    background: #ebebe9;
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    right: -51%;
    width: 3.5rem;
    height: 1px;
    background: #ebebe9;
  }
`
const PotionImg = styled.img`
  max-width: 5rem;
`
const ImgInfo = styled.div`
  font-size: 0.8rem;
`
const PotionP = styled.p`
  text-transform: uppercase;
  color: #dc8494;
  font-size: 1rem;
`
const RequiredNumber = styled.span`
  color: #dc8494;
`
const BreedButton = styled.button<any>`
  position: relative;
  border: 1px solid ${(props) => props.buttonColors.buttonBorder};
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  width: max-content;
  line-height: 0;
  background: ${(props) => props.buttonColors.buttonBackground};
  color: ${(props) => props.buttonColors.buttonColor};
  font-size: 1rem;
  &::before {
    content: "";
    display: block;
    position: absolute;
    bottom: 103%;
    left: 50%;
    width: 1px;
    height: 8rem;
    background: #ebebe9;
  }
`

const ListWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  // height: 270px;
  margin-top: 15px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 5px;
`

type Props = {
  evolvableBeasts: any
  beast: any

  makeLovePotionModalOpen: any
  setMakeLovePotionModalOpen: any
  eggObtainedModalOpen: any
  setEggObtainedModalOpen: any
}

const Breeding: FC<Props> = ({
  evolvableBeasts,
  beast,
  makeLovePotionModalOpen,
  setMakeLovePotionModalOpen,
  eggObtainedModalOpen,
  setEggObtainedModalOpen,
}) => {
  const [beastSelected, setBeastSelected] = useState(false)

  const [selectedBeasts, setSelectedBeasts] = useState<any>([])
  const [serialOneSelected, setSerialOneSelected] = useState<any>(false)

  const potions = 200

  const buttonColors = () => {
    let buttonBorder
    let buttonColor
    let buttonBackground
    {
      potions >= 200 && beastSelected == true
        ? ((buttonBorder = "#d97586"),
          (buttonColor = "#d97586"),
          (buttonBackground = "#facdd7"))
        : ((buttonBorder = "#ebebe9"),
          (buttonColor = "grey"),
          (buttonBackground = "transparent"))
    }
    return { buttonBorder, buttonColor, buttonBackground }
  }

  const isBeastSelected = () => {
    let beastImage

    {
      beastSelected
        ? (beastImage =
            beastTemplates[
              beast?.beastTemplateID as keyof typeof beastTemplates
            ].imageTransparentBg)
        : (beastImage = scroll.src)
    }
    return beastImage
  }

  const handleChange = (id: any, serial: any) => {
    if (selectedBeasts.includes(id)) {
      //remove
      setSelectedBeasts(selectedBeasts.filter((beast: any) => beast != id))
      setBeastSelected(false)
      // Check serial one
      if (serial == 1) {
        setSerialOneSelected(false)
        toast.success("Serial #1 deselected")
      }
    } else if (selectedBeasts.length < 1) {
      //add
      setSelectedBeasts((selectedBeasts: any) => [...selectedBeasts, id])
      setBeastSelected(true)
      // Check serial one
      if (serial == 1) {
        setSerialOneSelected(true)
        toast.warning("Serial #1 selected for breeding")
      }
    }
  }

  return (
    <>
      <Wrapper>
        <div className="flex flex-col items-center gap-5">
          <BreedingSpot>
            <ImgDiv>
              <Img
                // src={picture.src}
                src={
                  beastTemplates[
                    beast?.beastTemplateID as keyof typeof beastTemplates
                  ].imageTransparentBg
                }
                style={{ transform: "scaleX(-1)" }}
              />{" "}
              <ImgInfo>
                <H2>BREED COUNT</H2>
                <p>1/7</p>
              </ImgInfo>
            </ImgDiv>
            <PotionDiv onClick={() => setMakeLovePotionModalOpen(true)}>
              <PotionP>Required Love Potions</PotionP>
              <Potion>
                <PotionImg src={potion.src} />
                <p>
                  <RequiredNumber>{potions}</RequiredNumber>/200
                </p>
              </Potion>
            </PotionDiv>
            <ImgDiv>
              <Img
                src={isBeastSelected()} /* style={{ transform: "scaleX(-1)" }} */
              />
              <ImgInfo>
                {!beastSelected ? (
                  <H2>Select a Beast</H2>
                ) : (
                  <H2>Selected Beast</H2>
                )}
              </ImgInfo>
            </ImgDiv>
          </BreedingSpot>
          <BreedButton
            disabled={potions < 200 || !beastSelected}
            buttonColors={buttonColors()}
            onClick={() => setEggObtainedModalOpen(true)}
          >
            <FontAwesomeIcon icon={faHeart} /> Start Breeding
          </BreedButton>
        </div>
        {evolvableBeasts != null && (
          <ListWrapper>
            <ul
              role="list"
              className="grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4"
              // className="grid gap-x-2 gap-y-4 grid-cols-3 sm:grid-cols-4"
            >
              {evolvableBeasts[beast.beastTemplateID].map(
                (beast: any, i: any) => (
                  <>
                    <li
                      key={i}
                      onClick={() =>
                        handleChange(beast?.id, beast?.serialNumber)
                      }
                    >
                      <div>
                        <EvolvableBeastThumbnail
                          beast={beast}
                          selected={selectedBeasts.includes(beast?.id)}
                        />
                      </div>
                    </li>
                  </>
                ),
              )}
            </ul>
          </ListWrapper>
        )}

        {/* <ul
          role="list"
          className="grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4"
          
        >
          {breedableBeasts.map((beast: any, i: any) => (
            <>
              <li
                key={i}
                onClick={() => }
              >
                <div>
                  <BeastThumbnail
                    
                  />
                </div>
              </li>
            </>
          ))}
        </ul> */}
      </Wrapper>
    </>
  )
}
export default Breeding
