//import { BeastTemplate } from "@framework/types/beastTemplate"
import React, { FC } from "react"
import styled from "styled-components"
import star from "public/basic_starLevel.png"
import { Image } from "@framework/types/common"

const Container = styled.div<Omit<Unknown, "beastTemplate">>`
  width: 400px;
  background: #fff;
  margin: 30px 20px;
  font-size: 18px;
  opacity: ${({ unknown }) => (!unknown ? "1" : "0.8")};
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`

// -----------------------------------------------------------------------
// Header
// Styling for the header of a Beast Card
// -----------------------------------------------------------------------

const Header = styled.div<Omit<Color, "background">>`
  height: 235px;
  background: ${(props) => props.colorCode};
  box-shadow: 0px -6px 5px 4px ${(props) => props.colorCode || "white"}; //Here to adjust how close header and content should be
  padding: 28px 35px;
  color: #fff;
`

const BeastName = styled.h3`
  margin: 0;
  font-size: 65px;
  font-weight: normal;
  line-height: 65px;
`

const HeaderDetails = styled.div`
  display: table;
  clear: both;
  width: 100%;
  margin-top: 10px;
`

const Type = styled.div<Omit<Button, "background">>`
  float: left;
  background-color: ${(props) => props.backgroundColor || "#FFE595"};
  box-shadow: -3px 0px 0px 0px ${(props) => props.outset || "#B3A068"},
    0px -3px 0px 0px ${(props) => props.outset || "#B3A068"},
    0px 3px 0px 0px ${(props) => props.outset || "#B3A068"},
    3px 0px 0px 0px ${(props) => props.outset || "#B3A068"},
    inset -3px 0px ${(props) => props.inset || "#E6CE86"};
  padding-top: 0px;
  padding-bottom: 2px;
  padding-left: 8px;
  padding-right: 8px;
  width: 70px;
  margin-top: 0px;
  margin-left: 1px;
`

const DexNumber = styled.div`
  float: right;
  font-size: 35px;
  margin-top: -13px;
`

// -----------------------------------------------------------------------
// Content
// Styling for the content of a Beast Card
// -----------------------------------------------------------------------

const Content = styled.div`
  height: 360px;
  background: #fff;
  box-shadow: 0px 0px 5px 4px #fff;
  padding: 40px;
`

const ContentWrapper = styled.div<Omit<Unknown, "beastTemplate">>`
  top: ${({ unknown }) => (!unknown ? "-150px" : "30px")};
  position: relative;
`

const Img = styled.img`
  width: 180px;
  left: 75px;
  top: -10px;
  position: relative;
  user-drag: none;
  -webkit-user-drag: none;
`

const Description = styled.div`
  height: 80px;
`

const StarImg = styled.img`
  width: 25px;
  float: right;
  margin-right: 5px;
  margin-top: 1px;
  user-drag: none;
  -webkit-user-drag: none;
`

const StarLevel = styled.div`
  display: table;
  clear: both;
  height: 40px;
`

const StarLevelLabel = styled.div`
  float: left;
  margin-right: 50px;
  font-size: 25px;
  @media (max-width: 450px) {
    margin-right: 38px;
  }
`

const BasicSkills = styled.div`
  display: table;
  clear: both;
  height: 95px;
`

const Skills = styled.div`
  float: right;
  margin-top: 5px;
`

const Skill = styled.div`
  height: 25px;
`

const BasicSkillsLabel = styled.div`
  float: left;
  margin-right: 45px;
  font-size: 25px;
  @media (max-width: 450px) {
    margin-right: 33px;
  }
`

const UltimateSkill = styled.div<Omit<Button, "background">>`
  display: table;
  clear: both;
  background-color: ${(props) => props.backgroundColor || "#FFE595"};
  box-shadow: -3px 0px 0px 0px ${(props) => props.outset || "#B3A068"},
    0px -3px 0px 0px ${(props) => props.outset || "#B3A068"},
    0px 3px 0px 0px ${(props) => props.outset || "#B3A068"},
    3px 0px 0px 0px ${(props) => props.outset || "#B3A068"},
    inset -3px -3px ${(props) => props.inset || "#E6CE86"};
  padding-top: 5px;
  padding-bottom: 7px;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: -10px;
`

const UltimateSkillLabel = styled.div`
  float: left;
  font-size: 25px;
  margin-right: 32px;
  @media (max-width: 450px) {
    margin-right: 20px;
  }
`

const SkillName = styled.div`
  float: right;
  width: 150px;
  margin-top: 5px;
`

type Unknown = {
  unknown: Boolean
}

type Color = {
  colorCode: any
}

type Button = {
  backgroundColor: string
  outset: string
  inset: string
}

type BeastTemplate = {
  dexNumber: number
  name: string
  type: string
  description: string
  starLevel: number
  basicSkills: [string]
  ultimateSkill: string
  image?: Image
  color: string
  buttonBackground: string
  buttonOutset: string
  buttonInset: string
  typeTagBackground: string
  typeTagOutset: string
  typeTagInset: string
}

type Props = {
  beastTemplate: BeastTemplate
}

const BeastCard: FC<Props> = ({ beastTemplate }) => {
  const unknown = beastTemplate.name == "???"

  return (
    <Container unknown={unknown}>
      <Header colorCode={beastTemplate.color}>
        <BeastName>{beastTemplate.name}</BeastName>
        <HeaderDetails>
          <Type
            backgroundColor={beastTemplate.typeTagBackground}
            outset={beastTemplate.typeTagOutset}
            inset={beastTemplate.typeTagInset}
          >
            {beastTemplate.type}
          </Type>
          <DexNumber>
            {"#" + ("00" + beastTemplate.dexNumber).slice(-3)}
          </DexNumber>
        </HeaderDetails>
      </Header>
      <Content>
        <ContentWrapper unknown={unknown}>
          {unknown ? <></> : <Img src={beastTemplate.image?.url} />}
          <Description>{beastTemplate.description}</Description>

          <StarLevel>
            <StarLevelLabel>Star Level</StarLevelLabel>
            {Array.from(Array(beastTemplate.starLevel), (e, i) => {
              return <StarImg src={star.src} key={i} />
            })}
          </StarLevel>

          <BasicSkills>
            <BasicSkillsLabel>Basic Skills</BasicSkillsLabel>
            <Skills>
              {beastTemplate.basicSkills.map((skill: any, i: any) => (
                <Skill key={i}>{skill}</Skill>
              ))}
            </Skills>
          </BasicSkills>

          <UltimateSkill
            backgroundColor={beastTemplate.buttonBackground}
            outset={beastTemplate.buttonOutset}
            inset={beastTemplate.buttonInset}
          >
            <UltimateSkillLabel>Ultimate Skill</UltimateSkillLabel>
            <SkillName>{beastTemplate.ultimateSkill}</SkillName>
          </UltimateSkill>
        </ContentWrapper>
      </Content>
    </Container>
  )
}
export default BeastCard
