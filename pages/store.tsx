import type { NextPage } from "next"
import HeaderDark from "@components/ui/HeaderDark"
import PackStore from "@components/ui/PackStore"
import styled from "styled-components"

const Container = styled.div`
  /* border: solid 25px #111111;
  border-bottom: 0px;
  border-left: 0px;
  border-right: 0px; */
`

const Pull = styled.div`
  margin-top: -100px;
  @media (max-width: 1420px) {
    margin-top: 0px;
  }
`

const Store: NextPage = () => {
  return (
    <Container>
      {/*<HeaderDark
        title="Store is Open"
        description="Collect, evolve, trade, and breed Beasts"
      />*/}
      <HeaderDark
        title="Store is Closed"
        description="Join Discord to receive drop updates"
      />
      <Pull />
      <PackStore />
    </Container>
  )
}

export default Store
