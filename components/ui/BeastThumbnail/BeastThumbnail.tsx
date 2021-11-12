import React, { FC } from "react"
import styled from "styled-components"

import star from "public/basic_starLevel.png"
import { useQuery } from "../../../gqty"

const Container = styled.div<{
  selected?: boolean
  tagColor: string
}>`
  width: 110px;
  height: 110px;
  background: #fdf8f4;
  color: #000;
  margin-right: 30px;

  box-shadow: ${(props) =>
    props.selected
      ? `0px 0px 5px 4px ${props.tagColor}`
      : `-3px 0px 0px 0px ${props.tagColor}, 0px -3px 0px 0px ${props.tagColor}, 0px 3px 0px 0px ${props.tagColor}, 3px 0px 0px 0px ${props.tagColor};`};
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;

  margin-bottom: 30px;
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

type BeastThumbnailProps = {
  id: string
  selected?: boolean
  onClick?: () => void
}

const BeastThumbnail: FC<BeastThumbnailProps> = ({
  id,
  ...props
}: BeastThumbnailProps) => {
  const query = useQuery()
  const beast = query.beast({ id })

  return (
    <Container {...props} tagColor={beast?.colors?.typeTagOutset ?? "#b3a068"}>
      {query.$state.isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Img src={beast?.thumbnailUrl} />
          <ThumbnailDetails>
            <StarLevel>
              {Array(beast?.starLevel)
                .fill(0)
                .map((_, i) => (
                  <StarImg key={i} src={star.src} />
                ))}
            </StarLevel>
            <ThumbnailLabel>{beast?.name}</ThumbnailLabel>
          </ThumbnailDetails>
        </>
      )}
    </Container>
  )
}
export default BeastThumbnail
