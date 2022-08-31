import React, { FC } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #000000e1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`

type FuncProps = {
  onClick: () => void
}

const Backdrop: FC<FuncProps> = ({ children, onClick }) => {
  return (
    <Container
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </Container>
  )
}
export default Backdrop
