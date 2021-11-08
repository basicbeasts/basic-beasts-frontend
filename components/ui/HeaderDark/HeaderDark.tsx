import React, { FC } from "react"
import styled from "styled-components"

const Container = styled.div`
  min-height: 20vh;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 25px #111111;
  background: #111823;
  @media (max-width: 700px) {
    border: solid 15px #111111;
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
  line-height: 0;
  font-size: 4rem;
  color: #fff;
  font-weight: 400;
  @media (max-width: 700px) {
    font-size: 3rem;
  }
  @media (max-width: 400px) {
    font-size: 2rem;
  }
`

const P = styled.p`
  color: #fff;
  font-weight: 400;
  line-height: 0;
  font-size: 30px;
  @media (max-width: 700px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1rem;
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
