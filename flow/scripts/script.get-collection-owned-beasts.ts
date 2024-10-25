export const GET_COLLECTION_OWNED_BEASTS = `
    import BasicBeasts from 0xBasicBeasts

    access(all) fun main(account: Address): [&BasicBeasts.NFT{BasicBeasts.Public}] {
        
        let acct = getAccount(account)

        let collectionRef = acct.getCapability(BasicBeasts.CollectionPublicPath)
            .borrow<&{BasicBeasts.BeastCollectionPublic}>()
            ?? panic("Couldn't borrow a reference to the beast collection")

        let beastIDs = collectionRef.getIDs()

        var i = 0

        var beasts: [&BasicBeasts.NFT{BasicBeasts.Public}] = []
        
        while i < beastIDs.length {
            let token = collectionRef.borrowBeast(id: beastIDs[i])
                ?? panic("Couldn't borrow a reference to the specified beast")

            beasts.insert(at:i, token)
            
            i = i + 1
        }

        return beasts

    }

`
