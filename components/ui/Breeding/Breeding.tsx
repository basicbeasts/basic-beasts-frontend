import { useAuth } from "@components/auth/AuthProvider"
import { useUser } from "@components/user/UserProvider"
import React, { FC, useEffect, useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import EvolvableBeastThumbnail from "../EvolvableBeastThumbnail"

import { faHeart } from "@fortawesome/free-solid-svg-icons"

import picture from "public/beasts/001_normal.png"
import scroll from "public/scroll_icon.png"
import { toast } from "react-toastify"

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding-bottom: 2rem;
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
  // margin-top: 5rem;
`
const Img = styled.img`
  max-width: 10rem;
`
const ImgDiv = styled.div`
  text-align: center;
`
const PotionDiv = styled.div`
  width: max-content;
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

type Props = {
  //   beast: any
}

const Breeding: FC<Props> = ({}) => {
  const [beastSelected, setBeastSelected] = useState(true)

  const potions = 100

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
      beastSelected ? (beastImage = picture.src) : (beastImage = scroll.src)
    }
    return beastImage
  }

  return (
    <>
      <Wrapper>
        <div className="flex flex-col items-center gap-20">
          <BreedingSpot>
            <ImgDiv>
              <Img src={picture.src} style={{ transform: "scaleX(-1)" }} />{" "}
              <ImgInfo>
                <H2>BREED COUNT</H2>
                <p>1/7</p>
              </ImgInfo>
            </ImgDiv>
            <PotionDiv>
              <PotionP>Required Love Potions</PotionP>
              <Potion>
                <PotionImg src={scroll.src} />
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
          >
            <FontAwesomeIcon icon={faHeart} /> Start Breeding
          </BreedButton>
        </div>
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
