import React, { FC } from "react"
import styled from "styled-components"

const Button = styled.button<{ selected?: boolean }>`
  padding: 4px 0px 8px 2px;
  width: 110px;
  margin-left: 20px;
  font-size: 1.1em;
  background-color: ${(props) => (props.selected ? "#ffe595" : "#425066")};
  box-shadow: ${(props) =>
    props.selected
      ? "-3px 0px 0px 0px #b3a068, 0px -3px 0px 0px #b3a068, 0px 3px 0px 0px #b3a068, 3px 0px 0px 0px #b3a068, inset -3px -3px #e6ce86;"
      : "-3px 0px 0px 0px #556275, 0px -3px 0px 0px #556275, 0px 3px 0px 0px #556275, 3px 0px 0px 0px #556275, inset -3px -3px #6f7788;"};
  color: ${(props) => (props.selected ? "#a75806" : "#d9d9d9")};
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: ${(props) =>
      props.selected
        ? "-3px 0px 0px 0px #b3a068, 0px -3px 0px 0px #b3a068, 0px 3px 0px 0px #b3a068, 3px 0px 0px 0px #b3a068, inset 3px 3px #e6ce86;"
        : "-3px 0px 0px 0px #556275, 0px -3px 0px 0px #556275, 0px 3px 0px 0px #556275, 3px 0px 0px 0px #556275, inset 3px 3px #6f7788;"};
  }

  //Responsive
  @media (max-width: 640px) {
    margin-bottom: 20px;
  }
`

const RedDot = styled.span`
  color: #cc3333;
  position: absolute;
  padding-left: 18px;
  margin-top: -13px;
  font-size: 30px;
  font-family: "Courier New", Courier, monospace;
`

type FuncProps = {
  buttonText: string
  onClick?: () => void
  selected?: boolean
  notify?: boolean
}

const FilterButton: FC<FuncProps> = ({
  buttonText,
  onClick,
  selected,
  notify,
}: FuncProps) => {
  return (
    <Button selected={selected} onClick={onClick}>
      {notify ? (
        <>
          Packs <RedDot>•</RedDot>
        </>
      ) : (
        buttonText
      )}
    </Button>
  )
}
export default FilterButton
