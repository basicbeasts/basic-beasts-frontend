import React, { FC } from "react"
import styled from "styled-components"
import BeastCard from "@components/ui/BeastCard"
import data from "data"

const Container = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
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
      {EvolutionSets.map((Set: any, i: any) => (
        <React.Fragment key={i}>
          {Set.BeastTemplates.map((Template: any, i: any) => (
            <BeastCard key={i} beastTemplate={Template} />
          ))}
        </React.Fragment>
      ))}
    </Container>
  )
}
export default EvolutionSet
