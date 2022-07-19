import React, { FC, Dispatch, SetStateAction } from "react"
import styled from "styled-components"

const Container = styled.div<{
  selected?: boolean
  tagColor: string
  bgColor: string
}>`
  max-width: inherit;
  width: 100%;
  color: #000;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  padding: 20px;
  background: ${(props) => props.bgColor || "#E5E8E7"};
`

const Img = styled.img`
  user-drag: none;
  -webkit-user-drag: none;
  margin-bottom: 15px;
`

const Wrapper = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  text-align: center;
`

const ButtonWrapper = styled.div`
  margin: 15px 0 10px;
`

const Button = styled.button<{
  borderColor: string
  insetBorderColor: string
  bgColor: string
  fontColor: string
}>`
  text-transform: uppercase;
  padding: 0 20px 3px;
  font-size: 1.5vw;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fontColor};

  box-shadow: ${(props) =>
    `-3px 0px 0px 0px ${props.borderColor}, 0px -3px 0px 0px ${props.borderColor}, 0px 3px 0px 0px ${props.borderColor}, 
    3px 0px 0px 0px ${props.borderColor}, inset -3px -3px ${props.insetBorderColor}`};

  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  @media (max-width: 1010px) {
    font-size: 7vw;
  }
  @media (max-width: 1010px) {
    width: 26vw;
  }
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: ${(
      props,
    ) => `-3px 0px 0px 0px ${props.borderColor}, 0px -3px 0px 0px ${props.borderColor},
      0px 3px 0px 0px ${props.borderColor}, 3px 0px 0px 0px ${props.borderColor}, inset 3px 3px ${props.insetBorderColor}`};
  }
`

type BeastThumbnailProps = {
  id: string
  selected?: boolean
  onClick?: () => void
  className: string
  image: StaticImageData
  toggle: () => void
  selectPackType: Dispatch<SetStateAction<string | null>>
}

const PackTabCard: FC<BeastThumbnailProps> = ({
  id,
  image,
  toggle,
  selectPackType,
  ...props
}: BeastThumbnailProps) => {
  return (
    <Container
      {...props}
      tagColor={"#FFD966"}
      bgColor={id === "1" ? "#E5E8E7" : id === "3" ? "#F9EDF7" : "#FFF4D1"}
    >
      <>
        <Img src={image.src} />
        <Wrapper>
          <div>One random 1-star beast</div>
          <div>Amount: 3</div>
          <ButtonWrapper>
            <Button
              borderColor={
                id === "1" ? "#2C323B" : id === "3" ? "#751ad0" : "#a15813"
              }
              insetBorderColor={
                id === "1" ? "#737374" : id === "3" ? "#c746af" : "#f3cb23"
              }
              bgColor={
                id === "1" ? "#ababac" : id === "3" ? "#e3bfff" : "#feff95"
              }
              fontColor={
                id === "1" ? "#fff" : id === "3" ? "#751ad0" : "#a15813"
              }
              onClick={() => {
                toggle()
                selectPackType(id)
              }}
            >
              Unpack
            </Button>
          </ButtonWrapper>
        </Wrapper>
      </>
    </Container>
  )
}
export default PackTabCard
