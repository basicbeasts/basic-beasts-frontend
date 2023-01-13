import { useEffect, useReducer, useState } from "react"
import { defaultReducer } from "reducer/defaultReducer"
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

import { toastStatus } from "../helpers/toastStatus"

export default function useBeastMarket() {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null,
  })

  const [beasts, setBeasts] = useState<any>([])
  const [beastsForSale, setBeastsForSale] = useState<any>([])

  useEffect(() => {
    getAllBeastsForSale()
    getAllBeasts()
  }, [])

  const getAllBeasts = async () => {
    try {
      let res = await query({
        cadence: `
        import HunterScore from 0xHunterScore
        import BasicBeasts from 0xBasicBeasts

        pub fun main(): [{String:AnyStruct}] {

          let addresses = HunterScore.getHunterScores().keys
          var beasts: [{String: AnyStruct}] = []

          for address in addresses {
            let collectionRef = getAccount(address).getCapability(BasicBeasts.CollectionPublicPath)
            .borrow<&{BasicBeasts.BeastCollectionPublic}>()
            if (collectionRef != nil) {
              let IDs = collectionRef!.getIDs()
              var i = 0
              while i < IDs.length {
                let token = collectionRef!.borrowBeast(id: IDs[i])
                ?? panic("Couldn't borrow a reference to the specified beast")

                let beastTemplate = token.getBeastTemplate()
                
                let beast = {
                  "name" : beastTemplate.name,
                  "description" : beastTemplate.description,
                  "nickname" : token.getNickname(),
                  "serialNumber" : token.serialNumber,
                  "dexNumber" : beastTemplate.dexNumber,
                  "skin" : beastTemplate.skin,
                  "starLevel" : beastTemplate.starLevel,
                  "elements" : beastTemplate.elements,
                  "basicSkills" : beastTemplate.basicSkills,
                  "ultimateSkill" : beastTemplate.ultimateSkill,
                  "currentOwner" : address,
                  "firstOwner" : token.getFirstOwner(),
                  "sex" : token.sex,
                  "breedingCount" : 0,
                  "numberOfMintedBeastTemplates" : 100,
                  "beastTemplateID" : beastTemplate.beastTemplateID,
                  "id": token.id
                }

                beasts.insert(at:i, beast)
            
                i = i + 1
              }
            }
          }

          return beasts
        }
        `,
      })

      var forSale: any = null
      await getAllBeastsForSale().then((response: any) => {
        forSale = response
      })

      var allBeasts: any = []

      for (let key in res) {
        let element = res[key]

        var beastPrice = null

        if (
          forSale.filter((beast: any) => beast.id == element.id)?.[0] != null
        ) {
          beastPrice = forSale.filter(
            (beast: any) => beast.id == element.id,
          )?.[0].price
        }

        var beast = {
          name: element.name,
          description: element.description,
          nickname: element.nickname,
          serialNumber: element.serialNumber,
          dexNumber: element.dexNumber,
          skin: element.skin,
          starLevel: element.starLevel,
          elements: element.elements,
          basicSkills: element.basicSkills,
          ultimateSkill: element.ultimateSkill,
          currentOwner: element.currentOwner,
          firstOwner: element.firstOwner,
          sex: element.sex,
          breedingCount: element.breedingCount,
          numberOfMintedBeastTemplates: element.numberOfMintedBeastTemplates,
          beastTemplateID: element.beastTemplateID,
          price: beastPrice,
          id: element.id,
        }
        allBeasts.push(beast)
      }
      setBeasts(allBeasts)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllBeastsForSale = async () => {
    try {
      let res = await query({
        cadence: `
        import HunterScore from 0xHunterScore
        import BasicBeasts from 0xBasicBeasts
        import BeastMarket from 0xBeastMarket

        pub fun main(): [{String:AnyStruct}] {

          //Get all addresses
          let addresses = HunterScore.getHunterScores().keys
      
          var beastsForSale: [{String: AnyStruct}] = []
      
          for address in addresses {
      
              let collectionRef = getAccount(address).getCapability(BeastMarket.CollectionPublicPath)
              .borrow<&BeastMarket.SaleCollection{BeastMarket.SalePublic}>()
              
              if (collectionRef != nil) {
                  let IDs = collectionRef!.getIDs()
      
                  var i = 0
                  while i < IDs.length {
                  let token = collectionRef!.borrowBeast(id: IDs[i])
      
                  if(token != nil) {
                      let beastTemplate = token!.getBeastTemplate()
      
                      let price = collectionRef!.getPrice(tokenID: IDs[i])
                      
                      let beast = {
                          "name" : beastTemplate.name,
                          "beastTemplateID" : beastTemplate.beastTemplateID,
                          "id": IDs[i],
                          "price" : price,
                          "seller": address
      
                      }
      
                      beastsForSale.insert(at:i, beast)
                  }
      
                  
              
                  i = i + 1
                  }
              }
          }
      
          return beastsForSale
      }
        `,
      })
      setBeastsForSale(res)
      console.log(res)
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const purchaseBeast = async (
    address: String,
    beastID: number,
    purchaseAmount: number,
  ) => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
          import FungibleToken from 0xFungibleToken
          import FUSD from 0xFUSD
          import BasicBeasts from 0xBasicBeasts
          import BeastMarket from 0xBeastMarket

          transaction(sellerAddress: Address, beastID: UInt64, purchaseAmount: UFix64) {
              prepare(acct: AuthAccount) {
                  // borrow a reference to the signer's collection
                  let collection = acct.borrow<&BasicBeasts.Collection>(from: BasicBeasts.CollectionStoragePath)
                      ?? panic("Could not borrow reference to the Beast Collection")

                  // borrow a reference to the signer's fusd token Vault
                  let provider = acct.borrow<&FUSD.Vault{FungibleToken.Provider}>(from: /storage/fusdVault)!
                  
                  // withdraw tokens from the signer's vault
                  let tokens <- provider.withdraw(amount: purchaseAmount) as! @FUSD.Vault

                  // get the seller's public account object
                  let seller = getAccount(sellerAddress)

                  // borrow a public reference to the seller's sale collection
                  let saleCollection = seller.getCapability(BeastMarket.CollectionPublicPath)
                      .borrow<&BeastMarket.SaleCollection{BeastMarket.SalePublic}>()
                      ?? panic("Could not borrow public sale reference")
              
                  // purchase the moment
                  let purchasedBeast <- saleCollection.purchase(tokenID: beastID, buyTokens: <-tokens, buyer: acct.address)

                  // deposit the purchased moment into the signer's collection
                  collection.deposit(token: <-purchasedBeast)
              }

          }

        `),
        args([
          arg(address, t.Address),
          arg(beastID, t.UInt64),
          arg(purchaseAmount, t.UFix64),
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
      // Add getters here
    } catch (err) {
      toast.update(id, {
        render: "Error, try again later...",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      })
      console.log(err)
    }
  }

  const purchaseManyBeasts = async (beastIDs: number[]) => {}

  const listBeastForSale = async (beastID: number, price: number) => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
          import FungibleToken from 0xFungibleToken
          import FUSD from 0xFUSD
          import BasicBeasts from 0xBasicBeasts
          import BeastMarket from 0xBeastMarket

          transaction(beastID: UInt64, price: UFix64) {

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

                  // check to see if a sale collection already exists
                  if acct.borrow<&BeastMarket.SaleCollection>(from: BeastMarket.CollectionStoragePath) == nil {
                      // get the fungible token capabilities for the owner and beneficiary
                      let ownerCapability = acct.getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver)

                      let ownerCollection = acct.link<&BasicBeasts.Collection>(BasicBeasts.CollectionPrivatePath, target: BasicBeasts.CollectionStoragePath)!

                      // create a new sale collection
                      let saleCollection <- BeastMarket.createSaleCollection(ownerCollection: ownerCollection, ownerCapability: ownerCapability)
                      
                      // save it to storage
                      acct.save(<-saleCollection, to: BeastMarket.CollectionStoragePath)
                  
                      // create a public link to the sale collection
                      acct.link<&BeastMarket.SaleCollection{BeastMarket.SalePublic}>(BeastMarket.CollectionPublicPath, target: BeastMarket.CollectionStoragePath)
                  }

                  // borrow a reference to the sale
                  let saleCollection = acct.borrow<&BeastMarket.SaleCollection>(from: BeastMarket.CollectionStoragePath)
                      ?? panic("Could not borrow from sale in storage")
                  
                  // put the beast up for sale
                  saleCollection.listForSale(tokenID: beastID, price: price)
                  
              }
          }

        `),
        args([arg(beastID, t.UInt64), arg(price, t.UFix64)]),
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
      // Add getters here
      getAllBeasts()
    } catch (err) {
      toast.update(id, {
        render: "Error, try again later...",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      })
      console.log(err)
    }
  }

  const delistBeast = async (beastID: number) => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
          import BeastMarket from 0xBeastMarket

          transaction(beastID: UInt64) {

            prepare(acct: AuthAccount) {
                // borrow a reference to the sale
                let saleCollection = acct.borrow<&BeastMarket.SaleCollection>(from: BeastMarket.CollectionStoragePath)
                    ?? panic("Could not borrow from sale in storage")
                
                // put the beast up for sale
                saleCollection.cancelSale(tokenID: beastID)
                
            }
        }

        `),
        args([arg(beastID, t.UInt64)]),
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
      // Add getters here
      getAllBeasts()
    } catch (err) {
      toast.update(id, {
        render: "Error, try again later...",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      })
      console.log(err)
    }
  }

  return {
    ...state,
    beastsForSale,
    getAllBeastsForSale,
    purchaseBeast,
    listBeastForSale,
    delistBeast,
    beasts,
    getAllBeasts,
  }
}
