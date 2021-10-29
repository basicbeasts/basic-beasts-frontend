import React, { FC } from "react"
import styled from "styled-components"
import BeastCard from "@components/ui/BeastCard"

const Container = styled.div`
  margin: 5rem auto;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  align-items: center;
  justify-content: center;
  color: white;
`

type FuncProps = {
  beasts: any
}

const BeastList: FC<FuncProps> = ({ beasts }) => {
  return (
    <Container>
      {beasts.map((beast: any, i: any) => (
        <BeastCard key={i} beast={beast} />
      ))}
    </Container>
  )
}
export default BeastList
