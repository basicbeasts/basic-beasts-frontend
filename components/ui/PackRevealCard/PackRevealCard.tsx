import React, { FC, useState } from "react"
import styled from "styled-components"
import StarterImg from "public/packs/pack_pf/starter.png"
import CursedImg from "public/packs/pack_pf/cursed.png"
import ShinyImg from "public/packs/pack_pf/shiny.png"

const Container = styled.div`
  text-align: center;
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
        color: "#686868",
      }}
      className="group block w-full aspect-w-7 aspect-h-9 overflow-hidden"
    >
      {packOpened == false ? (
        <div>
          <Img src={packImage.src} />
          <div>ID: {pack.uuid}</div>

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
        <div>
          <Img src={packImage.src} />
          <div>Moon</div>
          <div>Description</div>
          <div>Serial {pack.name}</div>
        </div>
      )}
    </Container>
  )
}

export default PackRevealCard
