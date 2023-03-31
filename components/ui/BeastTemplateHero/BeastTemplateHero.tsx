import { FC } from "react"
import styled from "styled-components"
import star from "public/basic_starLevel.png"
import arrow from "public/arrowIcon.svg"
import infoIcon from "public/infoIcon.svg"

type Props = {
  beast: any
  beasts: any
}

// get all the beasts => filter beasts array by beast.dexNumber and pass the new array to the beastTemplateHero component

const Container = styled.section`
  margin: 2.5vw 12.5vw;
  padding-top: 2rem;
  color: white;
  line-height: normal;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 0 4vw;

  & h1 {
    font-size: 4rem;
  }
  & h2 {
    font-size: 2.5rem;
  }
  & h3 {
    font-size: 1.5rem;
    display: inline;
  }
  & p {
    font-size: 1rem;
  }

  @media (max-width: 1450px) {
    h1 {
      font-size: 3.5rem;
    }
    h3 {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 1000px) {
    grid-template-columns: 75vw;
    grid-template-rows: auto auto auto auto;

    gap: 0 2vw;

    h1 {
      font-size: 3.1rem;
    }

    h2 {
      font-size: 2.3rem;
    }
  }

  @media (max-width: 650px) {
    h2 {
      font-size: 2rem;
    }
    grid-template-columns: 80vw;
    margin: 0 10vw;
    gap: 0;
  }
`

const Header = styled.div`
  grid-column: 1;
  grid-row: 1 / span 2;

  @media (max-width: 1000px) {
    grid-row: 1;
    justify-items: center;
  }
`

const BeastImgContainer = styled.div<any>`
  // background-color: #ffd966;
  background: ${(props) => props.backgroundColor};
  border-radius: 1rem;
  position: relative;
  top: 0;
  left: 0;
`
const Stars = styled.div`
  height: 2rem;
  position: absolute;
  z-index: 2;
  margin: 1rem;

  @media (max-width: 800px) {
    height: 1rem;
  }
`

const Star = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  display: inline-block;
`

const BeastImg = styled.img`
  height: auto;
  width: 35.5vw;

  @media (max-width: 1000px) {
    margin: 0 auto;
  }
`

const BeastNameDex = styled.h1`
  grid-column: 1 / span 2;
  grid-row: 3;
  margin-top: 0.5rem;

  @media (max-width: 1000px) {
    grid-column: 1;
    grid-row: 2;
  }

  /* @media (max-width: 1000px) {
    grid-column: 1;
    grid-row: 2;
  } */
`

const Stats = styled.div`
  grid-column: 2;
  text-align: center;

  display: grid;

  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  margin: 0 1rem;
  align-items: center;

  /* @media (max-width: 1000px) {
    grid-row: 1;
    height: 80%;
    margin: auto 1rem;
  } */

  @media (max-width: 1000px) {
    grid-column: 1;
    grid-row: 3;
    margin: 1rem 0;
    gap: 0 20vw;
  }
  /* 
  @media (max-width: 650px) {
    margin: 1rem 0;
  } */
`

const StatsLabel = styled.div`
  text-transform: uppercase;
  text-align: center;
  grid-column: 1 / span 2;

  @media (max-width: 650px) {
    text-align: left;
    border-bottom: 2px solid #a3a4a5;
  }
`

const StatsCol1 = styled.div`
  grid-column: 1;
  text-align: left;
  display: flex;
  align-items: center;
`

const StatsCol2 = styled.div`
  grid-column: 2;
  text-align: right;
  color: #e4be23;
`

const Info = styled.img`
  height: 1rem;
  width: auto;
  display: inline;
  padding-left: 0.5rem;
`

const Evolutions = styled.div`
  grid-column: 2;
  grid-row: 2;
  margin-top: 3rem;

  display: grid;
  grid-template-rows: auto auto;
  grid-auto-columns: auto auto auto auto auto;
  /* align-content: center; */
  align-items: center;
  gap: 1vw;

  @media (max-width: 1000px) {
    grid-column: 1;
    grid-row: 4;
    gap: 4vw;
  }

  @media (max-width: 650px) {
    gap: 2vw;
  }
`
const EvolLabel = styled.div`
  text-transform: uppercase;
  text-align: center;
  grid-column: 1 / span 5;

  @media (max-width: 650px) {
    text-align: left;
    border-bottom: 2px solid #a3a4a5;
  }
`

const EvolutionCard = styled.div<any>`
  height: fit-content;
  width: auto;
  background-color: #212127;
  /* background-color: #243540; */
  border-radius: 1rem;
  text-align: center;
  padding: 1rem 1.5rem;

  transition: all 0.2s ease-in;

  &:hover {
    scale: 1.05;
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer !important;
  }

  &.chosen {
    background: ${(props) => props.bgColor};
    color: black;
  }

  @media (max-width: 650px) {
    padding: 0.5rem 1rem;
  }
`
const EvolBeastImg = styled.img`
  height: auto;
  width: auto;

  /* @media (max-width: 1000px) {
    height: 80%;
    width: 80%;
    padding: 0;
    margin: 0;
  } */
