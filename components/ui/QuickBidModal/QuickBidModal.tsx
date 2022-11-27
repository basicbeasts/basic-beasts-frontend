import { FC, Fragment, useEffect, useState } from "react"
import { Dialog, Transition, Menu } from "@headlessui/react"
import styled from "styled-components"
import { ChevronDownIcon } from "@heroicons/react/solid"
import * as fcl from "@onflow/fcl"
import {
  query,
  send,
  transaction,
  args,
  arg,
  payer,
  proposer,
  authorizations,
  limit,
  authz,
  decode,
  tx,
} from "@onflow/fcl"
import * as t from "@onflow/types"
import { toast } from "react-toastify"
import { useUser } from "@components/user/UserProvider"

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
`

const Title = styled.div`
  font-size: 2.5em;
  margin-bottom: 20px;

  color: #fff;
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
  //
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

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  open: boolean
  setOpen: any
  beast: any
}

const QuickBidModal: FC<Props> = ({ open, setOpen, beast }) => {
  const [price, setPrice] = useState()

  const handleChange = (event: any) => {
    event.preventDefault()
    var result = event.target.value.replace(/[^0-9.]/g, "")
    result = parseFloat(result).toFixed(2)
    console.log(result)

    setPrice(result.toString())
  }

  // List Chest for sale
  //   const listForSale = async () => {
  //     const id = toast.loading("Initializing...")

  //     try {
  //       const res = await send([
  //         transaction(`
  //         import FungibleToken from 0xFungibleToken
  //         import NonFungibleToken from 0xNonFungibleToken
  //         import FUSD from 0xFUSD
  //         import BlackMarketplace from 0xBlackMarketplace
  //         import NFTDayTreasureChest from 0xNFTDayTreasureChest

  //         transaction(
  //             id: UInt64,
  //             price: UFix64) {

  //             let chestCollection: &NFTDayTreasureChest.Collection
  //             let marketplace: &BlackMarketplace.SaleCollection

  //             prepare(account: AuthAccount) {

  //                 let marketplaceCap = account.getCapability<&{BlackMarketplace.SalePublic}>(BlackMarketplace.CollectionPublicPath)

  //                 if account.borrow<&FUSD.Vault>(from: /storage/fusdVault) == nil {
  //                   // Create a new FUSD Vault and put it in storage
  //                   account.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)

  //                   // Create a public capability to the Vault that only exposes
  //                   // the deposit function through the Receiver interface
  //                   account.link<&FUSD.Vault{FungibleToken.Receiver}>(
  //                       /public/fusdReceiver,
  //                       target: /storage/fusdVault
  //                   )

  //                   // Create a public capability to the Vault that only exposes
  //                   // the balance field through the Balance interface
  //                   account.link<&FUSD.Vault{FungibleToken.Balance}>(
  //                       /public/fusdBalance,
  //                       target: /storage/fusdVault
  //                   )
  //                 }

  //                 // if sale collection is not created yet we make it.
  //                 if !marketplaceCap.check() {
  //                     let wallet =  account.getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver)
  //                     let sale <- BlackMarketplace.createSaleCollection(ownerVault: wallet)

  //                     // store an empty NFT Collection in account storage
  //                     account.save<@BlackMarketplace.SaleCollection>(<- sale, to:BlackMarketplace.CollectionStoragePath)
  //                     // publish a capability to the Collection in storage
  //                     account.link<&{BlackMarketplace.SalePublic}>(BlackMarketplace.CollectionPublicPath, target: BlackMarketplace.CollectionStoragePath)
  //                 }

  //                 self.marketplace = account.borrow<&BlackMarketplace.SaleCollection>(from: BlackMarketplace.CollectionStoragePath)!
  //                 self.chestCollection = account.borrow<&NFTDayTreasureChest.Collection>(from: NFTDayTreasureChest.CollectionStoragePath)!
  //             }

  //             execute {
  //                 let chest <- self.chestCollection.withdraw(withdrawID: id) as! @NFTDayTreasureChest.NFT
  //                 self.marketplace.listForSale(token: <- chest, price: price)
  //             }
  //         }

  //         `),
  //         args([arg(selectedID, t.UInt64), arg(price, t.UFix64)]),
  //         payer(authz),
  //         proposer(authz),
  //         authorizations([authz]),
  //         limit(9999),
  //       ]).then(decode)

  //       tx(res).subscribe((res: any) => {
  //         if (res.status === 1) {
  //           toast.update(id, {
  //             render: "Pending...",
  //             type: "default",
  //             isLoading: true,
  //             autoClose: 5000,
  //           })
  //         }
  //         if (res.status === 2) {
  //           toast.update(id, {
  //             render: "Finalizing...",
  //             type: "default",
  //             isLoading: true,
  //             autoClose: 5000,
  //           })
  //         }
  //         if (res.status === 3) {
  //           toast.update(id, {
  //             render: "Executing...",
  //             type: "default",
  //             isLoading: true,
  //             autoClose: 5000,
  //           })
  //         }
  //       })
  //       await tx(res)
  //         .onceSealed()
  //         .then((result: any) => {
  //           toast.update(id, {
  //             render: "Transaction Sealed",
  //             type: "success",
  //             isLoading: false,
  //             autoClose: 2000,
  //           })
  //         })
  //       setOpen(false)
  //       fetchUserChests()
  //       getAllChestSaleOffers()
  //     } catch (err) {
  //       toast.update(id, {
  //         render: () => <div>Error, try again later...</div>,
  //         type: "error",
  //         isLoading: false,
  //         autoClose: 2000,
  //       })
  //       console.log(err)
  //     }
  //   }

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
                  <Title>{beast?.id}</Title>

                  <div>
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
                    <Button
                    //   onClick={
                    // () => listForSale()
                    //   }
                    >
                      Bid
                    </Button>
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

export default QuickBidModal
