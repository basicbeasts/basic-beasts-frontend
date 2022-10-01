import { FC, Fragment, useEffect, useState } from "react"
import { Dialog, Transition, Menu } from "@headlessui/react"
import styled from "styled-components"
import { ChevronDownIcon } from "@heroicons/react/solid"

const ContainerDiv = styled.div`
  align-items: center;
  text-align: center;
`

const DialogPanel = styled<any>(Dialog.Panel)`
  background: #111823;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 30vh;
  height: fit-content;
  text-align: center;
  padding: 40px;
`

const Container = styled.div`
  // overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 5px;
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
`

const Title = styled.div`
  font-size: 2.5em;
  margin-bottom: 20px;

  color: #fff;
`

const Price = styled.div`
  font-size: 1.2em;
  text-transform: uppercase;
  color: #e4be23;
`

const SelectButton = styled.div`
  font-size: 1.2em;
  border-radius: 10px;
  border: solid #bc9d24 2px;
  background: transparent;
  outline: none;
  &::placeholder {
    color: #e4be23;
  }
  text-transform: uppercase;
  color: #e4be23;
  &:hover {
    background: transparent;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  padding-left: 15px;
  // margin-left: 20px;
  // margin-right: 18px;
`

const A = styled.a`
  font-size: 1em;
`

const DropDownList = styled.div`
  width: 100%;
  height: auto;
  background-color: #212127;
  color: #e4be23;
  border-radius: 10px;
  z-index: 10;

  // Scroll
  overflow: hidden;
  overflow-y: scroll;
  max-height: 170px;
  margin-top: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const MenuItems = styled<any>(Menu.Items)`
  /* z-index: 9999; */
  width: 100%;
`

const FuncArgInput = styled.input`
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  font-size: 1.5em;
  padding: 10px 0px 10px 20px;
  border-radius: 8px;
  /* width: 50%; */
  cursor: pointer;
  margin-right: -1px;
  outline: none;
  -webkit-appearance: none;
  margin: 0;

  -moz-appearance: textfield;
`

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

const DropDown: FC<{
  IDs: any
  selectedID: any
  setSelectedID: any
}> = ({ IDs, selectedID, setSelectedID }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="w-full">
          <SelectButton>
            Serial #{selectedID}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </SelectButton>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="origin-top-right absolute left-0 rounded-md focus:outline-none">
          <DropDownList>
            <div className="py-1">
              {IDs?.map((chestID: any, i: any) => (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <A
                      onClick={() => {
                        setSelectedID(chestID)
                      }}
                      className={classNames(
                        active ? "bg-gray-700" : "",
                        "block px-4 py-2 text-sm",
                      )}
                    >
                      Serial #{chestID}
                    </A>
                  )}
                </Menu.Item>
              ))}
            </div>
          </DropDownList>
        </MenuItems>
      </Transition>
    </Menu>
  )
}

type Props = {
  open: boolean
  setOpen: any
  IDs: any
  id: any
  price: any
  address: any
  isPurchaseWithWhitelist: any
  purchaseWithWhitelist: any
  purchaseWithChest: any
}

const DelistModal: FC<Props> = ({
  open,
  setOpen,
  id,
  price,
  address,
  isPurchaseWithWhitelist,
  purchaseWithWhitelist,
  purchaseWithChest,
}) => {
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
                  <Title>Chest Serial #{id}</Title>
                  <Price>Price: ${parseFloat(price).toFixed(0)} ₣USD</Price>
                  {isPurchaseWithWhitelist ? (
                    <div>
                      <Button
                        onClick={() => {
                          // setOpen(false)
                          purchaseWithWhitelist(address, id, price)
                        }}
                      >
                        Buy with Whitelist
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        onClick={() => {
                          // setOpen(false)
                          purchaseWithChest(address, id, price)
                        }}
                      >
                        Buy Now
                      </Button>
                    </div>
                  )}
                </Container>
              </DialogPanel>
            </Transition.Child>
          </ContainerDiv>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default DelistModal
