import type { NextPage } from "next"
import DefaultHeroSection from "@components/ui/DefaultHeroSection"
import { useEffect, useState } from "react"
import { useAuth } from "@components/auth/AuthProvider"
import styled from "styled-components"
import { query } from "@onflow/fcl"
import WonderBeastThumbnail from "@components/ui/WonderArena/WonderBeastThumbnail"
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
  getAccount,
  sansPrefix,
} from "@onflow/fcl"
import { toast } from "react-toastify"
import * as t from "@onflow/types"
import { toastStatus } from "@framework/helpers/toastStatus"
import NextLink from "next/link"
import { useRouter } from "next/router"

const Button = styled.button`
  padding: 8px 24px 12px 26px;
  margin-top: 30px;
  margin-right: 2px;
  font-size: 26px;
  background-color: #feff95;
  box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
    0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset -3px -3px #f3cb23;
  color: #a75806;
  border: none;
  transition: all 0.1s ease 0s;
  -moz-transition: all 0.1s ease 0s;
  -webkit-transition: all 0.1s ease 0s;
  &:active {
    transition: all 0.1s ease 0s;
    -moz-transition: all 0.1s ease 0s;
    -webkit-transition: all 0.1s ease 0s;
    box-shadow: -3px 0px 0px 0px #a15813, 0px -3px 0px 0px #a15813,
      0px 3px 0px 0px #a15813, 3px 0px 0px 0px #a15813, inset 3px 3px #f3cb23;
  }
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin-bottom: 80px;
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

const Container = styled.div`
  padding: 20px;
  margin: 20px 0;
  display: flex;
  height: 500px;
  background: white;
  border-radius: 10px;
  justify-content: center;

  //Scroll
  overflow: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 800px) {
    height: 400px;
    margin: 20px;
  }
`

const ContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8%;
  margin: 60px 0;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`

const H1 = styled.h1`
  font-size: 2rem;
  color: #fff;
  line-height: 1;
  @media (max-width: 380px) {
    font-size: 2rem;
  }
`

const H3 = styled.h3`
  font-size: 1rem;
  color: #fff;
  line-height: 1;
  margin: 10px 0;
`