`

const EvolBeastName = styled.h3`
  width: auto;
`

const EvolBeastLvl = styled.div`
  height: 1rem;
  width: auto;

  @media (max-width: 650px) {
    height: 0.8rem;
  }
`

const Arrow = styled.img`
  width: auto;
  display: flex;
  transform: rotate(-90deg);
  height: auto;
`

const BeastTemplateHero: FC<Props> = ({ beast, beasts }) => {
  function getFloorPrice() {
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

  function getDexLength() {
    const dexLength = beast.dexNumber.toString().length
    let newDexNumber = beast.dexNumber

    let zeroes

    switch (dexLength) {
      case 1:
        zeroes = "00"
        newDexNumber = "00" + newDexNumber
        break
      case 2:
        zeroes = "0"
        newDexNumber = "0" + newDexNumber
        break
      default:
        zeroes = ""
    }
    return newDexNumber
  }

  function getMaxMinted() {
    let maxMint
    switch (beast.skin) {
      case "Metallic Silver":
        maxMint = Infinity
        break
      default:
        maxMint = beast.maxAdminMintAllowed
    }
    return maxMint
  }

  function maxMintByStar() {
    const star = beast.starLevel
    let newMaxMint
    switch (star) {
      case 1:
        newMaxMint = getMaxMinted()
        break
      case 2:
        newMaxMint = getMaxMinted() / 3
        break
      case 3:
        newMaxMint = getMaxMinted() / 9
        break
      default:
    }

    newMaxMint = Math.trunc(newMaxMint)
    return newMaxMint == Infinity ? "--" : newMaxMint
  }

  getDexLength()

  return (
    <div>
      <Container>
        <Header>
          <BeastImgContainer
            backgroundColor={
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
          >
            <Stars>
              {Array(beast?.starLevel)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} src={star.src} />
                ))}
            </Stars>
            <BeastImg
              src={
                "https://basicbeasts.mypinata.cloud/ipfs/" +
                beast.imageTransparentBg
              }
            />
          </BeastImgContainer>
        </Header>
        <BeastNameDex>
          {beast.name} #{getDexLength()}
        </BeastNameDex>

        <Stats>
          <StatsLabel>
            <h2>Stats</h2>
          </StatsLabel>
          <StatsCol1>
            <h3>Floor price</h3>
            <Info src={infoIcon.src} />
          </StatsCol1>

          <StatsCol2>
            <h2>{getFloorPrice()} FUSD</h2>
          </StatsCol2>
          <StatsCol1>
            <h3>Listed</h3>
            <Info src={infoIcon.src} />
          </StatsCol1>
          <StatsCol2>
            <h2>
              {
                beasts?.filter(
                  (x: any) =>
                    x.beastTemplateID == beast.beastTemplateID && x.price,
                ).length
              }
            </h2>
          </StatsCol2>
          <StatsCol1>
            <h3>Circulation</h3>
            <Info src={infoIcon.src} />
          </StatsCol1>
          <StatsCol2>
            <h2>
              {
                beasts?.filter(
                  (x: any) => x.beastTemplateID == beast.beastTemplateID,
                ).length
              }
            </h2>
          </StatsCol2>
          <StatsCol1>
            <h3>Max Supply</h3>
            <Info src={infoIcon.src} />
          </StatsCol1>
          <StatsCol2>
            <h2>{maxMintByStar()}</h2>
          </StatsCol2>
        </Stats>

        <Evolutions>
          <EvolLabel>
            <h2>Evolutions</h2>
          </EvolLabel>
          <EvolutionCard
            className="chosen"
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
          >
            <EvolBeastImg
              src={
                "https://basicbeasts.mypinata.cloud/ipfs/" +
                beast.imageTransparentBg
              }
            />
            <EvolBeastName>{beast.name}</EvolBeastName>
            <EvolBeastLvl>
              {Array(beast?.starLevel)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} src={star.src} />
                ))}
            </EvolBeastLvl>
          </EvolutionCard>
          <Arrow src={arrow.src} />
          <EvolutionCard>
            <EvolBeastImg
              src={
                "https://basicbeasts.mypinata.cloud/ipfs/" +
                beast.imageTransparentBg
              }
            />
            <EvolBeastName>{beast.name}</EvolBeastName>
            <EvolBeastLvl>
              {Array(beast?.starLevel)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} src={star.src} />
                ))}
            </EvolBeastLvl>
          </EvolutionCard>
          <Arrow src={arrow.src} />
          <EvolutionCard>
            <EvolBeastImg
              src={
                "https://basicbeasts.mypinata.cloud/ipfs/" +
                beast.imageTransparentBg
              }
            />
            <EvolBeastName>{beast.name}</EvolBeastName>
            <EvolBeastLvl>
              {Array(beast?.starLevel)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} src={star.src} />
                ))}
            </EvolBeastLvl>
          </EvolutionCard>
        </Evolutions>
      </Container>
    </div>
  )
}

export default BeastTemplateHero
