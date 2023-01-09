import { FC, useEffect, useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt, faTimes } from "@fortawesome/free-solid-svg-icons"
import NextLink from "next/link"
import { useAuth } from "@components/auth/AuthProvider"
import externalLinkIcon from "public/basic_external_link.png"
import PackRevealCard from "../PackRevealCard"
import StarterImg from "public/packs/pack_pf_v2/starter_pack_reveal.png"
import MetallicImg from "public/packs/pack_pf_v2/metallic_silver_pack_reveal.png"
import CursedImg from "public/packs/pack_pf_v2/cursed_black_pack_reveal.png"
import ShinyImg from "public/packs/pack_pf_v2/shiny_gold_pack_reveal.png"
import PackRevealModal from "../PackRevealModal"
import PersonalDexiconModal from "../PersonalDexiconModal"
import BeastModalView from "../BeastModalView"
import ChangeNicknameModal from "../ChangeNicknameModal"
import ChangeProfilePictureModal from "../ChangeProfilePictureModal"
import PackRevealManyModal from "../PackRevealManyModal"
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
import { toast } from "react-toastify"

const SideNavbarContainer = styled.div<{
  isSideNavbarOpen: boolean
}>`
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  overflow: scroll;
  background: #111823;
  align-items: center;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isSideNavbarOpen }) => (isSideNavbarOpen ? "100%" : "0")};
  top: ${({ isSideNavbarOpen }) => (isSideNavbarOpen ? "0" : "-100%")};
  visibility: ${({ isSideNavbarOpen }) =>
    isSideNavbarOpen ? "visible" : "hidden"};
`

const CloseIcon = styled(FontAwesomeIcon)`
  color: #fff;
`

const Icon = styled.div`
  position: fixed;
  /* top: 1.2rem; */
  left: 50px;
  background: transparent;
  font-size: 2rem;
  outline: none;
  color: #fff;
  font-size: 100px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  z-index: 19;
  //Responsive
  @media (max-width: 600px) {
    font-size: 70px;
    right: 10px;
  }
`

const SideNavbarWrapper = styled.div<{
  isSideNavbarOpen: boolean
}>`
  display: ${({ isSideNavbarOpen }) => (isSideNavbarOpen ? "grid" : "none")};
  padding: 35px 20vw 75px;
  z-index: 1;

  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;

  @media (max-width: 1140px) {
    width: 100%;
  }
  @media (max-width: 400px) {
    padding: 35px 5vw 0px;
  }
  //Scroll in div width: 100%;
  /* overflow: hidden;
  overflow-y: scroll;
  height: 550px; */
  margin-top: 20px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`

const Title = styled.div`
  text-transform: uppercase;
  color: #e4be23;
  text-align: center;
  font-size: 4em;
  margin: 50px 0 50px;
`

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  background: #111823;
  /* margin: 50px 0 10px; */
  padding: 1.5rem 0;
  text-align: center;
  width: 100%;
  @media (max-width: 800px) {
    display: none;
  }
`

const Button = styled.button<{
  borderColor: string
  insetBorderColor: string
  bgColor: string
  fontColor: string
}>`
  text-transform: uppercase;
  padding: 2px 20px 5px;
  font-size: 1.5em;
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
    font-size: 2em;
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

type Props = {
  isSideNavbarOpen: boolean
  toggle: () => void
  selectedPackType: any
  starterPacks: any
  metallicPacks: any
  cursedPacks: any
  shinyPacks: any
  fetchUserBeasts: any
  fetchSushi: any
  fetchEmptyPotionBottle: any
  fetchPoop: any
  setNewBeast: any
  setNewTokens: any
  getPersonalDexicon: any
  packCount: any
}

