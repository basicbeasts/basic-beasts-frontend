import React, { FC } from "react"
import styled from "styled-components"

import star from "public/basic_starLevel.png"
import thumbnail from "public/thumbnails/thumbnail_001_normal.png"

const Container = styled.div<{
  selected?: boolean
  tagColor: string
}>`
  max-width: inherit;
  width: 100%;
  height: 110px;
  background: ${(props) => props.tagColor || "#FFD966"};
  color: #000;
  margin-right: 30px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;

  margin-bottom: 30px;
  border-radius: 20px;
`

const Img = styled.img`
  max-width: inherit;
  user-drag: none;
  -webkit-user-drag: none;

  border-radius: 20px 20px 0px 0px;
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

type BeastThumbnailProps = {
  id: string
  selected?: boolean
  onClick?: () => void
}

const BeastTabCard: FC<BeastThumbnailProps> = ({
  id,
  ...props
}: BeastThumbnailProps) => {
  return (
    <Container {...props} tagColor={"#FFD966"}>
      <>
        <Img src={thumbnail.src} />
        <ThumbnailDetails>
          <StarLevel>
            {Array(1)
              .fill(0)
              .map((_, i) => (
                <StarImg key={i} src={star.src} />
              ))}
          </StarLevel>
          <ThumbnailLabel>{"MoonMoon"}</ThumbnailLabel>
        </ThumbnailDetails>
      </>
    </Container>
  )
}
export default BeastTabCard
