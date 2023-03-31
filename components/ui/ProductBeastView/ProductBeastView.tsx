import { FC, useEffect, useState } from "react"
import styled from "styled-components"
import star from "public/basic_starLevel.png"
import beastTemplates from "data/beastTemplates"
import { useUser } from "@components/user/UserProvider"
import { useAuth } from "@components/auth/AuthProvider"
import ListBeastForSaleModal from "../ListBeastForSaleModal"
import PlaceABidModal from "../PlaceABidModal"
import profilePictures from "data/profilePictures"
import AcceptOfferModal from "../AcceptOfferModal"
import { InfoMobile } from "./InfoMobile"
import SocialMediaShare from "./SocialMediaShare"
import arrow from "public/arrowIcon.svg"
import listIcon from "public/icons8-list-48.png"
import document from "public/document.svg"
import lightning from "public/lightning.svg"
import emptyImg from "public/emptyImg.png"

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
  color: #fff;
  margin: 1rem auto;

  text-align: left;
  font-size: 16px;

  outline: none;
  transition: 0.4s;
`

const AccordionIcon = styled.img`
  height: auto;
  max-height: 1.5rem;
  display: inline-block;
  padding-right: 0.5rem;
`

const AccordionTitle = styled.div`
  background-color: rgba(95, 81, 81, 0.07);
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #2e3340;
  border-radius: 0.5rem;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;

  line-height: normal;
  :hover {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer !important;
  }

  & div {
    align-items: center;
  }
`

const Arrow = styled.img`
  transform: rotate(180deg);
  display: inline-block;
  height: 1rem;

  &.opened {
    transform: rotate(0deg);
    position: relative;
    top: -0.4rem;
  }
