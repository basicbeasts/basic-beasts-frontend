export const PURCHASE_PACK_TYPE = `
import FungibleToken from 0xFungibleToken
import FUSD from 0xFUSD
import BasicBeastsDrop from 0xBasicBeastsDrop

transaction(amount: UFix64, to: Address, type: String) {

    // let vault: @FungibleToken.Vault

    prepare(signer: AuthAccount) {
        // self.vault <- signer.borrow<&FUSD.Vault>(from: /storage/fusdVault)!.withdraw(amount: amount)

        BasicBeastsDrop.participate(amount: amount, vaultAddress: to, type: type, vault: <- signer.borrow<&FUSD.Vault>(from: /storage/fusdVault)!.withdraw(amount: amount), address: signer.address)
    }

    execute {
    }
}
`
