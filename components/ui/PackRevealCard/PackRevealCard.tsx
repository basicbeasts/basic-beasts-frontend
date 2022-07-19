import React, { FC, useState } from "react"
import styled from "styled-components"
import StarterImg from "public/packs/pack_pf/starter.png"
import CursedImg from "public/packs/pack_pf/cursed.png"
import ShinyImg from "public/packs/pack_pf/shiny.png"

const Container = styled.div`
  text-align: center;
`

const TransitionDiv = styled.div<{ packOpened: boolean }>`
  padding: 0 30px;
  transition: 0.5s ease;
  // TODO: Make transition Needed to make transition animation. Look at RevealOverlay.tsx as example.
  opacity: ${({ packOpened }) => (packOpened ? "100%" : "0")};
  top: ${({ packOpened }) => (packOpened ? "0" : "-50%")};
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
  margin-top: 15px;
`

const BeastName = styled.div`
  font-size: 2em;
`

const FirstOwnerTag = styled.div`
  margin-left: 10px;
  margin-top: 15px;
`

const Tag = styled.div`
  color: #242526;
  font-size: 0.8em;
  padding: 2px 8px;
  border-radius: 5px;
  background: linear-gradient(180deg, #ffe8a3 0%, #ffd966 100%);
`

const GenderIcon = styled.div``

const DexNumber = styled.div`
  margin-left: 10px;
  font-size: 1.2em;
`

const Description = styled.div`
  margin-top: 5px;
  color: #adadaf;
  text-align: left;
`

const Serial = styled.div`
  margin-top: 5px;
  font-size: 1.5em;
  text-align: left;
`

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
        <div>
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
        </div>
      ) : (
        ""
      )}
      <TransitionDiv packOpened={packOpened}>
        <Img
          src={
            "https://github.com/basicbeasts/basic-beasts-frontend/blob/main/public/Thumbnail_2.png?raw=true"
          }
        />
        <HeaderDetails>
          <HeaderDetailsLeft>
            <BeastName>{pack.beastName}</BeastName>
            <FirstOwnerTag>
              <Tag>First owner</Tag>
            </FirstOwnerTag>
          </HeaderDetailsLeft>
          <HeaderDetailsRight>
            <GenderIcon>{pack.beastGender}</GenderIcon>
            <DexNumber>
              {"#" + ("00" + pack.beastDexNumber).slice(-3)}
            </DexNumber>
          </HeaderDetailsRight>
        </HeaderDetails>
        <Description>{pack.beastDescription}</Description>
        {pack.beastMaxAdminMintAllowed <= 1000 ? (
          <Serial>
            Serial Serial #{pack.beastSerialNumber} |{" "}
            {pack.beastMaxAdminMintAllowed}
          </Serial>
        ) : (
          <Serial>Serial Serial #{pack.beastSerialNumber} | ?</Serial>
        )}
      </TransitionDiv>
    </Container>
  )
}

export default PackRevealCard
