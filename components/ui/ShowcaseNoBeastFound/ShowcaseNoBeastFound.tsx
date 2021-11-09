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

const ShowcaseNoBeastFound: FC = () => {
  return (
    <Container>
      <Text>
        Your Beast Collection is empty <br />
        Get yours now!
      </Text>
      <BuyButton buttonText={"Buy Beasts"} />
    </Container>
  )
}
export default ShowcaseNoBeastFound
