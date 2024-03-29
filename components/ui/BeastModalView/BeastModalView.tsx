import { FC, Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/outline"
import star from "public/basic_starLevel.png"
import styled from "styled-components"
import ChangeNicknameModal from "../ChangeNicknameModal"
import beastTemplates from "data/beastTemplates"
import MaleIcon from "public/gender_icons/male_icon.png"
import FemaleIcon from "public/gender_icons/female_icon.png"
import { useRouter } from "next/router"
import { useUser } from "@components/user/UserProvider"
import EvolvableBeastThumbnail from "../EvolvableBeastThumbnail"
import EvolutionModal from "../EvolutionModal"
import { toast } from "react-toastify"
import Link from "next/link"
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"
import Breeding from "../Breeding"
import MakeLovePotionModal from "../MakeLovePotionModal"
import EggObtainedModal from "../EggObtainedModal"
import { toastStatus } from "@framework/helpers/toastStatus"

const DialogPanel = styled(Dialog.Panel)<TailwindProps>`
  border-radius: 20px;
`

const Container = styled.div`
  /* width: 400px; */
  background: #fff;
  font-size: 18px;
  border-radius: 20px;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`

// -----------------------------------------------------------------------
// Header
// Styling for the header of a Beast Card
// -----------------------------------------------------------------------

const Header = styled.div<Omit<Color, "background">>`
  height: 220px;
  background: ${(props) => props.colorCode};
  padding: 28px 35px;
  color: #242526;
  border-radius: 20px 20px 0 0;
  @media (max-width: 767px) {
    padding: 15px;
  }
`

const BeastName = styled.h3`
  margin: 0;
  font-size: 55px;
  font-weight: normal;
  line-height: 50px;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  @media (max-width: 767px) {
    font-size: 40px;
    line-height: 35px;
  }
`

const BeastNameNoPointer = styled.h3`
  margin: 0;
  font-size: 55px;
  font-weight: normal;
  line-height: 50px;
  @media (max-width: 767px) {
    font-size: 40px;
    line-height: 35px;
  }
`

const HeaderDetails = styled.div`
  display: table;
  clear: both;
  width: 100%;
  margin-top: 10px;
  @media (max-width: 767px) {
    margin-top: 5px;
  }
`

const Serial = styled.div`
  float: right;
  font-size: 1.3em;
  @media (max-width: 767px) {
    font-size: 20px;
  }
`

const RightHeaderDetails = styled.div`
  float: left;
`

const DexNumber = styled.div`
  font-size: 1.3em;
  text-align: left;
  @media (max-width: 767px) {
    font-size: 20px;
    text-align: left;
  }
`

const StarImg = styled.img`
  width: 1.2em;
  margin-right: 5px;
  margin-top: 1px;
  user-drag: none;
  -webkit-user-drag: none;
  @media (max-width: 767px) {
    width: 20px;
    margin-left: 0;
  }
`

const StarLevel = styled.div`
  height: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-flow: row;
`

// -----------------------------------------------------------------------
// Content
// Styling for the content of a Beast Card
// -----------------------------------------------------------------------

const Content = styled.div<any>`
  height: ${(props) => (props.currentUser ? "470px" : "380px")};

  width: 576px;

  background: #fff;
  padding: 3vw;
  font-size: 1.2em;
  color: #242526;
  @media (max-width: 767px) {
    font-size: 20px;
    width: 90vw;
  }
`

const Img = styled.img`
  width: 160px;
  margin: auto;
  top: -70px;
  position: relative;
  user-drag: none;
  -webkit-user-drag: none;
  @media (max-width: 767px) {
    top: -50px;
  }
`

const Description = styled.div<any>`
  margin-top: ${(props) => (props.currentUser ? "30px" : "10px")};
  @media (max-width: 767px) {
    font-size: 20px;
  }
`

const InfoContainer = styled.ul`
  display: flex;
  clear: both;
  margin-top: 15px;
  // width: 100%;
`

const InfoLabel = styled.div`
  width: 130px;
  color: #868889;
  @media (max-width: 767px) {
    // width: max-content;
    width: 110px;
    font-size: 16px;
  }
`

const InfoText = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 767px) {
    font-size: 16px;
  }
