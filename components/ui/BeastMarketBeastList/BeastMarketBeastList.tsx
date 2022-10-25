import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC, useState, Fragment, useEffect } from "react"
import star from "public/basic_starLevel.png"
import styled from "styled-components"
import BeastMarketThumbnail from "../BeastMarketThumbnail"
import { faHeart as heartFull } from "@fortawesome/free-solid-svg-icons"
import { faHeart as heartEmpty } from "@fortawesome/free-regular-svg-icons"

const MarketUl = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;

  // @media (min-width: 420px) {
  //   grid-template-columns: repeat(2, 1fr);
  // }
  // @media (min-width: 640px) {
  //   grid-template-columns: repeat(3, 1fr);
  // }
  // @media (min-width: 890px) {
  //   grid-template-columns: repeat(4, 1fr);
  // }
  // @media (min-width: 1080px) {
  //   grid-template-columns: repeat(5, 1fr);
  // }
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
const ThumbnailDetails = styled.div<Omit<Color, "background">>`
  color: #000000;
  background: ${(props) => props.bgColor || "#FFD966"};
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: space-between;
  clear: both;
  width: 100%;

  padding: 10px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`
const DetailButton = styled.button<any>`
  position: relative;
  border: solid #808080 0.5px;
  border-radius: 10px;
  font-size: 16px;
  background: ${(props) => props.buttonColor};

  padding: 0 15px;
  &:hover {
    box-shadow: 2px 2px 5px 1px black;
  }
`
const StarLevel = styled.div`
  vertical-align: middle;
  position: absolute;
  top: 0;
`

const StarImg = styled.img`
  margin-top: 10px;
  width: 1.2em;
  user-drag: none;
  -webkit-user-drag: none;
  float: left;
`
const Dialog = styled.dialog<any>`
  // position: absolute;
  // left: ${(props) => props.left}%;
  // right: ${(props) => props.right}%;
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
const P = styled.p`
  line-height: 0.5;
  text-transform: uppercase;
`
const TraitCount = styled.div`
  color: #f3cb23 !important;
  line-height: 0.75;
  font-size: 1.2rem;
`
type Color = {
  bgColor: any
}
type Props = {
  displayBeasts: any
  setOpen: any
  setDisplayNickname: any
}
const BeastMarketBeastList: FC<Props> = ({
  displayBeasts,
  setOpen,
  setDisplayNickname,
}) => {
  const [selectedBeast, setSelectedBeast] = useState<any>(null)

  const [beastArray, setBeastArray] = useState<any>([])
  const DialogInfo: FC<{
    id: any
    dialogOpen: any
    beast: any
    // left: any
    // right: any
  }> = ({
    id,
    dialogOpen,
    beast,
    //  left, right
  }) => {
    // let centerX = document.documentElement.clientWidth / 2
    // let centerY = document.documentElement.clientHeight / 2

    // console.log("X: " + centerX, "Y: " + centerY)

    // const elem = document.getElementById(id)
    // const box = elem?.getBoundingClientRect()
    // console.log("Box: " + box?.x)
    // var right = 50
    // var left = 50
    // if (box != null && box?.x > centerX) {
    //   right = 0
    // } else if (box != null && box?.x < centerX) {
    //   left = 0
    // } else {
    //   left = 50
    //   right = 50
    // }

    // console.log("left: " + left, "right: " + right)

    return dialogOpen == true ? (
      <Dialog
        id={id}
        //  left={left} right={right}
      >
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
    const [heart, setHeart] = useState<any>(heartEmpty)
    const buttonColor = () => {
      var color = "none"
      {
        dialogOpen == true ? (color = "#FEDD64") : (color = "none")
      }
      return color
    }
    var btnColor = buttonColor()
    const heartChange = () => {
      {
        heart == heartEmpty ? setHeart(heartFull) : setHeart(heartEmpty)
      }
    }

    // let centerX = document.documentElement.clientWidth / 2
    // let centerY = document.documentElement.clientHeight / 2
    // const elem = document.getElementById("element")
    // const box = elem?.getBoundingClientRect()
    // console.log("Box: " + box?.x)
    // var right = 50
    // var left = 50
    // if (box != null && box?.x > centerX) {
    //   right = 0
    // } else if (box != null && box?.x < centerX) {
    //   left = 0
    // } else {
    //   left = 50
    //   right = 50
    // }

    return (
      <div>
        <ThumbnailDetails
          style={{ borderRadius: "0 0 20px 20px" }}
          bgColor={
            beast.elements[0] == "Electric"
              ? "#fff"
              : beast.elements[0] == "Water"
              ? "#fff"
              : beast.elements[0] == "Grass"
              ? "#fff"
              : beast.elements[0] == "Fire"
              ? "#fff"
              : "#fff"
          }
        >
          <ThumbnailLabel>
            <div style={{ fontSize: "1.3em" }}>#{beast.serialNumber}</div>
            {beast.nickname.length < 13 ? (
              <div style={{ fontSize: "1.3em", color: "black" }}>
                {beast.nickname}
              </div>
            ) : (
              <div style={{ fontSize: "1em" }}>{beast.nickname}</div>
            )}
          </ThumbnailLabel>
          <DetailButton
            style={{ background: btnColor }}
            onClick={() => setDialogOpen(!dialogOpen)}
          >
            Details
            <DialogInfo
              id="element"
              dialogOpen={dialogOpen}
              beast={beast}
              // left={left} right={right}
            />
          </DetailButton>
          <div className="flex gap-1 items-center">
            <FontAwesomeIcon
              onClick={() => heartChange()}
              style={{ color: "grey" }}
              icon={heart}
            />{" "}
            76
          </div>
          <div className="flex gap-1 justify-end">
            {beast.price != null
              ? parseFloat(beast.price).toFixed(2)
              : "not for sale"}
          </div>
          <StarLevel>
            {Array(beast.starLevel)
              .fill(0)
              .map((_, i) => (
                <StarImg key={i} src={star.src} />
              ))}
          </StarLevel>
        </ThumbnailDetails>
      </div>
    )
  }
  return (
    <MarketUl
      role="list"
      // className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5"
    >
      {displayBeasts.map((beast: any) => (
        <li
          key={beast.id}
          className="relative"
          onClick={() => {
            setOpen(true)
            setSelectedBeast(beast)
            setDisplayNickname(null)
          }}
        >
          <div
            style={{
              borderRadius: "20px 20px 0 0",
            }}
            className="group block w-full aspect-w-9 aspect-h-7 bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"
          >
            <BeastMarketThumbnail
              onClick={() => setBeastArray([...beastArray, beast])}
              id={beast.id}
              className="object-cover group-hover:opacity-90"
              beastTemplateID={beast.beastTemplateID}
            />
          </div>
          {/* Make thumbnail details into a component and useState inside that component and add DialogInfo to it */}
          <ThumbnailDetailsFC beast={beast} />
        </li>
      ))}
      {/* To prevent big gap due to fixed height, which is needed for the scroll */}
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </MarketUl>
  )
}

export default BeastMarketBeastList
