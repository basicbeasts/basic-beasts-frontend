import React, { FC } from "react"
import styled from "styled-components"

const Container = styled.div`
  margin: 1rem auto;
  width: 80%;
  justify-items: center;
  align-items: center;
  justify-content: center;
  display: flex;
`

const TextInfo = styled.div``

const BeastImg = styled.img`
  max-width: 100px;
`

type FuncProps = {
  beast: any
}

const BeastCard: FC<FuncProps> = ({ beast }) => {
  return (
    <Container>
      <TextInfo>
        <div>Name: {beast.name}</div>
        <div>Dex number: {("00" + beast.dexNumber).slice(-3)}</div>
        <div>Serial number: {beast.serialNumber}</div>
        <div>Gender: {beast.gender}</div>
      </TextInfo>
      <BeastImg src={beast.imageURL} />
    </Container>
  )
}
export default BeastCard
