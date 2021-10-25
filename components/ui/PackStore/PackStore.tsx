import React, { FC, useState } from "react"
import styled from "styled-components"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useUser } from "@components/user/UserProvider"
import { useAuth } from "@components/auth/AuthProvider"
import Spinner from "../Spinner"

const Container = styled.div`
  padding: 6em 6em 3em;
  position: relative;
  -webkit-box-pack: center;
  justify-content: center;
  @media (max-width: 899px) {
    padding: 0;
  }
`

const Content = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  -webkit-box-pack: center;
  justify-content: center;
`

const StarterCardContainer = styled.div`
  position: relative;
  color: rgb(255, 255, 255);
  max-width: 100%;
  margin: 1.5em 2em 4.5em;
  width: 30em;
  height: 58em;
  background: #424f66;
  border-radius: 1px;
  @media (max-width: 899px) {
    width: 100%;
    margin: 1.5em;
    height: 100%;
  }
`

const CursedBlackCardContainer = styled.div`
  position: relative;
  color: rgb(255, 255, 255);
  max-width: 100%;
  margin: 1.5em 2em 4.5em;
  width: 30em;
  height: 58em;
  border-radius: 1px;
  box-shadow: 0px 0px 10px 0px #fff;
  background: #30008f;
  @media (max-width: 899px) {
    width: 100%;
    margin: 1.5em;
    height: 100%;
  }
`

const ShinyGoldCardContainer = styled.div`
  position: relative;
  max-width: 100%;
  margin: 1.5em 2em 4.5em;
  width: 30em;
  height: 58em;
  border-radius: 1px;
  box-shadow: 0px 0px 15px 1px #e2d430;
  background: #a75806;
  color: #f3cb23;
  @media (max-width: 899px) {
    width: 100%;
    margin: 1.5em;
    height: 100%;
  }
`

const CardTitle = styled.h3`
  font-weight: 400;
  text-align: center;
  font-size: 46px;
`

const ShinyGoldCardTitle = styled(CardTitle)`
  color: #f3cb23;
`

const CardContent = styled.div`
  position: relative;
  color: rgb(255, 255, 255);
  margin: 1em 2.5em 0.5em;
  height: 37em;
  background: #111823;
  border-radius: 4px;
  padding: 30px 40px;
  @media (max-width: 899px) {
    height: 55vh;
  }
  @media (max-width: 799px) {
    height: 39em;
  }
`

const CursedBlackCardContent = styled(CardContent)`
  background: #131a36;
`

const ShinyGoldCardContent = styled(CardContent)`
  background: #f3cb23;
  color: #a75806;
`

const Headline = styled.div`
  font-size: 30px;
`

const DescriptionList = styled.ul`
  padding-inline-start: 20px;
  font-size: 22px;
  line-height: 26px;
`

const ReservationOption = styled.div`
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  user-select: none;
  font-size: 22px;
  line-height: 26px;

  &:hover {
    text-decoration: underline;
  }
`

const PurchaseContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`

const QuantitySelector = styled.div`
  display: flex;
  margin: 30px 0;
`

const QuantityButton = styled.button`
  position: absolute;
  text-transform: uppercase;
  width: 40px;
  height: 40px;
  padding: 0px 10px 10px 12px;
  background-color: #feff95;
  color: #a75806;
  font-size: 36px;
  box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
    0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset -3px -3px #f3cb23;
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  top: 345px;
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
      0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset 3px 3px #f3cb23;
  }
  @media (max-width: 899px) {
    top: 26.5vh;
  }
  @media (max-width: 897px) {
    top: 30vh;
  }
  @media (max-width: 878px) {
    top: 32.5vh;
  }
  @media (max-width: 699px) {
    top: 33vh;
  }
  @media (max-width: 563px) {
    top: 36vh;
  }
  @media (max-width: 563px) {
    top: 39vh;
  }
  @media (max-width: 521px) {
    top: 42vh;
  }
  @media (max-width: 490px) {
    top: 44.5vh;
  }
  @media (max-width: 799px) {
    top: 44.5vh;
    display: none;
  }
`

const Increment = styled(QuantityButton)`
  right: 120px;
  @media (max-width: 899px) {
    right: 32vw;
  }
  @media (max-width: 700px) {
    right: 25vw;
  }
  @media (max-width: 500px) {
    right: 21vw;
  }
`

const Decrement = styled(QuantityButton)`
  left: 120px;
  @media (max-width: 899px) {
    left: 32vw;
  }
  @media (max-width: 700px) {
    left: 25vw;
  }
  @media (max-width: 500px) {
    left: 21vw;
  }
`

const OutputText = styled.span`
  font-size: 36px;
  user-select: none;
`

const TotalPrice = styled.div`
  font-size: 46px;
  margin-bottom: 30px;
`

const Currency = styled.span`
  font-size: 33px;
`

const Button = styled.button`
  text-transform: uppercase;
  padding: 6px 12px 10px 14px;
  font-size: 36px;
  background-color: #feff95;
  box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
    0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset -3px -3px #f3cb23;
  color: #a75806;
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
`

