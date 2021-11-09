import React, { FC } from "react"
import styled from "styled-components"

const Button = styled.button`
  padding: 4px 34px 8px 36px;
  margin-left: 20px;
  font-size: 1.1em;
  background-color: #425066;
  box-shadow: -3px 0px 0px 0px #556275, 0px -3px 0px 0px #556275,
    0px 3px 0px 0px #556275, 3px 0px 0px 0px #556275, inset -3px -3px #6f7788;
  color: #d9d9d9;
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: -3px 0px 0px 0px #556275, 0px -3px 0px 0px #556275,
      0px 3px 0px 0px #556275, 3px 0px 0px 0px #556275, inset 3px 3px #6f7788;
  }
`

type FuncProps = {
  buttonText: string
}

const FilterButton: FC<FuncProps> = ({ buttonText }) => {
  return <Button>{buttonText}</Button>
}
export default FilterButton
