export const PURCHASE = `
  import FungibleToken from 0xFungibleToken
  import FUSD from 0xFUSD

  transaction(amount: UFix64, to: Address) {

    let vault: @FungibleToken.Vault

    prepare(signer: AuthAccount) {
        self.vault <- signer.borrow<&FUSD.Vault>(from: /storage/fusdVault)!.withdraw(amount: amount)
    }

    execute {
        getAccount(to).getCapability(/public/fusdReceiver)!.borrow<&{FungibleToken.Receiver}>()!
            .deposit(from: <-self.vault)
    }
}
`