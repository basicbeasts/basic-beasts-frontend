import React, { FC, useEffect, useState } from "react"
import styled from "styled-components"
import StarterImg from "public/packs/pack_pf/starter.png"
import CursedImg from "public/packs/pack_pf/cursed.png"
import ShinyImg from "public/packs/pack_pf/shiny.png"
import MetallicImg from "public/packs/pack_pf/metallic.png"
import beastTemplates from "data/beastTemplates"

const Container = styled.div`
  color: #737274;
  line-height: 1.5em;
`

const Wrapper = styled.div`
  display: flex;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`

const Image = styled.img`
  width: 80px;
  object-fit: contain;
`

const Content = styled.div`
  margin-left: 20px;
`

const Title = styled.h3`
  color: #fff;
  font-weight: 400;
  font-size: 1.5em;
  margin: 0;
`

const Description = styled.div`
  font-size: 1.2em;
`

const Value = styled.div`
  font-size: 1.2em;
`

const Divider = styled.hr`
  border: 1px solid #5c5e6c !important;
  margin: 40px 0;
`

type Props = {
  bestOfferBeast: any
  hunterData: any
}

const InboxBestOfferBeast: FC<Props> = ({ bestOfferBeast, hunterData }) => {
  return (
    <>
      <Container>
        <a href={"/beast-details/" + bestOfferBeast?.id}>
          <Wrapper>
            <Image
              src={
                "https://basicbeasts.mypinata.cloud/ipfs/" +
                beastTemplates[
                  bestOfferBeast?.beastTemplateID as keyof typeof beastTemplates
                ]?.thumbnail
              }
              alt={"beast image of " + bestOfferBeast?.name}
            />
            <Content>
              <Title>
                Received $
                {parseFloat(parseFloat(bestOfferBeast?.offerAmount).toFixed(2))}{" "}
                offer on {bestOfferBeast?.name} #{bestOfferBeast?.serialNumber}
              </Title>
              <Value>
                Highest bid: $
                {parseFloat(parseFloat(bestOfferBeast?.offerAmount).toFixed(2))}{" "}
                FUSD
              </Value>
              <Description>
                From{" "}
                {hunterData?.filter(
                  (hunter: any) => hunter.address == bestOfferBeast?.offeror,
                )?.[0]?.findName != null ? (
                  <>
                    {hunterData?.filter(
                      (hunter: any) =>
                        hunter.address == bestOfferBeast?.offeror,
                    )?.[0]?.findName != ""
                      ? hunterData?.filter(
                          (hunter: any) =>
                            hunter.address == bestOfferBeast?.offeror,
                        )?.[0]?.findName
                      : bestOfferBeast?.offeror}{" "}
                  </>
                ) : (
                  bestOfferBeast?.offeror
                )}
              </Description>
            </Content>
          </Wrapper>
        </a>
        <Divider />
      </Container>
    </>
  )
}
export default InboxBestOfferBeast
