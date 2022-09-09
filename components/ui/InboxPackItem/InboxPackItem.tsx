import React, { FC, useEffect, useState } from "react"
import styled from "styled-components"
import StarterImg from "public/packs/pack_pf/starter.png"
import CursedImg from "public/packs/pack_pf/cursed.png"
import ShinyImg from "public/packs/pack_pf/shiny.png"
import MetallicImg from "public/packs/pack_pf/metallic.png"

const Container = styled.div`
  color: #737274;
  line-height: 1.5em;
`

const Wrapper = styled.div`
  display: flex;
`

const Image = styled.img`
  width: 80px;
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
  quantity: number
  description: string
  value: number
}

const InboxPackItem: FC<Props> = ({ quantity, description, value }) => {
  return (
    <>
      {quantity > 0 ? (
        <>
          <Container>
            <Wrapper>
              {description == "Starter Pack" ? (
                <Image src={StarterImg.src} />
              ) : (
                ""
              )}
              {description == "Metallic Silver Pack" ? (
                <Image src={MetallicImg.src} />
              ) : (
                ""
              )}
              {description == "Cursed Black Pack" ? (
                <Image src={CursedImg.src} />
              ) : (
                ""
              )}
              {description == "Shiny Gold Pack" ? (
                <Image src={ShinyImg.src} />
              ) : (
                ""
              )}
              <Content>
                {quantity > 1 ? (
                  <Title>You received {quantity} packs</Title>
                ) : (
                  <Title>You received {quantity} pack</Title>
                )}
                <Description>{description}</Description>
                {value > 0 ? <Value>USD ${value * quantity}</Value> : ""}
              </Content>
            </Wrapper>
            <Divider />
          </Container>
        </>
      ) : (
        ""
      )}
    </>
  )
}
export default InboxPackItem
