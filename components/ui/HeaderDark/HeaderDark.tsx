import React, { FC } from "react"
import styled from "styled-components"

const Container = styled.div`
  // min-height: 20vh;
  // height: 40vh;
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #111823;
  z-index: 9999;
  /* @media (max-width: 700px) {
    border: solid 15px #111111;
  }
  @media (max-width: 1420px) {
    border: solid 25px #111111;
  } */
`

const Content = styled.div`
  padding: 7rem 0 5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20vw;
  @media (max-width: 900px) {
    padding: 0;
  }
`

const H1 = styled.h1`
  /* line-height: 0;
  font-size: 4rem;
  color: #fff;
  font-weight: 400;
  @media (max-width: 700px) {
    font-size: 3rem;
  }
  @media (max-width: 400px) {
    font-size: 2rem;
  } */

  color: #fff;
  font-weight: normal;
  font-size: 7vw;
  line-height: 1;
  margin-bottom: 0;
  margin-top: 0;
  @media (max-width: 1010px) {
    font-size: 13vw;
  }
`

const P = styled.p`
  /* color: #fff;
  font-weight: 400;
  line-height: 0;
  font-size: 30px;
  @media (max-width: 700px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1rem;
  } */
  font-size: 2.5vw;
  color: #fff;
  line-height: 1;
  margin-top: 0;
  @media (max-width: 1010px) {
    font-size: 5vw;
    text-align: center;
  }
`

type FuncProps = {
  title: String
  description: String
}

const HeaderDark: FC<FuncProps> = ({ title, description }) => {
  return (
    <Container>
      <Content>
        <H1>{title}</H1>
        <P>{description}</P>
      </Content>
    </Container>
  )
}
export default HeaderDark
