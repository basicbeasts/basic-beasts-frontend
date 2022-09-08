import React from "react"
import styled, { keyframes } from "styled-components"

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  transform: scale(3);
  display: flex;
  justify-content: center;
  /* align-items: center; */

  /* @keyframes scalable {
    0% {
      transform: scale(0%);
    }
    100% {
      transform: scale(100%);
    }
  } */
  animation-name: ${rotate};
`

const Wrapper = styled.div`
  /* animation: scalable 2s; */
`

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgb(231, 231, 158);
  /* background: radial-gradient(circle, yellow, rgb(255, 255, 255)) ; */
  filter: blur(0px);
  box-shadow: 0 0 10px 10px rgb(231, 231, 158), 0 0 20px 10px rgb(231, 231, 158),
    0 0 30px 10px rgb(231, 231, 158), 0 0 40px 10px rgb(231, 231, 158),
    0 0 50px 10px rgb(231, 231, 158), 0 0 60px 10px rgb(231, 231, 158);
  animation: ${rotate} 10s linear infinite;
`

const Span = styled.span<any>`
  position: absolute;
  bottom: 50%;
  width: 25px;
  height: 80px;
  background: linear-gradient(
    to top,
    rgba(231, 231, 158, 1),
    rgba(231, 231, 158, 0.1),
    transparent
  );
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);

  transform-origin: bottom center;

  transform: rotate(calc(45deg * ${(props) => props.item}));
  filter: blur(0px);
`

export default function SpotLightAnimation() {
  return (
    <Container>
      <Wrapper>
        <Box>
          <Span item="1" />
          <Span item="2" />
          <Span item="3" />
          <Span item="4" />
          <Span item="5" />
          <Span item="6" />
          <Span item="7" />
          <Span item="8" />
        </Box>
      </Wrapper>
    </Container>
  )
}
