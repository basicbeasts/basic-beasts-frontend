import React, { FC } from "react"
import styled from "styled-components"

const Container = styled.div`
  min-height: 50vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  border: solid 25px #111111;

  @media (max-width: 700px) {
    border: solid 15px #111111;
    border: none;
  }
  @media (max-width: 1420px) {
    border: solid 25px #111111;
    border: none;
  }
`

const Content = styled.div`
  padding: 5rem 0;
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
  margin: 30px 0 0;
  line-height: 0.8;
  font-size: 4rem;
  color: #fff;
  text-align: center;
  @media (max-width: 700px) {
    font-size: 3rem;
    line-height: 3rem;
  }
  @media (max-width: 400px) {
    font-size: 2rem;
  }
`

const P = styled.p`
  color: #fff;
  line-height: 1.5;
  font-size: 2.5rem;

  text-align: center;
  @media (max-width: 700px) {
    font-size: 1.5rem;
  }
`

type FuncProps = {
  title: String
  description: String
}

const DefaultHeroSection: FC<FuncProps> = ({ title, description }) => {
  return (
    <Container>
      <Content>
        <H1>{title}</H1>

        <P>{description}</P>
      </Content>
    </Container>
  )
}
export default DefaultHeroSection
