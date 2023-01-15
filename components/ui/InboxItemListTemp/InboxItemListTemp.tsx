import React, { FC, useEffect, useState } from "react"
import styled from "styled-components"
import InboxPackItem from "../InboxPackItem"
import BuyButton from "../BuyButton"
import { useAuth } from "@components/auth/AuthProvider"
import NextLink from "next/link"
import { useUser } from "@components/user/UserProvider"
import InboxBestOfferBeast from "../InboxBestOfferBeast"

const Button = styled.button`
  padding: 8px 24px 12px 26px;
  margin-right: 2px;
  margin-top: 20px;
  font-size: 26px;
  background-color: #feff95;
  box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
    0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset -3px -3px #f3cb23;
  color: #a75806;
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
      0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset 3px 3px #f3cb23;
  }
`

const Container = styled.div`
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 50px;
  line-height: 1.5em;
  margin-bottom: 120px;

  /* max-width: 1400px; */
  @media (min-width: 1750px) {
  }
`

const EmptyMessage = styled.div`
  font-size: 2em;
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
`

const NoInbox = styled.div`
  font-size: 2em;
  color: #fff;
  text-align: center;
  margin-bottom: 300px;
`

const PackContainer = styled.div`
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 50px;
`

const InboxItemListTemp: FC = () => {
  const [bestOffers, setBestOffers] = useState<any>([])

  const {
    centralizedInbox,
    starterPacks,
    metallicPacks,
    cursedPacks,
    shinyPacks,
    claimAllMails,
    fetchInbox,
    getNumberOfPacks,
    userBeasts,
    allBeastOffers,
    hunterData,
  } = useUser()

  const { user } = useAuth()

  useEffect(() => {
    fetchInbox()
  }, [user?.addr])

  useEffect(() => {
    getNumberOfPacks()
  }, [centralizedInbox])

  useEffect(() => {
    if (userBeasts?.length > 0) {
      var bestOffers = []
      userBeasts?.map((beast: any) => {
        if (
          allBeastOffers?.filter((offer: any) => beast?.id == offer?.beastID)
            .length > 0
        ) {
          var bestOffer = allBeastOffers
            ?.filter((offer: any) => beast?.id == offer?.beastID)
            .sort((a: any, b: any) => b.offerAmount - a.offerAmount)?.[0]
          var bestOfferBeast = {
            id: beast?.id,
            serialNumber: beast?.serialNumber,
            name: beast?.name,
            nickname: beast?.nickname,
            beastTemplateID: beast?.beastTemplateID,
            offerID: bestOffer?.offerID,
            offerAmount: bestOffer?.offerAmount,
            offeror: bestOffer?.offeror,
          }
          bestOffers.push(bestOfferBeast)
        }
      })
    }
    setBestOffers(bestOffers)
    console.log(bestOffers)
  }, [userBeasts, allBeastOffers])

  return (
    <Container>
      <>
        {centralizedInbox != null ? (
          <>
            {centralizedInbox.length > 0 ? (
              <>
                {starterPacks > 0 && (
                  <>
                    <InboxPackItem
                      quantity={starterPacks}
                      description={"Starter Pack"}
                      value={10}
                    />
                  </>
                )}
                {metallicPacks > 0 && (
                  <>
                    <InboxPackItem
                      quantity={metallicPacks}
                      description={"Metallic Silver Pack"}
                      value={0}
                    />
                  </>
                )}
                {cursedPacks > 0 && (
                  <>
                    <InboxPackItem
                      quantity={cursedPacks}
                      description={"Cursed Black Pack"}
                      value={300}
                    />
                  </>
                )}
                {shinyPacks > 0 && (
                  <>
                    <InboxPackItem
                      quantity={shinyPacks}
                      description={"Shiny Gold Pack"}
                      value={999}
                    />
                  </>
                )}
                <BuyButton
                  onClick={() => claimAllMails()}
                  buttonText={"Claim All"}
                />
                {/* <pre>{JSON.stringify(centralizedInbox, null, 2)}</pre> */}
              </>
            ) : (
              <>
                <EmptyMessage>Your inbox is empty.</EmptyMessage>
                <EmptyMessage>
                  If you recently participated in a drop,
                </EmptyMessage>{" "}
                <EmptyMessage>
                  you can expect to receive your packs within 14 days of the
                  drop window ending.
                </EmptyMessage>
                <div style={{ marginTop: "40px" }}>
                  <EmptyMessage>Check for packs in Profile.</EmptyMessage>
                </div>
                <EmptyMessage>
                  <Button>
                    <a href={"/profile/" + user?.addr}>Visit Profile</a>
                  </Button>
                </EmptyMessage>
              </>
            )}
          </>
        ) : (
          <NoInbox>No inbox found</NoInbox>
        )}
        {bestOffers?.length > 0 && (
          <div style={{ marginTop: "40px" }}>
            {bestOffers?.map((bestOfferBeast: any) => (
              <InboxBestOfferBeast
                key={bestOfferBeast.id}
                bestOfferBeast={bestOfferBeast}
                hunterData={hunterData}
              />
            ))}
          </div>
        )}
      </>
    </Container>
  )
}
export default InboxItemListTemp
