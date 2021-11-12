import React, { FC } from "react"
import styled from "styled-components"
import ItemImg from "public/thumbnails/fungible tokens thumbnails/sushi_thumbnail.png"
import { useQuery } from "../../../gqty"

const Container = styled.div<{ selected?: boolean }>`
  width: 190px;
  height: 150px;
  background: #e4a9a2;
  color: #fff;
  margin-right: 35px;

  box-shadow: ${(props) =>
    props.selected
      ? "0px 0px 5px 4px #fff"
      : "-3px 0px 0px 0px #FFBAB3, 0px -3px 0px 0px #FFBAB3, 0px 3px 0px 0px #FFBAB3, 3px 0px 0px 0px #FFBAB3;"};
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
  color: #fff;
  display: table;
  clear: both;
  width: 100%;
  padding: 0px 10px;
  font-size: 1.5em;
`

const Quantity = styled.div`
  width: 10px;
  margin-right: 1px;
  float: left;
  margin-top: 3px;
`

const ThumbnailLabel = styled.div`
  float: right;
  margin-top: 3px;
`

type ItemThumbnailProps = {
  id: string
  selected?: boolean
  onClick?: () => void
}

const ItemThumbnail: FC<ItemThumbnailProps> = ({
  id,
  ...props
}: ItemThumbnailProps) => {
  const query = useQuery()
  const item = query.fungibleToken({ id })

  return (
    <Container {...props}>
      {query.$state.isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Img src={item?.imageUrl} />
          <ThumbnailDetails>
            <Quantity>{item?.count}x</Quantity>
            <ThumbnailLabel>{item?.name}</ThumbnailLabel>
          </ThumbnailDetails>
        </>
      )}
    </Container>
  )
}
export default ItemThumbnail
