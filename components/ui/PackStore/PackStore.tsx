import React, { FC, useState } from "react"
import styled from "styled-components"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useUser } from "@components/user/UserProvider"
import { useAuth } from "@components/auth/AuthProvider"
import Spinner from "../Spinner"
import { useMutation, PackType } from "../../../gqty"
import StarterImg from "public/packs/pack_pf/starter.png"
import CursedImg from "public/packs/pack_pf/cursed.png"
import ShinyImg from "public/packs/pack_pf/shiny.png"

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
  flex-flow: column wrap;
  -webkit-box-pack: center;
  justify-content: center;
`

const TextContainer = styled.div`
  text-align: center;
  width: 80%;
  margin: 0 auto;
`

const BottomTextContainer = styled.div`
  text-align: center;
  width: 90%;
  margin-top: 60px;
  margin-bottom: 20px;
  margin-right: auto;
  margin-left: auto;
`

const Title = styled.h1`
  color: #fff;
  font-weight: normal;
  font-size: 7vw;
  line-height: 1;
  margin-bottom: 0;
  margin-top: 0;
  @media (max-width: 1010px) {
    font-size: 13vw;
  }
`

const P = styled.p`
  font-size: 2.5vw;
  color: #fff;
  line-height: 1;
  margin-top: 0;
  @media (max-width: 1010px) {
    font-size: 5vw;
  }
`

const BottomP = styled.p`
  font-size: 1.5vw;
  color: #fff;
  line-height: 1;
  margin-top: 0;
  @media (max-width: 1010px) {
    font-size: 4vw;
  }
`

const CardContainer = styled.div`
  position: relative;
  z-index: 1;
`

const Card = styled.div<{
  bgColor: string
  marginTop: string
  type: PackType
  bgColor2: string
  fontColor: string
}>`
  background: ${(props) => props.bgColor};
  position: relative;
  display: flex;
  gap: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #333333;
  margin: 0 auto;
  padding: 1.5rem;
  width: 60vw;
  border-radius: 12px;
  margin-top: 6vw;

  @media (max-width: 1010px) {
    margin-top: ${(props) => props.marginTop};
    padding: 1.5rem 1.5rem 3rem;
    width: 80vw;
    flex-direction: column;
  }
  ::before {
    ${({ type }) =>
      type === PackType.STARTER
        ? `content: "Starter Pack";`
        : type === PackType.CURSED_BLACK
        ? `content: "Cursed Black";`
        : `content: "Shiny Gold";`}

    background: ${(props) => props.bgColor2};
    color: ${(props) => props.fontColor};
    position: absolute;
    height: 7vw;
    width: 29%;
    z-index: -1;
    padding-bottom: 4vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.3vw;
    border-radius: 12px 12px 0 0;
    top: -3vw;
    left: 0;
    box-sizing: border-box;

    @media (max-width: 1010px) {
      width: 60%;
      font-size: 7vw;
      height: 13vw;
      top: -10vw;
      padding-bottom: 3vw;
    }
  }
`

const CardImageContainer = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: 1010px) {
    width: 70%;
    margin-top: 5vw;
  }
`

const CardImage = styled.img`
  object-fit: contain;
  width: 100%;
`

const CardContent = styled.div`
  width: 45%;

  @media (max-width: 1010px) {
    width: 90%;
  }
`

const Headline = styled.div`
  color: #737374;
  font-size: 2vw;
  line-height: 0;

  @media (max-width: 1010px) {
    display: none;
  }
`

const CursedHeadline = styled.div`
  color: #751ad0;
  font-size: 2vw;
  line-height: 0;

  @media (max-width: 1010px) {
    display: none;
  }
`

const ShinyHeadline = styled.div`
  color: #a15813;
  font-size: 2vw;
  line-height: 0;

  @media (max-width: 1010px) {
    display: none;
  }
`

const DescriptionList = styled.ul`
  font-size: 1.5vw;
  line-height: 1.5;
  list-style: none;
  padding: 0;

  @media (max-width: 1010px) {
    font-size: 4.5vw;
    margin: 0 auto;
    width: max-content;
  }
`

