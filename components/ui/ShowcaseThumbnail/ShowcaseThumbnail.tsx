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
  padding-top: 100px;
  line-height: 40px;
  font-size: 2rem;
`

const ShowcaseThumbnail: FC = () => {
  return (
    <Container>
      Your Beast Collection is empty <br />
      Get yours now!
      <BuyButton />
    </Container>
  )
}
export default ShowcaseThumbnail
