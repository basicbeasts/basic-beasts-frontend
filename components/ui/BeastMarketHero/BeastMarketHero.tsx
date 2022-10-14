import styled from "styled-components"
import BeastMarketThumbnail from "../BeastMarketThumbnail"

import { FC, useState, Fragment, useEffect } from "react"

const Main = styled.main`
  display: flex;
  justify-content: end;
  padding: 0 0 0 20px;
  margin-bottom: 50px;
  gap: 5rem;
`

const Header = styled.h1`
  font-size: 4rem;
  color: #fff;
  max-width: 14ch;
  text-transform: uppercase;
  line-height: 1;
`
const P = styled.p`
  color: white;
  width: 56ch;
`
const H2 = styled.h2`
  font-size: 1.5rem;
`
const ThumbnailDetails = styled.div`
  color: #000000;
  background: white;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: space-between;
  clear: both;
  width: 100%;
  border-radius: 0 0 20px 20px;

  padding: 20px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`
const ThumbnailLabel = styled.div`
  margin: 8px 0;
  float: right;
  color: #808080;
  line-height: 1.2em;
  @media (max-width: 360px) {
    font-size: 0.7em;
  }
`
const DetailButton = styled.button<any>`
  position: relative;
  border: solid #808080 0.5px;
  color: black;
  border-radius: 6px;
  font-size: 1.125rem;
  background: ${(props) => props.buttonColor};
  width: 125px;
  padding: 5px;
  &:hover {
    box-shadow: 2px 2px 5px 1px black;
  }
`
const Attributes = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 75px;
  @media (max-width: 420px) {
    margin-bottom: 0;
  }
`
const AttributeBlock = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
  align-items: start;
  gap: 5px;
  font-size: 1.5rem;
  background: #212127;
  border-radius: 10px;
  color: grey;
  &:last-child {
    grid-column: 1 / 3;
    align-items: center;
    color: #f3cb23;
  }
  div {
    color: white;
  }
`
const Dialog = styled.dialog`
  position: absolute;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: start;
  color: #fff;
  background: #111823;
  /* border: solid #808080 0.5px; */
  border-radius: 10px;
  min-width: max-content;
  z-index: 99999;
  @media (max-width: 420px) {
    position: fixed;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    border-radius: 0;
  }
`
const TraitCount = styled.div`
  color: #f3cb23 !important;
  line-height: 0.75;
  font-size: 1.2rem;
`

