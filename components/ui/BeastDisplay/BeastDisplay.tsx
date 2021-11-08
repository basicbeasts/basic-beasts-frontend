import React, { FC } from "react"
import styled from "styled-components"
import BeastCard from "@components/ui/BeastCard"
import data from "data"

const Container = styled.div`
  color: #fff;
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
`

const Bg = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: black;
  min-width: 1200px;
  min-height: 500px;
`

const LeftColumn = styled.div`
  padding: 10px;
  min-width: 600px;
`

const RightColumn = styled.div`
  background: #272727;
  min-width: 40%;
  margin-top: 50px;
`

const RightColumnHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const BeastDisplay: FC = () => {
  return (
    <Container>
      <Bg>
        <LeftColumn>
          Your Beast Collection is empty <br />
          Get yours now!
        </LeftColumn>
        <RightColumn>
          <RightColumnHeader>
            <div>Showing 0</div>
            <div>button</div>
          </RightColumnHeader>
          <div>BeastList</div>
        </RightColumn>
      </Bg>
    </Container>
  )
}
export default BeastDisplay
