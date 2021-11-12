export const GET_COLLECTION_OWNED_BEASTS = `
    import BasicBeast from 0xBasicBeast

    pub fun main(account: Address): [&BasicBeast.NFT] {
        
        let acct = getAccount(account)

        let collectionRef = acct.getCapability(BasicBeast.CollectionPublicPath)
            .borrow<&{BasicBeast.BeastCollectionPublic}>()!

        let beastIDs = collectionRef.getIDs()

        var i = 0

        var beasts: [&BasicBeast.NFT] = []
        
        while i < beastIDs.length {
            let token = collectionRef.borrowBeast(id: beastIDs[i])
                ?? panic("Couldn't borrow a reference to the specified beast")

            beasts.insert(at:i, token)
            
            i = i + 1
        }

        return beasts

    }

`