const Button = styled.button`
  font-size: 20px;
  color: black;
  background-color: #ffd966;
  background-image: linear-gradient(to top, transparent, #ffdf7e);
  border: solid #f2bf26 2px;
  border-radius: 10px;
  padding: 2px;
  width: 150px;
`
const BidButton = styled.button`
  font-size: 1.125rem;
  color: black;
  background-color: #ffd966;
  background-image: linear-gradient(to top, transparent, #ffdf7e);
  border: 2px solid #f2bf26;
  border-radius: 6px;
  padding: 5px 2px;
  width: 125px;
`
const ItemInfo = styled.div`
  display: flex;
  background: #ffd966;
  margin-top: 50px;
  align-items: center;
  background-image: linear-gradient(to top, transparent, #ffdf7e);
  width: 60%;
  height: 80px;
  justify-content: space-evenly;
  border-radius: 10px;
  gap: 1px;
`
const Item = styled.div`
  display: flex;
  position: relative;
  width: 33.33%;
  color: black;
  font-size: 0.8rem;
  line-height: 1;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  &:nth-child(2)::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 1px;
    height: 60%;
    background: rgba(0, 0, 0, 0.1);
  }
  &:nth-child(2)::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 1px;
    height: 60%;
    background: rgba(0, 0, 0, 0.1);
  }
`
const Showcase = styled.div`
  background: gold;
  background-image: linear-gradient(
    -45deg,
    transparent,
    rgba(255, 255, 255, 0.5) 25%,
    transparent 90%
  );
  width: 600px;
  border-radius: 0 0 0 50px;
  padding: 100px;
  display: flex;
  flex-direction: column;
`
type Props = {
  beast: any
}
const DialogInfo: FC<{ dialogOpen: any; beast: any }> = ({
  dialogOpen,
  beast,
}) => {
  return dialogOpen == true ? (
    <Dialog open>
      <div className="flex gap-2 leading-none">
        {beast.nickname.length < 13 ? (
          <div style={{ fontSize: "1.3em" }}>{beast.nickname}</div>
        ) : (
          <div style={{ fontSize: "1em" }}>{beast.nickname}</div>
        )}
        <div style={{ fontSize: "1.3em" }}>#{beast.serialNumber}</div>
      </div>
      <div style={{ marginLeft: "5px" }}>
        Dex {"#" + ("00" + beast.dexNumber).slice(-3)}
      </div>
      <p style={{ color: "grey" }}>Attributes</p>
      <Attributes>
        <AttributeBlock>
          <P>Skin</P>
          <div>{beast.skin}</div>
          <TraitCount>% have this trait</TraitCount>
        </AttributeBlock>
        <AttributeBlock>
          <P>Element</P>
          <div>{beast.elements}</div>
          <TraitCount>% have this trait</TraitCount>
        </AttributeBlock>
        <AttributeBlock>
          <P>Star Level</P>
          <div>{beast.starLevel}</div>
          <TraitCount>% have this trait</TraitCount>
        </AttributeBlock>
        <AttributeBlock>
          <P>Gender</P>
          <div>{beast.sex}</div>
          <TraitCount>
            % of {beast.name} <br /> have this trait
          </TraitCount>
        </AttributeBlock>
        <AttributeBlock>
          <P>Breeding Count</P>
          <div>{beast.breedingCount}</div>
          <TraitCount>% have this trait</TraitCount>
        </AttributeBlock>
        <AttributeBlock>
          <P>Serial</P>
          <div>{beast.serialNumber}</div>
          <TraitCount>% have this trait</TraitCount>
        </AttributeBlock>
        <AttributeBlock>
          <P>Number of Existing {beast.name}s</P>
          <div>{beast.numberOfMintedBeastTemplates}</div>
        </AttributeBlock>
      </Attributes>
      <p style={{ color: "grey" }}>Details</p>
      <div className="flex w-full justify-between">
        <p>Mint address</p>
        <p style={{ color: "grey" }}>0x23948</p>
      </div>
    </Dialog>
  ) : (
    <></>
  )
}
const ThumbnailDetailsFC: FC<{
  beast: any
}> = ({ beast }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const buttonColor = () => {
    var color = "none"
    {
      dialogOpen == true ? (color = "#FEDD64") : (color = "none")
    }
    return color
  }
  var btnColor = buttonColor()

  return (
    <div>
      <ThumbnailDetails style={{ borderRadius: "0 0 20px 20px" }}>
        <ThumbnailLabel>
          <div style={{ fontSize: "1.75em" }}>#{beast.serialNumber}</div>
          {beast.nickname.length < 13 ? (
            <div style={{ fontSize: "1.3em", color: "black" }}>
              {beast.nickname}
            </div>
          ) : (
            <div style={{ fontSize: "1em" }}>{beast.nickname}</div>
          )}
        </ThumbnailLabel>
        <div
          style={{ fontSize: "2rem", color: "grey" }}
          className="flex justify-center"
        >
          50 FUSD
        </div>
        <BidButton>Place A Bid</BidButton>
        <DetailButton
          style={{ background: btnColor }}
          onClick={() => setDialogOpen(!dialogOpen)}
        >
          Details
          <DialogInfo dialogOpen={dialogOpen} beast={beast} />
        </DetailButton>
      </ThumbnailDetails>
    </div>
  )
}

const BeastMarketHero: FC<Props> = ({ beast }) => {
  return (
    <>
      <Main>
        {" "}
        <div className="flex flex-col gap-5 w-max justify-center ">
          <Header>Discover rare collections of art & nfts</Header>
          <P>
            Discover Rare Collections Of Art & Nfts. Discover Rare Collections
            Of Art & Nfts. Discover Rare Collections Of Art & Nfts.
          </P>
          <Button>Place A Bid →</Button>
          <ItemInfo>
            <Item>
              <H2>78K</H2> Owners
            </Item>
            <Item>
              <H2>78K</H2> Total Vol.
            </Item>
            <Item>
              <H2>78K</H2> Items
            </Item>
          </ItemInfo>
        </div>{" "}
        <Showcase>
          <BeastMarketThumbnail
            id={beast.id}
            className="object-cover group-hover:opacity-90 rounded-t-3xl overflow-hidden h-full"
            beastTemplateID={beast.beastTemplateID}
          />
          <ThumbnailDetailsFC beast={beast} />
        </Showcase>{" "}
      </Main>
    </>
  )
}

export default BeastMarketHero
