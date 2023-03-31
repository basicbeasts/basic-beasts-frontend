import { FC, useState } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import arrow from "public/arrowIcon.svg"
import listIcon from "public/icons8-list-48.png"
import document from "public/document.svg"
import overview from "public/overview.svg"

type Props = {
  currBeast: any
  beastsArr: any
  beasts: any
  beastTemplatesArr: any
}

// Section with desc and properties

const Container = styled.div`
  margin: 0 12.5vw;
  padding: 1.5rem 0;
  color: white;
  line-height: normal;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 0 4vw;

  & h1 {
    font-size: 4rem;
  }
  & h2 {
    font-size: 2rem;
  }
  & h3 {
    font-size: 1.5rem;
  }
  & p {
    font-size: 1rem;
  }

  @media (max-width: 1450px) {
    h1 {
      font-size: 3.5rem;
    }
    h2 {
      font-size: 2rem;
    }
    h3 {
      font-size: 1.2rem;
    }
  }
  @media (max-width: 1200px) {
    h2 {
      font-size: 1.7rem;
    }
  }

  @media (max-width: 1000px) {
    grid-template-columns: 75vw;
    grid-template-rows: auto auto;
    gap: 0;
  }

  @media (max-width: 650px) {
    grid-template-columns: 80vw;
    margin: 0 10vw;
    gap: 0;

    h2 {
      font-size: 1.5rem;
    }
  }
`

const Column1 = styled.div`
  grid-column: 1;
  grid-row: 1;
  max-width: 100%;
`

const Column2 = styled.div`
  grid-column: 2;
  grid-row: 1;
  max-width: 100%;
  @media (max-width: 1000px) {
    grid-column: 1;
    grid-row: 2;
  }
`

const Header = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(95, 81, 81, 0.07);
  border: 1px solid #2e3340;
  border-radius: 0.5rem;
  font-size: 2rem;

  :hover {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer !important;
  }
`

const Icon = styled.img`
  height: auto;
  max-height: 1.5rem;
  display: inline-block;
  padding-right: 0.5rem;
`

const Name = styled.h2`
  display: inline;
  width: fit-content;
  padding-right: 1rem;
  line-height: normal;
`

const Arrow = styled.img`
  transform: rotate(180deg);
  display: inline-block;
  height: 1rem;

  &.opened {
    transform: rotate(0deg);
    position: relative;
    top: -0.4rem;
  }
`

const Content = styled.div`
  padding: 1rem;
  border: 1px solid #2e3340;
  border-radius: 0.5rem;
  margin-top: 0.25rem;
`

// Description section
const DescriptionDiv = styled.div`
  margin-bottom: 1rem;
  height: fit-content;
  max-width: 100%;
`

// Properties section
const PropertiesDiv = styled.div``

const PropContent = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  gap: 3% 2%;
  margin: 0 0 2rem 0;
`

const PropBox = styled.div`
  background-color: #212127;
  padding: 1rem;
  border-radius: 0.5rem;
  height: auto;

  &.col1 {
    grid-column: 1;
  }

  &.col2 {
    grid-column: 2;
  }

  &.col-span {
    grid-column: 1 / span 2;
  }

  & p {
    text-transform: uppercase;
    color: #a3a4a5;
  }

  & h4 {
    color: #e5be24;
  }

  .skill {
    display: inline;
  }

  &.basic {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;

    & p {
      grid-row: 1;
      grid-column: 1 / span 3;
      /* justify-self: baseline; */
    }
  }

  &.ultimate {
    text-align: center;

    & h3 {
      color: #e5be24;
      text-transform: uppercase;
    }
  }
`

// Skin Overview section
const OverviewDiv = styled.div``

const SkinContent = styled.div`
  margin: 0;
`

const SkinBox = styled.div<any>`
  background-color: #212127;
  /* background-color: #243540; */
  height: 6.5vw;
  border-radius: 0.5rem;
  margin-bottom: 1.5%;

  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 20% 38% 40%;
  align-items: center;
  gap: 2%;

  transition: all 0.2s ease-in;

  & h3 {
    color: #e5be24;
  }

  &.chosen {
    background: ${(props) => props.bgColor};
    color: black;

    & h3 {
      color: black;
    }
  }

  &:hover {
    scale: 1.05;
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer !important;
  }

  @media (max-width: 1000px) {
    height: 10vw;
  }

  @media (max-width: 550px) {
    height: 8vh;
    grid-template-columns: 20% 30% 46%;
  }
`

const SkinImg = styled.img`
  grid-column: 1;
  height: 100%;
`

const SkinName = styled.h2`
  grid-column: 2;
`

const SkinInfo = styled.div`
  grid-column: 3;

  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto auto;
  justify-content: space-between;
  align-items: center;

  & p {
    grid-column: 1;
    width: fit-content;
  }

  & h3 {
    grid-column: 2;
    width: fit-content;
    display: flex;
    align-items: right;
  }
`

