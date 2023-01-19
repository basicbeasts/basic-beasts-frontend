import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC, useState, Fragment, useEffect } from "react"
import star from "public/basic_starLevel.png"
import styled from "styled-components"
import BeastMarketThumbnail from "../BeastMarketThumbnail"
import { faHeart as heartFull } from "@fortawesome/free-solid-svg-icons"
import { faHeart as heartEmpty } from "@fortawesome/free-regular-svg-icons"
import { useUser } from "@components/user/UserProvider"
import { useAuth } from "@components/auth/AuthProvider"

const MarketUl = styled.ul`
  padding-top: 5px;
  display: grid;
  width: 100%;
  height: 800px;

  overflow: hidden;
  overflow-y: scroll;

  // grid-template-columns: repeat(auto-fill, minmax(200px, 2fr));
  gap: 1.25rem;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

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

const ThumbnailDetails = styled.div<Omit<Color, "background">>`
  color: #000000;
  background: ${(props) => props.bgColor || "#FFD966"};
  display: flex;
  /* align-items: stretch; */
  /* justify-content: space-between; */
  clear: both;
  width: 100%;

  padding: 10px 15px;
  // cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
  //     14 0,
  //   pointer !important;
`
const DetailButton = styled.button<any>`
  position: relative;
  border: solid #c8c8c8 0.5px;
  border-radius: 4px;
  font-size: 16px;
  background: ${(props) => props.buttonColor};

  padding: 0 15px;
  &:hover {
    box-shadow: 2px 2px 5px 1px black;
  }
`

const BeastLi = styled.li<any>`
  outline: ${(props) => (props.selected ? "solid 2px #d3c20d" : "none")};
  border-radius: 20px;
`

const QuickBuyButton = styled.button`
  display: none;
  position: absolute;
  top: 45%;
  left: 50%;
  border-radius: 50px;
  line-height: 0;
  // font-size: 16px;
  transform: translateX(-50%);
  background: #f3cb23;
  padding: 1rem;
  ${BeastLi}:hover & {
    display: block;
  }
  /* &:hover {
    box-shadow: 2px 2px 5px 1px black;
  } not needed dense*/
`

const StarLevel = styled.div`
  vertical-align: middle;
  position: absolute;
  top: 0;
`
const PlusDiv = styled.div`
  display: none;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  font-size: 2rem;
  line-height: 0;
  ${BeastLi}:hover & {
    display: block;
  }
`

const CheckMarkWrapper = styled.div`
  text-align: center;
  position: absolute;
  top: 0;
  right: -3px;
  margin: 1rem;
  font-size: 2rem;
  line-height: 0;
`
const CheckMark = styled.span`
  background: #d8c600;
  color: white;
  font-size: 1rem;
  border-radius: 50px;
  padding: 4px 5px;
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

const ThumbnailLabel = styled.div`
  margin: 8px 0;
  color: #808080;
  line-height: 1.2em;
  @media (max-width: 360px) {
    font-size: 0.7em;
  }

  display: table;
  clear: both;
  font-size: 1.3em;
`

const NameWrapper = styled.div`
  float: left;
`

const SerialWrapper = styled.div`
  float: right;
`

const ThumbnailFooter = styled.div`
  display: table;
  clear: both;
`

const Favorite = styled.div`
  float: left;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`

const DetailsWrapper = styled.div`
  float: right;
`

const ThumbnailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

