import { FC, Fragment, useEffect, useState } from "react"
import { Dialog, Transition, Menu } from "@headlessui/react"
import styled from "styled-components"
import { useUser } from "@components/user/UserProvider"
import beastTemplates from "data/beastTemplates"
import { useAuth } from "@components/auth/AuthProvider"

const ContainerDiv = styled.div`
  align-items: center;
  text-align: center;
  z-index: 20;
`

const DialogPanel = styled<any>(Dialog.Panel)`
  background: #111823;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 30vh;
  height: auto;
  padding: 40px;

  text-align: center;
`

const Container = styled.div`
  // overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: auto;
`

const Button = styled.button`
  // margin-top: 10px;
  font-size: 1.5em;
  width: 100%;
  color: white;
  border: 1px solid;
  border-radius: 5px;
  font-weight: 900;
  &:hover {
    color: #f3cb23;
  }
  &:disabled {
    background: gray;
    color: #fff;
    opacity: 0.35;
  }
`

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 0px;
  line-height: 1em;
  text-align: left;

  color: #fff;
`

const A = styled.a`
  font-size: 1em;
`

const FuncArgInput = styled.input`
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  font-size: 1.5em;
  padding: 5px 0px 5px 20px;
  border-radius: 8px;
  /* width: 50%; */
  cursor: pointer;
  outline: none;
  width: 100%;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const Img = styled.img`
  user-drag: none;
  -webkit-user-drag: none;
  border-radius: 10px;
`

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  open: boolean
  setOpen: any
  beast: any
}

const PlaceABidModal: FC<Props> = ({ open, setOpen, beast }) => {
  const [price, setPrice] = useState(0.0)
  const { placeABid, balance } = useUser()
  const { loggedIn, logIn } = useAuth()

  const handleChange = (event: any) => {
    event.preventDefault()
    var result = event.target.value.replace(/[^0-9.]/g, "")
    result = parseFloat(result).toFixed(2)
    console.log(result)

    setPrice(result.toString())
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <ContainerDiv className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                style={{
                  borderRadius: "20px",
                }}
                className="relative rounded-lg text-left transform transition-all sm:my-8 sm:max-w-md w-full md:max-w-md"
              >
                <Container>
                  <Img
                    src={
                      "https://basicbeasts.mypinata.cloud/ipfs/" +
                      beastTemplates[
                        beast?.beastTemplateID as keyof typeof beastTemplates
                      ]?.thumbnail
                    }
                  />
                  <Title>
                    {beast?.name} Serial#{beast?.serialNumber}
                  </Title>
                  {beast?.name != beast?.nickname && (
                    <Title>{beast?.nickname}</Title>
                  )}
                  <Title>FUSD Balance: {parseFloat(balance)}</Title>
                  <div
                    className="text-right absolute top-0 left-0 right-3 sm:hidden"
                    onClick={() => setOpen(false)}
                  >
                    <div style={{ fontSize: "2em", color: "white" }}>x</div>
                  </div>
                  <div style={{ marginTop: "20px;" }}>
                    <FuncArgInput
                      id="myTextBox"
                      placeholder="Price in FUSD"
                      type="number"
                      onChange={
                        handleChange
                        // (e: any) => setPrice(e.target.value)
                      }
                    />
                  </div>
                  <div>
                    {!loggedIn ? (
                      <Button onClick={() => logIn()}>Make offer</Button>
                    ) : (
                      <Button
                        disabled={parseFloat(balance) < price}
                        onClick={() => {
                          console.log("price", price)
                          console.log("beastID", beast?.id)
                          placeABid(price, beast?.id)
                          setOpen(false)
                        }}
                      >
                        {parseFloat(balance) < price
                          ? "Not enough FUSD"
                          : "Make offer"}
                      </Button>
                    )}
                  </div>
                </Container>
              </DialogPanel>
            </Transition.Child>
          </ContainerDiv>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default PlaceABidModal
