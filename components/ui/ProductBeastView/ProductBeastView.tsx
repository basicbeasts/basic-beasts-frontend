import { FC, useEffect, useState } from "react"
import picture from "public/beasts/001_normal.png"
import BeastMarketThumbnail from "../BeastMarketThumbnail"
import styled from "styled-components"
import star from "public/basic_starLevel.png"
import pic from "public/profile_pictures/bb_face_028.png"
import dexNumIcon from "public/Dex_number_icon.png"
import {
  faEllipsisH,
  faShareSquare,
  faHeart as heartFull,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons"
import { faHeart as heartEmpty } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RefreshIcon } from "@heroicons/react/outline"
import BeastMarketBeastList from "../BeastMarketBeastList"
import beastTemplates from "data/beastTemplates"
import { useUser } from "@components/user/UserProvider"
import { useAuth } from "@components/auth/AuthProvider"
import ListBeastForSaleModal from "../ListBeastForSaleModal"
import PlaceABidModal from "../PlaceABidModal"
import profilePictures from "data/profilePictures"
import AcceptOfferModal from "../AcceptOfferModal"
import { InfoMobile } from "./InfoMobile"

const StarLevel = styled.div`
  vertical-align: middle;
  position: absolute;
  top: 5px;
  left: 15px;
`

const StarImg = styled.img`
  margin-top: 10px;
  width: 1.5em;
  user-drag: none;
  -webkit-user-drag: none;
  float: left;
`
const Panel = styled.div`
  background: none;
  /* border: 1px solid gray;
  border-radius: 10px; */
  color: #fff;
  padding: 10px;
  margin: 1rem auto;

  text-align: left;
  font-size: 16px;

  outline: none;
  transition: 0.4s;
  @media (max-width: 420px) {
    border: 1px solid #5c5e6c;
    border-radius: 1.2rem;
  }
`
const AccordionTitle = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 10px;

  font-size: 2rem;
  margin-bottom: 20px;
  /* border-bottom: 1px solid rgba(220, 220, 220, 0.25); */
  line-height: 1;
  @media (max-width: 420px) {
    margin-bottom: 0.5rem;
    justify-content: space-between;
    margin-right: 10px;
  }
`
const AccordionContent = styled.div`
  padding: 1.5rem;
  font-size: 1.2em;
  border: 1px solid #5c5e6c;
  border-radius: 1rem;
  width: 100%;
  @media (max-width: 420px) {
    border: 0;
    padding: 0.5rem;
  }
`
const AccordionDiv = styled.div`
  width: 100%;
`
export const BuyButton = styled.button`
  width: 100%;
  background: #ffd966;
  border-radius: 10px;
  color: black;
  font-size: 1.5rem;
  padding: 0.75rem 2rem;
  border: 1px solid #5c5e6c;
  &:active {
    transform: scale(0.95);
  }
`
export const BidButton = styled.button`
  width: 100%;
  background: transparent;
  border-radius: 10px;
  color: white;
  font-size: 1.5rem;
  padding: 0.75rem 2rem;
  border: 1px solid grey;
  &:active {
    transform: scale(0.95);
  }
`

const ImgDiv = styled.div`
  position: relative;
  max-width: 40rem;

  overflow: hidden;
  margin: 0 auto 50px;
  @media (max-width: 420px) {
    margin-bottom: 20px;
  }
`
export const Owners = styled.div`
  display: flex;
  gap: 1rem;
  padding: 2rem 0;
  border-bottom: 2px solid #2e3340;
  justify-content: left;
  @media (max-width: 1470px) {
    flex-direction: column;
  }
`
export const OwnerImg = styled.img`
  max-width: 3.5rem;
  border: solid 2px #f3cb23;
  border-radius: 8px;
  height: max-content;
  object-fit: contain;
  @media (max-width: 420px) {
    max-width: 3rem;
  }
`
export const Owner = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

export const P = styled.p`
  color: white;
`
const Trait = styled.p`
  line-height: 0;
  text-transform: uppercase;
  margin: 1rem 0;
  @media (max-width: 420px) {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }
`
export const H1 = styled.h1`
  width: 100%;
  font-size: 4.25rem;
  color: white;
`
export const H2 = styled.h2`
  font-size: 1.215rem;
  line-height: 0.75;
  color: grey;
`
export const H2Traits = styled.h2`
  font-size: 1.215rem;
  color: white;
`
export const H3 = styled.h3`
  width: 100%;
  font-size: 2rem;
  color: white;
  @media (max-width: 420px) {
    font-size: 1.2rem;
  }
`

const Ul = styled.ul`
  font-size: 1.215rem;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 2rem;
