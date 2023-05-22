import React, { FC } from "react"
import styled from "styled-components"

import star from "public/basic_starLevel.png"
import beastTemplates from "data/beastTemplates"

const Container = styled.div<any>`
  width: 110px;
  height: 110px;
  background: ${(props) => props.backgroundColor || "#ffe8a3"};
  color: ${(props) => props.outset || "#c5b16e"};
  border-radius: 10px;
  border: solid 1px ${(props) => props.inset || "#ffdda4"};
  padding: 5px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;

  &:hover {
    transform: scale(0.95);
  }
  box-shadow: ${(props) =>
    props.selected
      ? `inset 0px 0px 20px ${props.outset}, 0px 0px 3px 3px ${props.outset}`
      : "none"};
  /* scale: ${(props) => (props.selected ? "1.05" : "none")}; */
`

const Img = styled.img<any>`
  max-width: 60px;
  user-drag: none;
  margin: 0 auto;
  -webkit-user-drag: none;
`

const ThumbnailDetails = styled.div`
  display: table;
  clear: both;
  width: 100%;
  padding: 0px 5px;
`

const ThumbnailLabel = styled.div`
  margin-top: 2px;
  float: left;
`

const NicknameLabel = styled.div`
  position: relative;
  margin-top: -5px;
  font-size: 12px;
  margin-left: 5px;
  margin-bottom: -13px;
`

const Gender = styled.div`
  margin-top: 8px;
  float: right;
  font-size: 14px;
`

type Props = { beast: any; selected: any }

const BreedableBeastThumbnail: FC<Props> = ({ beast, selected }) => {
  return (
    <Container
      backgroundColor={
        beast.elements[0] == "Electric"
          ? "#FFE595"
          : beast.elements[0] == "Water"
          ? "#A4C2F4"
          : beast.elements[0] == "Grass"
          ? "#B7D7A8"
          : beast.elements[0] == "Fire"
          ? "#EA9999"
          : "#D5A6BD"
      }
      outset={
        beast.elements[0] == "Electric"
          ? "#B3A068"
          : beast.elements[0] == "Water"
          ? "#7388AB"
          : beast.elements[0] == "Grass"
          ? "#92AC86"
          : beast.elements[0] == "Fire"
          ? "#BB7A7A"
          : "#AA8597"
      }
      inset={
        beast.elements[0] == "Electric"
          ? "#E6CE86"
          : beast.elements[0] == "Water"
          ? "#94AFDC"
          : beast.elements[0] == "Grass"
          ? "#A5C297"
          : beast.elements[0] == "Fire"
          ? "#D38A8A"
          : "#C095AA"
      }
      selected={selected}
    >
      <>
        {beast?.nickname === beast?.name ? (
          <></>
        ) : (
          <NicknameLabel>{beast?.nickname}</NicknameLabel>
        )}
        <ThumbnailDetails>
          <ThumbnailLabel>#{beast?.serialNumber}</ThumbnailLabel>
          <Gender>{beast?.sex === "Male" ? "♂" : "♀"}</Gender>
        </ThumbnailDetails>
        <Img
          src={
            "https://basicbeasts.mypinata.cloud/ipfs/" +
            beastTemplates[
              beast?.beastTemplateID as keyof typeof beastTemplates
            ].imageTransparentBg
          }
        />
      </>
    </Container>
  )
}
export default BreedableBeastThumbnail
