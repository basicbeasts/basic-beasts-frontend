import { useAuth } from "@components/auth/AuthProvider"
import { useUser } from "@components/user/UserProvider"
import React, { FC, useEffect, useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import EvolvableBeastThumbnail from "../EvolvableBeastThumbnail"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import picture from "public/beasts/001_normal.png"
import scroll from "public/beasts/001_unknown.png"
import potion from "/public/love_potion.gif"
import { toast } from "react-toastify"
import MakeLovePotionModal from "../MakeLovePotionModal"
import EggObtainedModal from "../EggObtainedModal"
import beastTemplates from "data/beastTemplates"
import SelectBreedingBeastModal from "./SelectBreedingBeastModal"
import {
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
import { toastStatus } from "@framework/helpers/toastStatus"
import * as t from "@onflow/types"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  // height: 100%;
  padding-bottom: 2rem;
  margin-top: 1rem;
  height: 300px;
  // overflow-y: auto;
`
const H2 = styled.h2`
  color: grey;
  font-size: 1.5em;
`
const BreedingSpot = styled.div`
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  justify-items: center;
  align-items: start;
  gap: 2rem;
  margin-top: 1rem;
`
const Img = styled.img`
  max-width: 10rem;
  margin-bottom: 10px;
`
const ImgDiv = styled.div`
  text-align: center;
`

const SelectableBeast = styled.div`
  text-align: center;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
`

const PotionDiv = styled.div`
  width: max-content;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
  margin-top: 30px;
`
const Potion = styled.div`
  position: relative;

  border: 2px solid #ebebe9;
  border-radius: 0.375rem;
  padding: 1rem;
  width: max-content;
  margin: 0 auto;
  text-align: center;
  background: white;
  z-index: 1;
  line-height: 1;
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: -31%;
    width: 1.5rem;
    height: 1px;
    background: #ebebe9;
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    right: -31%;
    width: 1.5rem;
    height: 1px;
    background: #ebebe9;
  }
`
const PotionImg = styled.img`
  max-width: 5rem;
`
const ImgInfo = styled.div`
  font-size: 0.8rem;
`
const PotionP = styled.p`
  text-transform: uppercase;
  color: #dc8494;
  font-size: 1rem;
`
const RequiredNumber = styled.span`
  // color: #dc8494;
`
const BreedButton = styled.button<any>`
  position: relative;
  border: 1px solid ${(props) => props.buttonColors.buttonBorder};
  border-radius: 0.25rem;
  padding: 1.5rem;
  width: max-content;
  line-height: 0;
  background: ${(props) => props.buttonColors.buttonBackground};
  color: ${(props) => props.buttonColors.buttonColor};
  font-size: 1.5em;
  &::before {
    content: "";
    display: block;
    position: absolute;
    bottom: 103%;
    left: 50%;
    width: 1px;
    height: 8rem;
    background: #ebebe9;
  }
`

const ListWrapper = styled.div`
  width: 100%;
  // overflow: hidden;
  // overflow-y: scroll;
  // height: 270px;
  margin-top: 15px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 5px;
`
const Gender = styled.div`
  font-size: 14px;
`

type Props = {
  breedableBeasts: any
  beast: any

  makeLovePotionModalOpen: any
  setMakeLovePotionModalOpen: any
  eggObtainedModalOpen: any
  setEggObtainedModalOpen: any
  sushiBalance: any
  emptyPotionBottleBalance: any
  poopBalance: any
  lovePotionBalance: any
}

const Breeding: FC<Props> = ({
  breedableBeasts,
  beast,
  makeLovePotionModalOpen,
  setMakeLovePotionModalOpen,
  eggObtainedModalOpen,
  setEggObtainedModalOpen,
  sushiBalance,
  emptyPotionBottleBalance,
  poopBalance,
  lovePotionBalance,
}) => {
  const [beastSelected, setBeastSelected] = useState(false)

  const [selectedBeasts, setSelectedBeasts] = useState<any>([])
  const [serialOneSelected, setSerialOneSelected] = useState<any>(false)
  const [open, setOpen] = useState(false)

  const [selectedGender, setSelectedGender] = useState<any>()
  const [selectedSerial, setSelectedSerial] = useState<any>()

  const potions = 1

  const buttonColors = () => {
    let buttonBorder
    let buttonColor
    let buttonBackground
    {
      false
        ? ((buttonBorder = "#d97586"),
          (buttonColor = "#d97586"),
          (buttonBackground = "#facdd7"))
        : ((buttonBorder = "#ebebe9"),
          (buttonColor = "grey"),
          (buttonBackground = "transparent"))
    }
    return { buttonBorder, buttonColor, buttonBackground }
  }

  const isBeastSelected = () => {
    let beastImage

    {
      beastSelected
        ? (beastImage =
            "https://basicbeasts.mypinata.cloud/ipfs/" +
            beastTemplates[
              beast?.beastTemplateID as keyof typeof beastTemplates
            ].imageTransparentBg)
        : (beastImage = scroll.src)
    }
    return beastImage
  }

  // const handleChange = (id: any, serial: any) => {
  //   if (selectedBeasts.includes(id)) {
  //     //remove
  //     setSelectedBeasts(selectedBeasts.filter((beast: any) => beast != id))
  //     setBeastSelected(false)
  //     // Check serial one
  //     if (serial == 1) {
  //       setSerialOneSelected(false)
  //       toast.success("Serial #1 deselected")
  //     }
  //   } else if (selectedBeasts.length < 1) {
  //     //add
  //     setSelectedBeasts((selectedBeasts: any) => [...selectedBeasts, id])
  //     setBeastSelected(true)
  //     // Check serial one
  //     if (serial == 1) {
  //       setSerialOneSelected(true)
  //       toast.warning("Serial #1 selected for breeding")
  //     }
  //   }
  // }

  const { fetchHunterData } = useUser()

  const breed = async () => {
    const id = toast.loading("Initializing...")

    var ID1 = 0
    var ID2 = 0

    if (selectedGender == "Male") {
      ID1 = beast?.id
      ID2 = selectedBeasts[0]
    } else {
      ID1 = selectedBeasts[0]
      ID2 = beast?.id
    }

    try {
      const res = await send([
        transaction(`
        import LovePotionMinter from 0xLovePotionMinter
        import LovePotion from 0xLovePotion
        import Breeding from 0xBreeding
        import BasicBeasts from 0xBasicBeasts
        import Egg from 0xEgg
        import NonFungibleToken from 0xNonFungibleToken
        import MetadataViews from 0xMetadataViews

        transaction(matronID: UInt64, sireID: UInt64) {

            prepare(acct: AuthAccount) {

                if acct.borrow<&Egg.Collection{Egg.EggCollectionPublic}>(from: Egg.CollectionStoragePath) == nil {
                            acct.save(<- Egg.createEmptyCollection(), to: Egg.CollectionStoragePath)
                            acct.unlink(Egg.CollectionPublicPath)
                            acct.link<&Egg.Collection{NonFungibleToken.Receiver, 
                                NonFungibleToken.CollectionPublic, 
                                Egg.EggCollectionPublic, 
                                MetadataViews.ResolverCollection}>
                                (Egg.CollectionPublicPath, target: Egg.CollectionStoragePath)
                        }

                let eggCollectionRef = acct.borrow<&Egg.Collection>(from: Egg.CollectionStoragePath)
                    ?? panic("Couldn't get a reference to the egg collection")

                let lovePotionCollectionRef = acct.borrow<&LovePotion.Collection>(from: LovePotion.CollectionStoragePath)
                    ?? panic("Couldn't get a reference to the Love Potion collection")

                let beastCollectionRef = acct.borrow<&BasicBeasts.Collection>(from: BasicBeasts.CollectionStoragePath)
                    ?? panic("Couldn't get a reference to the beast collection")

                let beastReceiver = acct.getCapability<&BasicBeasts.Collection{BasicBeasts.BeastCollectionPublic}>(BasicBeasts.CollectionPublicPath)

                let IDs = lovePotionCollectionRef.getIDs()

                let lovePotion <- lovePotionCollectionRef.withdraw(withdrawID: IDs[0]) as! @LovePotion.NFT

                let matron <- beastCollectionRef.withdraw(withdrawID: matronID) as! @BasicBeasts.NFT
                let sire <- beastCollectionRef.withdraw(withdrawID: sireID) as! @BasicBeasts.NFT

                let egg <- Breeding.publicBreed(matron: <-matron, sire: <-sire, lovePotion: <-lovePotion, beastReceiver: beastReceiver)
                
                eggCollectionRef.deposit(token: <-egg)
            }

        }
        `),
        args([arg(ID1, t.UInt64), arg(ID2, t.UInt64)]),
        payer(authz),
        proposer(authz),
        authorizations([authz]),
        limit(9999),
      ]).then(decode)
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
      fetchHunterData()
      setEggObtainedModalOpen(true)
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
    <>
      <SelectBreedingBeastModal
        beastID={beast?.id}
        open={open}
        setOpen={setOpen}
        beastName={beast?.name}
        breedableBeasts={breedableBeasts}
        setBeastSelected={setBeastSelected}
        beastSelected={beastSelected}
        selectedBeasts={selectedBeasts}
        setSelectedBeasts={setSelectedBeasts}
        setSelectedSerial={setSelectedSerial}
        setSelectedGender={setSelectedGender}
      />
      <Wrapper>
        <div className="flex flex-col items-center gap-5">
          <BreedingSpot>
            <ImgDiv>
              <Img
                // src={picture.src}
                src={
                  "https://basicbeasts.mypinata.cloud/ipfs/" +
                  beastTemplates[
                    beast?.beastTemplateID as keyof typeof beastTemplates
                  ].imageTransparentBg
                }
                // style={{ transform: "scaleX(-1)" }}
              />{" "}
              <ImgInfo>
                <H2>
                  #{beast?.serialNumber} {beast?.sex === "Male" ? "♂" : "♀"}
                </H2>
              </ImgInfo>
            </ImgDiv>
            <PotionDiv onClick={() => setMakeLovePotionModalOpen(true)}>
              {lovePotionBalance < 1 && <PotionP>Love Potion Needed</PotionP>}
              <Potion>
                <PotionImg src={potion.src} />
                <p>
                  <RequiredNumber>{lovePotionBalance}</RequiredNumber>/1
                </p>
              </Potion>
            </PotionDiv>
            <SelectableBeast onClick={() => setOpen(true)}>
              <Img
                src={isBeastSelected()} /* style={{ transform: "scaleX(-1)" }} */
              />
              <ImgInfo>
                {!beastSelected ? (
                  <H2>Select a Beast</H2>
                ) : (
                  <H2>
                    #{selectedSerial} {selectedGender === "Male" ? "♂" : "♀"}
                  </H2>
                )}
              </ImgInfo>
            </SelectableBeast>
          </BreedingSpot>
          {lovePotionBalance >= 1 && beastSelected && (
            <BreedButton
              buttonColors={buttonColors()}
              onClick={() => {
                breed()
                // setEggObtainedModalOpen(true)
              }}
            >
              🍆
            </BreedButton>
          )}
        </div>
        {/* {breedableBeasts != null && (
          <ListWrapper>
            <ul
              role="list"
              className="grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4"
              // className="grid gap-x-2 gap-y-4 grid-cols-3 sm:grid-cols-4"
            >
              {breedableBeasts[beast.beastTemplateID]?.map(
                (beast: any, i: any) => (
                  <>
                    <li
                      key={i}
                      onClick={() =>
                        handleChange(beast?.id, beast?.serialNumber)
                      }
                    >
                      <div>
                        <EvolvableBeastThumbnail
                          beast={beast}
                          selected={selectedBeasts.includes(beast?.id)}
                        />
                      </div>
                    </li>
                  </>
                ),
              )}
            </ul>
          </ListWrapper>
        )} */}

        {/* <ul
          role="list"
          className="grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4"
          
        >
          {breedableBeasts.map((beast: any, i: any) => (
            <>
              <li
                key={i}
                onClick={() => }
              >
                <div>
                  <BeastThumbnail
                    
                  />
                </div>
              </li>
            </>
          ))}
        </ul> */}
      </Wrapper>
    </>
  )
}
export default Breeding
