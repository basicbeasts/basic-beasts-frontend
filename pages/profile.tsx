import type { NextPage } from "next"
import UserProfile from "@components/ui/UserProfile"
import RevealOverlay from "@components/ui/RevealOverlay"
import { useEffect, useState, Dispatch, SetStateAction } from "react"
import packs from "data/inbox-dummy-data"

const Profile: NextPage = () => {
  const [isRevealOverlayOpen, setIsRevealOverlayOpen] = useState(false)
  const [selectedPackType, setSelectedPackType] = useState<string | null>(null)
  const [starterPacks, setStarterPacks] = useState<any[] | null>(null)
  const [metallicPacks, setMetallicPacks] = useState<any[] | null>(null)
  const [cursedPacks, setCursedPacks] = useState<any[] | null>(null)
  const [shinyPacks, setShinyPacks] = useState<any[] | null>(null)

  const toggle = () => {
    setIsRevealOverlayOpen(!isRevealOverlayOpen)
  }

  useEffect(() => {
    getPacks()
  }, [])

  type Pack = {
    uuid: any
    id: any
    stockNumber: any
    serialNumber: any
    packTemplateName: any
  }

  const getPacks = () => {
    var starterPacksDic = []
    var metallicPacksDic = []
    var cursedPacksDic = []
    var shinyPacksDic = []

    for (let pack in packs) {
      let element = packs[pack]
      if (element.packTemplate.name == "Starter") {
        var newPack = {
          uuid: element.uuid,
          id: element.id,
          stockNumber: element.stockNumber,
          serialNumber: element.serialNumber,
          packTemplateName: element.packTemplate.name,
          opened: element.opened,
        }
        starterPacksDic[newPack.uuid] = newPack
      }
      console.log(starterPacksDic)
      if (element.packTemplate.name == "Metallic Silver") {
        var newPack = {
          uuid: element.uuid,
          id: element.id,
          stockNumber: element.stockNumber,
          serialNumber: element.serialNumber,
          packTemplateName: element.packTemplate.name,
          opened: element.opened,
        }
        metallicPacksDic[newPack.uuid] = newPack
      }
      if (element.packTemplate.name == "Cursed Black") {
        var newPack = {
          uuid: element.uuid,
          id: element.id,
          stockNumber: element.stockNumber,
          serialNumber: element.serialNumber,
          packTemplateName: element.packTemplate.name,
          opened: element.opened,
        }
        cursedPacksDic[newPack.uuid] = newPack
      }
      if (element.packTemplate.name == "Shiny Gold") {
        var newPack = {
          uuid: element.uuid,
          id: element.id,
          stockNumber: element.stockNumber,
          serialNumber: element.serialNumber,
          packTemplateName: element.packTemplate.name,
          opened: element.opened,
        }
        newPack.opened = true
        shinyPacksDic[newPack.uuid] = newPack
      }
    }
    setStarterPacks(starterPacksDic)
    setMetallicPacks(metallicPacksDic)
    setCursedPacks(cursedPacksDic)
    setShinyPacks(shinyPacksDic)
  }

  return (
    <div>
      {starterPacks != null ? (
        <div>Starter Packs: {starterPacks.length}</div>
      ) : (
        ""
      )}
      {metallicPacks != null ? (
        <div>metallic Packs: {metallicPacks.length}</div>
      ) : (
        ""
      )}
      {cursedPacks != null ? <div>cursed Packs: {cursedPacks.length}</div> : ""}
      {shinyPacks != null ? <div>shiny Packs: {shinyPacks.length}</div> : ""}
      <RevealOverlay
        isSideNavbarOpen={isRevealOverlayOpen}
        toggle={toggle}
        selectedPackType={selectedPackType}
        starterPacks={starterPacks}
        metallicPacks={metallicPacks}
        cursedPacks={cursedPacks}
        shinyPacks={shinyPacks}
      />
      <UserProfile toggle={toggle} selectPackType={setSelectedPackType} />
    </div>
  )
}

export default Profile
