import React, { FC } from "react"
import styled from "styled-components"

import star from "public/basic_starLevel.png"
import thumbnail from "public/thumbnails/Size_for_Thumbnail_template_saber.png"
import beastTemplates from "data/beastTemplates"

const Container = styled.div<{
  selected?: boolean
  tagColor: string
}>`
  max-width: inherit;
  width: 100%;
  color: #000;
  margin-right: 30px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;

  margin-bottom: 30px;
`

const Img = styled.img`
  user-drag: none;
  -webkit-user-drag: none;
`

type BeastThumbnailProps = {
  id: string
  selected?: boolean
  onClick?: () => void
  className: any
  beastTemplateID: any
}

const BeastTabCard: FC<BeastThumbnailProps> = ({
  id,
  className,
  beastTemplateID,
  ...props
}: BeastThumbnailProps) => {
  return (
    <div className={className}>
      <Container {...props} tagColor={"#FFD966"}>
        <>
          <Img
            src={
              "https://basicbeasts.mypinata.cloud/ipfs/" +
              beastTemplates[beastTemplateID as keyof typeof beastTemplates]
                .thumbnail
            }
          />
        </>
      </Container>
    </div>
  )
}
export default BeastTabCard
