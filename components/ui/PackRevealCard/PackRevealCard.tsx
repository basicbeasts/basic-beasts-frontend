import React, { FC, useState } from "react"
import styled from "styled-components"
import StarterImg from "public/packs/pack_pf/starter.png"
import CursedImg from "public/packs/pack_pf/cursed.png"
import ShinyImg from "public/packs/pack_pf/shiny.png"

const Container = styled.div`
  text-align: center;
`

const TransitionDiv = styled.div`
  padding: 0 20px;
  -moz-transition: all 1s ease-in-out 2s;
  -webkit-transition: all 1s ease-in-out 2s;

  transition: all 1s ease-in-out;
  // Needed to make transition animation. Look at RevealOverlay.tsx as example.
  /* opacity: ${({ isSideNavbarOpen }) => (isSideNavbarOpen ? "100%" : "0")};
  top: ${({ isSideNavbarOpen }) => (isSideNavbarOpen ? "0" : "-100%")}; */
`

const Img = styled.img`
  margin-bottom: 15px;
  object-fit: contain;
  width: 180px;
  margin: 3vw auto 2vw;
`

const Button = styled.button`
  text-transform: uppercase;
  margin-top: 1vw;
  padding: 2px 35px 5px;
  font-size: 1.2vw;
  background-color: #212127;
  color: #fff;

  box-shadow: ${(props) =>
    `-3px 0px 0px 0px #2C323B, 0px -3px 0px 0px #2C323B, 0px 3px 0px 0px #2C323B, 
      3px 0px 0px 0px #2C323B, inset -3px -3px #37373D`};

  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  @media (max-width: 1010px) {
    font-size: 7vw;
  }
  @media (max-width: 1010px) {
    width: 26vw;
  }
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: ${(
      props,
    ) => `-3px 0px 0px 0px #2C323B, 0px -3px 0px 0px #2C323B,
        0px 3px 0px 0px #2C323B, 3px 0px 0px 0px #2C323B, inset 3px 3px #37373D`};
  }
`

const HeaderDetails = styled.div`
  display: table;
  clear: both;
  width: 100%;
`

const HeaderDetailsLeft = styled.div`
  float: left;
  display: flex;
`

const HeaderDetailsRight = styled.div`
  float: right;
  display: flex;
`

const BeastName = styled.div`
  font-size: 2em;
`

const FirstOwnerTag = styled.div`
  margin-left: 10px;
`

const GenderIcon = styled.div``

const DexNumber = styled.div``

const Description = styled.div``

const Serial = styled.div``

type Props = {
  packImage: any
  pack: any
}

const PackRevealCard: FC<Props> = ({ packImage, pack }) => {
  const [packOpened, setPackOpened] = useState(false)

  return (
    <Container
      style={{
        borderRadius: "12px",
        background: "#212127",
        color: "#EAEAEA",
      }}
      className="group block w-full aspect-w-7 aspect-h-9 overflow-hidden"
    >
      {packOpened == false ? (
        <TransitionDiv>
          <Img src={packImage.src} />
          <div
            style={{
              color: "#686868",
            }}
          >
            ID: {pack.uuid}
          </div>

          <Button
            onClick={() => {
              pack.opened = true
              setPackOpened(pack.opened)
              console.log(pack)
            }}
          >
            Reveal
          </Button>
        </TransitionDiv>
      ) : (
        <TransitionDiv>
          <Img
            src={
              "https://github.com/basicbeasts/basic-beasts-frontend/blob/main/public/Thumbnail_2.png?raw=true"
            }
          />
          <HeaderDetails>
            <HeaderDetailsLeft>
              <BeastName>Moon</BeastName>
              <FirstOwnerTag>first owner</FirstOwnerTag>
            </HeaderDetailsLeft>
            <HeaderDetailsRight>
              <GenderIcon>Gender</GenderIcon>
              <DexNumber>DexNumber</DexNumber>
            </HeaderDetailsRight>
          </HeaderDetails>
          <Description>Description</Description>
          <Serial>Serial {pack.name}</Serial>
        </TransitionDiv>
      )}
    </Container>
  )
}

export default PackRevealCard
