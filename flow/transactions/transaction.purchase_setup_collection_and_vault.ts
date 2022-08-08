export const PURCHASE_SETUP_COLLECTION = `
  import FungibleToken from 0xFungibleToken
  import FUSD from 0xFUSD
  import Pack from 0xPack
  import NonFungibleToken from 0xNonFungibleToken
  import MetadataViews from 0xMetadataViews

  pub fun hasPackCollection(_ address: Address): Bool {
    return getAccount(address)
      .getCapability<&Pack.Collection{NonFungibleToken.CollectionPublic, Pack.PackCollectionPublic}>(Pack.CollectionPublicPath)
      .check()
  }

  transaction(amount: UFix64, to: Address) {

    let vault: @FungibleToken.Vault

    prepare(signer: AuthAccount) {
        self.vault <- signer.borrow<&FUSD.Vault>(from: /storage/fusdVault)!.withdraw(amount: amount)
        
        if !hasPackCollection(signer.address) {
            if signer.borrow<&Pack.Collection>(from: Pack.CollectionStoragePath) == nil {
                signer.save(<-Pack.createEmptyCollection(), to: Pack.CollectionStoragePath)
            }
            signer.unlink(Pack.CollectionPublicPath)
            signer.link<&Pack.Collection{NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, Pack.PackCollectionPublic, MetadataViews.ResolverCollection}>(Pack.CollectionPublicPath, target: Pack.CollectionStoragePath)
        }
    }

    execute {
        getAccount(to).getCapability(/public/fusdReceiver)!.borrow<&{FungibleToken.Receiver}>()!
            .deposit(from: <-self.vault)
    }
}
`
