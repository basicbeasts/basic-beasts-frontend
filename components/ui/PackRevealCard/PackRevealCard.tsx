import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import styled from "styled-components"
import StarterImg from "public/packs/pack_pf/starter.png"
import CursedImg from "public/packs/pack_pf/cursed.png"
import ShinyImg from "public/packs/pack_pf/shiny.png"
import { useUser } from "@components/user/UserProvider"
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
import { useAuth } from "@components/auth/AuthProvider"
import MaleIcon from "public/gender_icons/male_icon.png"
import FemaleIcon from "public/gender_icons/female_icon.png"
import beastTemplates from "data/beastTemplates"
import { toast } from "react-toastify"
import { toastStatus } from "@framework/helpers/toastStatus"

const Container = styled.div`
  text-align: center;
`

const TransitionDiv = styled.div<{ packOpened: boolean }>`
  padding: 0 30px;
  transition: 4s ease;
  // TODO: Make transition Needed to make transition animation. Look at RevealOverlay.tsx as example.
  opacity: ${({ packOpened }) => (packOpened ? "100%" : "0")};
  top: ${({ packOpened }) => (packOpened ? "0" : "-50%")};
`

const Img = styled.img`
  margin-bottom: 15px;
  object-fit: contain;
  width: 250px;
  margin: 2vw auto 1vw;
  padding-left: 45px;
  @media (max-width: 1010px) {
    width: 200px;
    margin: 5vw auto 1vw;
  }
  @media (max-width: 768px) {
    width: 240px;
    margin: 5vw auto 1vw;
  }
`

const Button = styled.button`
  text-transform: uppercase;
  margin-top: 1vw;
  padding: 2px 35px 5px;
  font-size: 1.2em;
  background-color: #212127;
  color: #fff;

  box-shadow: ${(props) =>
    `-3px 0px 0px 0px #2C323B, 0px -3px 0px 0px #2C323B, 0px 3px 0px 0px #2C323B, 
      3px 0px 0px 0px #2C323B, inset -3px -3px #37373D`};

  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  @media (max-width: 1010px) {
    font-size: 1.5em;
  }
  @media (max-width: 1010px) {
    /* width: 26vw; */
  }
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: ${(
      props,
    ) => `-3px 0px 0px 0px #2C323B, 0px -3px 0px 0px #2C323B,
        0px 3px 0px 0px #2C323B, 3px 0px 0px 0px #2C323B, inset 3px 3px #37373D`};
  }
`

const HeaderDetails = styled.div`
  display: table;
  clear: both;
  width: 100%;
`

const HeaderDetailsLeft = styled.div`
  float: left;
  display: flex;
`

const HeaderDetailsRight = styled.div`
  float: right;
  display: flex;
  margin-top: 15px;
`

const BeastName = styled.div`
  font-size: 2em;
`

const FirstOwnerTag = styled.div`
  margin-left: 10px;
  margin-top: 15px;
  @media (max-width: 500px) {
    display: none;
  }
`

const Tag = styled.div<Omit<Color, "background">>`
  color: #242526;
  font-size: 0.8em;
  padding: 2px 8px;
  border-radius: 5px;
  background: ${(props) =>
    props.colorCode ||
    "linear-gradient(180deg, rgba(255,232,163,1) 0%, rgba(255,217,102,1) 100%)"};
`

const GenderIcon = styled.div``

const DexNumber = styled.div`
  margin-left: 10px;
  font-size: 1.2em;
  margin-top: -2px;
`

const Description = styled.div`
  margin-top: 5px;
  color: #adadaf;
  text-align: left;
`

const Serial = styled.div`
  margin-top: 5px;
  font-size: 1.5em;
  text-align: left;
`

const IconImg = styled.img`
  width: 25px;
`

const TextContainer = styled.div`
  height: 60px;
