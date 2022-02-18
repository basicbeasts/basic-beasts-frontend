import React, { FC } from "react"
import NextLink from "next/link"
import styled from "styled-components"
import FlowLogo from "public/flow.svg"
import HeroImg from "public/hero/HeroImg-Desktop.png"
import HeroImgMobile from "public/hero/HeroImg-Mobile.png"
// import DecentologyLogo from "public/decentology.svg"

const Grid = styled.div`
  margin: 0 auto;
  min-height: min-content;
  height: 90vh;
  max-height: max-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 2rem 1rem;
  @media (max-width: 1010px) {
    flex-direction: column;
    height: min-content;
  }
`
const HeroImageContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  @media (max-width: 1010px) {
    width: 100%;
    order: 2;
  }
`

const HeroImage = styled.img`
  width: 100%;
  object-fit: contain;
  padding: 0 6%;
  @media (max-width: 1010px) {
    display: none;
  }
`

const HeroImageMobile = styled.img`
  display: none;
  width: 100%;
  object-fit: contain;
  @media (max-width: 1010px) {
    display: block;
  }
`

const TextContainer = styled.div`
  background: #425066;
  border-radius: 15px;
  padding: 9%;
  @media (max-width: 1010px) {
    margin: 2%;
    border-radius: 10px;
  }
`

const IconContainer = styled.div`
  margin-top: 30px;
  @media (max-width: 1010px) {
    text-align: center;
    margin-bottom: 30px;
  }
`

const Icon = styled.img`
  width: auto;
  height: 30px;
  margin: 0 50px 0 50px;
  opacity: 0.5;
  @media (max-width: 1010px) {
    margin: 0 15px 0 15px;
  }
  @media (max-width: 600px) {
    height: 20px;
    margin: 0 15px 0 15px;
  }
`

const Description = styled.div`
  width: 50%;
  @media (max-width: 1010px) {
    width: 100%;
  }
`
const Title = styled.h1`
  margin: 0px;
  color: #fff;
  font-weight: normal;
  font-size: 7vw;
  line-height: 0.7;
  @media (max-width: 1010px) {
    font-size: 14vw;
  }
`

const P = styled.p`
  color: #fff;
  line-height: 1;
  font-size: 2.5vw;
  @media (max-width: 1010px) {
    font-size: 5vw;
  }
`
const Button = styled.button`
  padding: 8px 24px 12px 26px;
  margin-right: 2px;
  font-size: 2.5vw;
  background-color: #feff95;
  box-shadow: -4px 0px 0px 0px #a15813, 0px -4px 0px 0px #a15813,
    0px 4px 0px 0px #a15813, 4px 0px 0px 0px #a15813, inset -4px -4px #f3cb23;
  color: #a15813;
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: -4px 0px 0px 0px #a15813, 0px -4px 0px 0px #a15813,
      0px 4px 0px 0px #a15813, 4px 0px 0px 0px #a15813, inset 4px 4px #f3cb23;
  }
  @media (max-width: 1010px) {
    font-size: 5vw;
  }
`

const Hero: FC = () => {
  return (
    <Grid>
      <HeroImageContainer>
        <HeroImage src={HeroImg.src} />
        <HeroImageMobile src={HeroImgMobile.src} />
      </HeroImageContainer>
      <Description>
        <TextContainer>
          <Title>Collect & Evolve Beasts Play-2-earn.</Title>
          <P>
            Pokémon-inspired NFT collectibles game made by 11-year old and his
            brother.
          </P>
          <NextLink href="/store">
            <Button style={{ marginTop: "2vw" }}>Buy Now</Button>
          </NextLink>
        </TextContainer>
        <IconContainer>
          <Icon src={FlowLogo.src} />
          {/* <Icon src={DecentologyLogo.src} /> */}
        </IconContainer>
      </Description>
    </Grid>
  )
}
export default Hero
