import { useEffect, useReducer, useState } from "react"
import { GET_COLLECTION_OWNED_BEASTS } from "flow/scripts/script.get-collection-owned-beasts"
import { userBeastReducer } from "reducer/userBeastReducer"
import BeastClass from "utils/BeastClass"
import { query } from "@onflow/fcl"

export default function useUserBeasts(user: any) {
  const [state, dispatch] = useReducer(userBeastReducer, {
    loading: false,
    error: false,
    data: [],
  })

  useEffect(() => {
    if (user?.addr) {
      fetchUserBeasts()
    }
  }, [user?.addr])

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

            if(collectionRef != nil) {
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
                                    ultimateSkill: borrowedBeast.getBeastTemplate().ultimateSkill

                )
                beastCollection.append(beast)
            }
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
      mappedCollection.sort((a: any, b: any) => b.id - a.id)
      // setUserBeastCollection(mappedCollection)
      dispatch({ type: "SUCCESS", payload: mappedCollection })

      // console.log("your beasts", mappedCollection)
      // Get evolvable beast dictionary {beastTemplateID: [beasts]}
      var beasts = [...mappedCollection]
      beasts.sort((a, b) => a.serialNumber - b.serialNumber)
      beasts.sort((a, b) => a.beastTemplateID - b.beastTemplateID)
    } catch (err) {
      console.log(err)
    }
  }

  return {
    ...state,
    fetchUserBeasts,
  }
}
