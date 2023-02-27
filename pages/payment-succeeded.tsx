import type { NextPage } from "next"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
`

const Heading = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`

const Message = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 0.5rem;
`

const PaymentSucceed: NextPage = () => {
  return (
    <Container>
      <Heading>Payment Succeeded!</Heading>
      <Message>Thank you for your payment.</Message>
      <Message>
        We have received your payment and your order will be processed shortly.
      </Message>
    </Container>
  )
}

export default PaymentSucceed