const ReservationOption = styled.div<{
  fontColor: string
}>`
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  user-select: none;
  font-size: 1vw;
  line-height: 26px;
  color: ${(props) => props.fontColor};
  margin-bottom: 0.8vw;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 1010px) {
    font-size: 4.5vw;
    margin-bottom: 3vw;
    width: 300px;
    text-align: center;
  }
`

const PurchaseContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  position: relative;
  padding-right: 10px;
  width: 200px;

  @media (max-width: 1010px) {
    padding-right: 0;
  }
`

const QuantitySelector = styled.div`
  display: flex;
  flex-flow: row;
  margin-bottom: 5px;
`

const QuantityButton = styled.button<{
  bgColor: string
  activeBgColor: string
}>`
  text-transform: uppercase;
  width: 28px;
  height: 28px;
  background-color: ${(props) => props.bgColor};
  color: #fff;
  border: 0;
  font-size: 17px;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  padding: 0 0 2px 1px;
  border-radius: 2px;
  margin-top: 4px;

  @media (max-width: 1010px) {
    width: 40px;
    height: 40px;
    font-size: 21px;
  }

  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    background-color: ${(props) => props.activeBgColor};
  }
`

const OutputText = styled.span`
  font-size: 30px;
  color: #737374;
  user-select: none;

  @media (max-width: 1010px) {
    font-size: 36px;
  }
`

const InputText = styled.input<{
  fontColor: string
}>`
  font-size: 30px;
  color: ${(props) => props.fontColor};
  -webkit-user-select: all !important;
  -moz-user-select: all !important;
  -ms-user-select: all !important;
  user-select: all !important;
  text-align: center;
  max-width: 70px;
  background: transparent;
  border: none;
  outline: none;

  @media (max-width: 1010px) {
    font-size: 36px;
  }
`

const TotalPrice = styled.div<{
  fontColor: string
}>`
  color: ${(props) => props.fontColor};
  font-size: 4vw;
  white-space: nowrap;
  margin-bottom: 0.5vw;

  @media (max-width: 1010px) {
    font-size: 13vw;
    margin: 3vw 0;
  }
`

const Currency = styled.span`
  font-size: 2vw;

  @media (max-width: 1010px) {
    font-size: 10vw;
    margin: 0 auto;
  }
`

// Don't delete may use in the future
const PurchaseAlternative = styled.p`
  font-size: 1vw;
  text-decoration: underline;
  text-underline-offset: 2px;
  line-height: 26px;
  margin-top: 5px;
  @media (max-width: 1010px) {
    font-size: 4.5vw;
    margin-top: 20px;
  }
`

const Button = styled.button<{
  borderColor: string
  insetBorderColor: string
  bgColor: string
  fontColor: string
}>`
  padding: 6px 20px 10px 22px;
  font-size: 1.5vw;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fontColor};

  box-shadow: ${(props) =>
    `-3px 0px 0px 0px ${props.borderColor}, 0px -3px 0px 0px ${props.borderColor}, 0px 3px 0px 0px ${props.borderColor}, 
    3px 0px 0px 0px ${props.borderColor}, inset -3px -3px ${props.insetBorderColor}`};

  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  @media (max-width: 1010px) {
    font-size: 7vw;
  }
`

const SubmitButton = styled(Button)`
  width: 130px;
  @media (max-width: 1010px) {
    width: 26vw;
  }
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: ${(
      props,
    ) => `-3px 0px 0px 0px ${props.borderColor}, 0px -3px 0px 0px ${props.borderColor},
      0px 3px 0px 0px ${props.borderColor}, 3px 0px 0px 0px ${props.borderColor}, inset 3px 3px ${props.insetBorderColor}`};
  }