`

const InfoListItem = styled.span`
  margin-right: 30px;
`

const Skill = styled.span`
  margin-right: 30px;
  font-size: 0.9em;
  min-width: fit-content;
  @media (max-width: 767px) {
    margin-right: 10px;
  }
`

const UltimateSkill = styled.div<Omit<Button, "background">>`
  display: table;
  clear: both;
  width: 80%;
  margin: 25px auto;

  left: 0;
  right: 0;
  background-color: ${(props) => props.backgroundColor || "#FFE595"};
  box-shadow: -3px 0px 0px 0px ${(props) => props.outset || "#B3A068"},
    0px -3px 0px 0px ${(props) => props.outset || "#B3A068"},
    0px 3px 0px 0px ${(props) => props.outset || "#B3A068"},
    3px 0px 0px 0px ${(props) => props.outset || "#B3A068"},
    inset -3px -3px ${(props) => props.inset || "#E6CE86"};
  padding: 5px 15px;
  font-size: 1.1em;
  position: absolute;
  bottom: 20px;
  @media (max-width: 767px) {
    font-size: 16px;
  }
`

const UltimateSkillLabel = styled.div`
  float: left;
  margin-right: 32px;
  @media (max-width: 450px) {
    margin-right: 20px;
  }
`

const SkillName = styled.div`
  float: right;
  margin-right: 20px;
`

const IconImg = styled.img`
  width: 25px;
  margin-top: 5px;
