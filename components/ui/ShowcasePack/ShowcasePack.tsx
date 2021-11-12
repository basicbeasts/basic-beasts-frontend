import React, { Dispatch, FC, SetStateAction, useEffect } from "react"
import styled from "styled-components"
import BuyButton from "../BuyButton"
import { useQuery } from "../../../gqty"

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
  }
  @media (max-width: 660px) {
    min-width: 300px;
  }
`

// -----------------------------------------------------------------------
// Header
// Styling for the header of a Beast Card
// -----------------------------------------------------------------------

const Header = styled.div`
  color: #fff;
  width: 500px;
  margin-top: 50px;
  font-size: 18px;
  height: 180px;
  //responsive
  @media (max-width: 660px) {
    width: 360px;
  }
`

const Name = styled.h3`
  text-align: left;
  margin: 0;
  font-size: 65px;
  font-weight: normal;
`

// -----------------------------------------------------------------------
// Content
// Styling for the content of a Beast Card
// -----------------------------------------------------------------------

const Content = styled.div`
  height: 500px;
  background: #fff;
  box-shadow: 0px 0px 5px 4px #fff;
  width: 103%;
  color: #000000;
  display: flex;
  justify-content: center;

  //Responsive
  @media (max-width: 1140px) {
    max-width: screen;
    width: 100vw;
  }
`

const ContentWrapper = styled.div`
  margin-top: -160px;
  justify-content: center;
`

const Img = styled.img`
  width: 220px;
  position: relative;
  user-drag: none;
  -webkit-user-drag: none;
`

const Description = styled.div`
  max-width: 440px;
  text-align: left;
  position: relative;
  height: 250px;
`

type ShowcasePackProps = {
  id: string
  revealModalOpen: () => void
  setContainerBg: Dispatch<SetStateAction<string | null>>
}

const ShowcasePack: FC<ShowcasePackProps> = ({
  id,
  setContainerBg,
  revealModalOpen,
}: ShowcasePackProps) => {
  const query = useQuery()
  const pack = query.pack({ id })

  // Set the background color of the container
  useEffect(() => {
    setContainerBg("#272727")
  }, [query.$state.isLoading, pack])

  return (
    <Container>
      <Header>
        <Name>{pack?.type}</Name>
      </Header>
      <Content>
        <ContentWrapper>
          <Img src={pack?.imageUrl} />
          <Description>{pack?.description}</Description>
          <BuyButton
            buttonText={"Summon Beast"}
            onClick={() => revealModalOpen()}
          ></BuyButton>
        </ContentWrapper>
      </Content>
    </Container>
  )
}
export default ShowcasePack