const SubmitButton = styled(Button)`
  width: 170px;
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
      0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset 3px 3px #f3cb23;
  }
`

const SubmitButtonDisabled = styled.button`
  text-transform: uppercase;
  padding: 6px 12px 10px 14px;
  font-size: 36px;
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  width: 170px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABFklEQVRYR9WXURLDIAhE6/0PbSdOtUpcd1Gnpv1KGpTHBpCE1/cXq+vrMph7dGvXZTtpfW10DCA5jrH1H0Jhs5E0hnZdCR+vb5S8Nn8mQCeS9BdSalYJqMBjAGzq59xAESN7VFVUgV8AZB/dZBR7QTFDCqGquvUBVVoEtgIwpQRzmANSFHgWQKExHdIrPeuMvQNDarXe6nC/AutgV3JW+6bgqQLeV8FekRtgV+ToDKEKnACYKsfZjjkam7a0ZpYTytwmgainpC3HvwBocgKOxqRjehoR9DFKNFYtOwCGYCszobeCbl26N6yyQ6g8X/Wex/rBPsNEV6qAMaJPMynIHQCoSqS9JSMmwef51LflTgCRszU7DvAGiV6mHWfsaVUAAAAASUVORK5CYII=),
    auto !important;
  background-color: #fdff9597;
  box-shadow: -3px 0px 0px 0px #a1581397, 0px -3px 0px 0px #a1581397,
    0px 3px 0px 0px #a1581397, 3px 0px 0px 0px #a1581397,
    inset -3px -3px #f3c92350 !important;
  color: #a7590697;
`

const ConnectWallet = styled(Button)`
  width: 250px;
`

const NotAvailableButton = styled(Button)`
  width: 250px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABFklEQVRYR9WXURLDIAhE6/0PbSdOtUpcd1Gnpv1KGpTHBpCE1/cXq+vrMph7dGvXZTtpfW10DCA5jrH1H0Jhs5E0hnZdCR+vb5S8Nn8mQCeS9BdSalYJqMBjAGzq59xAESN7VFVUgV8AZB/dZBR7QTFDCqGquvUBVVoEtgIwpQRzmANSFHgWQKExHdIrPeuMvQNDarXe6nC/AutgV3JW+6bgqQLeV8FekRtgV+ToDKEKnACYKsfZjjkam7a0ZpYTytwmgainpC3HvwBocgKOxqRjehoR9DFKNFYtOwCGYCszobeCbl26N6yyQ6g8X/Wex/rBPsNEV6qAMaJPMynIHQCoSqS9JSMmwef51LflTgCRszU7DvAGiV6mHWfsaVUAAAAASUVORK5CYII=),
    auto !important;
  background-color: #fdff9597;
  box-shadow: -3px 0px 0px 0px #a1581397, 0px -3px 0px 0px #a1581397,
    0px 3px 0px 0px #a1581397, 3px 0px 0px 0px #a1581397,
    inset -3px -3px #f3c92350;
  color: #a7590697;
`

const AlertText = styled.div`
  margin-top: 10px;

  font-size: 22px;
  line-height: 26px;
  color: red;
  a {
    text-decoration: underline;
  }
`

const Input = styled.input.attrs({ type: "checkbox" })`
  margin: 0 6px 0 0;
  /*
    
    margin: 0px 6px 0px 0px;
    -webkit-appearance: none;
	//background-color: #111823;
	border: 1px solid #fff;
	box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
	padding: 9px;
	border-radius: 3px;
	display: inline-block;
	position: relative;
    &:checked {
        border: 1px solid #adb8c0;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
        color: #99a1a7;
    }*/
`

const A = styled.a`
  text-decoration: underline;
`

const DetailsText = styled.div`
  padding: 0px 50px;
  margin: 10px 0;
  font-size: 18px;
  line-height: 26px;
`

const Spacing = styled.div`
  margin: 30px;
`
const HeadlineText =
  "Place your order for a chance to receive a 1-star beast or more"

type DescProps = {
  SpecificItem: String
}

const Description: FC<DescProps> = ({ SpecificItem }) => {
  return (
    <>
      <DescriptionList>
        <li>{SpecificItem}</li>
        <li>Become the First Owner</li>
        <li>Chance for 1 of 1 Mythic Diamond skin</li>
      </DescriptionList>
    </>
  )
}

type BuyProps = {
  maxQuantity: number
  price: number
  addressReservable: string
  addressRefundable: string
}

