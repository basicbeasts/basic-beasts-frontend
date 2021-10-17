import React from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
    position: absolute;
    width: 100%; height:100%;
    top:0; left:0;
    background:rgba(0,0,0,0.6);
    z-index: 1;
    transition: all 1s;
    -webkit-transition: all 1s;
`

export default function Spinner() {
  return (
    <>
    <Overlay></Overlay>
    <div className="lds-ring"></div>
    </>
  )
}
