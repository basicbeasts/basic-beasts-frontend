import React, { Dispatch, FC, SetStateAction, useEffect } from "react"
import styled from "styled-components"
import itemImg from "public/fungible_tokens/basic_beasts_sushi.png"
import star from "public/basic_starLevel.png"
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
`

const Name = styled.h3`
  text-align: left;
  margin: 0;
  font-size: 65px;
  font-weight: normal;
`

const HeaderDetails = styled.div`
  display: table;
  clear: both;
  width: 100%;
  margin-top: 10px;
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
`

const ContentWrapper = styled.div`
  margin-top: -120px;
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
  margin-top: -20px;
`

const Balance = styled.div`
  background: #fff1ef;
  position: relative;
  left: 140px;
  top: 150px;
  height: 110px;
  box-shadow: 0px 0px 5px 4px #fff1ef;
`
const BalanceLabel = styled.div``
const Amount = styled.div`
  margin-top: 5px;
  font-size: 85px;
`

type ShowcaseItemProps = {
  id: string
  setContainerBg: Dispatch<SetStateAction<string | null>>
}

const ShowcaseItem: FC<ShowcaseItemProps> = ({
  id,
  setContainerBg,
}: ShowcaseItemProps) => {
  const query = useQuery({ suspense: false })
  const item = query.fungibleToken({ id })

  // Set the background color of the container
  useEffect(() => {
    setContainerBg("#272727")
  }, [query.$state.isLoading, item])

  return (
    <Container>
      {query.$state.isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header>
            {/* See path of image to see the other fungible tokens */}
            <Name>{item?.name}</Name>
          </Header>
          <Content>
            <ContentWrapper>
              <Img src={item?.imageUrl} />
              <Description>{item?.description}</Description>
              <Balance>
                <BalanceLabel>{item?.name} Balance</BalanceLabel>
                <Amount>{item?.count}</Amount>
              </Balance>
            </ContentWrapper>
          </Content>
        </>
      )}
    </Container>
  )
}
export default ShowcaseItem