`

const SubmitButtonDisabled = styled.button<{
  borderColor: string
  insetBorderColor: string
  bgColor: string
  fontColor: string
}>`
  padding: 6px 12px 10px 14px;
  font-size: 1.5vw;
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  width: 130px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABFklEQVRYR9WXURLDIAhE6/0PbSdOtUpcd1Gnpv1KGpTHBpCE1/cXq+vrMph7dGvXZTtpfW10DCA5jrH1H0Jhs5E0hnZdCR+vb5S8Nn8mQCeS9BdSalYJqMBjAGzq59xAESN7VFVUgV8AZB/dZBR7QTFDCqGquvUBVVoEtgIwpQRzmANSFHgWQKExHdIrPeuMvQNDarXe6nC/AutgV3JW+6bgqQLeV8FekRtgV+ToDKEKnACYKsfZjjkam7a0ZpYTytwmgainpC3HvwBocgKOxqRjehoR9DFKNFYtOwCGYCszobeCbl26N6yyQ6g8X/Wex/rBPsNEV6qAMaJPMynIHQCoSqS9JSMmwef51LflTgCRszU7DvAGiV6mHWfsaVUAAAAASUVORK5CYII=),
    auto !important;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fontColor};
  box-shadow: ${(props) =>
    `-3px 0px 0px 0px ${props.borderColor}, 0px -3px 0px 0px ${props.borderColor}, 0px 3px 0px 0px ${props.borderColor}, 
    3px 0px 0px 0px ${props.borderColor}, inset -3px -3px ${props.insetBorderColor}`};

  @media (max-width: 1010px) {
    font-size: 7vw;
    width: 26vw;
  }
`

const ConnectWallet = styled(Button)`
  width: auto;
  white-space: nowrap;
`

const NotAvailableButton = styled(Button)`
  width: 10vw;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABFklEQVRYR9WXURLDIAhE6/0PbSdOtUpcd1Gnpv1KGpTHBpCE1/cXq+vrMph7dGvXZTtpfW10DCA5jrH1H0Jhs5E0hnZdCR+vb5S8Nn8mQCeS9BdSalYJqMBjAGzq59xAESN7VFVUgV8AZB/dZBR7QTFDCqGquvUBVVoEtgIwpQRzmANSFHgWQKExHdIrPeuMvQNDarXe6nC/AutgV3JW+6bgqQLeV8FekRtgV+ToDKEKnACYKsfZjjkam7a0ZpYTytwmgainpC3HvwBocgKOxqRjehoR9DFKNFYtOwCGYCszobeCbl26N6yyQ6g8X/Wex/rBPsNEV6qAMaJPMynIHQCoSqS9JSMmwef51LflTgCRszU7DvAGiV6mHWfsaVUAAAAASUVORK5CYII=),
    auto !important;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fontColor};
  box-shadow: ${(props) =>
    `-3px 0px 0px 0px ${props.borderColor}, 0px -3px 0px 0px ${props.borderColor}, 0px 3px 0px 0px ${props.borderColor}, 
    3px 0px 0px 0px ${props.borderColor}, inset -3px -3px ${props.insetBorderColor}`};

  @media (max-width: 1010px) {
    width: 38vw;
  }
`

const AlertText = styled.div`
  margin-top: 10px;

  font-size: 22px;
  line-height: 26px;
  color: red;
  a {
    text-decoration: underline;
  }
  @media (max-width: 1010px) {
    width: 250px;
  }
`

const Input = styled.input.attrs({ type: "checkbox" })`
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;

  @media (max-width: 1010px) {
    top: 0px;
  }
`

const DetailsText = styled.div`
  margin: 10px 10px 0 0;
  font-size: 18px;
  color: #737274;
`

const HeadlineText = "Includes"

// TODO: Turn into component for ToolTip
const ToolTipText = styled.span`
  visibility: hidden;
  width: 250px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -125px;
  font-size: 1.2vw;

  @media (max-width: 1010px) {
    width: 340px;
    font-size: 4vw;
    margin-left: -170px;
  }

  //bottom arrow
  ::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`

const ToolTip = styled.div`
  position: relative;
  display: inline-block;
  text-decoration: underline;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  &:hover span {
    visibility: visible;
  }
`

const ToolTipNoUnderline = styled(ToolTip)`
  text-decoration: none;
