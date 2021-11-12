import type { NextPage } from "next"
import HeaderDark from "@components/ui/HeaderDark"
import EvolutionSet from "@components/ui/EvolutionSet"
import styled from "styled-components"

const Container = styled.div`
  border: solid 25px #111111;
  border-bottom: 0px;
  border-left: 0px;
  border-right: 0px;
`

const Dexicon: NextPage = () => {
  return (
    <Container>
      <HeaderDark
        title="Dexicon"
        description="Dexicon shows all discovered Basic Beasts"
      />
      <EvolutionSet />
    </Container>
  )
}

export default Dexicon
