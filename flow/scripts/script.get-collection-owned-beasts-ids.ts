export const GET_COLLECTION_OWNED_BEASTS_IDS = `
    import BasicBeast from 0x4742010dbfe107da

    pub fun main(account: Address): [UInt64] {
        
        let acct = getAccount(account)

        let collectionRef = acct.getCapability(BasicBeast.CollectionPublicPath)
            .borrow<&{BasicBeast.BeastCollectionPublic}>()!

        return collectionRef.getIDs()

    }
`
