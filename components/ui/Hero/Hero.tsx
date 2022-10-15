import React, { FC } from "react"
import NextLink from "next/link"
import styled from "styled-components"
import FlowLogo from "public/flow.svg"
import HeroImg from "public/hero/HeroImg-Desktop.png"
import HeroImgMobile from "public/hero/HeroImg-Mobile.png"
import useTranslation from "next-translate/useTranslation"
// import DecentologyLogo from "public/decentology.svg"
import FilecoinLogo from "public/filecoin.svg"

const Grid = styled.div`
  margin: 0 auto;
  min-height: min-content;
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
  display: flex;
`

const Icon = styled.img`
  width: auto;
  height: 30px;
  margin: 0 20px;
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
const Title = styled.h1<{
  fontSize: string
  lineHeight: string
  mobileFontSize: string
}>`
  margin: 0px;
  color: #fff;
  font-weight: normal;
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.lineHeight};
  @media (max-width: 1010px) {
    font-size: ${(props) => props.mobileFontSize || "13vw"};
  }
`

const P = styled.p<{ fontSize: string }>`
  color: #fff;
  line-height: 1;
  margin: 35px 0;
  font-size: ${(props) => props.fontSize};
  @media (max-width: 1010px) {
    font-size: 5vw;
  }
`
const Button = styled.button<{ fontSize: string }>`
  padding: 0px 24px 0px 26px;
  margin-right: 2px;
  font-size: ${(props) => props.fontSize};
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
  let { t, lang } = useTranslation()
  return (
    <Grid>
      <HeroImageContainer>
        <HeroImage src={HeroImg.src} />
        <HeroImageMobile src={HeroImgMobile.src} />
      </HeroImageContainer>
      <Description>
        <TextContainer>
          <Title
            fontSize={lang === "ru" ? "4vw" : "7vw"}
            lineHeight={lang === "ru" ? "1" : "0.7"}
            mobileFontSize={lang === "ru" ? "11vw" : "13vw"}
          >
            {t("home:collect")}
            <br />
            {t("home:evolve-beasts")}
            <br />
            {t("home:play2earn")}
          </Title>
          <P fontSize={lang === "ru" ? "2vw" : "2.5vw"}>
            {t("home:hero-description")}
          </P>
          <NextLink href="/store">
            <Button
              style={{ marginTop: "2vw" }}
              fontSize={lang === "ru" ? "2vw" : "2.5vw"}
            >
              {t("home:buy-now")}
            </Button>
          </NextLink>
        </TextContainer>
        <IconContainer>
          <Icon src={FlowLogo.src} />
          <Icon src={FilecoinLogo.src} />
        </IconContainer>
      </Description>
    </Grid>
  )
}
export default Hero
