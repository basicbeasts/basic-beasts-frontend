import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import styled from "styled-components"
import BuyButton from "@components/ui/BuyButton"

import { motion } from "framer-motion"
import BeastRevealModal from "../BeastRevealModal"

const Container = styled.div`
  padding: 10px;
  min-width: 600px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 0px;
  line-height: 40px;
  font-size: 1.5rem;
  @media (max-width: 400px) {
    font-size: 1rem;
    line-height: 20px;
  }

  //Responsive
  @media (max-width: 1350px) {
    padding: 0;
    min-height: 500px;
  }
  @media (max-width: 660px) {
    min-width: 300px;
  }
`

const Text = styled.div`
  margin-bottom: 25px;
`

type FuncProps = {
  setContainerBg: Dispatch<SetStateAction<string | null>>
}

const ShowcaseNoPackFound: FC<FuncProps> = ({ setContainerBg }) => {
  // Set the background color of the container
  useEffect(() => {
    setContainerBg("#272727")
  }, [])

  return (
    <Container>
      <Text>
        You&apos;ll see unopened packs here. <br />
        Get your packs today!
      </Text>
      <BuyButton buttonText={"Buy Packs"} />
      <br />
    </Container>
  )
}
export default ShowcaseNoPackFound