const BeastTemplateContent: FC<Props> = ({
  currBeast,
  beastsArr,
  beasts,
  beastTemplatesArr,
}) => {
  const router = useRouter()
  console.log(beasts)

  function getFloorPrice(beast: any) {
    const beastsWithPrice = beasts?.filter(
      (x: any) => x.beastTemplateID == beast.beastTemplateID && x.price,
    )
    if (beastsWithPrice) {
      let priceArray = []
      for (let i in beastsWithPrice) {
        priceArray.push(beastsWithPrice[i].price)
      }
      let lowest = Math.min(...priceArray)

      return lowest == Infinity ? "--" : lowest
    }
  }

  function getPropPercentage(beast: any, property: any) {
    const beastsWithProp = beasts?.filter((x: any) => {
      let afterFiltering
      switch (property) {
        case "elements":
          afterFiltering = x.elements[0] == beast.elements[0]
          break
        case "skin":
          afterFiltering = x.skin == beast.skin
          break
      }
      return afterFiltering
    }).length
    const allBeasts = beasts.length
    let percentage = (beastsWithProp / allBeasts) * 100
    percentage = Math.trunc(percentage)
    // console.log(percentage)
    return percentage
  }

  function getRarity(currBeast: any) {
    // console.log(beastTemplatesArr)
    // console.log(currBeast)
    const beastsWithRarity = beastTemplatesArr?.filter(
      (x: any) => x.rarity == currBeast.rarity,
    ).length

    const allSkins = beastTemplatesArr.length
    // console.log("1 " + beastsWithRarity)
    // console.log("2 " + allSkins)

    let rarePercentage = (beastsWithRarity / allSkins) * 100
    rarePercentage = Math.trunc(rarePercentage)
    // console.log(percentage)
    return rarePercentage
  }

  const ToggleCard = ({
    icon,
    title,
    content,
    defaultActive,
  }: {
    icon: any
    title: any
    content: any
    defaultActive: Boolean
  }) => {
    const [isActive, setIsActive] = useState(defaultActive)

    return (
      <>
        <Header onClick={() => setIsActive(!isActive)}>
          <div>
            <Icon src={icon} />
            <Name>{title}</Name>
          </div>

          <div>
            {isActive ? (
              <Arrow src={arrow.src} />
            ) : (
              <Arrow src={arrow.src} className="opened" />
            )}
          </div>
        </Header>
        {isActive && <Content>{content}</Content>}
      </>
    )
  }

  const Description = () => {
    return (
      <>
        <p>{currBeast.description}</p>
      </>
    )
  }

  const Properties = () => {
    return (
      <>
        <PropContent>
          <PropBox className="col1">
            <p>Skin</p>
            <h3>{currBeast ? currBeast.skin : "Loading..."}</h3>
            <h4>{getPropPercentage(currBeast, "skin")}% have this trait</h4>
          </PropBox>
          <PropBox className="col2">
            <p>Element</p>
            <h3>{currBeast ? currBeast.elements : "Loading..."}</h3>
            <h4>{getPropPercentage(currBeast, "elements")}% have this trait</h4>
          </PropBox>
          <PropBox className="col1">
            <p>Rarity</p>
            <h3>{currBeast ? currBeast.rarity : "Loading..."}</h3>
            <h4>{getRarity(currBeast)}% have this trait</h4>
          </PropBox>
          <PropBox className="col2">
            <p>Generation</p>
            <h3>1</h3>
            <h4>100% have this trait</h4>
          </PropBox>
          <PropBox className="col-span basic">
            <p>basic skills</p>
            {currBeast ? (
              <>
                <h3 className="skill">{currBeast.basicSkills[0]}</h3>
                <h3 className="skill">{currBeast.basicSkills[1]}</h3>
                <h3 className="skill">{currBeast.basicSkills[2]}</h3>
              </>
            ) : (
              "Loading skills..."
            )}
          </PropBox>
          <PropBox className="col-span ultimate">
            <h3>Ultimate skill</h3>
            <h2>
              {currBeast
                ? currBeast.ultimateSkill
                : "Loading ultimate skill..."}
            </h2>
          </PropBox>
        </PropContent>
      </>
    )
  }

  const Overview = () => {
    return (
      <>
        <SkinContent>
          {beastsArr?.map((beast: any) => (
            <SkinBox
              key={beast.beastTemplateID}
              className={
                beast.beastTemplateID == currBeast.beastTemplateID
                  ? "chosen"
                  : ""
              }
              bgColor={
                beast.elements[0] == "Electric"
                  ? "#FFE595"
                  : beast.elements[0] == "Water"
                  ? "#A4C2F4"
                  : beast.elements[0] == "Grass"
                  ? "#B7D7A8"
                  : beast.elements[0] == "Fire"
                  ? "#EA9999"
                  : "#D5A6BD"
              }
              onClick={() => {
                router.push({
                  pathname: `/beast/${
                    beast.dexNumber + "-" + beast.skin.replace(/\s/g, "-")
                  }`,
                })
              }}
            >
              <SkinImg
                src={
                  "https://basicbeasts.mypinata.cloud/ipfs/" +
                  beast?.imageTransparentBg
                }
              />
              <SkinName>{beast?.skin}</SkinName>
              <SkinInfo>
                <p>Floor</p>
                <h3>{getFloorPrice(beast)}</h3>

                <p>Circulation</p>
                <h3>
                  {
                    beasts?.filter(
                      (x: any) => x.beastTemplateID == beast.beastTemplateID,
                    ).length
                  }
                </h3>
              </SkinInfo>
            </SkinBox>
          ))}
        </SkinContent>
      </>
    )
  }

  return (
    <Container>
      <Column1>
        <DescriptionDiv>
          <ToggleCard
            icon={listIcon.src}
            title="Description"
            content={Description()}
            defaultActive={true}
          />
        </DescriptionDiv>
        <PropertiesDiv>
          <ToggleCard
            icon={document.src}
            title="Properties"
            content={Properties()}
            defaultActive={true}
          />
        </PropertiesDiv>
      </Column1>
      <Column2>
        <OverviewDiv>
          <ToggleCard
            icon={overview.src}
            title="Skin overview"
            content={Overview()}
            defaultActive={true}
          />
        </OverviewDiv>
      </Column2>
    </Container>
  )
}

export default BeastTemplateContent
