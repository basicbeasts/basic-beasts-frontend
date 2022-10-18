import styled from "styled-components"

import { FC, useState, Fragment, useEffect } from "react"
import { Props } from "framer-motion/types/types"

const Wrapper = styled.div`
  background: transparent;
  border: solid #808080 0.5px;
  border-radius: 10px;
  margin-left: 1.125rem;
  width: 280px;
  padding: 5px 15px;
`

const Header = styled.header`
  font-size: 20px;
`

const H2 = styled.h2`
  font-size: 14px;
  margin: 11px 0;
`

const InputContainer = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  background: #282e3a;
  justify-content: space-between;
  grid-template-columns: 1fr auto;
  border: 0.5px solid #808080;
  border-radius: 3px;
  padding: 0 10px;
  height: 35px;
`

const FuncArgInput = styled.input`
  display: flex;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1rem;
  /* padding-left: 7px; */
  width: 100%;
  cursor: pointer;
  margin-bottom: 0;
  outline: none;
  &::placeholder {
    color: #d0d8e1;
    text-transform: uppercase;
  }
`

const InputDefaultText = styled.div`
  display: flex;
  width: 30px;
  align-items: center;
  justify-content: center;
`

const BeastMarketSweep: FC<Props> = ({}) => {
  const [value, setValue] = useState(50)

  return (
    <>
      <Wrapper>
        <Header>Sweep &#40; &#41;</Header>
        <H2>Max price per item (optional)</H2>
        <InputContainer>
          <FuncArgInput></FuncArgInput>
          <InputDefaultText>FUSD</InputDefaultText>
        </InputContainer>
        <H2>Number of items</H2>
        <div>
          <FuncArgInput type="range" min="1" max="100" step={1} id="myRange" />
        </div>
        <InputContainer>
          <FuncArgInput placeholder={"50"} />
          <InputDefaultText>Items</InputDefaultText>
        </InputContainer>
      </Wrapper>
    </>
  )
}

export default BeastMarketSweep
