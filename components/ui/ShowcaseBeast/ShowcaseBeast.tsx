import React, { Dispatch, FC, SetStateAction, useEffect } from "react"
import styled from "styled-components"
import star from "public/basic_starLevel.png"
import { useQuery } from "../../../gqty"
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
  background-color: ${(props) => props.backgroundColor || "#E6CE86"};
  box-shadow: -3px 0px 0px 0px ${(props) => props.outset || "#B3A068"},
    0px -3px 0px 0px ${(props) => props.outset || "#B3A068"},
    0px 3px 0px 0px ${(props) => props.outset || "#B3A068"},
    3px 0px 0px 0px ${(props) => props.outset || "#B3A068"},
    inset -3px 0px ${(props) => props.inset || "#CCB777"};
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
  height: 100px;
`

const StarImg = styled.img`
  width: 25px;
  float: right;
  margin-right: 5px;
  margin-top: 10px;
  user-drag: none;
  -webkit-user-drag: none;
`

const StarLevel = styled.div`
  display: table;
  clear: both;
  height: 60px;
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
  text-align: left;
`

const Skills = styled.div`
  float: right;
  margin-top: 5px;
  height: 140px;
`

const Skill = styled.div`
  height: 30px;
`

const BasicSkillsLabel = styled.div`
  float: left;
  margin-right: 40px;
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
  margin-right: 120px;
`

const SkillName = styled.div`
  float: right;
  width: 180px;
`

type Button = {
  backgroundColor: string
  outset: string
  inset: string
}

type ShowcaseBeastProps = {
  id: string
  setContainerBg: Dispatch<SetStateAction<string | null>>
}

const ShowcaseBeast: FC<ShowcaseBeastProps> = ({
  id,
  setContainerBg,
}: ShowcaseBeastProps) => {
  const query = useQuery({ suspense: false })

  const beast = query.beast({ id })

  // Set the background color of the container
  useEffect(() => {
    setContainerBg(beast?.colors?.buttonBackground)
  }, [query.$state.isLoading, beast])

  return (
    <Container>
      {query.$state.isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header>
            <BeastName>{beast?.name}</BeastName>
            <HeaderDetails>
              <Type
                backgroundColor={beast?.colors?.typeTagBackground}
                outset={beast?.colors?.typeTagOutset}
                inset={beast?.colors?.typeTagInset}
              >
                {beast?.elementType}
              </Type>
              <DexNumber>{"#" + ("00" + beast?.dexNumber).slice(-3)}</DexNumber>
            </HeaderDetails>
          </Header>
          <Content>
            <ContentWrapper>
              <Img src={beast?.imageUrl} />
              <Description>{beast?.description}</Description>
              <StarLevel>
                <StarLevelLabel>Star Level</StarLevelLabel>
                {Array(beast?.starLevel)
                  .fill(0)
                  .map((_, i) => (
                    <StarImg key={i} src={star.src} />
                  ))}
              </StarLevel>

              <BasicSkills>
                <BasicSkillsLabel>Basic Skills</BasicSkillsLabel>
                <Skills>
                  {beast?.basicSkills?.map((skill) => (
                    <Skill key={skill}>{skill}</Skill>
                  ))}
                </Skills>
              </BasicSkills>

              <UltimateSkill
                backgroundColor={beast?.colors?.buttonBackground}
                outset={beast?.colors?.buttonOutset}
                inset={beast?.colors?.buttonInset}
              >
                <UltimateSkillLabel>Ultimate Skill</UltimateSkillLabel>
                <SkillName>{beast?.ultimateSkill}</SkillName>
              </UltimateSkill>
            </ContentWrapper>
          </Content>
        </>
      )}
    </Container>
  )
}
export default ShowcaseBeast
