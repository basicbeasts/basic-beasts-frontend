import { useAuth } from "@components/auth/AuthProvider"
import { useUser } from "@components/user/UserProvider"
import React, { FC } from "react"
import styled from "styled-components"
import picture from "public/beasts/001_normal.png"

const BreedingSpot = styled.div`
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
  gap: 2rem;
  margin-top: 5rem;
`
const Img = styled.img`
  max-width: 10rem;
`
const Potion = styled.div`
  border: 1px solid gray;
  border-radius: 0.5rem;
  padding: 2rem;
`

type Props = {
  //   beast: any
}

const Breeding: FC<Props> = () => {
  return (
    <>
      <div>
        <BreedingSpot>
          <Img src={picture.src} style={{ transform: "scaleX(-1)" }} />
          <Potion>potion</Potion>
          <Img src={picture.src} /* style={{ transform: "scaleX(-1)" }} */ />
        </BreedingSpot>
      </div>
    </>
  )
}
export default Breeding
