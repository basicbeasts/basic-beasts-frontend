import styled from "styled-components"
import { motion } from "framer-motion"
import { useAuth } from "@components/auth/AuthProvider"
import { useEffect, useState, FC } from "react"
import { toast } from "react-toastify"
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
import "react-toastify/dist/ReactToastify.css"
import ChestRewardsModal from "../ChestRewardsModal"
import ListForSaleModal from "../ListForSaleModal"
import { useUser } from "@components/user/UserProvider"
import DelistModal from "../DelistModal"
import RandomChest from "../RandomChest"
import PurchaseChestModal from "../PurchaseChestModal"

const Container = styled.div`
  position: relative;
  background: black;
  color: white;
  height: 90vh;
  width: 100vw;
  font-size: 1em;
  text-align: center;
  z-index: 2;
`

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
const TextDiv = styled<any>(motion.div)`
  position: absolute;
  display: grid;
  gap: 10px;
  margin: 20px;
  padding: 50px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
  font-size: 18px;
  color: white;
`
const ChestButton = styled.button`
  position: absolute;
  top: 65%;
  text-transform: uppercase;
  // padding: 5px;
  font-weight: 900;
  /* color: black; */
  // border-radius: 5px;
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

const ChestText = styled.div<any>`
  position: absolute;
  width: ${(props) => props.width}px;
  top: 43%;
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

const ListingsButton = styled.button`
  color: white;
  border: 1px solid;
  border-radius: 5px;
  font-weight: 900;
  &:hover {
    color: #f3cb23;
  }
`