const RevealOverlay: FC<Props> = ({
  isSideNavbarOpen,
  toggle,
  selectedPackType,
  starterPacks,
  metallicPacks,
  cursedPacks,
  shinyPacks,
  fetchUserBeasts,
  fetchSushi,
  fetchEmptyPotionBottle,
  fetchPoop,
  setNewBeast,
  setNewTokens,
  getPersonalDexicon,
  packCount,
}: Props) => {
  const { logIn, logOut, user, loggedIn } = useAuth()
  const [selectedPack, setSelectedPack] = useState<string | "0">("0")
  const [packsToUnpack, setPacksToUnpack] = useState<any>()
  const [unpackUpToTen, setUnpackUpToTen] = useState<any>()
  const [showUnpacked, setShowUnpacked] = useState<any>()
  const [latestUnpacked, setLatestUnpacked] = useState<any>() //To check if reveal all/reveal 10 should be updated

  const { fetchHunterData } = useUser()

  //Modal
  const [RevealModalOpen, setRevealModalOpen] = useState(false)
  const [RevealManyModalOpen, setRevealManyModalOpen] = useState(false)

  useEffect(() => {
    if (selectedPackType == "1") {
      setPacksToUnpack(starterPacks)
    }
    if (selectedPackType == "2") {
      setPacksToUnpack(metallicPacks)
    }
    if (selectedPackType == "3") {
      setPacksToUnpack(cursedPacks)
    }
    if (selectedPackType == "4") {
      setPacksToUnpack(shinyPacks)
    }
  }, [selectedPackType])

  useEffect(() => {
    var packs: any = []
    var i = 0
    for (let key in packsToUnpack) {
      console.log(packsToUnpack[key])
      let pack = packsToUnpack[key]
      if (i < 10) {
        if (pack.opened == false) {
          packs.push(pack)
          i++
        }
      }
    }
    console.log(latestUnpacked)
    setUnpackUpToTen(packs)
  }, [latestUnpacked, packsToUnpack])

  const close = () => {
    setRevealModalOpen(false)
  }

  const open = () => {
    setRevealModalOpen(true)
  }

  let packType = "Starter"
  switch (parseInt(selectedPackType)) {
    case 2:
      packType = "Metallic Silver"
      break
    case 3:
      packType = "Cursed Black"
      break
    case 4:
      packType = "Shiny Gold"
      break
  }

  const handleManyPacksReveal = async () => {
    const id = toast.loading("Initializing...")
    var IDs: any = []
    var latestID: any = 0
    for (let key in unpackUpToTen) {
      let pack = unpackUpToTen[key]
      pack.opened = true
      latestID = pack.id
      IDs.push(pack.id)
    }
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

        pub fun hasSushiVault(_ address: Address): Bool {
          return getAccount(address)
            .getCapability<&Sushi.Vault{FungibleToken.Balance}>(Sushi.BalancePublicPath)
            .check()
        }
        
        pub fun hasPoopVault(_ address: Address): Bool {
          return getAccount(address)
            .getCapability<&Poop.Vault{FungibleToken.Balance}>(Poop.BalancePublicPath)
            .check()
        }
        
        pub fun hasEmptyPotionBottleVault(_ address: Address): Bool {
          return getAccount(address)
            .getCapability<&EmptyPotionBottle.Vault{FungibleToken.Balance}>(EmptyPotionBottle.BalancePublicPath)
            .check()
        }
        
        transaction(packs: [UInt64], to: Address) {
        
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
        
              var index = 0
              while packs.length > index {
                let pack <- self.packCollectionRef.withdraw(withdrawID: packs[index]) as! @Pack.NFT
        
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
        
                index = index + 1
              }
        
                
                
            }
        
        }
        `),
        args([arg(IDs, t.Array(t.UInt64)), arg(user?.addr, t.Address)]),
        payer(authz),
        proposer(authz),
        authorizations([authz]),
        limit(9999),
      ]).then(decode)
      setShowUnpacked(unpackUpToTen)
      setRevealManyModalOpen(true)
      setLatestUnpacked(latestID)
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

    // console.log(unpackUpToTen)
  }

  return (
    <SideNavbarContainer isSideNavbarOpen={isSideNavbarOpen}>
      {/**TODO: On close. Refetch packs from blockchain.
       * This is to make sure we won't show unpacked beasts again.
       */}
      {RevealModalOpen && (
        <PackRevealModal
          RevealModalOpen={RevealModalOpen}
          handleClose={close}
          packId={selectedPack}
        />
      )}
      {RevealManyModalOpen && (
        <PackRevealManyModal
          open={RevealManyModalOpen}
          setOpen={setRevealManyModalOpen}
          packs={showUnpacked}
          profile={null}
          profilePicture={null}
          setProfilePicture={null}
          getProfile={null}
        />
      )}
      <Icon
        onClick={() => {
          toggle()
          fetchHunterData()
        }}
      >
        {"<"}
      </Icon>
      <Title>{packType} Packs</Title>
      <SideNavbarWrapper isSideNavbarOpen={isSideNavbarOpen}>
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-1 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
        >
          {selectedPackType == "1" ? (
            <>
              {starterPacks.map((pack: any) => (
                <li key={pack.id} className="relative">
                  <PackRevealCard
                    packImage={StarterImg}
                    pack={pack}
                    revealModalOpen={open}
                    selectPack={setSelectedPack}
                    latestUnpacked={latestUnpacked}
                    setLatestUnpacked={setLatestUnpacked}
                    fetchUserBeasts={fetchUserBeasts}
                    fetchSushi={fetchSushi}
                    fetchEmptyPotionBottle={fetchEmptyPotionBottle}
                    fetchPoop={fetchPoop}
                    setNewBeast={setNewBeast}
                    setNewTokens={setNewTokens}
                    getPersonalDexicon={getPersonalDexicon}
                  />
                </li>
              ))}
            </>
          ) : (
            ""
          )}
          {selectedPackType == "2" ? (
            <>
              {metallicPacks.map((pack: any) => (
                <li key={pack.id} className="relative">
                  <PackRevealCard
                    packImage={MetallicImg}
                    pack={pack}
                    revealModalOpen={open}
                    selectPack={setSelectedPack}
                    latestUnpacked={latestUnpacked}
                    setLatestUnpacked={setLatestUnpacked}
                    fetchUserBeasts={fetchUserBeasts}
                    fetchSushi={fetchSushi}
                    fetchEmptyPotionBottle={fetchEmptyPotionBottle}
                    fetchPoop={fetchPoop}
                    setNewBeast={setNewBeast}
                    setNewTokens={setNewTokens}
                    getPersonalDexicon={getPersonalDexicon}
                  />
                </li>
              ))}
            </>
          ) : (
            ""
          )}
          {selectedPackType == "3" ? (
            <>
              {cursedPacks.map((pack: any) => (
                <li key={pack.id} className="relative">
                  <PackRevealCard
                    packImage={CursedImg}
                    pack={pack}
                    revealModalOpen={open}
                    selectPack={setSelectedPack}
                    latestUnpacked={latestUnpacked}
                    setLatestUnpacked={setLatestUnpacked}
                    fetchUserBeasts={fetchUserBeasts}
                    fetchSushi={fetchSushi}
                    fetchEmptyPotionBottle={fetchEmptyPotionBottle}
                    fetchPoop={fetchPoop}
                    setNewBeast={setNewBeast}
                    setNewTokens={setNewTokens}
                    getPersonalDexicon={getPersonalDexicon}
                  />
                </li>
              ))}
            </>
          ) : (
            ""
          )}
          {selectedPackType == "4" ? (
            <>
              {shinyPacks.map((pack: any) => (
                <li key={pack.id} className="relative">
                  <PackRevealCard
                    packImage={ShinyImg}
                    pack={pack}
                    revealModalOpen={open}
                    selectPack={setSelectedPack}
                    latestUnpacked={latestUnpacked}
                    setLatestUnpacked={setLatestUnpacked}
                    fetchUserBeasts={fetchUserBeasts}
                    fetchSushi={fetchSushi}
                    fetchEmptyPotionBottle={fetchEmptyPotionBottle}
                    fetchPoop={fetchPoop}
                    setNewBeast={setNewBeast}
                    setNewTokens={setNewTokens}
                    getPersonalDexicon={getPersonalDexicon}
                  />
                </li>
              ))}
            </>
          ) : (
            ""
          )}
        </ul>
      </SideNavbarWrapper>
      {/* TODO: Hide reveal all button on mobile
        And remember to make sure the number in the button change when the packs.length decreasing after unpacking.
      */}
      {unpackUpToTen?.length > 0 && (
        <ButtonWrapper>
          <Button
            borderColor={
              selectedPackType === "1"
                ? "#2C323B"
                : selectedPackType === "2"
                ? "#5C6988"
                : selectedPackType === "3"
                ? "#751ad0"
                : "#a15813"
            }
            insetBorderColor={
              selectedPackType === "1"
                ? "#737374"
                : selectedPackType === "2"
                ? "#889AAF"
                : selectedPackType === "3"
                ? "#c746af"
                : "#f3cb23"
            }
            bgColor={
              selectedPackType === "1"
                ? "#ababac"
                : selectedPackType === "2"
                ? "#E6E8E9"
                : selectedPackType === "3"
                ? "#e3bfff"
                : "#feff95"
            }
            fontColor={
              selectedPackType === "1"
                ? "#fff"
                : selectedPackType === "2"
                ? "#5C6988"
                : selectedPackType === "3"
                ? "#751ad0"
                : "#a15813"
            }
            onClick={() => {
              handleManyPacksReveal()
              //For testing
              // setRevealManyModalOpen(true)
              // setShowUnpacked(unpackUpToTen)
            }}
          >
            {selectedPackType === "1" && (
              <>{unpackUpToTen?.length < 10 ? "Reveal All" : "Reveal 10"} </>
            )}
            {selectedPackType === "2" && (
              <>{unpackUpToTen?.length < 10 ? "Reveal All" : "Reveal 10"} </>
            )}
            {selectedPackType === "3" && (
              <>{unpackUpToTen?.length < 10 ? "Reveal All" : "Reveal 10"} </>
            )}
            {selectedPackType === "4" && (
              <>{unpackUpToTen?.length < 10 ? "Reveal All" : "Reveal 10"} </>
            )}
          </Button>
        </ButtonWrapper>
      )}
    </SideNavbarContainer>
  )
}

export default RevealOverlay
