import { FC, useEffect, useState } from "react"
import styled from "styled-components"
import { useUser } from "@components/user/UserProvider"
import { useAuth } from "@components/auth/AuthProvider"
import {
  PriceBox,
  H1,
  Owner,
  Owners,
  OwnerImg,
  H2,
  H3,
  P,
  SaleDiv,
  Clickable,
  BuyButton,
  BidButton,
} from "./ProductBeastView"
import SocialMediaShare from "./SocialMediaShare"

const InfoMobileWrapper = styled.div`
  display: none;
  width: 32%;
  // padding: 0 10rem;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`

const BeastDetailsMobile = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: block;
  }
`

const SharingDiv = styled.div`
  display: block;
  width: 100%;
`

type Props = {
  beast: any
  hunterData: any
  user: any
  allBeastOffers: any
  bestOffer: any
  beastsForSale: any
  delistBeast: any
  setListBeastForSaleOpen: any
  purchaseBeast: any
  setPlaceABidOpen: any
  setAcceptOfferOpen: any
}

export const InfoMobile: FC<Props> = ({
  beast,
  hunterData,
  user,
  allBeastOffers,
  bestOffer,
  beastsForSale,
  delistBeast,
  setListBeastForSaleOpen,
  purchaseBeast,
  setPlaceABidOpen,
  setAcceptOfferOpen,
}) => {
  //   const [acceptOfferOpen, setAcceptOfferOpen] = useState<any>(false)
  //   const [bestOffer, setBestOffer] = useState<any>(null)

  //   useEffect(() => {
  //     if (
  //       allBeastOffers?.filter((offer: any) => offer?.beastID == beast?.id)
  //         .length > 0
  //     ) {
  //       var offers = allBeastOffers
  //         ?.filter((offer: any) => offer?.beastID == beast?.id)
  //         .sort((a: any, b: any) => b.offerAmount - a.offerAmount)
  //       setBestOffer(offers[0])
  //     }
  //   }, [allBeastOffers, beast])

  //   useEffect(() => {
  //     getUserFUSDBalance("0xfa252d0aa22bf86a")
  //   }, [])

  return (
    <InfoMobileWrapper>
      <BeastDetailsMobile className="w-11/12">
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
                        (hunter: any) => hunter.address == beast?.firstOwner,
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
                        (hunter: any) => hunter.address == beast?.currentOwner,
                      )?.[0]?.findName
                    : beast?.currentOwner}
                </P>
              </div>
            </Owner>
          </a>
        </Owners>
        {/* social share, refresh, favorite */}

        <SharingDiv>
          <SocialMediaShare />
        </SharingDiv>
      </BeastDetailsMobile>
      <SaleDiv>
        <div className="flex flex-col xl:flex-row gap-5 w-full">
          {beast?.price != null && (
            <PriceBox>
              <H2>Price</H2>
              <H3>{parseFloat(parseFloat(beast?.price).toFixed(2))} FUSD</H3>
            </PriceBox>
          )}
          {allBeastOffers?.filter((offer: any) => offer?.beastID == beast?.id)
            .length > 0 && (
            <PriceBox>
              <H2>Best offer</H2>
              <H3>
                {parseFloat(parseFloat(bestOffer?.offerAmount).toFixed(2))} FUSD
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
                          (hunter: any) => hunter.address == bestOffer?.offeror,
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
              <BuyButton key={beast?.id} onClick={() => delistBeast(beast?.id)}>
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
                  purchaseBeast(beast?.currentOwner, beast?.id, beast?.price)
                }
              >
                Buy now for {parseFloat(parseFloat(beast?.price).toFixed(2))}{" "}
                FUSD
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
    </InfoMobileWrapper>
  )
}
