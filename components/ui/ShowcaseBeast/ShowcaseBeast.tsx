import React, { FC } from "react"
import styled from "styled-components"
import beastImg from "public/001_normal.png"
import star from "public/basic_starLevel.png"

const Container = styled.div`
  padding: 10px;
  min-width: 600px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 0px;
  line-height: 40px;
  font-size: 1.5rem;
  @media (max-width: 400px) {
    font-size: 1rem;
  }
`

// -----------------------------------------------------------------------
// Header
// Styling for the header of a Beast Card
// -----------------------------------------------------------------------

const Header = styled.div`
  color: #fff;
  width: 500px;
  margin-top: 50px;
  font-size: 18px;
  height: 180px;
`

const BeastName = styled.h3`
  text-align: left;
  margin: 0;
  font-size: 65px;
  font-weight: normal;
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
  padding-left: 8px;
  padding-right: 8px;
  width: 70px;
  margin-top: 20px;
  margin-left: 1px;
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
  height: 500px;
  background: #fff;
  box-shadow: 0px 0px 5px 4px #fff;
  width: 103%;
  color: #000000;
  display: flex;
  justify-content: center;
`

const ContentWrapper = styled.div`
  margin-top: -130px;
  justify-content: center;
`

const Img = styled.img`
  width: 220px;
  position: relative;
  user-drag: none;
  -webkit-user-drag: none;
`

const Description = styled.div`
  max-width: 440px;
  text-align: left;
  position: relative;
  margin-top: -20px;
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

type Color = {
  colorCode: any
}

type Button = {
  backgroundColor: string
  outset: string
  inset: string
}

const ShowcaseBeast: FC = () => {
  return (
    <Container>
      <Header>
        <BeastName>Moon</BeastName>
        <HeaderDetails>
          <Type
            backgroundColor={"#E6CE86"}
            outset={"#B3A068"}
            inset={"#E6CE86"}
          >
            {"Electric"}
          </Type>
          <DexNumber>{"#" + ("00" + 1).slice(-3)}</DexNumber>
        </HeaderDetails>
      </Header>
      <Content>
        <ContentWrapper>
          <Img src={beastImg.src} />
          <Description>
            A Moon slightly resembles a bunny. With strange ears on it’s head it
            shocks everything around it.
          </Description>
          <StarLevel>
            <StarLevelLabel>Star Level</StarLevelLabel>
            <StarImg src={star.src} />
          </StarLevel>

          <BasicSkills>
            <BasicSkillsLabel>Basic Skills</BasicSkillsLabel>
            <Skills>
              <Skill>Triple Kick</Skill>
              <Skill>Gravity Pull</Skill>
              <Skill>Moon Shock</Skill>
            </Skills>
          </BasicSkills>

          <UltimateSkill
            backgroundColor={"#FFE595"}
            outset={"#B3A068"}
            inset={"#CCB777"}
          >
            <UltimateSkillLabel>Ultimate Skill</UltimateSkillLabel>
            <SkillName>{"Mega Volt Crash"}</SkillName>
          </UltimateSkill>
        </ContentWrapper>
      </Content>
    </Container>
  )
}
export default ShowcaseBeast