const Chests: FC = () => {
  const [openRewards, setOpenRewards] = useState(false)
  const [openListForSale, setOpenListForSale] = useState(false)
  const [openDelist, setOpenDelist] = useState(false)
  const [openPurchase, setOpenPurchase] = useState(false)
  const [whitelist, setWhitelist] = useState<any>([])
  const [whitelistUsed, setWhitelistUsed] = useState<any>([])

  const [selectedID, setSelectedID] = useState(null)
  const [selectedPrice, setSelectedPrice] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [isPurchaseWithWhitelist, setIsPurchaseWithWhitelist] = useState(false)

  const {
    chestIDs,
    saleIDs,
    totalUserChests,
    getAllChestSaleOffers,
    saleOffers,
    fetchUserChests,
    floorPrice,
    claimedFUSDRewards,
    getClaimedFUSDRewards,
    getFUSDBalance,
  } = useUser()

  const { logIn, logOut, user, loggedIn } = useAuth()

  useEffect(() => {
    getWhitelist()
    getWhitelistUsed()
    getAllChestSaleOffers()
    fetchUserChests()
    getClaimedFUSDRewards()
    getFUSDBalance()
  }, [])

  const purchaseWithChest = async (address: any, chestID: any, price: any) => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
        import FungibleToken from 0xFungibleToken
        import NonFungibleToken from 0xNonFungibleToken
        import FUSD from 0xFUSD
        import BlackMarketplace from 0xBlackMarketplace
        import NFTDayTreasureChest from 0xNFTDayTreasureChest
        
        //this transaction buy a chest from a direct sale listing from another user
        transaction(saleAddress: Address, tokenId: UInt64, amount: UFix64) {

            // reference to the buyer's NFT collection where they
            // will store the bought NFT

            let vaultCap: Capability<&FUSD.Vault{FungibleToken.Receiver}>
            let collectionCap: Capability<&{NFTDayTreasureChest.NFTDayTreasureChestCollectionPublic}>
            // Vault that will hold the tokens that will be used
            // to buy the NFT
            let temporaryVault: @FungibleToken.Vault
            let chestCollection: &NFTDayTreasureChest.Collection

            prepare(account: AuthAccount) {

                // get the references to the buyer's Vault and NFT Collection receiver
                var collectionCap = account.getCapability<&{NFTDayTreasureChest.NFTDayTreasureChestCollectionPublic}>(NFTDayTreasureChest.CollectionPublicPath)
                self.chestCollection = account.borrow<&NFTDayTreasureChest.Collection>(from: NFTDayTreasureChest.CollectionStoragePath)!

                // if collection is not created yet we make it.
                if !collectionCap.check() {
                    // store an empty NFT Collection in account storage
                    account.save<@NonFungibleToken.Collection>(<- NFTDayTreasureChest.createEmptyCollection(), to: NFTDayTreasureChest.CollectionStoragePath)
                    // publish a capability to the Collection in storage
                    account.link<&{NFTDayTreasureChest.NFTDayTreasureChestCollectionPublic}>(NFTDayTreasureChest.CollectionPublicPath, target: NFTDayTreasureChest.CollectionStoragePath)
                }

                self.collectionCap = collectionCap

                self.vaultCap = account.getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver)

                let vaultRef = account.borrow<&{FungibleToken.Provider}>(from: /storage/fusdVault) ?? panic("Could not borrow owner's Vault reference")

                // withdraw tokens from the buyer's Vault
                self.temporaryVault <- vaultRef.withdraw(amount: amount)
            }

            execute {
                // get the read-only account storage of the seller
                let seller = getAccount(saleAddress)

                let marketplace = seller.getCapability(BlackMarketplace.CollectionPublicPath).borrow<&{BlackMarketplace.SalePublic}>()
                                ?? panic("Could not borrow seller's sale reference")

                assert(marketplace.isInstance(Type<@BlackMarketplace.SaleCollection>()), message: "Incorrect type!")

                let IDs = self.chestCollection.getIDs()

                let nft <- self.chestCollection.withdraw(withdrawID: IDs[0]) as! @NFTDayTreasureChest.NFT

                let returnedChest <- marketplace.purchaseWithTreasureChest(tokenID: tokenId, recipientCap: self.collectionCap, buyTokens: <- self.temporaryVault, chest: <-nft)

                self.chestCollection.deposit(token: <-returnedChest)
            }

        }
        
        `),
        args([
          arg(address, t.Address),
          arg(parseInt(chestID), t.UInt64),
          arg(price, t.UFix64),
        ]),
        payer(authz),
        proposer(authz),
        authorizations([authz]),
        limit(9999),
      ]).then(decode)

      tx(res).subscribe((res: any) => {
        if (res.status === 1) {
          toast.update(id, {
            render: "Pending...",
            type: "default",
            isLoading: true,
            autoClose: 5000,
          })
        }
        if (res.status === 2) {
          toast.update(id, {
            render: "Finalizing...",
            type: "default",
            isLoading: true,
            autoClose: 5000,
          })
        }
        if (res.status === 3) {
          toast.update(id, {
            render: "Executing...",
            type: "default",
            isLoading: true,
            autoClose: 5000,
          })
        }
      })
      await tx(res)
        .onceSealed()
        .then((result: any) => {
          toast.update(id, {
            render: "Transaction Sealed",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          })
        })

      getWhitelist()
      getWhitelistUsed()
      getAllChestSaleOffers()
      fetchUserChests()
      getClaimedFUSDRewards()
      getFUSDBalance()
      setOpenPurchase(false)
    } catch (err) {
      toast.update(id, {
        render: () => <div>Error, try again later...</div>,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      })
      console.log(err)
    }
  }

  const purchaseWithWhitelist = async (
    address: any,
    chestID: any,
    price: any,
  ) => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
        import FungibleToken from 0xFungibleToken
        import NonFungibleToken from 0xNonFungibleToken
        import FUSD from 0xFUSD
        import BlackMarketplace from 0xBlackMarketplace
        import NFTDayTreasureChest from 0xNFTDayTreasureChest

        //this transaction buy a chest from a direct sale listing from another user
        transaction(saleAddress: Address, tokenId: UInt64, amount: UFix64) {

            // reference to the buyer's NFT collection where they
            // will store the bought NFT

            let vaultCap: Capability<&FUSD.Vault{FungibleToken.Receiver}>
            let collectionCap: Capability<&{NFTDayTreasureChest.NFTDayTreasureChestCollectionPublic}>
            // Vault that will hold the tokens that will be used
            // to buy the NFT
            let temporaryVault: @FungibleToken.Vault

            prepare(account: AuthAccount) {

                // get the references to the buyer's Vault and NFT Collection receiver
                var collectionCap = account.getCapability<&{NFTDayTreasureChest.NFTDayTreasureChestCollectionPublic}>(NFTDayTreasureChest.CollectionPublicPath)

                // if collection is not created yet we make it.
                if !collectionCap.check() {
                    // store an empty NFT Collection in account storage
                    account.save<@NonFungibleToken.Collection>(<- NFTDayTreasureChest.createEmptyCollection(), to: NFTDayTreasureChest.CollectionStoragePath)
                    // publish a capability to the Collection in storage
                    account.link<&{NFTDayTreasureChest.NFTDayTreasureChestCollectionPublic}>(NFTDayTreasureChest.CollectionPublicPath, target: NFTDayTreasureChest.CollectionStoragePath)
                }

                self.collectionCap = collectionCap

                self.vaultCap = account.getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver)

                let vaultRef = account.borrow<&{FungibleToken.Provider}>(from: /storage/fusdVault) ?? panic("Could not borrow owner's Vault reference")

                // withdraw tokens from the buyer's Vault
                self.temporaryVault <- vaultRef.withdraw(amount: amount)
            }

            execute {
                // get the read-only account storage of the seller
                let seller = getAccount(saleAddress)

                let marketplace = seller.getCapability(BlackMarketplace.CollectionPublicPath).borrow<&{BlackMarketplace.SalePublic}>()
                                ?? panic("Could not borrow seller's sale reference")

                assert(marketplace.isInstance(Type<@BlackMarketplace.SaleCollection>()), message: "Incorrect type!") 

                marketplace.purchaseWithWhitelist(tokenID: tokenId, recipientCap: self.collectionCap, buyTokens: <- self.temporaryVault)
            }

        }
        
        `),

        args([
          arg(address, t.Address),
          arg(parseInt(chestID), t.UInt64),
          arg(price, t.UFix64),
        ]),
        payer(authz),
        proposer(authz),
        authorizations([authz]),
        limit(9999),
      ]).then(decode)

      tx(res).subscribe((res: any) => {
        if (res.status === 1) {
          toast.update(id, {
            render: "Pending...",
            type: "default",
            isLoading: true,
            autoClose: 5000,
          })
        }
        if (res.status === 2) {
          toast.update(id, {
            render: "Finalizing...",
            type: "default",
            isLoading: true,
            autoClose: 5000,
          })
        }
        if (res.status === 3) {
          toast.update(id, {
            render: "Executing...",
            type: "default",
            isLoading: true,
            autoClose: 5000,
          })
        }
      })
      await tx(res)
        .onceSealed()
        .then((result: any) => {
          toast.update(id, {
            render: "Transaction Sealed",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          })
        })

      getWhitelist()
      getWhitelistUsed()
      getAllChestSaleOffers()
      fetchUserChests()
      getClaimedFUSDRewards()
      getFUSDBalance()
      setOpenPurchase(false)
    } catch (err) {
      toast.update(id, {
        render: () => <div>Error, try again later...</div>,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      })
      console.log(err)
    }
  }

  const getWhitelist = async () => {
    try {
      let response = await query({
        cadence: `
        import NFTDayTreasureChest from 0xNFTDayTreasureChest
        
        pub fun main(): [Address] {
          return NFTDayTreasureChest.getWhitelist()
        }
        `,
      })
      setWhitelist(response)
    } catch (err) {
      console.log(err)
    }
  }

  const getWhitelistUsed = async () => {
    try {
      let response = await query({
        cadence: `
        import BlackMarketplace from 0xBlackMarketplace
        
        pub fun main(): [Address] {
          return BlackMarketplace.getWhitelistUsed()
        }
        `,
      })
      setWhitelistUsed(response)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <ChestRewardsModal open={openRewards} setOpen={setOpenRewards} />
      <ListForSaleModal
        open={openListForSale}
        setOpen={setOpenListForSale}
        IDs={chestIDs}
        // IDs={["0", "1", "2", "3", "4", "5", "6", "7", "8"]}
      />
      <DelistModal
        open={openDelist}
        setOpen={setOpenDelist}
        IDs={saleIDs}
        // IDs={["0", "1", "2", "3", "4", "5", "6", "7", "8"]}
      />
      <PurchaseChestModal
        open={openPurchase}
        setOpen={setOpenPurchase}
        IDs={saleIDs}
        id={selectedID}
        price={selectedPrice}
        address={selectedAddress}
        isPurchaseWithWhitelist={isPurchaseWithWhitelist}
        purchaseWithWhitelist={purchaseWithWhitelist}
        purchaseWithChest={purchaseWithChest}
      />

      <TextDiv
        animate={{ opacity: [0, 1] }}
        transition={{
          delay: 0.4,
        }}
      >
        {" "}
        <div style={{ fontSize: "1.2em" }}>
          Floor price: ${parseFloat(floorPrice).toFixed(0)} ₣USD
        </div>
        <div style={{ margin: "-10px 0 -5px", fontSize: "0.8em" }}>
          Market fee: 5%
        </div>
        {totalUserChests > 0 && (
          <div style={{ fontSize: "1em" }}>
            You have {totalUserChests}{" "}
            {totalUserChests > 1 ? "chests" : "chest"}
          </div>
        )}
        {user != null && (
          <>
            {whitelist.includes(user.addr) &&
            !whitelistUsed.includes(user.addr) ? (
              <div style={{ color: "#0ae890" }}>You are whitelisted</div>
            ) : (
              <></>
            )}
          </>
        )}
        <ListingsButton onClick={() => setOpenRewards(true)}>
          Chest Rewards
        </ListingsButton>
        {chestIDs?.length > 0 ? (
          <ListingsButton onClick={() => setOpenListForSale(true)}>
            List Chest ({chestIDs?.length})
          </ListingsButton>
        ) : (
          <></>
        )}
        {saleIDs?.length > 0 ? (
          <ListingsButton onClick={() => setOpenDelist(true)}>
            Delist Chest ({saleIDs?.length})
          </ListingsButton>
        ) : (
          <></>
        )}
      </TextDiv>
      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{
          delay: 1.4,
        }}
      >
        {saleOffers?.map((saleOffer: any, i: any) => (
          <>
            <RandomChest
              id={saleOffer.id}
              address={saleOffer.address}
              price={saleOffer.price}
              width={150}
              claimedFUSDRewards={claimedFUSDRewards}
              saleIDs={saleIDs}
              chestIDs={chestIDs}
              user={user}
              whitelist={whitelist}
              whitelistUsed={whitelistUsed}
              setOpenDelist={setOpenDelist}
              setOpenPurchase={setOpenPurchase}
              setSelectedID={setSelectedID}
              setSelectedPrice={setSelectedPrice}
              setSelectedAddress={setSelectedAddress}
              setIsPurchaseWithWhitelist={setIsPurchaseWithWhitelist}
            />
          </>
        ))}
      </motion.div>
    </Container>
  )
}

export default Chests
