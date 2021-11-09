import React, { FC } from "react"
import styled from "styled-components"
import BuyButton from "@components/ui/BuyButton"

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

const Text = styled.div`
  margin-bottom: 25px;
`

const ShowcaseNoPackFound: FC = () => {
  return (
    <Container>
      <Text>
        You'll see unopened packs here. <br />
        Get your packs today!
      </Text>
      <BuyButton buttonText={"Buy Packs"} />
    </Container>
  )
}
export default ShowcaseNoPackFound
