import React, { FC, useState } from "react"
import styled from "styled-components"
import NextLink from "next/link"
import Chest from "public/chest.png"
import ChestGreenSparkle from "public/chest_green_sparkle.gif"
import PurchaseChestModal from "../PurchaseChestModal"

const ChestDiv = styled.div<any>`
  --leftMid: ${(props) => props.randXMid}vw;
  --topMid: ${(props) => props.randYMid}%;

  --left: ${(props) => props.randXAfter}vw;
  --top: ${(props) => props.randYAfter}%;

  position: absolute;
  display: flex;
  justify-content: center;
  width: ${(props) => props.width}px;
  height: auto;
  left: ${(props) => props.randX || 0}vw;
  top: ${(props) => props.randY || 0}%;

  animation: move cubic-bezier(0.73, 0.29, 0.35, 0.78) infinite alternate;
  animation-delay: 5s;
  animation-duration: ${(props) => props.speed || 5}s;

  @keyframes move {
    50% {
      left: var(--leftMid);
      top: var(--topMid);
    }
    100% {
      left: var(--left);
      top: var(--top);
    }
  }
  &:hover {
    animation-play-state: paused;
    z-index: 100;
  }
`

const Img = styled.img`
  width: ${(props) => props.width}px;
  margin-bottom: -30px;
  ${ChestDiv}:hover & {
    filter: opacity(25%);
  }
`

const ChestButton = styled.button`
  font-size: 1.2em;
  position: absolute;
  top: 65%;
  text-transform: uppercase;
  font-weight: 900;
  border: none;
  transform: scale(0.2);
  transition: transform 0.2s ease-out;
  &:hover {
    color: #f3cb23;
  }

  opacity: 0;
  ${ChestDiv}:hover & {
    opacity: 1;
    transform: scale(1);
  }
  :disabled {
    color: red;
  }
`

const ChestSerial = styled.div<any>`
  position: absolute;
  width: ${(props) => props.width}px;
  top: 13%;
  text-transform: uppercase;
  color: #f3cb23;
  transform: scale(0.2);
  transition: transform 0.2s ease-out;
  opacity: 0;
  /* font-size: 1em !important; */
  ${ChestDiv}:hover & {
    opacity: 1;
    transform: scale(1);
  }
`

const ChestPrice = styled.div<any>`
  font-size: 1.2em;
  position: absolute;
  width: ${(props) => props.width}px;
  top: 33%;
  text-transform: uppercase;
  color: #f3cb23;
  transform: scale(0.2);
  transition: transform 0.2s ease-out;
  opacity: 0;
  /* font-size: 1em !important; */
  ${ChestDiv}:hover & {
    opacity: 1;
    transform: scale(1);
  }
`

type Props = {
  id: any
  address: any
  price: any
  width: number
  claimedFUSDRewards: any
  saleIDs: any
  chestIDs: any
  user: any
  whitelist: any
  whitelistUsed: any
  setOpenDelist: any
  setOpenPurchase: any
  setSelectedID: any
  setSelectedPrice: any
  setSelectedAddress: any
  setIsPurchaseWithWhitelist: any
}

