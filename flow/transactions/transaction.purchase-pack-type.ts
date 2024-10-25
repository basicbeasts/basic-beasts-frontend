export const PURCHASE_PACK_TYPE = `
import FungibleToken from 0xFungibleToken
import FUSD from 0xFUSD
import BasicBeastsDrop from 0xBasicBeastsDrop
import Pack from 0xPack
import NonFungibleToken from 0xNonFungibleToken
import MetadataViews from 0xMetadataViews

access(all) fun hasPackCollection(_ address: Address): Bool {
    return getAccount(address)
      .getCapability<&Pack.Collection{NonFungibleToken.CollectionPublic, Pack.PackCollectionPublic}>(Pack.CollectionPublicPath)
      .check()
}

transaction(amount: UFix64, to: Address, type: String) {
    prepare(acct: AuthAccount) {

        // Check for pack collection
        if !hasPackCollection(acct.address) {
            if acct.borrow<&Pack.Collection>(from: Pack.CollectionStoragePath) == nil {
              acct.save(<-Pack.createEmptyCollection(), to: Pack.CollectionStoragePath)
            }
            acct.unlink(Pack.CollectionPublicPath)
            acct.link<&Pack.Collection{NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, Pack.PackCollectionPublic, MetadataViews.ResolverCollection}>(Pack.CollectionPublicPath, target: Pack.CollectionStoragePath)
        }

        BasicBeastsDrop.participate(amount: amount, 
                                    vaultAddress: to,  
                                    type: type, 
                                    vault: <- acct.borrow<&FUSD.Vault>(from: /storage/fusdVault)!.withdraw(amount: amount), 
                                    address: acct.address
                                    )
    }
}
`