`

type Color = {
  colorCode: any
}

type Props = {
  packImage: any
  pack: any
  revealModalOpen: () => void
  selectPack: Dispatch<SetStateAction<string | "0">>
  latestUnpacked: any
  setLatestUnpacked: Dispatch<SetStateAction<any>>
  fetchUserBeasts: any
  fetchSushi: any
  fetchEmptyPotionBottle: any
  fetchPoop: any
  setNewBeast: any
  setNewTokens: any
  getPersonalDexicon: any
}

const PackRevealCard: FC<Props> = ({
  packImage,
  pack,
  revealModalOpen,
  selectPack,
  latestUnpacked,
  setLatestUnpacked,
  fetchUserBeasts,
  fetchSushi,
  fetchEmptyPotionBottle,
  fetchPoop,
  setNewBeast,
  setNewTokens,
  getPersonalDexicon,
}) => {
  const [packOpened, setPackOpened] = useState(pack.opened)

  useEffect(() => {
    setPackOpened(pack.opened)
  }, [latestUnpacked, pack])

  useEffect(() => {
    setPackOpened(pack.opened)
  }, [])

  //const { unpack } = useUser()
  const { user } = useAuth()

  const { fetchHunterData } = useUser()

  const unpack = async (packID: String) => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
        import Pack from 0xPack
        import BasicBeasts from 0xBasicBeasts
        import EmptyPotionBottle from 0xEmptyPotionBottle
        import Poop from 0xPoop
        import Sushi from 0xSushi
        import FungibleToken from 0xFungibleToken
        import NonFungibleToken from 0xNonFungibleToken
        import MetadataViews from 0xMetadataViews
        import FUSD from 0xFUSD

        access(all) fun hasSushiVault(_ address: Address): Bool {
          return getAccount(address)
            .getCapability<&Sushi.Vault{FungibleToken.Balance}>(Sushi.BalancePublicPath)
            .check()
        }

        access(all) fun hasPoopVault(_ address: Address): Bool {
          return getAccount(address)
            .getCapability<&Poop.Vault{FungibleToken.Balance}>(Poop.BalancePublicPath)
            .check()
        }

        access(all) fun hasEmptyPotionBottleVault(_ address: Address): Bool {
          return getAccount(address)
            .getCapability<&EmptyPotionBottle.Vault{FungibleToken.Balance}>(EmptyPotionBottle.BalancePublicPath)
            .check()
        }
        
        transaction(packID: UInt64, to: Address) {
        
            let packCollectionRef: &Pack.Collection
            let packManagerRef: &Pack.PackManager
            let beastReceiverRef: &BasicBeasts.Collection{BasicBeasts.BeastCollectionPublic}
            let emptyPotionBottleReceiverRef: &{FungibleToken.Receiver}
            let poopReceiverRef: &{FungibleToken.Receiver}
            let sushiReceiverRef: &{FungibleToken.Receiver}
        
        
            prepare(acct: AuthAccount) {

              // check for FUSD vault
              if acct.borrow<&FUSD.Vault>(from: /storage/fusdVault) == nil {
                  // Create a new FUSD Vault and put it in storage
                  acct.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)

                  // Create a public capability to the Vault that only exposes
                  // the deposit function through the Receiver interface
                  acct.link<&FUSD.Vault{FungibleToken.Receiver}>(
                      /public/fusdReceiver,
                      target: /storage/fusdVault
                  )

                  // Create a public capability to the Vault that only exposes
                  // the balance field through the Balance interface
                  acct.link<&FUSD.Vault{FungibleToken.Balance}>(
                      /public/fusdBalance,
                      target: /storage/fusdVault
                  )
              }
        
                self.packCollectionRef = acct.borrow<&Pack.Collection>(from: Pack.CollectionStoragePath) ?? panic("Could not borrow pack collection reference")
        
                if acct.borrow<&BasicBeasts.Collection{BasicBeasts.BeastCollectionPublic}>(from: BasicBeasts.CollectionStoragePath) == nil {
                    acct.save(<- BasicBeasts.createEmptyCollection(), to: BasicBeasts.CollectionStoragePath)
                    acct.unlink(BasicBeasts.CollectionPublicPath)
                    acct.link<&BasicBeasts.Collection{NonFungibleToken.Receiver, 
                        NonFungibleToken.CollectionPublic, 
                        BasicBeasts.BeastCollectionPublic, 
                        MetadataViews.ResolverCollection}>
                        (BasicBeasts.CollectionPublicPath, target: BasicBeasts.CollectionStoragePath)
                }
                self.beastReceiverRef = acct.borrow<&BasicBeasts.Collection{BasicBeasts.BeastCollectionPublic}>(from: BasicBeasts.CollectionStoragePath)!
                
                if acct.borrow<&Pack.PackManager>(from: Pack.PackManagerStoragePath) == nil {
                    acct.save(<- Pack.createNewPackManager(), to: Pack.PackManagerStoragePath)
                    acct.unlink(Pack.PackManagerPublicPath)
                    acct.link<&Pack.PackManager{Pack.PublicPackManager}>
                        (Pack.PackManagerPublicPath, target: Pack.PackManagerStoragePath)
                }
                self.packManagerRef = acct.borrow<&Pack.PackManager>(from: Pack.PackManagerStoragePath)!
        
                if !hasEmptyPotionBottleVault(acct.address) {
                  if acct.borrow<&EmptyPotionBottle.Vault>(from: EmptyPotionBottle.VaultStoragePath) == nil {
                    acct.save(<-EmptyPotionBottle.createEmptyVault(), to: EmptyPotionBottle.VaultStoragePath)
                  }
                  acct.unlink(EmptyPotionBottle.ReceiverPublicPath)
                  acct.unlink(EmptyPotionBottle.BalancePublicPath)
            
                    acct.link<&EmptyPotionBottle.Vault{FungibleToken.Receiver}>(
                      EmptyPotionBottle.ReceiverPublicPath,
                        target: EmptyPotionBottle.VaultStoragePath
                    )
            
                    acct.link<&EmptyPotionBottle.Vault{FungibleToken.Balance}>(
                      EmptyPotionBottle.BalancePublicPath,
                        target: EmptyPotionBottle.VaultStoragePath
                    )
                }
                self.emptyPotionBottleReceiverRef = getAccount(to).getCapability(EmptyPotionBottle.ReceiverPublicPath).borrow<&{FungibleToken.Receiver}>()!
        
                if !hasPoopVault(acct.address) {
                  if acct.borrow<&Poop.Vault>(from: Poop.VaultStoragePath) == nil {
                    acct.save(<-Poop.createEmptyVault(), to: Poop.VaultStoragePath)
                  }
                  acct.unlink(Poop.ReceiverPublicPath)
                  acct.unlink(Poop.BalancePublicPath)
            
                    acct.link<&Poop.Vault{FungibleToken.Receiver}>(
                      Poop.ReceiverPublicPath,
                        target: Poop.VaultStoragePath
                    )
            
                    acct.link<&Poop.Vault{FungibleToken.Balance}>(
                      Poop.BalancePublicPath,
                        target: Poop.VaultStoragePath
                    )
                }
              
                self.poopReceiverRef = getAccount(to).getCapability(Poop.ReceiverPublicPath).borrow<&{FungibleToken.Receiver}>()!
                
                if !hasSushiVault(acct.address) {
                  if acct.borrow<&Sushi.Vault>(from: Sushi.VaultStoragePath) == nil {
                    acct.save(<-Sushi.createEmptyVault(), to: Sushi.VaultStoragePath)
                  }
                  acct.unlink(Sushi.ReceiverPublicPath)
                  acct.unlink(Sushi.BalancePublicPath)
            
                    acct.link<&Sushi.Vault{FungibleToken.Receiver}>(
                        Sushi.ReceiverPublicPath,
                        target: Sushi.VaultStoragePath
                    )
            
                    acct.link<&Sushi.Vault{FungibleToken.Balance}>(
                        Sushi.BalancePublicPath,
                        target: Sushi.VaultStoragePath
                    )
                }
              
                self.sushiReceiverRef = getAccount(to).getCapability(Sushi.ReceiverPublicPath).borrow<&{FungibleToken.Receiver}>()!
        
            }
        
            execute {
        
                let pack <- self.packCollectionRef.withdraw(withdrawID: packID) as! @Pack.NFT
        
                let fungibles <- pack.retrieveAllFungibleTokens()
        
                let length = fungibles.length
        
                var i = 0
                while i < length {
                    var fungibleVault <- fungibles.remove(at: 0)
                    var balance = fungibleVault.balance
        
                    if fungibleVault.isInstance(Type<@EmptyPotionBottle.Vault>()) {
                        self.emptyPotionBottleReceiverRef.deposit(from: <- fungibleVault)
        
                    } else if fungibleVault.isInstance(Type<@Poop.Vault>()) {
                        self.poopReceiverRef.deposit(from: <- fungibleVault)
        
                    } else if fungibleVault.isInstance(Type<@Sushi.Vault>()) {
                        self.sushiReceiverRef.deposit(from: <- fungibleVault)
                    } else {
                        fungibles.append(<-fungibleVault)
                    }
                    i = i + 1
                }
        
                let beastCollection <- self.packManagerRef.retrieveBeast(pack: <-pack)
        
                let IDs = beastCollection.getIDs()
        
                let beast <- beastCollection.withdraw(withdrawID: IDs[0])
        
                self.beastReceiverRef.deposit(token: <-beast)
        
                destroy fungibles
                destroy beastCollection
                
            }
        
        }`),
        args([arg(packID, t.UInt64), arg(user?.addr, t.Address)]),
        payer(authz),
        proposer(authz),
        authorizations([authz]),
        limit(9999),
      ]).then(decode)
      selectPack(pack.beastTemplateID.toString())
      revealModalOpen()
      pack.opened = true
      setLatestUnpacked(pack.id)
      setPackOpened(pack.opened)
      tx(res).subscribe((res: any) => {
        toastStatus(id, res.status)
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
      setNewBeast(true)
      setNewTokens(true)
      fetchUserBeasts()
      fetchSushi()
      fetchEmptyPotionBottle()
      fetchPoop()
      getPersonalDexicon()
      // fetchHunterData() Don't have this otherwise /profile/user.find won't show packs and packs will be reloaded
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

  return (
    <Container
      style={{
        borderRadius: "12px",
        background: "#212127",
        color: "#EAEAEA",
      }}
      className="group block w-full aspect-w-7 aspect-h-9 md:aspect-h-13 lg:aspect-h-9 xl:aspect-h-7 2xl:aspect-h-9 overflow-hidden"
    >
      {packOpened == false ? (
        <div>
          <Img src={packImage.src} />
          <TextContainer
            style={{
              color: "#686868",
            }}
          >
            ID: {pack.id}
          </TextContainer>

          <Button
            onClick={() => {
              unpack(pack.stockNumber)
              // For testing //
              // pack.opened = true
              // selectPack(pack.beastTemplateID.toString())
              // setPackOpened(pack.opened)
              // setLatestUnpacked(pack.id)
              // console.log(pack)
              // revealModalOpen()
            }}
          >
            Reveal
          </Button>
        </div>
      ) : (
        ""
      )}
      <TransitionDiv packOpened={packOpened}>
        <Img
          src={
            "https://basicbeasts.mypinata.cloud/ipfs/" +
            beastTemplates[pack.beastTemplateID as keyof typeof beastTemplates]
              .packReveal
          }
        />
        <HeaderDetails>
          <HeaderDetailsLeft>
            <BeastName>{pack.beastName}</BeastName>
            <FirstOwnerTag>
              <Tag
                colorCode={
                  pack.elements[0] == "Electric"
                    ? "linear-gradient(180deg, rgba(255,232,163,1) 0%, rgba(255,217,102,1) 100%)"
                    : pack.elements[0] == "Water"
                    ? "linear-gradient(180deg, #c8daf8 0%, #A4C2F4 100%)"
                    : pack.elements[0] == "Grass"
                    ? "linear-gradient(180deg, #D4E7CB 0%, #B7D7A8 100%)"
                    : pack.elements[0] == "Fire"
                    ? "linear-gradient(180deg, #F2C2C2 0%, #EA9999 100%)"
                    : "linear-gradient(180deg, #E6CAD7 0%, #D5A6BD 100%)"
                }
              >
                First owner
              </Tag>
            </FirstOwnerTag>
          </HeaderDetailsLeft>
          <HeaderDetailsRight>
            <GenderIcon>
              {pack.beastGender == "Male" ? (
                <IconImg src={MaleIcon.src} />
              ) : (
                <IconImg src={FemaleIcon.src} />
              )}
            </GenderIcon>
            <DexNumber>
              {"#" + ("00" + pack.beastDexNumber).slice(-3)}
            </DexNumber>
          </HeaderDetailsRight>
        </HeaderDetails>
        <Description>{pack.beastDescription}</Description>
        {pack.beastMaxAdminMintAllowed <= 1000 ? (
          <Serial>
            Serial #{pack.beastSerialNumber} | {pack.beastMaxAdminMintAllowed}
          </Serial>
        ) : (
          <Serial>Serial Serial #{pack.beastSerialNumber} | ?</Serial>
        )}
      </TransitionDiv>
    </Container>
  )
}

export default PackRevealCard