`

const ToolTipText = styled.span`
  visibility: hidden;
  width: 180px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  position: absolute;
  z-index: 99999;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1em;
  text-transform: capitalize;

  @media (max-width: 1010px) {
    /* width: 340px;
    font-size: 4vw;
    margin-left: -170px; */
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
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  &:hover span {
    visibility: visible;
  }
`

const ContainerCenter = styled.div`
  align-items: center;
`

const ListWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  height: 270px;
  margin-top: 15px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 5px;
`

const EvolveButton = styled.button`
  width: 100px;
  border-color: rgb(22, 22, 26);
  color: rgb(255, 255, 255);
  background: rgb(22, 22, 26);
  padding: 3px 15px 4px;
  border-radius: 14px;
  text-transform: capitalize;
  &:hover {
    color: rgb(255, 255, 255);
    border-color: rgb(22, 22, 26);
    background: rgb(0, 0, 0);
  }
  &:focus {
    color: rgb(255, 255, 255);
    border-color: rgb(22, 22, 26);
    background: rgb(0, 0, 0);
  }
  &:active {
    transform: scale(0.95);
  }
  &:disabled {
    background: gray;
    color: #fff;
    opacity: 0.35;
    &:active {
      transform: none;
    }
  }
`

const DisabledEvolveButton = styled.button`
  width: 100px;
  border-color: rgb(22, 22, 26);
  color: rgb(255, 255, 255);
  background: grey;
  padding: 3px 15px 4px;
  border-radius: 14px;
  text-transform: capitalize;
`

const EvolutionSelectionContainer = styled.div`
  display: table;
  clear: both;
  width: 100%;
  padding: 5px 10px 0px 5px;
  margin-top: 15px;
`

const EvolutionSelectionLeft = styled.div`
  float: left;

  line-height: 1em;
`

const EvolutionSelectionRight = styled.div`
  float: right;
`

const Heading = styled.div`
  font-size: 1.2em;
`

const Body = styled.div`
  font-size: 0.8em;
  color: #868889;
`

const HighlightNumber = styled.span`
  color: black;
  font-size: 1.2em;
`

const NotEnoughContainer = styled.div`
  background: #e9e9ea;
  padding: 20px 10px 30px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-top: 20px;
`
const Select = styled.select`
  border-radius: 0.375rem;
  width: 100%;
  // border: 1px solid rgb(209 213 219);
  &:focus {
    // --tw-ring-color: rgb(99 102 241);
    border-color: rgb(99 102 241);
  }
  outline: none;
`

const Button = styled.button`
  border-color: rgb(22, 22, 26);
  color: rgb(255, 255, 255);
  background: rgb(22, 22, 26);
  padding: 4px 20px 5px;
  border-radius: 12px;
  font-size: 0.8em;
  margin: 0.2rem 0 0.2rem 0;
  text-transform: capitalize;
  &:hover {
    color: rgb(255, 255, 255);
    border-color: rgb(22, 22, 26);
    background: rgb(0, 0, 0);
  }
  &:focus {
    color: rgb(255, 255, 255);
    border-color: rgb(22, 22, 26);
    background: rgb(0, 0, 0);
  }
  &:active {
    transform: scale(0.95);
  }
`
const EvolutionUl = styled.ul`
  // className="grid auto-cols-auto grid-flow-col min-w-fit justify-items-center"
  // display: grid;
  // grid-template-columns: repeat(auto-fill, 1fr);
  // grid-auto-flow: column;
  // justify-items: center;
  // min-width: 0;
`

type Color = {
  colorCode: any
}

type Button = {
  backgroundColor: string
  outset: string
  inset: string
}

type TailwindProps = {
  className: any
}

type Props = {
  beast: any
  open: boolean
  setOpen: any
  fetchUserBeasts: any
  displayNickname: any
  setDisplayNickname: any
  userAddr: any
  evolvableBeasts: any
  setEvolutionModalOpen: any
  allEvolutionPairs: any
  getPersonalDexicon: any
  walletAddress: any
  sushiBalance: any
  emptyPotionBottleBalance: any
  poopBalance: any
  lovePotionBalance: any
  beasts: any
  selectFilter: any
}

const tabs = [
  { name: "Info", href: "#info" },
  { name: "Evolution", href: "#evolution" },
  { name: "Breeding", href: "#breeding" },
  { name: "Trade", href: "#trade" },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

const BeastModalView: FC<Props> = ({
  beast,
  open,
  setOpen,
  fetchUserBeasts,
  displayNickname,
  setDisplayNickname,
  userAddr,
  evolvableBeasts,
  setEvolutionModalOpen,
  allEvolutionPairs,
  getPersonalDexicon,
  walletAddress,
  sushiBalance,
  emptyPotionBottleBalance,
  poopBalance,
  lovePotionBalance,
  beasts,
  selectFilter,
}) => {
  const [open2, setOpen2] = useState(false)
  const [filter, setFilter] = useState("Info")
  const [selectedBeasts, setSelectedBeasts] = useState<any>([beast?.id])
  const [serialOneSelected, setSerialOneSelected] = useState<any>(false)
  const [hasEvolutionPair, setHasEvolutionPair] = useState(false)

  const [makeLovePotionModalOpen, setMakeLovePotionModalOpen] = useState(false)
  const [eggObtainedModalOpen, setEggObtainedModalOpen] = useState(false)

  const router = useRouter()
  const { address }: any = router.query

  const { fetchHunterData } = useUser()

  const handleChange = (id: any, serial: any) => {
    if (selectedBeasts.includes(id)) {
      //remove
      setSelectedBeasts(selectedBeasts.filter((beast: any) => beast != id))
      // Check serial one
      if (serial == 1) {
        setSerialOneSelected(false)
        toast.success("Serial #1 deselected")
      }
    } else if (selectedBeasts.length < 3) {
      //add
      setSelectedBeasts((selectedBeasts: any) => [...selectedBeasts, id])
      // Check serial one
      if (serial == 1) {
        setSerialOneSelected(true)
        toast.warning("Serial #1 selected for evolution")
      }
    }
  }

  useEffect(() => {
    // Serial Number 1 selected
    setSerialOneSelected(false)
    if (beast?.serialNumber != 1) {
      setSelectedBeasts([beast?.id])
    } else {
      setSelectedBeasts([])
    }

    // Evolution Pair Available
    if (allEvolutionPairs != null) {
      let keys = Object.keys(allEvolutionPairs)
      let id = beast?.beastTemplateID.toString()
      if (keys.includes(id)) {
        setHasEvolutionPair(true)
      } else {
        setHasEvolutionPair(false)
      }
    }
  }, [beast])

  const evolve = async () => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
        import Evolution from 0xEvolution
        import BasicBeasts from 0xBasicBeasts
        import FUSD from 0xFUSD
        import FungibleToken from 0xFungibleToken

        pub fun hasEvolver(_ address: Address): Bool {
          return getAccount(address)
            .getCapability<&Evolution.Evolver{Evolution.Public}>(Evolution.EvolverPublicPath)
            .check()
        }        

        transaction(beasts: [UInt64]) {
            let evolverRef: &Evolution.Evolver
            let collectionRef: &BasicBeasts.Collection

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

            if !hasEvolver(acct.address) {
              if acct.borrow<&Evolution.Evolver>(from: Evolution.EvolverStoragePath) == nil {
                acct.save(<-Evolution.createNewEvolver(), to: Evolution.EvolverStoragePath)
              }
              acct.unlink(Evolution.EvolverPublicPath)
              acct.link<&Evolution.Evolver{Evolution.Public}>(Evolution.EvolverPublicPath, target: Evolution.EvolverStoragePath)
            }

            self.evolverRef = acct.borrow<&Evolution.Evolver>(from: Evolution.EvolverStoragePath)
            ?? panic("No Evolver resource in storage")

            self.collectionRef = acct.borrow<&BasicBeasts.Collection>(from: BasicBeasts.CollectionStoragePath)
            ?? panic("No Collection resource in storage")

          }

          execute {
              let tempCollection <- BasicBeasts.createEmptyCollection() as! @BasicBeasts.Collection

              for id in beasts {
                tempCollection.deposit(token: <-self.collectionRef.withdraw(withdrawID: id))
              }

            let collection <- self.evolverRef.evolveBeast(beasts: <- tempCollection)

            for id in collection.getIDs() {
                self.collectionRef.deposit(token: <- collection.withdraw(withdrawID: id))
            }
            destroy collection
          }
        }`),
        args([arg(selectedBeasts, t.Array(t.UInt64))]),
        payer(authz),
        proposer(authz),
        authorizations([authz]),
        limit(9999),
      ]).then(decode)
      setEvolutionModalOpen(true)
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

      getPersonalDexicon()
      fetchHunterData()
      fetchUserBeasts()
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

  interface Beast {
    beastTemplateID: number
    starLevel: number
    // other properties of the beast
  }

  function filterBeasts(beasts: any, starLevel: number): any {
    return beasts
      .filter((beast2: any) => {
        const { beastTemplateID, starLevel: beastStarLevel } = beast2
        if (beastStarLevel < starLevel) {
          return false
        }
        if (beastStarLevel === 1) {
          return (
            beastTemplateID === beast?.beastTemplateID ||
            beastTemplateID === beast?.beastTemplateID + 1 ||
            beastTemplateID === beast?.beastTemplateID + 2
          )
        }
        if (beastStarLevel === 2) {
          return (
            beastTemplateID === beast?.beastTemplateID - 1 ||
            beastTemplateID === beast?.beastTemplateID ||
            beastTemplateID === beast?.beastTemplateID + 1
          )
        }
        if (beastStarLevel === 3) {
          return (
            beastTemplateID === beast?.beastTemplateID - 2 ||
            beastTemplateID === beast?.beastTemplateID - 1 ||
            beastTemplateID === beast?.beastTemplateID
          )
        }
        return beastTemplateID === beast?.beastTemplateID
      })
      .filter((beast2: any) => beast?.id !== beast2.id)
      .filter((beast2: any) => beast?.sex !== beast2.sex)
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
          <ContainerCenter className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                style={{ borderRadius: "20px" }}
                // className="relative bg-white rounded-lg pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full md:max-w-xl"

                className="relative bg-white pb-4 text-left shadow-xl transform transition-all sm:my-8 md:max-w-xl"
              >
                <ChangeNicknameModal
                  beastID={beast?.id}
                  open={open2}
                  setOpen={setOpen2}
                  fetchUserBeasts={fetchUserBeasts}
                  beastModalSetOpen={setOpen}
                  setDisplayNickname={setDisplayNickname}
                  beastName={beast?.name}
                />

                <MakeLovePotionModal
                  open={makeLovePotionModalOpen}
                  setOpen={setMakeLovePotionModalOpen}
                  sushiBalance={sushiBalance}
                  emptyPotionBottleBalance={emptyPotionBottleBalance}
                  poopBalance={poopBalance}
                />

                <EggObtainedModal
                  open={eggObtainedModalOpen}
                  setOpen={setEggObtainedModalOpen}
                  setOpenBeastModal={setOpen}
                  beast={beast}
                  selectFilter={selectFilter}
                />
                <div style={{ borderRadius: "20px" }}>
                  {beast != null ? (
                    <Container>
                      <Header
                        colorCode={
                          beast.elements[0] == "Electric"
                            ? "linear-gradient(180deg, rgba(255,232,163,1) 0%, rgba(255,217,102,1) 100%)"
                            : beast.elements[0] == "Water"
                            ? "linear-gradient(180deg, #c8daf8 0%, #A4C2F4 100%)"
                            : beast.elements[0] == "Grass"
                            ? "linear-gradient(180deg, #D4E7CB 0%, #B7D7A8 100%)"
                            : beast.elements[0] == "Fire"
                            ? "linear-gradient(180deg, #F2C2C2 0%, #EA9999 100%)"
                            : "linear-gradient(180deg, #E6CAD7 0%, #D5A6BD 100%)"
                        }
                      >
                        <div
                          className="text-right absolute top-0 left-0 right-3 sm:hidden"
                          onClick={() => setOpen(false)}
                        >
                          {/* <FontAwesomeIcon
                          
                            onClick={() => setOpen(false)}
                            icon={faChevronUp}
                          /> */}
                          <div style={{ fontSize: "2em" }}>x</div>
                        </div>
                        {userAddr == walletAddress ? (
                          <ToolTip>
                            <BeastName
                              onClick={() => {
                                setOpen2(true)
                              }}
                            >
                              {displayNickname == null
                                ? beast.nickname
                                : displayNickname}
                            </BeastName>
                            <ToolTipText>Change Nickname</ToolTipText>
                          </ToolTip>
                        ) : (
                          <BeastNameNoPointer>
                            {displayNickname == null
                              ? beast.nickname
                              : displayNickname}
                          </BeastNameNoPointer>
                        )}
                        <HeaderDetails>
                          <Serial>
                            Serial #{beast.serialNumber} |{" "}
                            {beast.maxAdminMintAllowed <= 1000 &&
                            beast.maxAdminMintAllowed != 0
                              ? beast.maxAdminMintAllowed
                              : "?"}
                          </Serial>
                          <RightHeaderDetails>
                            <DexNumber>
                              Dex {"#" + ("00" + beast.dexNumber).slice(-3)}
                            </DexNumber>
                            <StarLevel>
                              {Array.from(Array(beast.starLevel), (e, i) => {
                                return <StarImg src={star.src} key={i} />
                              })}
                            </StarLevel>
                          </RightHeaderDetails>
                        </HeaderDetails>
                        <Img
                          src={
                            "https://basicbeasts.mypinata.cloud/ipfs/" +
                            beastTemplates[
                              beast.beastTemplateID as keyof typeof beastTemplates
                            ].imageTransparentBg
                          }
                        />
                      </Header>

                      <Content currentUser={userAddr === walletAddress}>
                        {userAddr === walletAddress ? (
                          <div>
                            <div className="sm:hidden">
                              <label htmlFor="tabs" className="sr-only">
                                Select a tab
                              </label>
                              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                              <Select
                                id="tabs"
                                name="tabs"
                                // className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                // defaultValue={
                                //   // tabs?.find((tab: any) => tab?.current)?.name
                                //   // filter
                                // }
                                defaultValue={"Select page"}
                                onChange={(e) => setFilter(e.target.value)}
                              >
                                {tabs.map((tab) => (
                                  <option key={tab.name}>{tab.name}</option>
                                ))}
                              </Select>
                            </div>
                            <div className="hidden sm:block">
                              <div className="border-b border-gray-200">
                                <nav className="-mb-px flex" aria-label="Tabs">
                                  {tabs.map((tab) => (
                                    <a
                                      key={tab.name}
                                      href={tab.href}
                                      className={classNames(
                                        tab.name === filter
                                          ? beast.elements[0] == "Electric"
                                            ? "border-yellow-500 text-yellow-600"
                                            : beast.elements[0] == "Water"
                                            ? "border-blue-500 text-blue-600"
                                            : beast.elements[0] == "Grass"
                                            ? "border-green-500 text-green-600"
                                            : beast.elements[0] == "Fire"
                                            ? "border-rose-500 text-rose-600"
                                            : "border-pink-500 text-pink-600"
                                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                        "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-md focus:outline-none focus-visible:outline-none",
                                      )}
                                      aria-current={
                                        tab.name === filter ? "page" : undefined
                                      }
                                      onClick={() => setFilter(tab.name)}
                                    >
                                      {tab.name}
                                    </a>
                                  ))}
                                </nav>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        {filter === "Info" ? (
                          <>
                            <Description
                              currentUser={userAddr === walletAddress}
                            >
                              {beast.description}
                            </Description>
                            <InfoContainer>
                              <InfoLabel>Gender</InfoLabel>
                              <InfoText>
                                {beast.sex == "Male" ? (
                                  <IconImg src={MaleIcon.src} />
                                ) : (
                                  <IconImg src={FemaleIcon.src} />
                                )}
                              </InfoText>
                            </InfoContainer>
                            <InfoContainer>
                              <InfoLabel>Type</InfoLabel>
                              <InfoText>
                                {beast.elements != null
                                  ? beast.elements.map(
                                      (element: any, i: any) => (
                                        <InfoListItem key={i}>
                                          {element}
                                        </InfoListItem>
                                      ),
                                    )
                                  : ""}
                              </InfoText>
                            </InfoContainer>
                            <InfoContainer>
                              <InfoLabel>Basic Skills</InfoLabel>
                              <InfoText>
                                {beast.basicSkills != null
                                  ? beast.basicSkills.map(
                                      (skill: any, i: any) => (
                                        <Skill key={i}>{skill}</Skill>
                                      ),
                                    )
                                  : ""}
                              </InfoText>
                            </InfoContainer>
                            <UltimateSkill
                              backgroundColor={
                                beast.elements[0] == "Electric"
                                  ? "#FFE595"
                                  : beast.elements[0] == "Water"
                                  ? "#A4C2F4"
                                  : beast.elements[0] == "Grass"
                                  ? "#B7D7A8"
                                  : beast.elements[0] == "Fire"
                                  ? "#EA9999"
                                  : "#D5A6BD"
                              }
                              outset={
                                beast.elements[0] == "Electric"
                                  ? "#B3A068"
                                  : beast.elements[0] == "Water"
                                  ? "#7388AB"
                                  : beast.elements[0] == "Grass"
                                  ? "#92AC86"
                                  : beast.elements[0] == "Fire"
                                  ? "#BB7A7A"
                                  : "#AA8597"
                              }
                              inset={
                                beast.elements[0] == "Electric"
                                  ? "#E6CE86"
                                  : beast.elements[0] == "Water"
                                  ? "#94AFDC"
                                  : beast.elements[0] == "Grass"
                                  ? "#A5C297"
                                  : beast.elements[0] == "Fire"
                                  ? "#D38A8A"
                                  : "#C095AA"
                              }
                            >
                              <UltimateSkillLabel>
                                Ultimate Skill
                              </UltimateSkillLabel>
                              <SkillName>{beast.ultimateSkill}</SkillName>
                            </UltimateSkill>
                          </>
                        ) : (
                          <></>
                        )}
                        {filter === "Evolution" && evolvableBeasts != null ? (
                          <>
                            {hasEvolutionPair ? (
                              <>
                                {evolvableBeasts[beast?.beastTemplateID]
                                  .length < 3 ? (
                                  <>
                                    <NotEnoughContainer>
                                      <Body
                                        style={{
                                          margin: "0px 0 20px",
                                          textAlign: "center",
                                          fontSize: "1em",
                                        }}
                                      >
                                        You need at least 3 beasts of the <br />{" "}
                                        same skin and star level to do Evolution
                                      </Body>
                                      <div>
                                        <Link href="/drop">
                                          <a>
                                            <Button>Buy Packs</Button>
                                          </a>
                                        </Link>
                                        <Link href="/marketplace">
                                          <a>
                                            <Button
                                              style={{ margin: "0 15px 0" }}
                                            >
                                              Marketplace
                                            </Button>
                                          </a>
                                        </Link>
                                        <a
                                          target="_blank"
                                          href="https://discord.gg/xgFtWhwSaR"
                                          rel="noreferrer"
                                        >
                                          <Button>Beg Frens</Button>
                                        </a>
                                      </div>
                                    </NotEnoughContainer>
                                  </>
                                ) : (
                                  <>
                                    <EvolutionSelectionContainer>
                                      <EvolutionSelectionLeft>
                                        <Heading>
                                          {beast?.name} Collection
                                        </Heading>
                                        <Body>
                                          {serialOneSelected ? (
                                            <>
                                              <span style={{ color: "red" }}>
                                                Warning: Serial #1 selected
                                              </span>
                                            </>
                                          ) : selectedBeasts.length == 3 ? (
                                            <>
                                              <span>Ready to evolve</span>
                                            </>
                                          ) : selectedBeasts.length == 2 ? (
                                            <>
                                              <span>Select </span>
                                              <HighlightNumber>
                                                1
                                              </HighlightNumber>
                                              <span> more beast to evolve</span>
                                            </>
                                          ) : selectedBeasts.length == 1 ? (
                                            <>
                                              <span>Select </span>
                                              <HighlightNumber>
                                                2
                                              </HighlightNumber>
                                              <span>
                                                {" "}
                                                more beasts to evolve
                                              </span>
                                            </>
                                          ) : (
                                            <>
                                              <span>Select </span>
                                              <HighlightNumber>
                                                3
                                              </HighlightNumber>
                                              <span> beasts to evolve</span>
                                            </>
                                          )}
                                        </Body>
                                      </EvolutionSelectionLeft>
                                      <EvolutionSelectionRight>
                                        <EvolveButton
                                          disabled={selectedBeasts.length != 3}
                                          onClick={() => {
                                            evolve()

                                            // setEvolutionModalOpen(true)
                                          }}
                                        >
                                          evolve
                                        </EvolveButton>
                                        {/* {selectedBeasts.length === 3 ? (
                                  <EvolveButton
                                    disabled={selectedBeasts.length != 3}
                                    onClick={() => setEvolutionModalOpen(true)}
                                  >
                                    evolve
                                  </EvolveButton>
                                ) : (
                                  <DisabledEvolveButton>
                                    evolve
                                  </DisabledEvolveButton>
                                )} */}
                                      </EvolutionSelectionRight>
                                    </EvolutionSelectionContainer>
                                    <ListWrapper>
                                      <EvolutionUl
                                        role="list"
                                        className="grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4"
                                        // className="grid gap-x-2 gap-y-4 grid-cols-3 sm:grid-cols-4"
                                      >
                                        {evolvableBeasts[
                                          beast.beastTemplateID
                                        ].map((beast: any, i: any) => (
                                          <>
                                            <li
                                              key={i}
                                              onClick={() =>
                                                handleChange(
                                                  beast?.id,
                                                  beast?.serialNumber,
                                                )
                                              }
                                            >
                                              <div>
                                                <EvolvableBeastThumbnail
                                                  beast={beast}
                                                  selected={selectedBeasts.includes(
                                                    beast?.id,
                                                  )}
                                                />
                                              </div>
                                            </li>
                                          </>
                                        ))}
                                      </EvolutionUl>
                                    </ListWrapper>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {beast?.starLevel < 3 ? (
                                  <NotEnoughContainer>
                                    <Body
                                      style={{
                                        margin: "0px 0 20px",
                                        textAlign: "center",
                                        fontSize: "1em",
                                      }}
                                    >
                                      Evolution is not yet available for this
                                      beast.
                                    </Body>
                                  </NotEnoughContainer>
                                ) : (
                                  <NotEnoughContainer>
                                    <Body
                                      style={{
                                        margin: "0px 0 20px",
                                        textAlign: "center",
                                        fontSize: "1em",
                                      }}
                                    >
                                      Congratulations! <br /> Your beast is
                                      fully evolved!
                                    </Body>
                                  </NotEnoughContainer>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                        {filter === "Breeding" ? (
                          // <>
                          //   {filterBeasts(beasts, beast?.starLevel).length >
                          //   0 ? (
                          //     <Breeding
                          //       breedableBeasts={filterBeasts(
                          //         beasts,
                          //         beast?.starLevel,
                          //       )}
                          //       beast={beast}
                          //       makeLovePotionModalOpen={
                          //         makeLovePotionModalOpen
                          //       }
                          //       setMakeLovePotionModalOpen={
                          //         setMakeLovePotionModalOpen
                          //       }
                          //       eggObtainedModalOpen={eggObtainedModalOpen}
                          //       setEggObtainedModalOpen={
                          //         setEggObtainedModalOpen
                          //       }
                          //       sushiBalance={sushiBalance}
                          //       emptyPotionBottleBalance={
                          //         emptyPotionBottleBalance
                          //       }
                          //       poopBalance={poopBalance}
                          //       lovePotionBalance={lovePotionBalance}
                          //     />
                          //   ) : (
                          //     <NotEnoughContainer>
                          //       <Body
                          //         style={{
                          //           margin: "0px 0 20px",
                          //           textAlign: "center",
                          //           fontSize: "1em",
                          //         }}
                          //       >
                          //         You need a beast of the opposite sex for
                          //         breeding
                          //       </Body>
                          //       <div>
                          //         <Link href="/marketplace">
                          //           <a>
                          //             <Button style={{ margin: "0 15px 0" }}>
                          //               Marketplace
                          //             </Button>
                          //           </a>
                          //         </Link>
                          //       </div>
                          //     </NotEnoughContainer>
                          //   )}
                          // </>
                          <NotEnoughContainer>
                            <Body
                              style={{
                                margin: "0px 0 20px",
                                textAlign: "center",
                                fontSize: "1em",
                              }}
                            >
                              Coming
                            </Body>
                          </NotEnoughContainer>
                        ) : (
                          // <NotEnoughContainer>
                          //   <Body
                          //     style={{
                          //       margin: "0px 0 20px",
                          //       textAlign: "center",
                          //       fontSize: "1em",
                          //     }}
                          //   >
                          //     Coming
                          //   </Body>
                          // </NotEnoughContainer>
                          <></>
                        )}
                        {filter === "Trade" && (
                          <NotEnoughContainer>
                            <Body
                              style={{
                                margin: "0px 0 20px",
                                textAlign: "center",
                                fontSize: "1em",
                              }}
                            >
                              Need more beasts or sell this one?
                            </Body>
                            <div>
                              <Link href={"/beast-details/" + beast?.id}>
                                <a>
                                  <Button>Trade this Beast</Button>
                                </a>
                              </Link>
                              <Link href="/marketplace">
                                <a>
                                  <Button style={{ margin: "0 15px 0" }}>
                                    Marketplace
                                  </Button>
                                </a>
                              </Link>
                              <a
                                target="_blank"
                                href="https://discord.gg/xgFtWhwSaR"
                                rel="noreferrer"
                              >
                                <Button>Get help</Button>
                              </a>
                            </div>
                          </NotEnoughContainer>
                        )}
                      </Content>
                    </Container>
                  ) : (
                    ""
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </ContainerCenter>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default BeastModalView
