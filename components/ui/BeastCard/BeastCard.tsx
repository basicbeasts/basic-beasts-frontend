import { BeastTemplate } from "@framework/types/beastTemplate"
import React, { FC } from "react"
import styled from "styled-components"
import star from "public/basic_starLevel.png"

const Container = styled.div`
  width: 400px;
  background: #fff;
  margin: 30px 20px;
  font-size: 18px;
`

// -----------------------------------------------------------------------
// Header
// Styling for the header of a Beast Card
// -----------------------------------------------------------------------

const Header = styled.div<Omit<Color, "background">>`
  height: 235px;
  background: ${(props) => props.colorCode};
  box-shadow: 0px -6px 5px 4px ${(props) => props.colorCode || "white"};
  padding: 35px;
  color: #fff;
`

const BeastName = styled.h3`
  margin: 0;
  font-size: 60px;
  font-weight: normal;
`

const HeaderDetails = styled.div`
  display: table;
  clear: both;
  width: 100%;
`

const Type = styled.div`
  float: left;
`

const DexNumber = styled.div`
  float: right;
  font-size: 35px;
`

// -----------------------------------------------------------------------
// Content
// Styling for the content of a Beast Card
// -----------------------------------------------------------------------

const Content = styled.div`
  height: 340px;
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
`

const Description = styled.div`
  height: 60px;
`

const StarImg = styled.img`
  width: 25px;
  float: right;
  margin-right: 5px;
  margin-top: 1px;
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
`

const SkillName = styled.div`
  float: right;
  width: 150px;
  margin-top: 3px;
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

type Props = {
  beastTemplate: BeastTemplate
}

const BeastCard: FC<Props> = ({ beastTemplate }) => {
  const unknown = beastTemplate.name == "???"
  console.log(unknown)

  return (
    <Container>
      <Header colorCode={beastTemplate.color}>
        <BeastName>{beastTemplate.name}</BeastName>
        <HeaderDetails>
          <Type>{beastTemplate.type}</Type>
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
              {beastTemplate.basicSkills.map((skill: any) => (
                <Skill>{skill}</Skill>
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
