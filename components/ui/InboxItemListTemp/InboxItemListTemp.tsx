import React, { FC, useEffect, useState } from "react"
import styled from "styled-components"
import InboxPackItem from "../InboxPackItem"
import BuyButton from "../BuyButton"
import { useAuth } from "@components/auth/AuthProvider"
import NextLink from "next/link"
import { useUser } from "@components/user/UserProvider"

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
  const {
    centralizedInbox,
    starterPacks,
    metallicPacks,
    cursedPacks,
    shinyPacks,
    claimAllMails,
    fetchInbox,
    getNumberOfPacks,
  } = useUser()

  const { user } = useAuth()

  useEffect(() => {
    fetchInbox()
  }, [user?.addr])

  useEffect(() => {
    getNumberOfPacks()
  }, [centralizedInbox])

  return (
    <Container>
      <>
        {centralizedInbox != null ? (
          <>
            {centralizedInbox.length > 0 ? (
              <>
                {starterPacks > 0 ? (
                  <>
                    <InboxPackItem
                      quantity={starterPacks}
                      description={"Starter Pack"}
                      value={10}
                    />
                  </>
                ) : (
                  ""
                )}
                {metallicPacks > 0 ? (
                  <>
                    <InboxPackItem
                      quantity={metallicPacks}
                      description={"Metallic Silver Pack"}
                      value={0}
                    />
                  </>
                ) : (
                  ""
                )}
                {cursedPacks > 0 ? (
                  <>
                    <InboxPackItem
                      quantity={cursedPacks}
                      description={"Cursed Black Pack"}
                      value={300}
                    />
                  </>
                ) : (
                  ""
                )}
                {shinyPacks > 0 ? (
                  <>
                    <InboxPackItem
                      quantity={shinyPacks}
                      description={"Shiny Gold Pack"}
                      value={999}
                    />
                  </>
                ) : (
                  ""
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
                  you can expect to receive your packs latest 14 days after the
                  drop.
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
      </>
    </Container>
  )
}
export default InboxItemListTemp
