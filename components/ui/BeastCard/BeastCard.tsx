import { BeastTemplate } from "@framework/types/beastTemplate"
import React, { FC } from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 400px;
  background: #fff;
  margin: 20px 12px;
  font-size: 23px;
`

const Header = styled.div<Omit<Color, "beastTemplate">>`
  height: 235px;
  background: ${(props) => props.colorCode};
  box-shadow: 0px -6px 5px 4px ${(props) => props.colorCode || "white"};
`
const Content = styled.div`
  height: 350px;
  background: #fff;
  box-shadow: 0px 0px 5px 4px #fff;
  padding: 35px;
`

const ContentWrapper = styled.div<Omit<Unknown, "beastTemplate">>`
  top: ${({ unknown }) => (!unknown ? "-150px" : "0")};
  position: relative;
`

const Img = styled.img`
  width: 180px;
  left: 75px;
  top: -10px;
  position: relative;
`

const Description = styled.div`
  margin-top: 10px;
`

type Unknown = {
  unknown: Boolean
}

type Color = {
  colorCode: any
}

type Props = {
  beastTemplate: BeastTemplate
}

const BeastCard: FC<Props> = ({ beastTemplate }) => {
  const unknown = beastTemplate.name == "???"
  console.log(unknown)

  return (
    <Container>
      <Header colorCode={beastTemplate.color}>
        <div>{beastTemplate.name}</div>
        <div>
          <div>{beastTemplate.type}</div>
          <div>{("#00" + beastTemplate.dexNumber).slice(-4)}</div>
        </div>
      </Header>
      <Content>
        <ContentWrapper unknown={unknown}>
          {unknown ? <></> : <Img src={beastTemplate.image?.url} />}
          <Description>{beastTemplate.description}</Description>
          <div>star level</div>
          <div>basic skills</div>
          <div>ultimate skill</div>
        </ContentWrapper>
      </Content>
    </Container>
  )
}
export default BeastCard
