import type { NextPage } from "next"
import UserProfile from "@components/ui/UserProfile"
import RevealOverlay from "@components/ui/RevealOverlay"
import { useEffect, useState, Dispatch, SetStateAction } from "react"
import PackClass from "utils/PackClass"
import { useUser } from "@components/user/UserProvider"
import { useAuth } from "@components/auth/AuthProvider"
import { query } from "@onflow/fcl"
import beastTemplates from "data/beastTemplates"
import { useRouter } from "next/router"
import Link from "next/link"
import profilePictures from "data/profilePictures"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
  const [hunterScore, setHunterScore] = useState(0)
  //const [userPacks, setUserPacks] = useState()

  //const { userPacks, fetchUserPacks } = useUser()
  const [dexicon, setDexicon] = useState()
  const [profile, setProfile] = useState(null)
  const [profilePicture, setProfilePicture] = useState(profilePictures[1].image)
  const [evolvableBeasts, setEvolvableBeasts] = useState(null)
  const [allEvolutionPairs, setAllEvolutionPairs] = useState(null)

  const { user } = useAuth()

  const { fetchHunterData, findNames } = useUser()

  const router = useRouter()
  const { address } = router.query

  const [walletAddress, setWalletAddress] = useState<any>(address)

  // const walletAddress =
  //   findNames[address as keyof typeof findNames] != null
  //     ? findNames[address as keyof typeof findNames]
  //     : address
  // var walletAddress = address

  const toggle = () => {
    setIsRevealOverlayOpen(!isRevealOverlayOpen)
  }

  useEffect(() => {
    if (findNames != null) {
      if (findNames[address as keyof typeof findNames] != null) {
        setWalletAddress(findNames[address as keyof typeof findNames])
      }
    }
    fetchUserBeasts()
    fetchSushi()
    fetchEmptyPotionBottle()
    fetchPoop()
    getHunterScore()
    getPersonalDexicon()
    getProfile()
    getAllEvolutionPairs()
    fetchUserPacks()
  }, [findNames])

  useEffect(() => {
    fetchHunterData()
  }, [])

  useEffect(() => {
    if (address != null) {
      // Check if findNames[address] != null if true setWalletAddress to findNames[address] else setWalletAddress to address
      // setWalletAddress(address)
      // fetchUserPacks()
      // fetchUserBeasts()
      // fetchSushi()
      // fetchEmptyPotionBottle()
      // fetchPoop()
      // getHunterScore()
      // getPersonalDexicon()
      // getProfile()
      // fetchHunterData()
      // getAllEvolutionPairs()
    }
    // if (walletAddress != null) {
    //   fetchUserPacks()
    //   fetchUserBeasts()
    //   fetchSushi()
    //   fetchEmptyPotionBottle()
    //   fetchPoop()
    //   getHunterScore()
    //   getPersonalDexicon()
    //   getProfile()
    //   fetchHunterData()
    //   getAllEvolutionPairs()
    // }
  }, [address])

  type Pack = {
    uuid: any
    id: any
    stockNumber: any
    serialNumber: any
    packTemplateName: any
  }

  const getPacks = (userPacks: any) => {
    var starterPacksDic: any = []
    var metallicPacksDic = []
    var cursedPacksDic = []
    var shinyPacksDic = []

    for (let pack in userPacks) {
      let element: PackClass = userPacks[pack]
      if (element.packTemplateName == "Starter") {
        // starterPacksDic[element.id] = element
        starterPacksDic.push(element)
      }
      if (element.packTemplateName == "Metallic Silver") {
        // metallicPacksDic[element.id] = element
        metallicPacksDic.push(element)
      }
      if (element.packTemplateName == "Cursed Black") {
        // cursedPacksDic[element.id] = element
        cursedPacksDic.push(element)
      }
      if (element.packTemplateName == "Shiny Gold") {
        // shinyPacksDic[element.id] = element
        shinyPacksDic.push(element)
      }
    }
    starterPacksDic.sort((a: any, b: any) => a.id - b.id)
    metallicPacksDic.sort((a: any, b: any) => a.id - b.id)
    cursedPacksDic.sort((a: any, b: any) => a.id - b.id)
    shinyPacksDic.sort((a: any, b: any) => a.id - b.id)

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
  }

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
            pub let breedableBeastTemplateID: UInt32

        
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
            breedableBeastTemplateID: UInt32
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
                self.breedableBeastTemplateID = breedableBeastTemplateID
            }
        }
        
        pub fun main(acct: Address): [Beast] {
            var beastCollection: [Beast] = []
        
            let collectionRef = getAccount(acct).getCapability(BasicBeasts.CollectionPublicPath)
                .borrow<&{BasicBeasts.BeastCollectionPublic}>()

                if(collectionRef!=nil) {
                  let beastIDs = collectionRef!.getIDs()
        
            for id in beastIDs {
                let borrowedBeast = collectionRef!.borrowBeast(id: id)!
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
                                    ultimateSkill: borrowedBeast.getBeastTemplate().ultimateSkill,
                                    breedableBeastTemplateID: borrowedBeast.getBeastTemplate().breedableBeastTemplateID

                )
                beastCollection.append(beast)
            }
                }
            
        
          return beastCollection
        }
        `,

        args: (arg: any, t: any) => [arg(walletAddress, t.Address)],
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
          breedableBeastTemplateID: element.breedableBeastTemplateID,
        }
        mappedCollection.push(beast)
      }
      mappedCollection.sort((a: any, b: any) => b.id - a.id)
      setUserBeastCollection(mappedCollection)
      // Get evolvable beast dictionary {beastTemplateID: [beasts]}
      var beasts = [...mappedCollection]
      beasts.sort((a, b) => a.serialNumber - b.serialNumber)
      beasts.sort((a, b) => a.beastTemplateID - b.beastTemplateID)
      let evolvableBeasts: any = {}
      for (let key in beastTemplates) {
        const element =
          beastTemplates[key as unknown as keyof typeof beastTemplates]

        let beastsOfSameTemplate = []
        var i = 0
        while (i < beasts.length) {
          const beast = beasts[i]
          if (beast.beastTemplateID == element.beastTemplateID) {
            beastsOfSameTemplate.push(beast)
            beasts.splice(i, i + 1)
          } else {
            i++
          }
        }
        evolvableBeasts[element.beastTemplateID] = beastsOfSameTemplate
      }
      setEvolvableBeasts(evolvableBeasts)
      getHunterScore()
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

        args: (arg: any, t: any) => [arg(walletAddress, t.Address)],
      })
      setSushiBalance(res)
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

        args: (arg: any, t: any) => [arg(walletAddress, t.Address)],
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

        args: (arg: any, t: any) => [arg(walletAddress, t.Address)],
      })
      setPoopBalance(res)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchUserPacks = async () => {
    try {
      let res = await query({
        cadence: `
        import Pack from 0xPack
        
        pub fun main(acct: Address): [&Pack.NFT{Pack.Public}] {
            var packCollection: [&Pack.NFT{Pack.Public}] = []
        
            let collectionRef = getAccount(acct).getCapability(Pack.CollectionPublicPath)
                .borrow<&{Pack.PackCollectionPublic}>()
        
                if(collectionRef != nil) {
                  let PackIDs = collectionRef!.getIDs()
        
                  for id in PackIDs {
                      let pack = collectionRef!.borrowPack(id: id)!
                      
                      packCollection.append(pack)
                  }
                }
            
        
          return packCollection
        }
        `,
        args: (arg: any, t: any) => [arg(walletAddress, t.Address)],
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

  const getHunterScore = async () => {
    try {
      let res = await query({
        cadence: `
        import HunterScore from 0xHunterScore

        pub fun main(acct: Address): UInt32? {
          return HunterScore.getHunterScore(wallet: acct)
        }
        `,
        args: (arg: any, t: any) => [arg(walletAddress, t.Address)],
      })
      setHunterScore(res)
    } catch (error) {
      console.log(error)
    }
  }

  const getPersonalDexicon = async () => {
    try {
      let res = await query({
        cadence: `
        import HunterScore from 0xHunterScore

        pub fun main(acct: Address): [UInt32]? {
          return HunterScore.getBeastTemplatesCollected(wallet: acct)
        }
        `,
        args: (arg: any, t: any) => [arg(walletAddress, t.Address)],
      })
      res.sort(function (a: any, b: any) {
        return a - b
      })
      let personalDex: any = {}
      for (let key in res) {
        let element = res[key]
        let dexNumber =
          beastTemplates[element as keyof typeof beastTemplates].dexNumber
        let image =
          beastTemplates[element as keyof typeof beastTemplates]
            .imageTransparentBg
        personalDex[dexNumber] = image
      }
      setDexicon(personalDex)
    } catch (error) {
      console.log(error)
    }
  }

  const getProfile = async () => {
    try {
      let res = await query({
        cadence: `
        import Profile from 0xProfile

        pub fun main(address: Address) :  Profile.UserProfile? {
          return getAccount(address)
            .getCapability<&{Profile.Public}>(Profile.publicPath)
            .borrow()?.asProfile()
        }
        
        `,
        args: (arg: any, t: any) => [arg(walletAddress, t.Address)],
      })
      //Resolve Profile
      setProfile(res)
      //Resolve Profile Picture
      let avatar = res?.avatar
      for (let key in profilePictures) {
        let element =
          profilePictures[key as unknown as keyof typeof profilePictures]
        if (avatar == element.image) {
          setProfilePicture(element.image)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAllEvolutionPairs = async () => {
    try {
      let response = await query({
        cadence: `
        import Evolution from 0xEvolution
        
        pub fun main(): {UInt32: UInt32} {
          return Evolution.getAllEvolutionPairs()
        }
        `,
      })
      setAllEvolutionPairs(response)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {/* <div style={{ color: "white" }}>
        {" "}
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div> */}
      {/* {findNames != null ? (
        <div style={{ color: "white" }}>
          {" "}
          <pre>{JSON.stringify(walletAddress, null, 2)}</pre>
        </div>
      ) : (
        <></>
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
        getPersonalDexicon={getPersonalDexicon}
        packCount={packCount}
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
        fetchUserBeasts={fetchUserBeasts}
        hunterScore={hunterScore}
        dexicon={dexicon}
        userAddr={user?.addr}
        profile={profile}
        profilePicture={profilePicture}
        setProfilePicture={setProfilePicture}
        getProfile={getProfile}
        evolvableBeasts={evolvableBeasts}
        allEvolutionPairs={allEvolutionPairs}
        getPersonalDexicon={getPersonalDexicon}
        walletAddress={walletAddress}
      />
    </div>
  )
}

export default Profile