`
const Li = styled.li`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  line-height: 1;
  width: 33.33%;
  color: grey;
  &:hover {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer !important;
  }
  @media (max-width: 1500px) {
    p {
      display: none;
    }
  }
`
const Attributes = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1430px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 820px) {
    grid-template-columns: repeat(1, 1fr);
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
    grid-column: 1 / -1;
    align-items: center;
    text-align: center;
    color: #f3cb23;
  }
  div {
    color: white;
  }

  @media (max-width: 420px) {
    padding: 5px 15px 5px 15px;
    gap: 0px;
  }
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32%;
  // padding: 0 10rem;
  @media (max-width: 420px) {
    display: none;
  }
`
export const SaleDiv = styled.div`
  display: flex;
  gap: 1.25rem;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  border: 1px solid #5c5e6c;
  border-radius: 1.2rem;
  padding: 2.5rem;
  width: 100%;
`
export const PriceBox = styled.div`
  background: #1e1e23;
  border-radius: 1rem;
  padding: 1rem;
  width: 100%;
  @media (max-width: 1280px) {
    width: 100%;
  }
`
const MoreBeasts = styled.ul`
  display: grid;
  gap: 1.25rem;

  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`

const OfferDetails = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #2e3340;
  padding-bottom: 20px;
  @media (max-width: 420px) {
    flex-direction: row;
  }
`

const Offeror = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 420px) {
    flex-direction: row;
  }
`

const Img = styled.img`
  user-drag: none;
  -webkit-user-drag: none;
  border-radius: 20px;
`

const AccordianToggle = styled.div`
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`

export const Clickable = styled.span`
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  &:active {
    transform: scale(0.95);
  }
  @media (max-width: 420px) {
    font-size: 1.2rem;
  }
`

const BeastDescription = styled.section`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  color: white;
  @media (max-width: 420px) {
    flex-direction: column;
    padding-left: 0;
    padding-right: 0;
  }
`

const BeastDescriptionWrapper = styled.div`
  @media (max-width: 420px) {
    width: 100%;
  }
`

const BeastDetails = styled.div`
  display: block;
  @media (max-width: 420px) {
    display: none;
  }
`

const BeastDetailsMobile = styled.div`
  display: none;
  @media (max-width: 420px) {
    display: block;
  }
`

const OfferorId = styled.span`
  @media (max-width: 420px) {
    display: none;
  }
`
const OfferorIdMobile = styled.span`
  display: none;
  @media (max-width: 420px) {
    display: block;
    font-size: 1.2rem;
  }
`

const OfferorPrice = styled.span`
  @media (max-width: 420px) {
    font-size: 1rem;
  }
`

type Props = {
  beast: any
  hunterData: any
}

