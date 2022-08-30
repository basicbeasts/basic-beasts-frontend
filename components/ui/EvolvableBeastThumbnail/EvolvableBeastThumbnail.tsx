import React, { FC } from "react"
import styled from "styled-components"

import star from "public/basic_starLevel.png"
import beastTemplates from "data/beastTemplates"

const Container = styled.div`
  width: 110px;
  height: 110px;
  background: #ffe8a3;
  color: #c5b16e;
  border-radius: 10px;
  border: solid 1px #ffdda4;
  padding: 5px;
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

type Props = { beast: any }

const EvolvableBeastThumbnail: FC<Props> = ({ beast }) => {
  return (
    <Container>
      <>
        <ThumbnailDetails>
          <ThumbnailLabel>#{beast.serialNumber}</ThumbnailLabel>
        </ThumbnailDetails>
        <Img
          src={
            beastTemplates[
              beast?.beastTemplateID as keyof typeof beastTemplates
            ].imageTransparentBg
          }
        />
      </>
    </Container>
  )
}
export default EvolvableBeastThumbnail
