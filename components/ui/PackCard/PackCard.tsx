import React, { FC } from "react"
import styled from "styled-components"

const Button = styled.button`
  padding: 4;
`

type FuncProps = {
  buttonText: string
}

const BuyButton: FC<FuncProps> = ({ buttonText }) => {
  return <Button>{buttonText}</Button>
}
export default BuyButton