const ProductBeastView: FC<Props> = ({ beast, hunterData }) => {
  const [heart, setHeart] = useState<any>(heartEmpty)
  const [listBeastForSaleOpen, setListBeastForSaleOpen] = useState<any>(false)
  const [placeABidOpen, setPlaceABidOpen] = useState<any>(false)
  const [acceptOfferOpen, setAcceptOfferOpen] = useState<any>(false)
  const [bestOffer, setBestOffer] = useState<any>(null)

  const [windowWidth, setWindowWidth] = useState<any>()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (window.innerWidth) {
      // window.addEventListener("resize", () => {
      //   if (window.innerWidth > 420) {
      //     console.log(window.innerWidth)
      //     setIsMobile(true)
      //   }
      //   setWindowWidth(window.innerWidth)
      // })
      if (window.innerWidth < 420) {
        console.log(window.innerWidth)
        setIsMobile(true)
      }
      console.log(window.innerWidth)
    }
  }, [])
  useEffect(() => {
    if (window.innerWidth) {
      window.addEventListener("resize", () => {
        if (window.innerWidth < 420) {
          console.log(window.innerWidth)
          setIsMobile(true)
        }
        setWindowWidth(window.innerWidth)
      })
    }
  }, [])

  // const isMobile = () => {
  //   return windowWidth > 420
  // }

  const {
    purchaseBeast,
    delistBeast,
    beastsForSale,
    allBeastOffers,
    removeOffer,
    getUserFUSDBalance,
  } = useUser()
  const { user } = useAuth()

  useEffect(() => {
    if (
      allBeastOffers?.filter((offer: any) => offer?.beastID == beast?.id)
        .length > 0
    ) {
      var offers = allBeastOffers
        ?.filter((offer: any) => offer?.beastID == beast?.id)
        .sort((a: any, b: any) => b.offerAmount - a.offerAmount)
      setBestOffer(offers[0])
    }
  }, [allBeastOffers, beast])

  useEffect(() => {
    getUserFUSDBalance("0xfa252d0aa22bf86a")
  }, [])

  const heartChange = () => {
    {
      heart == heartEmpty ? setHeart(heartFull) : setHeart(heartEmpty)
    }
  }
  const Accordion = ({
    title,
    content,
    defaultActive,
  }: {
    title: any
    content: any
    defaultActive: Boolean
  }) => {
    const [isActive, setIsActive] = useState(defaultActive)

    return (
      <Panel className="accordion-item">
        <AccordionTitle>
          <div>{title}</div>
          <>
            {" "}
            <AccordianToggle onClick={() => setIsActive(!isActive)}>
              {isActive ? (
                <div style={{ marginTop: "2px", fontSize: "0.7em" }}>⌄</div>
              ) : (
                <div style={{ marginTop: "13px", fontSize: "0.7em" }}>⌃</div>
              )}
            </AccordianToggle>
          </>
        </AccordionTitle>
        {isActive && <AccordionContent>{content}</AccordionContent>}
      </Panel>
    )
  }

  const accordionProperties = () => {
    return (
      <div>
        <div className="flex text-3xl mb-5 justify-between">
          <div className="flex w-full gap-2">
            {/* <FontAwesomeIcon style={{ color: "black" }} icon={faCaretUp} /> */}
            {/* <img src={dexNumIcon.src} alt="" /> */}
            <p>Dex number</p>
          </div>
          <span>#{("00" + beast?.dexNumber).slice(-3)}</span>
        </div>
        <Attributes>
          <AttributeBlock>
            <Trait>Skin</Trait>
            <H3>{beast?.skin}</H3>
          </AttributeBlock>
          <AttributeBlock>
            <Trait>Element</Trait>
            <H3>{beast?.elements} </H3>
          </AttributeBlock>
          <AttributeBlock>
            <Trait>Star Level</Trait>
            <H3>{beast?.starLevel}</H3>
          </AttributeBlock>
          <AttributeBlock>
            <Trait>Basic Skills</Trait>
            <ul>
              {beast?.basicSkills.map((skill: any, id: any) => (
                <li key={id} className="leading-none">
                  <H2Traits>{skill}</H2Traits>
                </li>
              ))}
            </ul>
          </AttributeBlock>
          <AttributeBlock>
            <Trait>Ultimate Skill</Trait>
            <H3>{beast?.ultimateSkill} </H3>
          </AttributeBlock>
        </Attributes>
      </div>
    )
  }
  const accordionOffers: any = (beast: any) => {
    let offerday = 5
    let offerweek = 3

    return (
      <div>
        <ul>
          {allBeastOffers
            ?.filter((offer: any) => offer?.beastID == beast?.id)
            .sort((a: any, b: any) => b.offerAmount - a.offerAmount)
            .map((offer: any) => (
              <li key={offer?.offerID}>
                <OfferDetails className="flex text-3xl mb-5 justify-between">
                  <Offeror className="flex flex-col md:flex-row gap-5">
                    <OwnerImg
                      src={
                        hunterData?.filter(
                          (hunter: any) => hunter.address == offer?.offeror,
                        )?.[0]?.avatar || profilePictures[1].image
                      }
                      alt="first owner avatar"
                    />
                    <div>
                      <OfferorIdMobile>
                        {hunterData?.filter(
                          (hunter: any) => hunter.address == offer?.offeror,
                        )?.[0]?.findName != null ? (
                          <>
                            {hunterData?.filter(
                              (hunter: any) => hunter.address == offer?.offeror,
                            )?.[0]?.findName != ""
                              ? hunterData?.filter(
                                  (hunter: any) =>
                                    hunter.address == offer?.offeror,
                                )?.[0]?.findName
                              : offer?.offeror
                                  .slice(0, 6)
                                  .concat("...")
                                  .concat(offer?.offeror.slice(-4))}{" "}
                          </>
                        ) : (
                          offer?.offeror
                        )}
                      </OfferorIdMobile>
                      <OfferorId>
                        {hunterData?.filter(
                          (hunter: any) => hunter.address == offer?.offeror,
                        )?.[0]?.findName != null ? (
                          <>
                            {hunterData?.filter(
                              (hunter: any) => hunter.address == offer?.offeror,
                            )?.[0]?.findName != ""
                              ? hunterData?.filter(
                                  (hunter: any) =>
                                    hunter.address == offer?.offeror,
                                )?.[0]?.findName
                              : offer?.offeror}{" "}
                          </>
                        ) : (
                          offer?.offeror
                        )}
                      </OfferorId>
                      {/* Wait with time of offers */}
                      {/* <H2>
                          {offerday} day{offerday > 1 && "s "} ago | Expires in{" "}
                          {offerweek} week
                          {offerweek > 1 && "s "} | Floor bid
                        </H2> */}
                    </div>
                  </Offeror>
                  <OfferorPrice>
                    {parseFloat(
                      parseFloat(offer?.offerAmount.toString()).toFixed(2),
                    )}{" "}
                    FUSD
                  </OfferorPrice>
                  {user?.addr == offer?.offeror && (
                    <Clickable onClick={() => removeOffer(offer?.offerID)}>
                      Remove
                    </Clickable>
                  )}
                </OfferDetails>
              </li>
            ))}
          {/* {something.map((offer: any) => ( */}

          {/* ))} */}
        </ul>
      </div>
    )
  }

  return (
    <>
      <ListBeastForSaleModal
        open={listBeastForSaleOpen}
        setOpen={setListBeastForSaleOpen}
        beast={beast}
      />
      <PlaceABidModal
        open={placeABidOpen}
        setOpen={setPlaceABidOpen}
        beast={beast}
      />

      <AcceptOfferModal
        open={acceptOfferOpen}
        setOpen={setAcceptOfferOpen}
        beast={beast}
        offer={bestOffer}
      />
      <BeastDescription className="mx-5 px-5">
        <BeastDescriptionWrapper className="mx-auto w-1/2">
          <ImgDiv>
            <Img
              src={
                "https://basicbeasts.mypinata.cloud/ipfs/" +
                beastTemplates[
                  beast?.beastTemplateID as keyof typeof beastTemplates
                ]?.thumbnail
              }
            />
            <StarLevel>
              {Array(beast?.starLevel)
                .fill(0)
                .map((_, i) => (
                  <StarImg key={i} src={star.src} />
                ))}
            </StarLevel>
          </ImgDiv>
          <InfoMobile
            beast={beast}
            hunterData={hunterData}
            user={user}
            allBeastOffers={allBeastOffers}
            bestOffer={bestOffer}
            beastsForSale={beastsForSale}
            delistBeast={delistBeast}
            setListBeastForSaleOpen={setListBeastForSaleOpen}
            purchaseBeast={purchaseBeast}
            setPlaceABidOpen={setPlaceABidOpen}
            setAcceptOfferOpen={setAcceptOfferOpen}
          />
          <AccordionDiv onClick={() => console.log(windowWidth)}>
            <Accordion
              title="Description"
              content={beast?.description}
              defaultActive={!isMobile}
            />
          </AccordionDiv>
          <AccordionDiv>
            <Accordion
              title="Properties"
              content={accordionProperties()}
              defaultActive={!isMobile}
            />
          </AccordionDiv>
          {allBeastOffers?.filter((offer: any) => offer?.beastID == beast?.id)
            .length > 0 && (
            <AccordionDiv>
              <Accordion
                title="Offers"
                content={accordionOffers(beast)}
                defaultActive={!isMobile}
              />
            </AccordionDiv>
          )}
        </BeastDescriptionWrapper>
        <Info>
          <BeastDetails className="w-11/12">
            <H1>{beast?.nickname + " " + "#" + beast?.serialNumber}</H1>
            <Owners>
              <a href={"/profile/" + beast?.firstOwner}>
                <Owner>
                  <OwnerImg
                    src={
                      hunterData?.filter(
                        (hunter: any) => hunter.address == beast?.firstOwner,
                      )?.[0]?.avatar
                    }
                    alt="first owner avatar"
                  />
                  <div>
                    <H2>first owner</H2>
                    <P>
                      {hunterData?.filter(
                        (hunter: any) => hunter.address == beast?.firstOwner,
                      )?.[0]?.findName != ""
                        ? hunterData?.filter(
                            (hunter: any) =>
                              hunter.address == beast?.firstOwner,
                          )?.[0]?.findName
                        : beast?.firstOwner}
                    </P>
                  </div>
                </Owner>
              </a>
              <a href={"/profile/" + beast?.currentOwner}>
                <Owner>
                  <OwnerImg
                    src={
                      hunterData?.filter(
                        (hunter: any) => hunter.address == beast?.currentOwner,
                      )?.[0]?.avatar
                    }
                    alt="current owner avatar"
                  />
                  <div>
                    <H2>current owner</H2>
                    <P>
                      {hunterData?.filter(
                        (hunter: any) => hunter.address == beast?.currentOwner,
                      )?.[0]?.findName != ""
                        ? hunterData?.filter(
                            (hunter: any) =>
                              hunter.address == beast?.currentOwner,
                          )?.[0]?.findName
                        : beast?.currentOwner}
                    </P>
                  </div>
                </Owner>
              </a>
            </Owners>
            {/* social share, refresh, favorite */}
            {/* <div className="flex w-full p-5 justify-between items-center">
              <Ul>
                <Li onClick={() => heartChange()}>
                  <FontAwesomeIcon style={{ color: "grey" }} icon={heart} />{" "}
                  <p>76</p>
                </Li>
                <Li>
                  {" "}
                  <FontAwesomeIcon icon={faShareSquare} /> <p>Share</p>
                </Li>
                <Li>
                  <RefreshIcon className="-mr-1 ml-2 h-5 w-5" />
                  <p>Refresh</p>
                </Li>
              </Ul>
              <button
                style={{ color: "grey", textAlign: "end", width: "100%" }}
              >
                <FontAwesomeIcon icon={faEllipsisH} />
              </button>
            </div> */}
          </BeastDetails>
          <SaleDiv>
            <div className="flex flex-col xl:flex-row gap-5 w-full">
              {beast?.price != null && (
                <PriceBox>
                  <H2>Price</H2>
                  <H3>
                    {parseFloat(parseFloat(beast?.price).toFixed(2))} FUSD
                  </H3>
                </PriceBox>
              )}
              {allBeastOffers?.filter(
                (offer: any) => offer?.beastID == beast?.id,
              ).length > 0 && (
                <PriceBox>
                  <H2>Best offer</H2>
                  <H3>
                    {parseFloat(parseFloat(bestOffer?.offerAmount).toFixed(2))}{" "}
                    FUSD
                  </H3>

                  <H2>
                    by{" "}
                    <Clickable className="text-white">
                      <a href={"/profile/" + bestOffer?.offeror}>
                        {hunterData?.filter(
                          (hunter: any) => hunter.address == bestOffer?.offeror,
                        )?.[0]?.findName != null ? (
                          <>
                            {hunterData?.filter(
                              (hunter: any) =>
                                hunter.address == bestOffer?.offeror,
                            )?.[0]?.findName != ""
                              ? hunterData?.filter(
                                  (hunter: any) =>
                                    hunter.address == bestOffer?.offeror,
                                )?.[0]?.findName
                              : bestOffer?.offeror}
                          </>
                        ) : (
                          bestOffer?.offeror
                        )}
                      </a>
                    </Clickable>
                  </H2>
                </PriceBox>
              )}
            </div>
            {/* <span>Last sale price [price] FUSD</span> */}
            {/* TODO */}
            {user?.addr == beast?.currentOwner ? (
              <>
                {beastsForSale
                  ?.map((beast: any) => beast.id)
                  .includes(beast?.id) ? (
                  <BuyButton
                    key={beast?.id}
                    onClick={() => delistBeast(beast?.id)}
                  >
                    Delist
                  </BuyButton>
                ) : (
                  <BuyButton
                    key={beast?.id}
                    onClick={() => setListBeastForSaleOpen(true)}
                  >
                    List for sale
                  </BuyButton>
                )}
              </>
            ) : (
              <>
                {beast?.price != null && (
                  <BuyButton
                    onClick={() =>
                      purchaseBeast(
                        beast?.currentOwner,
                        beast?.id,
                        beast?.price,
                      )
                    }
                  >
                    Buy now for{" "}
                    {parseFloat(parseFloat(beast?.price).toFixed(2))} FUSD
                  </BuyButton>
                )}
              </>
            )}
            {user?.addr != beast?.currentOwner && (
              <BidButton onClick={() => setPlaceABidOpen(true)}>
                Make offer
              </BidButton>
            )}
            {user?.addr == beast?.currentOwner && bestOffer != null && (
              <BidButton onClick={() => setAcceptOfferOpen(true)}>
                Accept best offer
              </BidButton>
            )}

            {/* <H2>Sale ends in [time]</H2> */}
          </SaleDiv>
          {/* ) : (
            <div style={{ marginTop: "50px", width: "80%" }}>
              <BidButton>Make an offer</BidButton>
            </div>
          )} */}
        </Info>{" "}
      </BeastDescription>
      <section className="mb-24 mx-auto">
        {/* Maybe for later showcase more beasts */}
        {/* <H1 className="mx-auto text-center">More Basic Beasts</H1> */}

        <div className="hidden xl:flex justify-center w-10/12 mx-auto ">
          {/* <BeastMarketBeastList
            displayBeasts={beasts}
            // setOpen={setOpen}
            // setDisplayNickname={setDisplayNickname}
          /> */}
        </div>
      </section>
    </>
  )
}

export default ProductBeastView