`

const AccordionContent = styled.div`
  padding: 1rem;
  border: 1px solid #2e3340;
  border-radius: 0.5rem;
  font-size: 1.2em;
  width: 100%;

  margin-top: 0.25rem;
  @media (max-width: 1024px) {
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
  grid-column: 1;
  grid-row: 1;
  position: relative;
  width: auto;
  overflow: hidden;
  /* min-height: 20vh;
  max-height: 70vh; */

  @media (max-width: 1024px) {
    grid-column: 1 / span 2;
    grid-row: 1;
  }
`

const Img = styled.img`
  user-drag: none;
  -webkit-user-drag: none;
  border-radius: 1.5rem;
  width: 100%;
`

const EmptyImgDiv = styled.img`
  border-radius: 1.5rem;
  width: 100%;
`

export const Owners = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 2.5rem 0 0 0;
  justify-content: left;

  @media (max-width: 1024px) {
    margin-bottom: 2rem;
  }
  @media (max-width: 550px) {
    grid-template-columns: 100%;
    grid-template-rows: 1fr 1fr;
  }

  & > a {
    &.first-owner {
      grid-column: 1;
    }

    &.current-owner {
      grid-column: 2;
    }
  }
`

export const OwnerImg = styled.img`
  max-width: 2.5rem;
  min-width: 1.5rem;
  min-height: 1.5rem;
  background-color: #5c5e6c;
  border: solid 2px #f3cb23;
  border-radius: 0.5rem;
  height: max-content;
  object-fit: contain;
  @media (max-width: 1024px) {
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
  @media (max-width: 1024px) {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }
`
export const H1 = styled.h1`
  width: fit-content;
  display: inline-block;
  font-size: 4.25rem;
  color: white;
  line-height: normal;
  @media (max-width: 450px) {
    font-size: 3rem;
  }
`
export const H2 = styled.h2`
  font-size: 1.215rem;
  line-height: 1;
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
  @media (max-width: 1024px) {
    font-size: 1.2rem;
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
  border-radius: 0.5rem;
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

  @media (max-width: 1024px) {
    padding: 5px 15px 5px 15px;
    gap: 0px;
  }
`
const Info = styled.div`
  grid-column: 2;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1024px) {
    display: none;
  }
`
export const SaleDiv = styled.div`
  display: flex;
  gap: 1.25rem;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
`

const HeaderDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  @media (max-width: 1024px) {
    flex-direction: row;
  }
`

const Offeror = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1024px) {
    flex-direction: row;
  }
`

const AccordionToggle = styled.div`
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
  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }
`

const BeastDescription = styled.section`
  margin: 3rem 12.5vw 0 12.5vw;
  line-height: normal;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 1vw 4vw;

  position: relative;
  z-index: 3;
  color: white;
  @media (max-width: 1024px) {
    padding-left: 0;
    padding-right: 0;
  }
`

const BeastDescriptionWrapper = styled.div`
  grid-column: 1 / span 2;
  grid-row: 2;

  align-content: center;
`

const BeastDetails = styled.div`
  display: block;
  width: 100%;
  @media (max-width: 1024px) {
    display: none;
  }
`

const OfferorId = styled.span`
  @media (max-width: 1024px) {
    display: none;
  }
`
const OfferorIdMobile = styled.span`
  display: none;
  @media (max-width: 1024px) {
    display: block;
    font-size: 1.2rem;
  }
`

const OfferorPrice = styled.span`
  @media (max-width: 1024px) {
    font-size: 1rem;
  }
`

const SharingDiv = styled.div`
  display: inline-block;
  width: fit-content;
`

type Props = {
  beast: any
  hunterData: any
}

const ProductBeastView: FC<Props> = ({ beast, hunterData }) => {
  // const [heart, setHeart] = useState<any>(heartEmpty)
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

  const Accordion = ({
    icon,
    title,
    content,
    defaultActive,
  }: {
    icon: any
    title: any
    content: any
    defaultActive: Boolean
  }) => {
    const [isActive, setIsActive] = useState(defaultActive)

    return (
      <>
        {beast ? (
          <Panel className="accordion-item">
            <AccordionTitle onClick={() => setIsActive(!isActive)}>
              <div>
                <AccordionIcon src={icon} />
                {title}
              </div>
              <AccordionToggle>
                {isActive ? (
                  <Arrow src={arrow.src} />
                ) : (
                  <Arrow src={arrow.src} className="opened" />
                )}
              </AccordionToggle>
            </AccordionTitle>
            {isActive && <AccordionContent>{content}</AccordionContent>}
          </Panel>
        ) : (
          <Panel className="accordion-item">
            <AccordionTitle onClick={() => setIsActive(!isActive)}>
              <div>
                <AccordionIcon src={icon} />
                {title}
              </div>
              <AccordionToggle>
                {isActive ? (
                  <Arrow src={arrow.src} />
                ) : (
                  <Arrow src={arrow.src} className="opened" />
                )}
              </AccordionToggle>
            </AccordionTitle>
            {isActive && <AccordionContent>Loading...</AccordionContent>}
          </Panel>
        )}
      </>
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
          <span>
            {/* DG CHecking if the beast is defined, and while it's not, we are displaying the message Loading... */}
            #{beast ? ("00" + beast?.dexNumber).slice(-3) : "Loading..."}
          </span>
        </div>
        <Attributes>
          <AttributeBlock>
            <Trait>Skin</Trait>
            <H3>{beast ? beast?.skin : "Loading..."}</H3>
          </AttributeBlock>
          <AttributeBlock>
            <Trait>Element</Trait>
            <H3>{beast ? beast?.elements : "Loading..."} </H3>
          </AttributeBlock>
          <AttributeBlock>
            <Trait>Star Level</Trait>
            <H3>{beast ? beast?.starLevel : "Loading..."}</H3>
          </AttributeBlock>
          <AttributeBlock>
            <Trait>Basic Skills</Trait>
            <ul>
              {beast
                ? beast?.basicSkills.map((skill: any, id: any) => (
                    <li key={id} className="leading-none">
                      <H2Traits>{skill}</H2Traits>
                    </li>
                  ))
                : "Loading..."}
            </ul>
          </AttributeBlock>
          <AttributeBlock>
            <Trait>Ultimate Skill</Trait>
            <H3>{beast ? beast?.ultimateSkill : "Loading..."} </H3>
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
      {/*  className="mx-5 px-5" */}
      <BeastDescription>
        {/*  className="mx-auto w-1/2" */}
        {beast ? (
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
        ) : (
          <ImgDiv className="animate-pulse">
            <EmptyImgDiv src={emptyImg.src} />
          </ImgDiv>
        )}
        <BeastDescriptionWrapper>
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
              icon={listIcon.src}
              title="Description"
              content={beast?.description}
              defaultActive={!isMobile}
            />
          </AccordionDiv>
          <AccordionDiv>
            <Accordion
              icon={document.src}
              title="Properties"
              content={accordionProperties()}
              defaultActive={!isMobile}
            />
          </AccordionDiv>
          {/* DG Checking if beast is defined, and while it's not, we are displaying a message Loading Offers... */}
          {beast
            ? allBeastOffers?.filter(
                (offer: any) => offer?.beastID == beast?.id,
              ).length > 0 && (
                <AccordionDiv>
                  <Accordion
                    icon={lightning.src}
                    title="Offers"
                    content={accordionOffers(beast)}
                    defaultActive={!isMobile}
                  />
                </AccordionDiv>
              )
            : "Loading Offers..."}
        </BeastDescriptionWrapper>
        <Info>
          <HeaderDiv>
            {beast ? (
              <H1>{beast?.nickname + " " + "#" + beast?.serialNumber}</H1>
            ) : (
              <H1>Loading...</H1>
            )}
            <SharingDiv>
              <SocialMediaShare />
            </SharingDiv>
          </HeaderDiv>

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
                    Buy now for
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
          <BeastDetails className="w-11/12">
            {beast ? (
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
                          (hunter: any) =>
                            hunter.address == beast?.currentOwner,
                        )?.[0]?.avatar
                      }
                      alt="current owner avatar"
                    />
                    <div>
                      <H2>current owner</H2>
                      <P>
                        {hunterData?.filter(
                          (hunter: any) =>
                            hunter.address == beast?.currentOwner,
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
            ) : (
              <Owners>
                <a href={"#"}>
                  <Owner>
                    <OwnerImg className="animate-pulse" />
                    <div>
                      <H2>first owner</H2>
                      <P>Owner address loading...</P>
                    </div>
                  </Owner>
                </a>
                <a href={"#"}>
                  <Owner>
                    <OwnerImg className="animate-pulse" />
                    <div>
                      <H2>Current owner</H2>
                      <P>Owner address loading...</P>
                    </div>
                  </Owner>
                </a>
              </Owners>
            )}

            {/* <SharingDiv>
              <SocialMediaShare />
            </SharingDiv> */}
          </BeastDetails>
        </Info>
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
