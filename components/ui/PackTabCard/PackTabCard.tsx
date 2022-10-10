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
  // cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
  //     14 0,
  //   pointer !important;
  padding: 20px;
  background: ${(props) => props.bgColor || "#E5E8E7"};
  display: flex;
  flex-direction: column;
`

const Img = styled.img`
  user-drag: none;
  -webkit-user-drag: none;
  margin: 15px auto 8vh;
  width: 200px;
`

const Wrapper = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  text-align: center;
`

const TextContainer = styled.div`
  height: 50px;
`

const ButtonWrapper = styled.div`
  margin: 0 auto 20px;
  width: 100%;

  // position: absolute;
  // bottom: 40px;
  // left: 0;
  // right: 0;
`

const Button = styled.button<{
  borderColor: string
  insetBorderColor: string
  bgColor: string
  fontColor: string
}>`
  text-transform: uppercase;

  padding: 0 0 3px;
  font-size: 1.8em;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fontColor};

  box-shadow: ${(props) =>
    `-3px 0px 0px 0px ${props.borderColor}, 0px -3px 0px 0px ${props.borderColor}, 0px 3px 0px 0px ${props.borderColor}, 
    3px 0px 0px 0px ${props.borderColor}, inset -3px -3px ${props.insetBorderColor}`};

  border: none;
  width: 75%;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  @media (max-width: 1010px) {
    //width: 10vw;
    font-size: 1.8em;
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
  packCount: any
}

const PackTabCard: FC<BeastThumbnailProps> = ({
  id,
  image,
  toggle,
  selectPackType,
  packCount,
  ...props
}: BeastThumbnailProps) => {
  return (
    <Container
      {...props}
      tagColor={"#FFD966"}
      bgColor={
        id === "1"
          ? "#E5E8E7"
          : id === "2"
          ? "#E6E8E9"
          : id === "3"
          ? "#F9EDF7"
          : "#FFF4D1"
      }
    >
      <>
        <Img src={image.src} />
        <Wrapper>
          {/* <TextContainer>
            <div>Amount: {packCount}</div>
          </TextContainer> */}
          <ButtonWrapper>
            <Button
              borderColor={
                id === "1"
                  ? "#2C323B"
                  : id === "2"
                  ? "#5C6988"
                  : id === "3"
                  ? "#751ad0"
                  : "#a15813"
              }
              insetBorderColor={
                id === "1"
                  ? "#737374"
                  : id === "2"
                  ? "#889AAF"
                  : id === "3"
                  ? "#c746af"
                  : "#f3cb23"
              }
              bgColor={
                id === "1"
                  ? "#ababac"
                  : id === "2"
                  ? "#C1CCDE"
                  : id === "3"
                  ? "#e3bfff"
                  : "#feff95"
              }
              fontColor={
                id === "1"
                  ? "#fff"
                  : id === "2"
                  ? "#5C6988"
                  : id === "3"
                  ? "#751ad0"
                  : "#a15813"
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