const Purchase: FC<BuyProps> = ({
  maxQuantity,
  price,
  addressReservable,
  addressRefundable,
}) => {
  const [checkboxValue, setCheckboxValue] = useState(false)

  const [quantity, setQuantity] = useState(1)

  const { logIn, loggedIn } = useAuth()

  const { balance, purchase } = useUser()

  //Open up for sale
  const available = false

  const incrementQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const calculateTotalPrice = () => {
    return quantity * price
  }

  const totalPrice = calculateTotalPrice().toFixed(2)

  return (
    <>
      <ReservationOption onClick={() => setCheckboxValue(!checkboxValue)}>
        <Input
          checked={checkboxValue}
          onChange={() => setCheckboxValue(!checkboxValue)}
          type="checkbox"
        />
        If I don’t win this draw, I want to use my order as a reservation for
        the next sale
      </ReservationOption>
      <PurchaseContent>
        <>
          {!available ? (
            <Spacing />
          ) : (
            <>
              <QuantitySelector>
                <Decrement onClick={() => decrementQuantity()}>-</Decrement>
                <OutputText>{quantity}</OutputText>
                <Increment onClick={() => incrementQuantity()}>+</Increment>
              </QuantitySelector>
            </>
          )}
          <TotalPrice>
            {calculateTotalPrice().toLocaleString()} <Currency>₣USD</Currency>
          </TotalPrice>
          <>
            {!available ? (
              <>
                <NotAvailableButton>Not available</NotAvailableButton>
              </>
            ) : (
              <>
                {!loggedIn ? (
                  <ConnectWallet onClick={() => logIn()}>
                    Connect wallet
                  </ConnectWallet>
                ) : (
                  <>
                    {balance >= calculateTotalPrice() ? (
                      <SubmitButton
                        onClick={async () => {
                          const address = checkboxValue
                            ? addressReservable
                            : addressRefundable
                          const tx = await purchase(totalPrice, address)
                          if (tx) {
                            toast.success(
                              "Congratulations! Your journey to becoming a Beast Hunter has begun!",
                            )
                          }
                        }}
                      >
                        Submit
                      </SubmitButton>
                    ) : (
                      <>
                        <SubmitButtonDisabled>Submit</SubmitButtonDisabled>
                        <AlertText>
                          You don&apos;t have enough FUSD.{" "}
                          <a
                            href="https://blocto.portto.io/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Get FUSD
                          </a>
                        </AlertText>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        </>
      </PurchaseContent>
    </>
  )
}

type DetailProps = {
  availStock: number
}

const Details: FC<DetailProps> = ({ availStock }) => {
  const { loggedIn } = useAuth()

  const [flowScanUrl, setFlowScanUrl] = useState("")

  const flowScan = () => {
    setFlowScanUrl("")
  }

  return (
    <>
      <DetailsText>Available stock: {availStock}</DetailsText>
      <DetailsText>
        You can place your order between Oct 22-25, 12PM PST
        <br />
        We will announce winners and distribute/reserve/refund before Oct 31st
        end of the day
        <br />
        {!loggedIn ? (
          <></>
        ) : (
          <>
            If you have placed an order. See if it went through here{" "}
            <A target="_blank" href="https://flowscan.org/">
              on Flowscan
            </A>{" "}
            by searching for your address and transfers.
          </>
        )}
      </DetailsText>
    </>
  )
}

const PackStore: FC = () => {
  const { loading } = useUser()

  return (
    <Container>
      <ToastContainer
        autoClose={4000}
        hideProgressBar
        position="top-center"
        theme="dark"
      />
      {loading ? <Spinner /> : <></>}
      <Content>
        <StarterCardContainer>
          <CardTitle>Starter Pack</CardTitle>
          <CardContent>
            <Headline>{HeadlineText}</Headline>
            <Description SpecificItem={"1 random Normal skin 1-Star Beast"} />
            <Purchase
              maxQuantity={450}
              price={10}
              addressReservable={
                process.env.NEXT_PUBLIC_ADDRESS_RESERVABLE_NORMAL_SKIN!
              }
              addressRefundable={
                process.env.NEXT_PUBLIC_ADDRESS_REFUNDABLE_NORMAL_SKIN!
              }
            />
          </CardContent>
          <Details availStock={450} />
        </StarterCardContainer>
        <CursedBlackCardContainer>
          <CardTitle>Cursed Black Pack</CardTitle>
          <CursedBlackCardContent>
            <Headline>{HeadlineText}</Headline>
            <Description SpecificItem={"1 random Cursed Black 1-Star Beast"} />
            <Purchase
              maxQuantity={90}
              price={300}
              addressReservable={
                process.env.NEXT_PUBLIC_ADDRESS_RESERVABLE_CURSED_BLACK!
              }
              addressRefundable={
                process.env.NEXT_PUBLIC_ADDRESS_REFUNDABLE_CURSED_BLACK!
              }
            />
          </CursedBlackCardContent>
          <Details availStock={90} />
        </CursedBlackCardContainer>
        <ShinyGoldCardContainer>
          <ShinyGoldCardTitle>Shiny Gold Pack</ShinyGoldCardTitle>
          <ShinyGoldCardContent>
            <Headline>{HeadlineText}</Headline>
            <Description SpecificItem={"1 random Shiny Gold 1-Star Beast"} />
            <Purchase
              maxQuantity={22}
              price={999}
              addressReservable={
                process.env.NEXT_PUBLIC_ADDRESS_RESERVABLE_GOLD_STAR!
              }
              addressRefundable={
                process.env.NEXT_PUBLIC_ADDRESS_REFUNDABLE_GOLD_STAR!
              }
            />
          </ShinyGoldCardContent>
          <Details availStock={22} />
        </ShinyGoldCardContainer>
      </Content>
    </Container>
  )
}

export default PackStore
