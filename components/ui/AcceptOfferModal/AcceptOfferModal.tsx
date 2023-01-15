import { FC, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import styled from "styled-components"
import { useUser } from "@components/user/UserProvider"
import beastTemplates from "data/beastTemplates"

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
  margin-top: 10px;
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
  border-bottom: 2px solid #2e3340;

  display: table;
  clear: both;
`

const Text = styled.h3`
  font-size: 1.2em;
  margin-bottom: 0px;
  line-height: 1em;
  text-align: left;

  color: #fff;

  border-bottom: 2px solid #2e3340;
  padding-bottom: 10px;

  display: table;
  clear: both;
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
  offer: any
}

const AcceptOfferModal: FC<Props> = ({ open, setOpen, beast, offer }) => {
  const { acceptOffer } = useUser()

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
                  <Text>
                    <span style={{ float: "left" }}>Subtotal:</span>{" "}
                    <span style={{ float: "right" }}>
                      ${parseFloat(offer?.offerAmount)} FUSD
                    </span>
                  </Text>
                  <Text>
                    <span style={{ float: "left" }}>Creator royalty:</span>{" "}
                    <span style={{ float: "right" }}>5%</span>
                  </Text>
                  <Text>
                    <span style={{ float: "left" }}>First owner royalty:</span>{" "}
                    <span style={{ float: "right" }}>5%</span>
                  </Text>
                  <Title style={{ border: "none" }}>
                    <span style={{ float: "left" }}>Total received:</span>{" "}
                    <span style={{ float: "right" }}>
                      ${parseFloat(offer?.offerAmount) * 0.9} FUSD
                    </span>
                  </Title>
                  <div>
                    <Button
                      onClick={() => {
                        acceptOffer(offer?.offeror, offer?.offerID, beast?.id)
                        setOpen(false)
                      }}
                    >
                      Accept offer
                    </Button>
                    {beast?.id != offer?.beastID && (
                      <div>Something is wrong</div>
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

export default AcceptOfferModal