const WonderArena: NextPage = () => {
  const { logIn, logOut, user, loggedIn } = useAuth()

  const [userBloctoBeasts, setUserBloctoBeasts] = useState<any>(null)
  const [userWonderBeasts, setUserWonderBeasts] = useState<any>(null)
  const [selectedBeasts, setSelectedBeasts] = useState<any>([])
  const [selectedWonderBeasts, setSelectedWonderBeasts] = useState<any>([])
  const [wonderArenaAddress, setWonderArenaAddress] = useState(null)
  const [publicKey, setPublicKey] = useState(null)
  const [linkExists, setLinkExists] = useState(false)

  useEffect(() => {
    if (user?.addr != null) {
      fetchUserBeasts()
      fetchWonderArenaAccount()

      // getKey() //TODO remove
    }
    if (wonderArenaAddress != null) {
      fetchUserWonderBeasts()
      getKey()
      checkLinkExists()
    }
    console.log("wonder address: ", wonderArenaAddress)
    console.log("pub key: ", publicKey)
  }, [user?.addr, wonderArenaAddress])

  const refetch = async () => {
    setSelectedBeasts([])
    setSelectedWonderBeasts([])
    fetchUserBeasts()
    fetchWonderArenaAccount()
    if (wonderArenaAddress != null) {
      fetchUserWonderBeasts()
    }
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
                                    ultimateSkill: borrowedBeast.getBeastTemplate().ultimateSkill,
                                    breedableBeastTemplateID: borrowedBeast.getBeastTemplate().breedableBeastTemplateID

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
          breedableBeastTemplateID: element.breedableBeastTemplateID,
        }
        mappedCollection.push(beast)
      }
      mappedCollection.sort((a: any, b: any) => b.id - a.id)
      mappedCollection.sort((a: any, b: any) => a.serialNumber - b.serialNumber)
      mappedCollection.sort(
        (a: any, b: any) => a.beastTemplateID - b.beastTemplateID,
      )
      setUserBloctoBeasts(mappedCollection)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchUserWonderBeasts = async () => {
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
                                    ultimateSkill: borrowedBeast.getBeastTemplate().ultimateSkill,
                                    breedableBeastTemplateID: borrowedBeast.getBeastTemplate().breedableBeastTemplateID

                )
                beastCollection.append(beast)
            }
        
          return beastCollection
        }
        `,

        args: (arg: any, t: any) => [arg(wonderArenaAddress, t.Address)],
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
      console.log("Wonder Beasts", mappedCollection)
      setUserWonderBeasts(mappedCollection)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchWonderArenaAccount = async () => {
    try {
      let res = await query({
        cadence: `
        import WonderArenaLinkedAccounts_BasicBeasts1 from 0x469d7a2394a488bb

        pub fun main(parent: Address): Address? {
            if let children = WonderArenaLinkedAccounts_BasicBeasts1.parentToChildren[parent] {
                return children.keys[0]
            }
            return nil
        }
        `,
        args: (arg: any, t: any) => [arg(user?.addr, t.Address)],
      })
      setWonderArenaAddress(res)
    } catch (err) {
      console.log(err)
    }
  }

  const checkHasChild = async () => {
    try {
      let res = await query({
        cadence: `
        import ChildAccount from 0x1b655847a90e644a

        pub fun main(address: Address): Address? {
            let manager = getAuthAccount(address)
                .borrow<&ChildAccount.ChildAccountManager>(from: ChildAccount.ChildAccountManagerStoragePath)
                ?? panic("borrow manager failed")

            if (manager.getChildAccountAddresses()[0] != nil) {
              return manager.getChildAccountAddresses()[0]
            } else {
              return nil
            }
        }
        `,
        args: (arg: any, t: any) => [arg(user?.addr, t.Address)],
      })
    } catch (err) {
      console.log(err)
    }
  }

  const getKey = async () => {
    const accountInfo = await send([getAccount(sansPrefix(wonderArenaAddress))])
    setPublicKey(
      accountInfo.account.keys.find((a: any) => a.index == 0).publicKey,
    )
  }

  // const pubkey = getKey.publicKey

  const transferToWonderArena = async () => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
        import BasicBeasts from 0xBasicBeasts
        import MetadataViews from 0xMetadataViews
        import NonFungibleToken from 0xNonFungibleToken

        transaction(receiverAddress: Address, beastIDs: [UInt64]) {
            let senderCollection: &BasicBeasts.Collection
            let collection: &BasicBeasts.Collection{BasicBeasts.BeastCollectionPublic}

            prepare(acct: AuthAccount) {

              if acct.borrow<&BasicBeasts.Collection{BasicBeasts.BeastCollectionPublic}>(from: BasicBeasts.CollectionStoragePath) == nil {
                acct.save(<- BasicBeasts.createEmptyCollection(), to: BasicBeasts.CollectionStoragePath)
                acct.unlink(BasicBeasts.CollectionPublicPath)
                acct.link<&BasicBeasts.Collection{NonFungibleToken.Receiver, 
                    NonFungibleToken.CollectionPublic, 
                    BasicBeasts.BeastCollectionPublic, 
                    MetadataViews.ResolverCollection}>
                    (BasicBeasts.CollectionPublicPath, target: BasicBeasts.CollectionStoragePath)
            }

                self.senderCollection = acct.borrow<&BasicBeasts.Collection>(from: BasicBeasts.CollectionStoragePath)
                    ?? panic("borrow sender collection failed")

                self.collection = getAccount(receiverAddress)
                    .getCapability(BasicBeasts.CollectionPublicPath)
                    .borrow<&BasicBeasts.Collection{BasicBeasts.BeastCollectionPublic}>()
                    ?? panic("borrow receiverAddress collection failed")
            }

            execute {
                for id in beastIDs {
                    let beast <- self.senderCollection.withdraw(withdrawID: id)
                    self.collection.deposit(token: <- beast)
                }
            }
        }
        `),
        args([
          arg(wonderArenaAddress, t.Address),
          arg(selectedBeasts, t.Array(t.UInt64)),
        ]),
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
      refetch()
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

  const transferToBlocto = async () => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
        import ChildAccount from 0x1b655847a90e644a
        import BasicBeasts from 0xfa252d0aa22bf86a
        import MetadataViews from 0xMetadataViews
        import NonFungibleToken from 0xNonFungibleToken

        transaction(childAddress: Address, tokenIDs: [UInt64]) {
            let childCollection: &BasicBeasts.Collection
            let parentCollection: &BasicBeasts.Collection

            prepare(acct: AuthAccount) {
              if acct.borrow<&BasicBeasts.Collection{BasicBeasts.BeastCollectionPublic}>(from: BasicBeasts.CollectionStoragePath) == nil {
                acct.save(<- BasicBeasts.createEmptyCollection(), to: BasicBeasts.CollectionStoragePath)
                acct.unlink(BasicBeasts.CollectionPublicPath)
                acct.link<&BasicBeasts.Collection{NonFungibleToken.Receiver, 
                    NonFungibleToken.CollectionPublic, 
                    BasicBeasts.BeastCollectionPublic, 
                    MetadataViews.ResolverCollection}>
                    (BasicBeasts.CollectionPublicPath, target: BasicBeasts.CollectionStoragePath)
            }

                let managerRef = acct
                    .borrow<&ChildAccount.ChildAccountManager>(from: ChildAccount.ChildAccountManagerStoragePath)
                    ?? panic("borrow child account manager failed")

                let childAccountRef = managerRef.getChildAccountRef(address: childAddress) 
                    ?? panic("get child account ref failed")

                self.childCollection = childAccountRef
                    .borrow<&BasicBeasts.Collection>(from: BasicBeasts.CollectionStoragePath)
                    ?? panic("borrow child collection failed")

                self.parentCollection = acct
                    .borrow<&BasicBeasts.Collection>(from: BasicBeasts.CollectionStoragePath)
                    ?? panic("borrow parent collection failed")
            }

            execute {
                for id in tokenIDs {
                    let beast <- self.childCollection.withdraw(withdrawID: id)
                    self.parentCollection.deposit(token: <- beast)
                }
            }
        }
        `),
        args([
          arg(wonderArenaAddress, t.Address),
          arg(selectedWonderBeasts, t.Array(t.UInt64)),
        ]),
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
      refetch()
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

  const linkBloctoToWonder = async () => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
        import ChildAccount from 0x1b655847a90e644a
        import MetadataViews from 0x631e88ae7f1d7c20

        transaction(
            pubKey: String,
            childAddress: Address
          ) {
          let managerRef: &ChildAccount.ChildAccountManager
          let info: ChildAccount.ChildAccountInfo
          let childAccountCap: Capability<&AuthAccount>

          prepare(signer: AuthAccount) {
            let childAccountName = "WonderArena ".concat(childAddress.toString())
            let childAccountDescription = childAccountName
            let clientIconURL = ""
            let clientExternalURL = ""

            // Get ChildAccountManager Capability, linking if necessary
            if signer.borrow<
                &ChildAccount.ChildAccountManager
              >(
                from: ChildAccount.ChildAccountManagerStoragePath
              ) == nil {
              // Save a ChildAccountManager to the signer's account
              signer.save(
                <-ChildAccount.createChildAccountManager(),
                to: ChildAccount.ChildAccountManagerStoragePath
              )
            }
            // Ensure ChildAccountManagerViewer is linked properly
            if !signer.getCapability<
                &ChildAccount.ChildAccountManager{ChildAccount.ChildAccountManagerViewer}
              >(ChildAccount.ChildAccountManagerPublicPath).check() {
              // Link
              signer.link<
                &ChildAccount.ChildAccountManager{ChildAccount.ChildAccountManagerViewer}
              >(
                ChildAccount.ChildAccountManagerPublicPath,
                target: ChildAccount.ChildAccountManagerStoragePath
              )
            }
            // Get ChildAccountManager reference from signer
            self.managerRef = signer.borrow<
                &ChildAccount.ChildAccountManager
              >(from: ChildAccount.ChildAccountManagerStoragePath)!
            // Claim the previously published AuthAccount Capability from the given Address
            self.childAccountCap = signer.inbox.claim<&AuthAccount>(
                "AuthAccountCapability",
                provider: childAddress
              ) ?? panic(
                "No AuthAccount Capability available from given provider"
                .concat(childAddress.toString())
                .concat(" with name ")
                .concat("AuthAccountCapability")
              )
            // Construct ChildAccountInfo struct from given arguments
            self.info = ChildAccount.ChildAccountInfo(
              name: childAccountName,
              description: childAccountDescription,
              clientIconURL: MetadataViews.HTTPFile(url: clientIconURL),
              clienExternalURL: MetadataViews.ExternalURL(clientExternalURL),
              originatingPublicKey: pubKey
            )
          }

          execute {
            // Add account as child to the ChildAccountManager
            self.managerRef.addAsChildAccount(childAccountCap: self.childAccountCap, childAccountInfo: self.info)
          }
        }
        `),
        args([arg(publicKey, t.String), arg(wonderArenaAddress, t.Address)]),
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
      refetch()
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

  const handleChange = (id: any) => {
    if (selectedBeasts.includes(id)) {
      //remove
      setSelectedBeasts(selectedBeasts.filter((beast: any) => beast != id))
    } else if (selectedBeasts.length < 100) {
      //add
      setSelectedBeasts((selectedBeasts: any) => [...selectedBeasts, id])
    }
  }

  const handleChangeWonder = (id: any) => {
    if (selectedWonderBeasts.includes(id)) {
      //remove
      setSelectedWonderBeasts(
        selectedWonderBeasts.filter((beast: any) => beast != id),
      )
    } else if (selectedWonderBeasts.length < 100) {
      //add
      setSelectedWonderBeasts((selectedWonderBeasts: any) => [
        ...selectedWonderBeasts,
        id,
      ])
    }
  }

  const checkLinkExists = async () => {
    try {
      let res = await query({
        cadence: `
        import ChildAccount from 0x1b655847a90e644a

        pub fun main(address: Address): Bool {
            let tagCap = getAuthAccount(address)
                .getCapability<&ChildAccount.ChildAccountTag>(ChildAccount.ChildAccountTagPrivatePath)
                .borrow()

            if let cap = tagCap {
                if let parent = cap.parentAddress {
                    return true
                }
            }

            return false
        }
        `,

        args: (arg: any, t: any) => [arg(wonderArenaAddress, t.Address)],
      })
      setLinkExists(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <DefaultHeroSection
        title="Transfer between your wallets!"
        description="Move your beasts between your Wonder Arena account and Blocto wallet"
      />
      {/* <pre>{JSON.stringify(selectedBeasts, null, 2)}</pre> */}
      {loggedIn ? (
        <div>
          <ContainerWrapper>
            <div>
              <H1>
                Wonder Arena Account:{" "}
                {wonderArenaAddress != null && wonderArenaAddress}
              </H1>
              <H3>
                Hold beasts in your Wonder Arena account to play on{" "}
                <a style={{ textDecoration: "underline" }}>mobile app</a> or{" "}
                <a style={{ textDecoration: "underline" }}>desktop web app</a>
              </H3>
              <Container>
                {userWonderBeasts != null && (
                  <>
                    {linkExists ? (
                      <div>
                        <ListWrapper>
                          <ul
                            role="list"
                            className="grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4"
                          >
                            {userWonderBeasts?.map((beast: any, i: any) => (
                              <li
                                key={i}
                                onClick={() => handleChangeWonder(beast?.id)}
                              >
                                <div>
                                  <WonderBeastThumbnail
                                    beast={beast}
                                    selected={selectedWonderBeasts.includes(
                                      beast?.id,
                                    )}
                                  />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </ListWrapper>
                      </div>
                    ) : (
                      <div>
                        <Button onClick={() => linkBloctoToWonder()}>
                          Link Wonder Arena Account
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </Container>
              {selectedWonderBeasts.length > 0 && (
                <>
                  <Button onClick={() => transferToBlocto()}>
                    Transfer Wonder Arena → Blocto
                  </Button>
                  <H3>Selected: {selectedWonderBeasts.length}</H3>
                </>
              )}
            </div>
            <div>
              <H1>Blocto Wallet: {user?.addr}</H1>
              <H3>
                Hold beasts in your Blocto wallet to trade in the{" "}
                <NextLink href={"/marketplace/"}>
                  <a style={{ textDecoration: "underline" }}>marketplace</a>
                </NextLink>
              </H3>
              <Container>
                {userBloctoBeasts != null && (
                  <div>
                    <ListWrapper>
                      <ul
                        role="list"
                        className="grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4"
                        // className="grid gap-x-2 gap-y-4 grid-cols-3 sm:grid-cols-4"
                      >
                        {userBloctoBeasts?.map((beast: any, i: any) => (
                          <li key={i} onClick={() => handleChange(beast?.id)}>
                            <div>
                              <WonderBeastThumbnail
                                beast={beast}
                                selected={selectedBeasts.includes(beast?.id)}
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </ListWrapper>
                  </div>
                )}
              </Container>

              {selectedBeasts.length > 0 && (
                <>
                  <Button onClick={() => transferToWonderArena()}>
                    Transfer Blocto → Wonder Arena
                  </Button>
                  <H3>Selected: {selectedBeasts.length}</H3>
                </>
              )}
            </div>
          </ContainerWrapper>
          <Wrapper>
            <H1>
              <a>Visit Wonder Arena App →</a>
              {/* TODO */}
            </H1>
          </Wrapper>
        </div>
      ) : (
        <Wrapper>
          <Button onClick={() => logIn()}>Connect Wallet</Button>
        </Wrapper>
      )}
    </div>
  )
}

export default WonderArena
