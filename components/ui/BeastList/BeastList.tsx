import React, { FC } from "react"
import styled from "styled-components"
import BeastThumbnail from "@components/ui/BeastThumbnail"

const Container = styled.div`
  margin: 5rem auto;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  align-items: center;
  justify-content: center;
  color: white;
`

type FuncProps = {
  beasts: any
}

const BeastList: FC<FuncProps> = ({ beasts }) => {
  return (
    <Container>
      {beasts.length > 0 ? (
        <>
          {beasts.map((beast: any, i: any) => (
            <BeastThumbnail key={i} beast={beast} />
          ))}
        </>
      ) : (
        <div>Beast Collection is empty</div>
      )}
    </Container>
  )
}
export default BeastList
