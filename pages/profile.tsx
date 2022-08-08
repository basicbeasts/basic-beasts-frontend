import type { NextPage } from "next"
import UserProfile from "@components/ui/UserProfile"
import RevealOverlay from "@components/ui/RevealOverlay"
import { useEffect, useState, Dispatch, SetStateAction } from "react"
import packs from "data/inbox-dummy-data"
import PackClass from "utils/PackClass"
import { useUser } from "@components/user/UserProvider"
import { useAuth } from "@components/auth/AuthProvider"
import { query } from "@onflow/fcl"

const Profile: NextPage = () => {
  const [isRevealOverlayOpen, setIsRevealOverlayOpen] = useState(false)
  const [selectedPackType, setSelectedPackType] = useState<string | null>(null)
  const [starterPacks, setStarterPacks] = useState<any[] | null>(null)
  const [metallicPacks, setMetallicPacks] = useState<any[] | null>(null)
  const [cursedPacks, setCursedPacks] = useState<any[] | null>(null)
  const [shinyPacks, setShinyPacks] = useState<any[] | null>(null)
  const [packCount, setPackCount] = useState<any[] | null>(null)
  const [userBeastCollection, setUserBeastCollection] = useState(null)
  const [sushiBalance, setSushiBalance] = useState(0)
  const [emptyPotionBottleBalance, setEmptyPotionBottleBalance] = useState(0)
  const [poopBalance, setPoopBalance] = useState(0)
  const [newBeast, setNewBeast] = useState(false)
  const [newTokens, setNewTokens] = useState(false)
  //const [userPacks, setUserPacks] = useState()

  //const { userPacks, fetchUserPacks } = useUser()

  const { user } = useAuth()

  const toggle = () => {
    setIsRevealOverlayOpen(!isRevealOverlayOpen)
  }

  useEffect(() => {
    if (user?.addr != null) {
      fetchUserPacks()
      fetchUserBeasts()
      fetchSushi()
      fetchEmptyPotionBottle()
      fetchPoop()
    }
  }, [user?.addr])

  type Pack = {
    uuid: any
    id: any
    stockNumber: any
    serialNumber: any
    packTemplateName: any
  }

  const getPacks = (userPacks: any) => {
    var starterPacksDic = []
    var metallicPacksDic = []
    var cursedPacksDic = []
    var shinyPacksDic = []

    for (let pack in userPacks) {
      let element: PackClass = userPacks[pack]
      if (element.packTemplateName == "Starter") {
        starterPacksDic[element.id] = element
      }
      if (element.packTemplateName == "Metallic Silver") {
        metallicPacksDic[element.id] = element
      }
      if (element.packTemplateName == "Cursed Black") {
        cursedPacksDic[element.id] = element
      }
      if (element.packTemplateName == "Shiny Gold") {
        shinyPacksDic[element.id] = element
      }
      console.log("element id: " + element.id)
    }
    setStarterPacks(starterPacksDic)
    setMetallicPacks(metallicPacksDic)
    setCursedPacks(cursedPacksDic)
    setShinyPacks(shinyPacksDic)
    var count = []
    count[1] = Object.keys(starterPacksDic).length
    count[2] = Object.keys(metallicPacksDic).length
    count[3] = Object.keys(cursedPacksDic).length
    count[4] = Object.keys(shinyPacksDic).length
    setPackCount(count)

    console.log(
      "number of starter packs: " + Object.keys(starterPacksDic).length,
    )
    console.log(starterPacksDic)
  }

  // const getPacks = () => {
  //   var starterPacksDic = []
  //   var metallicPacksDic = []
  //   var cursedPacksDic = []
  //   var shinyPacksDic = []

  //   for (let pack in packs) {
  //     let element = packs[pack]
  //     var keys = Object.keys(element.beast)
  //     var key: string = keys[0]
  //     if (element.packTemplate.name == "Starter") {
  //       var newPack = {
  //         uuid: element.uuid,
  //         id: element.id,
  //         stockNumber: element.stockNumber,
  //         serialNumber: element.serialNumber,
  //         packTemplateName: element.packTemplate.name,
  //         opened: element.opened,
  //         beastName:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .name,
  //         beastGender: element.beast[key as keyof typeof element.beast]?.sex,
  //         beastSerialNumber:
  //           element.beast[key as keyof typeof element.beast]?.serialNumber,
  //         beastDexNumber:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .dexNumber,
  //         beastDescription:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .description,
  //         beastMaxAdminMintAllowed:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .maxAdminMintAllowed,
  //         beastSkin:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .skin,
  //       }
  //       starterPacksDic[newPack.uuid] = newPack
  //     }
  //     console.log(starterPacksDic)
  //     if (element.packTemplate.name == "Metallic Silver") {
  //       var newPack = {
  //         uuid: element.uuid,
  //         id: element.id,
  //         stockNumber: element.stockNumber,
  //         serialNumber: element.serialNumber,
  //         packTemplateName: element.packTemplate.name,
  //         opened: element.opened,
  //         beastName:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .name,
  //         beastGender: element.beast[key as keyof typeof element.beast]?.sex,
  //         beastSerialNumber:
  //           element.beast[key as keyof typeof element.beast]?.serialNumber,
  //         beastDexNumber:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .dexNumber,
  //         beastDescription:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .description,
  //         beastMaxAdminMintAllowed:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .maxAdminMintAllowed,
  //         beastSkin:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .skin,
  //       }
  //       metallicPacksDic[newPack.uuid] = newPack
  //     }
  //     if (element.packTemplate.name == "Cursed Black") {
  //       var newPack = {
  //         uuid: element.uuid,
  //         id: element.id,
  //         stockNumber: element.stockNumber,
  //         serialNumber: element.serialNumber,
  //         packTemplateName: element.packTemplate.name,
  //         opened: element.opened,
  //         beastName:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .name,
  //         beastGender: element.beast[key as keyof typeof element.beast]?.sex,
  //         beastSerialNumber:
  //           element.beast[key as keyof typeof element.beast]?.serialNumber,
  //         beastDexNumber:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .dexNumber,
  //         beastDescription:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .description,
  //         beastMaxAdminMintAllowed:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .maxAdminMintAllowed,
  //         beastSkin:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .skin,
  //       }
  //       cursedPacksDic[newPack.uuid] = newPack
  //     }
  //     if (element.packTemplate.name == "Shiny Gold") {
  //       var newPack = {
  //         uuid: element.uuid,
  //         id: element.id,
  //         stockNumber: element.stockNumber,
  //         serialNumber: element.serialNumber,
  //         packTemplateName: element.packTemplate.name,
  //         opened: element.opened,
  //         beastName:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .name,
  //         beastGender: element.beast[key as keyof typeof element.beast]?.sex,
  //         beastSerialNumber:
  //           element.beast[key as keyof typeof element.beast]?.serialNumber,
  //         beastDexNumber:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .dexNumber,
  //         beastDescription:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .description,
  //         beastMaxAdminMintAllowed:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .maxAdminMintAllowed,
  //         beastSkin:
  //           element.beast[key as keyof typeof element.beast]?.beastTemplate
  //             .skin,
  //       }
  //       newPack.opened = true
  //       shinyPacksDic[newPack.uuid] = newPack
  //     }
  //   }
  //   setStarterPacks(starterPacksDic)
  //   setMetallicPacks(metallicPacksDic)
  //   setCursedPacks(cursedPacksDic)
  //   setShinyPacks(shinyPacksDic)
  // }

  const fetchUserBeasts = async () => {
    try {
      let res = await query({
        cadence: `
        import BasicBeasts from 0xBasicBeasts
        
        pub struct Beast {
            pub let id: UInt64
            pub let serialNumber: UInt32
            pub let beastTemplateID: UInt32
            pub let nickname: String?
            pub let firstOwner: Address?
            pub let sex: String
            pub let matron: BasicBeasts.BeastNftStruct?
            pub let sire: BasicBeasts.BeastNftStruct?
            pub let name: String
            pub let starLevel: UInt32
            pub let data: {String: String}
            pub let skin: String
            pub let evolvedFrom: [BasicBeasts.BeastNftStruct]?
            pub let maxAdminMintAllowed: UInt32
            pub let dexNumber: UInt32
            pub let description: String
            pub let elements: [String]
            pub let basicSkills: [String]
            pub let ultimateSkill: String

        
            init(
            id: UInt64, 
            serialNumber: UInt32,
            beastTemplateID: UInt32,
            nickname: String?,
            firstOwner: Address?,
            sex: String, 
            matron: BasicBeasts.BeastNftStruct?,
            sire: BasicBeasts.BeastNftStruct?,
            name: String,
            starLevel: UInt32,
            data: {String: String},
            skin: String,
            evolvedFrom: [BasicBeasts.BeastNftStruct]?,
            maxAdminMintAllowed: UInt32,
            dexNumber: UInt32,
            description: String,
            elements: [String],
            basicSkills: [String],
            ultimateSkill: String,
            ) {
                self.id = id
                self.serialNumber = serialNumber
                self.beastTemplateID = beastTemplateID
                self.nickname = nickname
                self.firstOwner = firstOwner
                self.sex = sex
                self.matron = matron
                self.sire = sire
                self.name = name
                self.starLevel = starLevel
                self.data = data
                self.skin = skin
                self.evolvedFrom = evolvedFrom
                self.maxAdminMintAllowed = maxAdminMintAllowed
                self.dexNumber = dexNumber
                self.description = description
                self.elements = elements
                self.basicSkills = basicSkills
                self.ultimateSkill = ultimateSkill
            }
        }
        
        pub fun main(acct: Address): [Beast] {
            var beastCollection: [Beast] = []
        
            let collectionRef = getAccount(acct).getCapability(BasicBeasts.CollectionPublicPath)
                .borrow<&{BasicBeasts.BeastCollectionPublic}>()
                ?? panic("Could not get public beast collection reference")
        
            let beastIDs = collectionRef.getIDs()
        
            for id in beastIDs {
                let borrowedBeast = collectionRef.borrowBeast(id: id)!
                let beast = Beast(
                                    id: borrowedBeast.id, 
                                    serialNumber: borrowedBeast.serialNumber, 
                                    beastTemplateID: borrowedBeast.getBeastTemplate().beastTemplateID,
                                    nickname: borrowedBeast.getNickname(), 
                                    firstOwner: borrowedBeast.getFirstOwner(), 
                                    sex: borrowedBeast.sex, 
                                    matron: borrowedBeast.matron, 
                                    sire: borrowedBeast.sire, 
                                    name: borrowedBeast.getBeastTemplate().name, 
                                    starLevel: borrowedBeast.getBeastTemplate().starLevel, 
                                    data: borrowedBeast.getBeastTemplate().data, 
                                    skin: borrowedBeast.getBeastTemplate().skin, 
                                    evolvedFrom: borrowedBeast.getEvolvedFrom(),
                                    maxAdminMintAllowed: borrowedBeast.getBeastTemplate().maxAdminMintAllowed,
                                    dexNumber: borrowedBeast.getBeastTemplate().dexNumber,
                                    description: borrowedBeast.getBeastTemplate().description,
                                    elements: borrowedBeast.getBeastTemplate().elements,
                                    basicSkills: borrowedBeast.getBeastTemplate().basicSkills,
                                    ultimateSkill: borrowedBeast.getBeastTemplate().ultimateSkill

                )
                beastCollection.append(beast)
            }
        
          return beastCollection
        }
        `,

        args: (arg: any, t: any) => [arg(user?.addr, t.Address)],
      })
      let mappedCollection: any = []
      for (let item in res) {
        const element = res[item]
        var beast = {
          id: element.id,
          serialNumber: element.serialNumber,
          beastTemplateID: element.beastTemplateID,
          nickname: element.nickname,
          firstOwner: element.firstOwner,
          sex: element.sex,
          matron: element.matron,
          sire: element.sire,
          name: element.name,
          starLevel: element.starLevel,
          data: element.data,
          skin: element.skin,
          evolvedFrom: element.evolvedFrom,
          maxAdminMintAllowed: element.maxAdminMintAllowed,
          dexNumber: element.dexNumber,
          description: element.description,
          elements: element.elements,
          basicSkills: element.basicSkills,
          ultimateSkill: element.ultimateSkill,
        }
        mappedCollection.push(beast)
      }
      setUserBeastCollection(mappedCollection)

      console.log("beast collection:" + mappedCollection)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchSushi = async () => {
    try {
      let res = await query({
        cadence: `
        import Sushi from 0xSushi
        import FungibleToken from 0xFungibleToken

        pub fun main(address: Address): UFix64? {
          let account = getAccount(address)

          if let vaultRef = account.getCapability(Sushi.BalancePublicPath).borrow<&Sushi.Vault{FungibleToken.Balance}>() {
            return vaultRef.balance
          } 
          return nil
          
        }
        `,

        args: (arg: any, t: any) => [arg(user?.addr, t.Address)],
      })
      setSushiBalance(res)
      console.log("sushi " + res)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchEmptyPotionBottle = async () => {
    try {
      let res = await query({
        cadence: `
        import EmptyPotionBottle from 0xEmptyPotionBottle
        import FungibleToken from 0xFungibleToken

        pub fun main(address: Address): UFix64? {
          let account = getAccount(address)

          if let vaultRef = account.getCapability(EmptyPotionBottle.BalancePublicPath).borrow<&EmptyPotionBottle.Vault{FungibleToken.Balance}>() {
            return vaultRef.balance
          } 
          return nil
          
        }
        `,

        args: (arg: any, t: any) => [arg(user?.addr, t.Address)],
      })
      setEmptyPotionBottleBalance(res)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchPoop = async () => {
    try {
      let res = await query({
        cadence: `
        import Poop from 0xPoop
        import FungibleToken from 0xFungibleToken

        pub fun main(address: Address): UFix64? {
          let account = getAccount(address)

          if let vaultRef = account.getCapability(Poop.BalancePublicPath).borrow<&Poop.Vault{FungibleToken.Balance}>() {
            return vaultRef.balance
          } 
          return nil
          
        }
        `,

        args: (arg: any, t: any) => [arg(user?.addr, t.Address)],
      })
      setPoopBalance(res)
      console.log("sushi " + res)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchUserPacks = async () => {
    try {
      let res = await query({
        cadence: `
        import Pack from 0x22fc0fd68c3857cf
        
        pub fun main(acct: Address): [&Pack.NFT{Pack.Public}] {
            var packCollection: [&Pack.NFT{Pack.Public}] = []
        
            let collectionRef = getAccount(acct).getCapability(Pack.CollectionPublicPath)
                .borrow<&{Pack.PackCollectionPublic}>()
                ?? panic("Could not get public Pack collection reference")
        
            let PackIDs = collectionRef.getIDs()
        
            for id in PackIDs {
                let pack = collectionRef.borrowPack(id: id)!
                
                packCollection.append(pack)
            }
        
          return packCollection
        }
        `,
        args: (arg: any, t: any) => [arg(user?.addr, t.Address)],
      })
      let mappedPacks = []

      for (let key in res) {
        const element = res[key]
        var keys = Object.keys(element.beast)
        var beastKey: string = keys[0]
        let pack = new PackClass(
          element.id,
          element.uuid,
          element.packTemplate.name,
          element.serialNumber,
          element.stockNumber,
          element.opened,
          element.beast[
            beastKey as keyof typeof element.beast
          ]?.beastTemplate.beastTemplateID,
          element.beast[
            beastKey as keyof typeof element.beast
          ]?.beastTemplate.name,
          element.beast[beastKey as keyof typeof element.beast]?.sex,
          element.beast[beastKey as keyof typeof element.beast]?.serialNumber,
          element.beast[
            beastKey as keyof typeof element.beast
          ]?.beastTemplate.dexNumber,
          element.beast[
            beastKey as keyof typeof element.beast
          ]?.beastTemplate.description,
          element.beast[
            beastKey as keyof typeof element.beast
          ]?.beastTemplate.maxAdminMintAllowed,
          element.beast[
            beastKey as keyof typeof element.beast
          ]?.beastTemplate.skin,
          element.beast[
            beastKey as keyof typeof element.beast
          ]?.beastTemplate.elements,
        )
        mappedPacks.push(pack)
      }

      getPacks(mappedPacks)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {/* {userPacks != null ? "Not null" : "Null"} */}
      {/* {starterPacks != null ? (
        <div>Starter Packs: {Object.keys(starterPacks).length}</div>
      ) : (
        ""
      )}
      {metallicPacks != null ? (
        <div>metallic Packs: {Object.keys(metallicPacks).length}</div>
      ) : (
        ""
      )}
      {cursedPacks != null ? (
        <div>cursed Packs: {Object.keys(cursedPacks).length}</div>
      ) : (
        ""
      )}
      {shinyPacks != null ? (
        <div>shiny Packs: {Object.keys(shinyPacks).length}</div>
      ) : (
        ""
      )} */}

      <RevealOverlay
        isSideNavbarOpen={isRevealOverlayOpen}
        toggle={toggle}
        selectedPackType={selectedPackType}
        starterPacks={starterPacks}
        metallicPacks={metallicPacks}
        cursedPacks={cursedPacks}
        shinyPacks={shinyPacks}
        fetchUserBeasts={fetchUserBeasts}
        fetchSushi={fetchSushi}
        fetchEmptyPotionBottle={fetchEmptyPotionBottle}
        fetchPoop={fetchPoop}
        setNewBeast={setNewBeast}
        setNewTokens={setNewTokens}
      />

      <UserProfile
        toggle={toggle}
        selectPackType={setSelectedPackType}
        packCount={packCount}
        beasts={userBeastCollection}
        sushiBalance={sushiBalance}
        emptyPotionBottleBalance={emptyPotionBottleBalance}
        poopBalance={poopBalance}
        newBeast={newBeast}
        setNewBeast={setNewBeast}
        newTokens={newTokens}
        setNewTokens={setNewTokens}
      />
    </div>
  )
}

export default Profile
