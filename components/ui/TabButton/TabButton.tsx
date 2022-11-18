import React, { FC } from "react"
import styled from "styled-components"

const Button = styled.button<{ selected?: boolean }>`
  padding: 5px 0px 6px 2px;
  width: 160px;
  margin-left: 0;
  font-size: 1.1em;
  background-color: ${(props) => (props.selected ? "#E9CB4F" : "transparent")};
  color: ${(props) => (props.selected ? "#111823" : "#E9CB4F")};
  border: none;
  border-radius: 8px;
  text-transform: uppercase;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
  }

  //Responsive
  @media (max-width: 640px) {
    margin-bottom: 20px;
    min-width: 100px;
  }
`

const RedDot = styled.span`
  color: #cc3333;
  position: absolute;
  padding-left: 10px;
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

const TabButton: FC<FuncProps> = ({
  buttonText,
  onClick,
  selected,
  notify,
}: FuncProps) => {
  return (
    <Button selected={selected} onClick={onClick}>
      {notify ? (
        <>
          {buttonText} <RedDot>•</RedDot>
        </>
      ) : (
        buttonText
      )}
    </Button>
  )
}
export default TabButton