const RandomChest: FC<Props> = ({
  id,
  address,
  price,
  width,
  claimedFUSDRewards,
  saleIDs,
  chestIDs,
  user,
  whitelist,
  whitelistUsed,
  setOpenDelist,
  setOpenPurchase,
  setSelectedID,
  setSelectedPrice,
  setSelectedAddress,
  setIsPurchaseWithWhitelist,
}) => {
  var randomX = Math.floor(Math.random() * (85 - 10 + 1 + 10))
  var randomY = Math.floor(Math.random() * (70 - 0 + 1 + 0))
  var randomXMid = Math.floor(Math.random() * (85 - 10 + 1 + 10))
  var randomYMid = Math.floor(Math.random() * (70 - 0 + 1 + 0))
  var randomXAfter = Math.floor(Math.random() * (85 - 10 + 1 + 10))
  var randomYAfter = Math.floor(Math.random() * (70 - 0 + 1 + 0))
  var speed = Math.floor(Math.random() * (15 - 3 + 1) + 3)

  // const purchaseWithChest = async (address: any, chestID: any, price: any) => {
  //   const id = toast.loading("Initializing...")

  //   try {
  //     const res = await send([
  //       transaction(`
  //       import FungibleToken from 0xFungibleToken
  //       import NonFungibleToken from 0xNonFungibleToken
  //       import FUSD from 0xFUSD
  //       import BlackMarketplace from 0xBlackMarketplace
  //       import NFTDayTreasureChest from 0xNFTDayTreasureChest

  //       //this transaction buy a chest from a direct sale listing from another user
  //       transaction(saleAddress: Address, tokenId: UInt64, amount: UFix64) {

  //           // reference to the buyer's NFT collection where they
  //           // will store the bought NFT

  //           let vaultCap: Capability<&FUSD.Vault{FungibleToken.Receiver}>
  //           let collectionCap: Capability<&{NFTDayTreasureChest.NFTDayTreasureChestCollectionPublic}>
  //           // Vault that will hold the tokens that will be used
  //           // to buy the NFT
  //           let temporaryVault: @FungibleToken.Vault
  //           let chestCollection: &NFTDayTreasureChest.Collection

  //           prepare(account: AuthAccount) {

  //               // get the references to the buyer's Vault and NFT Collection receiver
  //               var collectionCap = account.getCapability<&{NFTDayTreasureChest.NFTDayTreasureChestCollectionPublic}>(NFTDayTreasureChest.CollectionPublicPath)
  //               self.chestCollection = account.borrow<&NFTDayTreasureChest.Collection>(from: NFTDayTreasureChest.CollectionStoragePath)!

  //               // if collection is not created yet we make it.
  //               if !collectionCap.check() {
  //                   // store an empty NFT Collection in account storage
  //                   account.save<@NonFungibleToken.Collection>(<- NFTDayTreasureChest.createEmptyCollection(), to: NFTDayTreasureChest.CollectionStoragePath)
  //                   // publish a capability to the Collection in storage
  //                   account.link<&{NFTDayTreasureChest.NFTDayTreasureChestCollectionPublic}>(NFTDayTreasureChest.CollectionPublicPath, target: NFTDayTreasureChest.CollectionStoragePath)
  //               }

  //               self.collectionCap = collectionCap

  //               self.vaultCap = account.getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver)

  //               let vaultRef = account.borrow<&{FungibleToken.Provider}>(from: /storage/fusdVault) ?? panic("Could not borrow owner's Vault reference")

  //               // withdraw tokens from the buyer's Vault
  //               self.temporaryVault <- vaultRef.withdraw(amount: amount)
  //           }

  //           execute {
  //               // get the read-only account storage of the seller
  //               let seller = getAccount(saleAddress)

  //               let marketplace = seller.getCapability(BlackMarketplace.CollectionPublicPath).borrow<&{BlackMarketplace.SalePublic}>()
  //                               ?? panic("Could not borrow seller's sale reference")

  //               let IDs = self.chestCollection.getIDs()

  //               let nft <- self.chestCollection.withdraw(withdrawID: IDs[0]) as! @NFTDayTreasureChest.NFT

  //               let returnedChest <- marketplace.purchaseWithTreasureChest(tokenID: tokenId, recipientCap: self.collectionCap, buyTokens: <- self.temporaryVault, chest: <-nft)

  //               self.chestCollection.deposit(token: <-returnedChest)
  //           }

  //       }

  //       `),
  //       args([
  //         arg(address, t.Address),
  //         arg(parseInt(chestID), t.UInt64),
  //         arg(price, t.UFix64),
  //       ]),
  //       payer(authz),
  //       proposer(authz),
  //       authorizations([authz]),
  //       limit(9999),
  //     ]).then(decode)

  //     tx(res).subscribe((res: any) => {
  //       if (res.status === 1) {
  //         toast.update(id, {
  //           render: "Pending...",
  //           type: "default",
  //           isLoading: true,
  //           autoClose: 5000,
  //         })
  //       }
  //       if (res.status === 2) {
  //         toast.update(id, {
  //           render: "Finalizing...",
  //           type: "default",
  //           isLoading: true,
  //           autoClose: 5000,
  //         })
  //       }
  //       if (res.status === 3) {
  //         toast.update(id, {
  //           render: "Executing...",
  //           type: "default",
  //           isLoading: true,
  //           autoClose: 5000,
  //         })
  //       }
  //     })
  //     await tx(res)
  //       .onceSealed()
  //       .then((result: any) => {
  //         toast.update(id, {
  //           render: "Transaction Sealed",
  //           type: "success",
  //           isLoading: false,
  //           autoClose: 5000,
  //         })
  //       })

  //     getWhitelist()
  //     getWhitelistUsed()
  //     getAllChestSaleOffers()
  //     fetchUserChests()
  //     getClaimedFUSDRewards()
  //   } catch (err) {
  //     toast.update(id, {
  //       render: () => <div>Error, try again later...</div>,
  //       type: "error",
  //       isLoading: false,
  //       autoClose: 5000,
  //     })
  //     console.log(err)
  //   }
  // }

  // const purchaseWithWhitelist = async (
  //   address: any,
  //   chestID: any,
  //   price: any,
  // ) => {
  //   const id = toast.loading("Initializing...")

  //   try {
  //     const res = await send([
  //       transaction(`
  //       import FungibleToken from 0xFungibleToken
  //       import NonFungibleToken from 0xNonFungibleToken
  //       import FUSD from 0xFUSD
  //       import BlackMarketplace from 0xBlackMarketplace
  //       import NFTDayTreasureChest from 0xNFTDayTreasureChest

  //       //this transaction buy a chest from a direct sale listing from another user
  //       transaction(saleAddress: Address, tokenId: UInt64, amount: UFix64) {

  //           // reference to the buyer's NFT collection where they
  //           // will store the bought NFT

  //           let vaultCap: Capability<&FUSD.Vault{FungibleToken.Receiver}>
  //           let collectionCap: Capability<&{NFTDayTreasureChest.NFTDayTreasureChestCollectionPublic}>
  //           // Vault that will hold the tokens that will be used
  //           // to buy the NFT
  //           let temporaryVault: @FungibleToken.Vault

  //           prepare(account: AuthAccount) {

  //               // get the references to the buyer's Vault and NFT Collection receiver
  //               var collectionCap = account.getCapability<&{NFTDayTreasureChest.NFTDayTreasureChestCollectionPublic}>(NFTDayTreasureChest.CollectionPublicPath)

  //               // if collection is not created yet we make it.
  //               if !collectionCap.check() {
  //                   // store an empty NFT Collection in account storage
  //                   account.save<@NonFungibleToken.Collection>(<- NFTDayTreasureChest.createEmptyCollection(), to: NFTDayTreasureChest.CollectionStoragePath)
  //                   // publish a capability to the Collection in storage
  //                   account.link<&{NFTDayTreasureChest.NFTDayTreasureChestCollectionPublic}>(NFTDayTreasureChest.CollectionPublicPath, target: NFTDayTreasureChest.CollectionStoragePath)
  //               }

  //               self.collectionCap = collectionCap

  //               self.vaultCap = account.getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver)

  //               let vaultRef = account.borrow<&{FungibleToken.Provider}>(from: /storage/fusdVault) ?? panic("Could not borrow owner's Vault reference")

  //               // withdraw tokens from the buyer's Vault
  //               self.temporaryVault <- vaultRef.withdraw(amount: amount)
  //           }

  //           execute {
  //               // get the read-only account storage of the seller
  //               let seller = getAccount(saleAddress)

  //               let marketplace = seller.getCapability(BlackMarketplace.CollectionPublicPath).borrow<&{BlackMarketplace.SalePublic}>()
  //                               ?? panic("Could not borrow seller's sale reference")

  //               marketplace.purchaseWithWhitelist(tokenID: tokenId, recipientCap: self.collectionCap, buyTokens: <- self.temporaryVault)
  //           }

  //       }

  //       `),

  //       args([
  //         arg(address, t.Address),
  //         arg(parseInt(chestID), t.UInt64),
  //         arg(price, t.UFix64),
  //       ]),
  //       payer(authz),
  //       proposer(authz),
  //       authorizations([authz]),
  //       limit(9999),
  //     ]).then(decode)

  //     tx(res).subscribe((res: any) => {
  //       if (res.status === 1) {
  //         toast.update(id, {
  //           render: "Pending...",
  //           type: "default",
  //           isLoading: true,
  //           autoClose: 5000,
  //         })
  //       }
  //       if (res.status === 2) {
  //         toast.update(id, {
  //           render: "Finalizing...",
  //           type: "default",
  //           isLoading: true,
  //           autoClose: 5000,
  //         })
  //       }
  //       if (res.status === 3) {
  //         toast.update(id, {
  //           render: "Executing...",
  //           type: "default",
  //           isLoading: true,
  //           autoClose: 5000,
  //         })
  //       }
  //     })
  //     await tx(res)
  //       .onceSealed()
  //       .then((result: any) => {
  //         toast.update(id, {
  //           render: "Transaction Sealed",
  //           type: "success",
  //           isLoading: false,
  //           autoClose: 5000,
  //         })
  //       })

  //     getWhitelist()
  //     getWhitelistUsed()
  //     getAllChestSaleOffers()
  //     fetchUserChests()
  //     getClaimedFUSDRewards()
  //   } catch (err) {
  //     toast.update(id, {
  //       render: () => <div>Error, try again later...</div>,
  //       type: "error",
  //       isLoading: false,
  //       autoClose: 5000,
  //     })
  //     console.log(err)
  //   }
  // }

  return (
    <ChestDiv
      id="a"
      key={id}
      randX={randomX}
      randY={randomY}
      randXMid={randomXMid}
      randYMid={randomYMid}
      randXAfter={randomXAfter}
      randYAfter={randomYAfter}
      speed={speed}
      width={width}
    >
      {!claimedFUSDRewards.includes(parseInt(id)) ? (
        <Img width={width} src={ChestGreenSparkle.src} />
      ) : (
        <Img width={width} src={Chest.src} />
      )}

      {/* <ChestSerial width={width}>
        <div>Serial #{id}</div>
      </ChestSerial> */}

      <ChestPrice width={width}>
        <div>${parseFloat(price).toFixed(0)}</div>
      </ChestPrice>

      {!saleIDs?.includes(parseInt(id)) ? ( //Does not own chest
        <>
          {whitelist.includes(user?.addr) &&
          !whitelistUsed.includes(user?.addr) ? ( //is whitelisted and have not used it
            <ChestButton
              onClick={() => {
                // purchaseWithWhitelist(address, id, price)
                // alert("Confirm Price: $" + parseFloat(price).toFixed(0))
                setSelectedID(id)
                setSelectedPrice(price)
                setSelectedAddress(address)
                setIsPurchaseWithWhitelist(true)
                setOpenPurchase(true)
              }}
            >
              Buy with Whitelist
            </ChestButton>
          ) : (
            <>
              {chestIDs?.length > 0 ? ( //has a chest and can buy another
                <ChestButton
                  onClick={() => {
                    // purchaseWithChest(address, id, price)
                    // alert("Confirm Price: $" + parseFloat(price).toFixed(0))

                    setSelectedID(id)
                    setSelectedPrice(price)
                    setSelectedAddress(address)
                    setIsPurchaseWithWhitelist(false)
                    setOpenPurchase(true)
                  }}
                >
                  Buy Now
                </ChestButton>
              ) : (
                <ChestButton disabled={true}>
                  Can&apos;t Buy Need Chest
                </ChestButton>
              )}
            </>
          )}
        </>
      ) : (
        //owns chest
        <ChestButton onClick={() => setOpenDelist(true)}>
          Your Chest
        </ChestButton>
      )}
    </ChestDiv>
  )
}
export default RandomChest
