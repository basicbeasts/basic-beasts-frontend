import React, { FC } from "react"
import styled from "styled-components"

import BeastThumbnailImg from "public/BeastThumbnailExample.png"
import star from "public/basic_starLevel.png"

const Container = styled.div`
  width: 110px;
  height: 110px;
  background: #fff;
  margin-right: 30px;

  box-shadow: 0px 0px 5px 4px #fff;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`

const BeastThumbnailLast = styled.div`
  width: 110px;
  height: 110px;
  background: #fff;

  box-shadow: -3px 0px 0px 0px #b3a068, 0px -3px 0px 0px #b3a068,
    0px 3px 0px 0px #b3a068, 3px 0px 0px 0px #b3a068;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`

const Img = styled.img`
  max-width: 110px;

  user-drag: none;
  -webkit-user-drag: none;
`

const ThumbnailDetails = styled.div`
  color: #000000;
  display: table;
  clear: both;
  width: 100%;
  padding: 0px 5px;
`

const StarLevel = styled.div``

const StarImg = styled.img`
  width: 10px;
  float: right;
  margin-right: 1px;
  margin-top: 6px;
  user-drag: none;
  -webkit-user-drag: none;
  float: left;
`

const ThumbnailLabel = styled.div`
  margin-top: 2px;
  float: right;
`

const BeastThumbnailSelected: FC = () => {
  return (
    <Container>
      <Img src={BeastThumbnailImg.src} />
      <ThumbnailDetails>
        <StarLevel>
          <StarImg src={star.src} />
          <StarImg src={star.src} />
          <StarImg src={star.src} />
        </StarLevel>
        <ThumbnailLabel>Moon</ThumbnailLabel>
      </ThumbnailDetails>
    </Container>
  )
}
export default BeastThumbnailSelected
