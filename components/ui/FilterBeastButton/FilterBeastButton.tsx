import React, { FC } from "react"
import styled from "styled-components"

const Button = styled.button`
  padding: 4px 34px 8px 36px;
  margin-left: 20px;
  font-size: 1.1em;
  background-color: #ffe595;
  box-shadow: -3px 0px 0px 0px #b3a068, 0px -3px 0px 0px #b3a068,
    0px 3px 0px 0px #b3a068, 3px 0px 0px 0px #b3a068, inset -3px -3px #e6ce86;
  color: #a75806;
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: -3px 0px 0px 0px #b3a068, 0px -3px 0px 0px #b3a068,
      0px 3px 0px 0px #b3a068, 3px 0px 0px 0px #b3a068, inset 3px 3px #e6ce86;
  }
`

type FuncProps = {
  buttonText: string
}

const FilterBeastButton: FC<FuncProps> = ({ buttonText }) => {
  return <Button>{buttonText}</Button>
}
export default FilterBeastButton
