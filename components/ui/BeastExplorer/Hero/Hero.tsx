import { FC } from "react"
import styled from "styled-components"

type Props = {
  beasts: any
  hunters: any
}

const Container = styled.div`
  margin: 4rem 30vw 4rem 30vw;
  display: grid;
  grid-template-rows: auto auto auto;
  justify-items: center;
  line-height: normal;

  color: white;

  @media (max-width: 1000px) {
    margin: 2rem 20vw 2rem 20vw;
  }

  @media (max-width: 500px) {
    margin: 2rem 20vw 2rem 20vw;
  }

  & h1 {
    font-size: 5rem;
    margin: 1rem 0;

    @media (max-width: 700px) {
      font-size: 4rem;
    }
  }
  & h2 {
    font-size: 2.5rem;

    @media (max-width: 700px) {
      font-size: 2rem;
    }
  }
  & h3 {
    font-size: 1.5rem;

    @media (max-width: 700px) {
      font-size: 1.2rem;
    }
  }
  & p {
    font-size: 1rem;
  }
`

const StatsDiv = styled.div`
  margin-top: 3vw;
  padding: 0.5rem 0;
  width: 100%;

  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;

  gap: 0 5vw;

  border-top: 2px solid #e4be23;
  border-bottom: 2px solid #e4be23;
  justify-content: center;
  text-align: center;

  & h2 {
    color: #e4be23;
  }
`

const Col1 = styled.div`
  grid-column: 1;
`

const Col2 = styled.div`
  grid-column: 2;
`

const Col3 = styled.div`
  grid-column: 3;
`

const BeastExplorerHero: FC<Props> = ({ beasts, hunters }) => {
  // console.log(beastSkins)
  // console.log(beasts)

  function getFloorPrice() {
    const beastsWithPrice = beasts?.filter((x: any) => x.price)
    if (beastsWithPrice) {
      let priceArray = []
      for (let i in beastsWithPrice) {
        priceArray.push(beastsWithPrice[i].price)
      }
      let lowest = Math.min(...priceArray)

      return lowest == Infinity ? "--" : lowest
    }
  }

  return (
    <Container>
      <h1>Explorer</h1>
      <h3>Explore the top Beasts at BB</h3>
      <StatsDiv>
        <Col1>
          <h3>Listed</h3>
          <h2>{beasts?.filter((x: any) => x.price).length}</h2>
        </Col1>
        <Col2>
          <h3>Floor</h3>
          <h2>{getFloorPrice()}</h2>
        </Col2>
        <Col3>
          <h3>Hunters</h3>
          <h2>{hunters?.length}</h2>
        </Col3>
      </StatsDiv>
    </Container>
  )
}

export default BeastExplorerHero
