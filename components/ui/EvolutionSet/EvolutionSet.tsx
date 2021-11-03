import React, { FC } from "react"
import styled from "styled-components"
import BeastCard from "@components/ui/BeastCard"
import data from "data"

const Container = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-top: 70px;
  display: flex;
  flex-flow: row wrap;
  -webkit-box-pack: center;
  justify-content: center;
  margin-bottom: 120px;
  @media (min-width: 1750px) {
    width: 1400px;
  }
`

const EvolutionSet: FC = () => {
  const { EvolutionSets } = data

  return (
    <Container>
      {EvolutionSets.map((Set: any) =>
        Set.BeastTemplates.map((Template: any) => (
          <BeastCard beastTemplate={Template} />
        )),
      )}
    </Container>
  )
}
export default EvolutionSet
