import styled from "styled-components"
import BeastMarketThumbnail from "../BeastMarketThumbnail"
import BeastMarketSkinOverviewModal from "../BeastMarketSkinOverviewModal"
import beastTemplates from "data/beastTemplates"
import { FC, useState, Fragment, useEffect } from "react"
import { useUser } from "@components/user/UserProvider"

const Main = styled.main`
  display: flex;
  justify-content: space-between;
  padding: 0 0 0 20px;
  margin-bottom: 50px;
  gap: 5rem;
  width: 100%;
  @media (max-width: 720px) {
    flex-direction: column;
    padding: 0;
  }
`

const Header = styled.h1`
  font-size: 4rem;
  color: #fff;
  // max-width: 14ch;
  text-transform: uppercase;
  line-height: 1;
  @media (max-width: 380px) {
    font-size: 3.25rem;
  }
`
const P = styled.p`
  color: white;
  max-width: 56ch;
  font-size: 1.2em;
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
  @media (max-width: 1010px) {
    grid-column: 1 / 3;
    width: 60%;
    margin: 10px auto 0;
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
  // position: absolute;
  // left: 50%;
  // right: 50%;
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
  @media (max-width: 1010px) {
    grid-column: 1 / 3;
    width: 60%;
    margin: 0 auto;
  }
`
const ItemInfo = styled.div`
  display: flex;
  background: #ffd966;
  margin-top: 50px;
  align-items: center;
  background-image: linear-gradient(to top, transparent, #ffdf7e);
  width: 75%;
  height: 80px;
  justify-content: space-evenly;
  border-radius: 10px;
  gap: 1px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
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
  background: CornflowerBlue;
  background-image: linear-gradient(
    -45deg,
    transparent,
    rgba(255, 255, 255, 0.5) 25%,
    transparent 90%
  );
  width: max-content;
  max-width: 45%;
  border-radius: 0 0 0 50px;
  padding: 6rem 4rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: -100px;
  @media (max-width: 720px) {
    width: 100%;
    max-width: 100%;
    border-radius: 0;
    margin-top: 0;
  }
  @media (max-width: 310px) {
    padding: 6rem 2rem;
  }
`
const Discover = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: max-content;
  margin: 0 auto;
  justify-content: center;
  @media (max-width: 720px) {
    width: 100%;
    align-items: center;
    text-align: center;
    padding: 0 10px;
  }
`

const Img = styled.img`
  user-drag: none;
  -webkit-user-drag: none;
  border-radius: 20px;
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
          style={{ fontSize: "1.5em", color: "grey" }}
          className="flex justify-center"
        >
          50 FUSD
        </div>
        <BidButton>Make offer</BidButton>
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
  const [skinOverviewOpen, setSkinOverviewOpen] = useState(false)

  const { hunterData, beasts, highestSale } = useUser()
  return (
    <>
      <Main>
        {" "}
        <Discover>
          <Header>Discover Beasts</Header>
          <P>
            Basic Beasts is a collection of unique digital collectibles
            representing interactive beasts that can evolve, breed, and be
            loved.
          </P>
          {/* <Button>Adopt a Beast →</Button> */}
          <ItemInfo onClick={() => setSkinOverviewOpen(true)}>
            <Item>
              <H2>{hunterData?.length}</H2> Hunters
            </Item>
            <Item>
              <H2>{beasts?.length}</H2> Beasts
            </Item>
            <Item>
              <H2>${parseFloat(highestSale).toFixed(0)}</H2> Highest Sale
            </Item>
          </ItemInfo>
          <BeastMarketSkinOverviewModal
            open={skinOverviewOpen}
            setOpen={setSkinOverviewOpen}
            beasts={beasts}
          />
        </Discover>{" "}
        <Showcase>
          {/* <BeastMarketThumbnail
            id={beast.id}
            className="object-cover group-hover:opacity-90 rounded-t-3xl overflow-hidden "
            beastTemplateID={beast.beastTemplateID}
          />
          <ThumbnailDetailsFC beast={beast} /> */}
          <Img
            // src={
            //   beastTemplates[beastTemplateID as keyof typeof beastTemplates]
            //     ?.marketThumbnail || thumbnail.src
            // }
            src={
              "https://basicbeasts.mypinata.cloud/ipfs/" +
              beastTemplates[691 as keyof typeof beastTemplates]?.image
            }
          />
        </Showcase>{" "}
      </Main>
    </>
  )
}

export default BeastMarketHero