type Color = {
  bgColor: any
}
type Props = {
  displayBeasts: any
  openBulkBid: any
  selectedBeasts: any
  setSelectedBeasts: any
  setSelectedBeast: any
  setListBeastForSaleOpen: any
  favoriteBeasts: any
  setFavoriteBeasts: any
  setPlaceABidOpen: any
  // setDisplayNickname: any
}
const BeastMarketBeastList: FC<Props> = ({
  displayBeasts,
  openBulkBid,
  selectedBeasts,
  setSelectedBeasts,
  setSelectedBeast,
  setListBeastForSaleOpen,
  favoriteBeasts,
  setFavoriteBeasts,
  setPlaceABidOpen,
  // setDisplayNickname,
}) => {
  const selectBeast = (beast: any) => {
    if (!selectedBeasts.includes(beast)) {
      setSelectedBeasts((selectedBeasts: any) => [...selectedBeasts, beast])
    }
  }

  const deselectBeast = (beast: any) => {
    if (selectedBeasts.includes(beast)) {
      //remove
      setSelectedBeasts(selectedBeasts.filter((id: any) => beast != id))
    }
  }

  // const [favoriteBeasts, setFavoriteBeasts] = useState<any>([])
  // const [selectedBeast, setSelectedBeast] = useState<any>()

  useEffect(() => {
    const favBeasts = window.localStorage.getItem("FAVORITE_BEASTS")
    if (favBeasts != null) {
      setFavoriteBeasts(JSON.parse(favBeasts))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(
      "FAVORITE_BEASTS",
      JSON.stringify(favoriteBeasts),
    )
  }, [favoriteBeasts])

  const favoriteBeast = (beast: any) => {
    if (!favoriteBeasts.includes(beast.id)) {
      setFavoriteBeasts((favoriteBeasts: any) => [...favoriteBeasts, beast.id])
    }
  }

  const unfavoriteBeast = (beast: any) => {
    if (favoriteBeasts.includes(beast.id)) {
      setFavoriteBeasts(
        favoriteBeasts.filter((beast: any) => beast.id != beast.id),
      )
    }
  }

  const { userBeasts, beastsForSale } = useUser()

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
        heart == heartEmpty
          ? (setHeart(heartFull), favoriteBeast(beast))
          : (setHeart(heartEmpty), unfavoriteBeast(beast))
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
    // useEffect(() => {
    //   console.log(userBeasts.map((beast: any) => beast.id))
    // }, [userBeasts])

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
          <ThumbnailWrapper>
            <ThumbnailLabel>
              <NameWrapper style={{ color: "black" }}>
                {userBeasts
                  ?.map((beast: any) => beast.id)
                  .includes(beast.id) ? (
                  <div>
                    Owned{" "}
                    {beastsForSale
                      ?.map((beast: any) => beast.id)
                      .includes(beast.id) && (
                      <>
                        {parseFloat(
                          beastsForSale?.filter(
                            (beastForSale: any) => beastForSale.id == beast.id,
                          )[0].price,
                        ).toFixed(0)}{" "}
                        FUSD
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    {beastsForSale
                      ?.map((beast: any) => beast.id)
                      .includes(beast.id) && (
                      <>
                        {parseFloat(
                          beastsForSale?.filter(
                            (beastForSale: any) => beastForSale.id == beast.id,
                          )[0].price,
                        ).toFixed(0)}{" "}
                        FUSD
                      </>
                    )}
                  </>
                )}
              </NameWrapper>
              {/* <span>
                {userBeasts.map((beast: any) => beast.id).includes(beast.id)
                  ? "owned"
                  : "not owned"}
              </span> */}
              {/* <span>For testing: {beast.id}</span> */}
              <SerialWrapper>
                {beast.nickname.length < 10 ? (
                  <>
                    <span>
                      {beast.nickname}#{beast.serialNumber}
                    </span>
                  </>
                ) : (
                  <span style={{ fontSize: "0.8em" }}>
                    {beast.nickname}#{beast.serialNumber}
                  </span>
                )}
              </SerialWrapper>
            </ThumbnailLabel>
            <ThumbnailFooter>
              {favoriteBeasts?.includes(beast?.id) ? (
                <Favorite>
                  <FontAwesomeIcon
                    onClick={() => unfavoriteBeast(beast)}
                    style={{ color: "grey" }}
                    icon={heartFull}
                  />
                </Favorite>
              ) : (
                <Favorite>
                  <FontAwesomeIcon
                    onClick={() => favoriteBeast(beast)}
                    style={{ color: "grey" }}
                    icon={heart}
                  />
                </Favorite>
              )}
              {/* <DetailsWrapper>
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
              </DetailsWrapper> */}
              <DetailsWrapper>
                <DetailButton style={{ background: btnColor }}>
                  <a href={"/beast-details/" + beast?.id}>Details</a>
                </DetailButton>
              </DetailsWrapper>
            </ThumbnailFooter>
          </ThumbnailWrapper>

          <StarLevel>
            {Array(beast.starLevel)
              .fill(0)
              .map((_, i) => (
                <StarImg key={i} src={star.src} />
              ))}
          </StarLevel>
          {/* TODO wait with adding bulk buy and stuff */}
          {/* {selectedBeasts.includes(beast) ? (
            <CheckMarkWrapper onClick={() => deselectBeast(beast)}>
              <CheckMark>✓</CheckMark>
            </CheckMarkWrapper>
          ) : (
            <PlusDiv
              onClick={() => {
                selectBeast(beast)
                openBulkBid()
              }}
            >
              +
            </PlusDiv>
          )} */}
        </ThumbnailDetails>
      </div>
    )
  }

  const { purchaseBeast, delistBeast } = useUser()

  const { loggedIn, logIn } = useAuth()

  return (
    <MarketUl
      role="list"
      className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5"
    >
      {displayBeasts.map((beast: any) => (
        <BeastLi
          selected={selectedBeasts.includes(beast)}
          key={beast.id}
          className="relative"
        >
          <div
            style={{
              borderRadius: "20px 20px 0 0",
            }}
            className="group block w-full aspect-w-9 aspect-h-7 bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"
          >
            <BeastMarketThumbnail
              // onClick={() => setBeastArray([...beastArray, beast])}
              id={beast.id}
              className="object-cover"
              beastTemplateID={beast.beastTemplateID}
            />
          </div>
          {userBeasts?.map((beast: any) => beast.id).includes(beast.id) ? (
            <>
              {beastsForSale
                ?.map((beast: any) => beast.id)
                .includes(beast.id) ? (
                <QuickBuyButton
                  onClick={() => {
                    setSelectedBeast(beast)
                    delistBeast(beast.id)
                  }}
                >
                  Delist
                </QuickBuyButton>
              ) : (
                <QuickBuyButton
                  onClick={() => {
                    setSelectedBeast(beast)
                    setListBeastForSaleOpen(true)
                  }}
                >
                  List for sale
                </QuickBuyButton>
              )}
            </>
          ) : (
            <>
              {beastsForSale
                ?.map((beast: any) => beast.id)
                .includes(beast.id) ? (
                <QuickBuyButton
                  onClick={() => {
                    setSelectedBeast(beast)
                    // setQuickBidOpen(true)
                    purchaseBeast(
                      beastsForSale?.filter(
                        (beastForSale: any) => beastForSale.id == beast.id,
                      )[0].seller,
                      beast.id,
                      beastsForSale?.filter(
                        (beastForSale: any) => beastForSale.id == beast.id,
                      )[0].price,
                    )
                  }}
                >
                  Quick Buy
                </QuickBuyButton>
              ) : (
                <>
                  {!loggedIn ? (
                    <QuickBuyButton onClick={() => logIn()}>
                      Make offer
                    </QuickBuyButton>
                  ) : (
                    <QuickBuyButton
                      onClick={() => {
                        setSelectedBeast(beast)
                        setPlaceABidOpen(true)
                      }}
                    >
                      Make offer
                    </QuickBuyButton>
                  )}
                </>
              )}
            </>
          )}

          {/* Make thumbnail details into a component and useState inside that component and add DialogInfo to it */}
          <ThumbnailDetailsFC beast={beast} />
        </BeastLi>
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
