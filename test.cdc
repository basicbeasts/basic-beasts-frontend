import HunterScore from 0xfa252d0aa22bf86a
import BasicBeasts from 0xfa252d0aa22bf86a

pub fun main(): [{String:AnyStruct}] {

    let addresses = HunterScore.getHunterScores().keys
    var beasts: [{String: AnyStruct}] = []
    var index = 0
    let limit = 10

        
        for address in addresses {
        let collectionRef = getAccount(address).getCapability(BasicBeasts.CollectionPublicPath)
        .borrow<&{BasicBeasts.BeastCollectionPublic}>()
            if (collectionRef != nil) {
                let IDs = collectionRef!.getIDs()
                var i = 0
                while i < IDs.length && index < limit {
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

                beasts.append(beast)
                index = index + 1
            
                i = i + 1

                }
            }
        }


    return beasts
}

// flow scripts execute test.cdc -n=testnet

// a b
// FRLabs join two objects
// let newArray = [...a, ...b]