`

type DescProps = {
  SpecificItem: String
}

const Description: FC<DescProps> = ({ SpecificItem }) => {
  return (
    <>
      <DescriptionList>
        <li>{SpecificItem}</li>
        <li>
          Become the{" "}
          <ToolTip>
            First Owner
            <ToolTipText>
              First owners receive 5% life-time royalties for every trade of the
              beasts.
            </ToolTipText>
          </ToolTip>
        </li>
        <li>
          Chance for 1 of 1{" "}
          <ToolTip>
            Mythic Diamond skin
            <ToolTipText>
              The rarest beast skin. Only 1 out of 1 for each unique beast will
              ever exist.
            </ToolTipText>
          </ToolTip>
        </li>
      </DescriptionList>
    </>
  )
}

type BuyProps = {
  maxQuantity: number
  price: number
  addressReservable: string
  addressRefundable: string
  packType: PackType
}

//Open up for sale
const available = false

const Purchase: FC<BuyProps> = ({
  maxQuantity,
  price,
  addressReservable,
  addressRefundable,
  packType,
}) => {
  const [checkboxValue, setCheckboxValue] = useState(false)

  const [quantity, setQuantity] = useState(1)

  const { logIn, loggedIn } = useAuth()

  const { balance, purchase } = useUser()

  const [preOrder] = useMutation(
    (
      mutation,
      args: {
        packType: PackType
        count: number
        transactionHash: string
        refundable: boolean
      },
    ) => {
      const preOrder = mutation.preOrder(args)
      if (preOrder) {
        return {
          id: preOrder.id,
        }
      }
    },
    {
      suspense: false,
    },
  )

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

  const inputQuantity = (event: any) => {
    if (event.target.value <= maxQuantity && event.target.value > 0) {
      setQuantity(Number(event.target.value))
    }
  }

  const calculateTotalPrice = () => {
    return quantity * price
  }

  const totalPrice = calculateTotalPrice().toFixed(2)

  return (
    <>
      <PurchaseContent>
        <>
          <QuantitySelector>
            <QuantityButton
              onClick={() => decrementQuantity()}
              bgColor={
                packType === PackType.STARTER
                  ? "#cccccd"
                  : packType === PackType.CURSED_BLACK
                  ? "#e3bfff"
                  : "#ffda66"
              }
              activeBgColor={
                packType === PackType.STARTER
                  ? "#cccccdcb"
                  : packType === PackType.CURSED_BLACK
                  ? "#e3bfffcb"
                  : "#ffda66cb"
              }
            >
              -
            </QuantityButton>
            {/* <OutputText>{quantity}</OutputText> */}
            <InputText
              value={quantity}
              onChange={(event) => inputQuantity(event)}
              fontColor={
                packType === PackType.STARTER
                  ? "#737374"
                  : packType === PackType.CURSED_BLACK
                  ? "#c746a5"
                  : "#a15813"
              }
            />
            <QuantityButton
              onClick={() => incrementQuantity()}
              bgColor={
                packType === PackType.STARTER
                  ? "#737374"
                  : packType === PackType.CURSED_BLACK
                  ? "#751ad0"
                  : "#ffbe00"
              }
              activeBgColor={
                packType === PackType.STARTER
                  ? "#737374cb"
                  : packType === PackType.CURSED_BLACK
                  ? "#751ad0cb"
                  : "#ffbe00cb"
              }
            >
              +
            </QuantityButton>
          </QuantitySelector>
          <TotalPrice
            fontColor={
              packType === PackType.STARTER
                ? "#111823"
                : packType === PackType.CURSED_BLACK
                ? "#751ad0"
                : "#a15813"
            }
          >
            {calculateTotalPrice().toLocaleString()} <Currency>₣USD</Currency>
          </TotalPrice>
          <ReservationOption
            onClick={() => setCheckboxValue(!checkboxValue)}
            fontColor={
              packType === PackType.STARTER
                ? "#737374"
                : packType === PackType.CURSED_BLACK
                ? "#c746af"
                : "#e19700"
            }
          >
            <Input
              checked={checkboxValue}
              onChange={() => setCheckboxValue(!checkboxValue)}
              type="checkbox"
            />
            <ToolTipNoUnderline>
              Reserve Packs
              <ToolTipText>
                If I don’t win this draw, I want to use my order as a
                reservation for the next sale.
              </ToolTipText>
            </ToolTipNoUnderline>
          </ReservationOption>
          <>
            {!available ? (
              <>
                <NotAvailableButton
                  borderColor={
                    packType === PackType.STARTER
                      ? "#11182379"
                      : packType === PackType.CURSED_BLACK
                      ? "#751ad079"
                      : "#a1581379"
                  }
                  insetBorderColor={
                    packType === PackType.STARTER
                      ? "#73737479"
                      : packType === PackType.CURSED_BLACK
                      ? "#c746af79"
                      : "#f3cb2379"
                  }
                  bgColor={
                    packType === PackType.STARTER
                      ? "#ababac79"
                      : packType === PackType.CURSED_BLACK
                      ? "#e3bfff79"
                      : "#feff9579"
                  }
                  fontColor={
                    packType === PackType.STARTER
                      ? "#fff"
                      : packType === PackType.CURSED_BLACK
                      ? "#751ad079"
                      : "#a1581379"
                  }
                >
                  Unavailable
                </NotAvailableButton>
              </>
            ) : (
              <>
                {!loggedIn ? (
                  <ConnectWallet
                    borderColor={
                      packType === PackType.STARTER
                        ? "#111823"
                        : packType === PackType.CURSED_BLACK
                        ? "#751ad0"
                        : "#a15813"
                    }
                    insetBorderColor={
                      packType === PackType.STARTER
                        ? "#737374"
                        : packType === PackType.CURSED_BLACK
                        ? "#c746af"
                        : "#f3cb23"
                    }
                    bgColor={
                      packType === PackType.STARTER
                        ? "#ababac"
                        : packType === PackType.CURSED_BLACK
                        ? "#e3bfff"
                        : "#feff95"
                    }
                    fontColor={
                      packType === PackType.STARTER
                        ? "#fff"
                        : packType === PackType.CURSED_BLACK
                        ? "#751ad0"
                        : "#a15813"
                    }
                    onClick={() => logIn()}
                  >
                    Connect Wallet
                  </ConnectWallet>
                ) : (
                  <>
                    {balance >= calculateTotalPrice() ? (
                      <SubmitButton
                        borderColor={
                          packType === PackType.STARTER
                            ? "#111823"
                            : packType === PackType.CURSED_BLACK
                            ? "#751ad0"
                            : "#a15813"
                        }
                        insetBorderColor={
                          packType === PackType.STARTER
                            ? "#737374"
                            : packType === PackType.CURSED_BLACK
                            ? "#c746af"
                            : "#f3cb23"
                        }
                        bgColor={
                          packType === PackType.STARTER
                            ? "#ababac"
                            : packType === PackType.CURSED_BLACK
                            ? "#e3bfff"
                            : "#feff95"
                        }
                        fontColor={
                          packType === PackType.STARTER
                            ? "#fff"
                            : packType === PackType.CURSED_BLACK
                            ? "#751ad0"
                            : "#a15813"
                        }
                        onClick={async () => {
                          const address = checkboxValue
                            ? addressReservable
                            : addressRefundable
                          const tx = await purchase(totalPrice, address)
                          if (tx) {
                            const txId = tx.events[0].transactionId as string

                            const preOrderId = await preOrder({
                              args: {
                                transactionHash: txId,
                                packType: packType,
                                count: quantity,
                                refundable: !checkboxValue,
                              },
                            })
                            if (preOrderId) {
                              toast.success(
                                "Congratulations! Your journey to becoming a Beast Hunter has begun!",
                              )
                            } else {
                              toast.error("Something went wrong")
                            }
                          }
                        }}
                      >
                        Submit
                      </SubmitButton>
                    ) : (
                      <>
                        <SubmitButtonDisabled
                          borderColor={
                            packType === PackType.STARTER
                              ? "#11182379"
                              : packType === PackType.CURSED_BLACK
                              ? "#751ad079"
                              : "#a1581379"
                          }
                          insetBorderColor={
                            packType === PackType.STARTER
                              ? "#73737479"
                              : packType === PackType.CURSED_BLACK
                              ? "#c746af79"
                              : "#f3cb2379"
                          }
                          bgColor={
                            packType === PackType.STARTER
                              ? "#ababac79"
                              : packType === PackType.CURSED_BLACK
                              ? "#e3bfff79"
                              : "#feff9579"
                          }
                          fontColor={
                            packType === PackType.STARTER
                              ? "#fff"
                              : packType === PackType.CURSED_BLACK
                              ? "#751ad079"
                              : "#a1581379"
                          }
                        >
                          Submit
                        </SubmitButtonDisabled>
                        <AlertText>
                          You don&apos;t have enough FUSD.{" "}
                          <a
                            href="https://twitter.com/basicbeastsnft/status/1458521186724352002?s=20"
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
    </>
  )
}

// Change Quantity / Stock available
const Stock = {
  STARTER: 900,
  CURSED: 180,
  SHINY: 44,
}

// Change Price of packs
const Price = {
  STARTER: 10,
  CURSED: 300,
  SHINY: 999,
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
        <TextContainer>
          <Title>Beasts Packs</Title>
          {available ? (
            <P>
              Place your order for a chance to receive a 1-star beast or more!
            </P>
          ) : (
            <P>Store is Closed. Join our Discord to receive drop updates.</P>
          )}
        </TextContainer>
        <CardContainer>
          <Card
            bgColor={"#e5e8e7"}
            marginTop={"13vw"}
            type={PackType.STARTER}
            bgColor2={"#737374"}
            fontColor={"#fff"}
          >
            <CardImageContainer>
              <CardImage src={StarterImg.src} />
              <Details availStock={Stock.STARTER} />
            </CardImageContainer>
            <CardContent>
              <Headline>{HeadlineText}</Headline>
              <Description SpecificItem={"1 random Normal skin 1-Star Beast"} />
            </CardContent>
            <PurchaseContent>
              <Purchase
                maxQuantity={Stock.STARTER}
                price={Price.STARTER}
                addressReservable={
                  process.env.NEXT_PUBLIC_ADDRESS_RESERVABLE_NORMAL_SKIN!
                }
                addressRefundable={
                  process.env.NEXT_PUBLIC_ADDRESS_REFUNDABLE_NORMAL_SKIN!
                }
                packType={PackType.STARTER}
              />
              {/* <PurchaseAlternative>Buy with other crypto</PurchaseAlternative> */}
            </PurchaseContent>
          </Card>
        </CardContainer>

        <CardContainer>
          <Card
            bgColor={"#f9edf7"}
            marginTop={"20vw"}
            type={PackType.CURSED_BLACK}
            bgColor2={"#751ad0"}
            fontColor={"#fff"}
          >
            <CardImageContainer>
              <CardImage src={CursedImg.src} />
              <Details availStock={Stock.CURSED} />
            </CardImageContainer>
            <CardContent>
              <CursedHeadline>{HeadlineText}</CursedHeadline>
              <Description
                SpecificItem={"1 random Cursed Black 1-Star Beast"}
              />
            </CardContent>
            <PurchaseContent>
              <Purchase
                maxQuantity={Stock.CURSED}
                price={Price.CURSED}
                addressReservable={
                  process.env.NEXT_PUBLIC_ADDRESS_RESERVABLE_CURSED_BLACK!
                }
                addressRefundable={
                  process.env.NEXT_PUBLIC_ADDRESS_REFUNDABLE_CURSED_BLACK!
                }
                packType={PackType.CURSED_BLACK}
              />
              {/* <PurchaseAlternative>Buy with other crypto</PurchaseAlternative> */}
            </PurchaseContent>
          </Card>
        </CardContainer>

        <CardContainer>
          <Card
            bgColor={"#fff4d1"}
            marginTop={"20vw"}
            type={PackType.SHINY_GOLD}
            bgColor2={"#ffda66"}
            fontColor={"#a15813"}
          >
            <CardImageContainer>
              <CardImage src={ShinyImg.src} />
              <Details availStock={Stock.SHINY} />
            </CardImageContainer>
            <CardContent>
              <ShinyHeadline>{HeadlineText}</ShinyHeadline>
              <Description SpecificItem={"1 random Shiny Gold 1-Star Beast"} />
            </CardContent>
            <PurchaseContent>
              <Purchase
                maxQuantity={Stock.SHINY}
                price={Price.SHINY}
                addressReservable={
                  process.env.NEXT_PUBLIC_ADDRESS_RESERVABLE_GOLD_STAR!
                }
                addressRefundable={
                  process.env.NEXT_PUBLIC_ADDRESS_REFUNDABLE_GOLD_STAR!
                }
                packType={PackType.SHINY_GOLD}
              />
              {/* <PurchaseAlternative>Buy with other crypto</PurchaseAlternative> */}
            </PurchaseContent>
          </Card>
        </CardContainer>
        <BottomTextContainer>
          <BottomP>
            You can place your order between Feb 25-28, 12PM PST
          </BottomP>
          <BottomP>
            We will announce winners and distribute/reserve/refund before Mar 11
            end of the day
          </BottomP>
        </BottomTextContainer>
      </Content>
    </Container>
  )
}

export default PackStore
