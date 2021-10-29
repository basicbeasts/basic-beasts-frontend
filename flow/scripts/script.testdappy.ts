export const GET_COLLECTION_OWNED_BEASTS_IDS = `
    import DappyContract from 0xdb3d539e48a805b7

    pub fun main(account: Address): [UInt64]? {
        
        let acct = getAccount(account)

        if let collectionRef = acct.getCapability<&{DappyContract.CollectionPublic}>(DappyContract.CollectionPublicPath)
        .borrow() {
            let ids = collectionRef.getIDs()
            return ids
        }

        return nil

    }
`
