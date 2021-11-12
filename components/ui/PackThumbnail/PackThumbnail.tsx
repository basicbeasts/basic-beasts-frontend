import React, { FC } from "react"
import styled from "styled-components"
import PackImg from "public/thumbnails/packs thumbnails/starter_thumbnail.png"
import { useQuery } from "../../../gqty"

const Container = styled.div<{
  selected?: boolean
  boxShadow: string
  background: string
}>`
  width: 190px;
  height: 150px;
  background: ${(props) => props.background};
  color: #fff;
  margin-right: 35px;

  box-shadow: ${(props) =>
    props.selected
      ? "0px 0px 5px 4px #fff"
      : `-3px 0px 0px 0px ${props.boxShadow}, 0px -3px 0px 0px ${props.boxShadow}, 0px 3px 0px 0px ${props.boxShadow}, 3px 0px 0px 0px ${props.boxShadow};`};
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  margin-bottom: 30px;
`

const Img = styled.img`
  max-width: 190px;
  user-drag: none;
  -webkit-user-drag: none;
`

const ThumbnailDetails = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0px 10px;
  font-size: 1.5em;
`

const ThumbnailLabel = styled.div`
  margin-top: 3px;
`

type PackThumbnailProps = {
  id: string
  selected?: boolean
  onClick?: () => void
}

const PackThumbnail: FC<PackThumbnailProps> = ({
  id,
  ...props
}: PackThumbnailProps) => {
  const query = useQuery()
  const pack = query.pack({ id })

  return (
    <Container
      {...props}
      boxShadow={pack?.color.boxShadow}
      background={pack?.color.background}
    >
      <>
        <Img src={pack?.thumbnailUrl} />
        <ThumbnailDetails>
          <ThumbnailLabel>{pack?.type}</ThumbnailLabel>
        </ThumbnailDetails>
      </>
    </Container>
  )
}
export default PackThumbnail
