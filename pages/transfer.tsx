import type { NextPage } from "next"
import DefaultHeroSection from "@components/ui/DefaultHeroSection"
import { useState } from "react"
import {
  query,
  send,
  transaction,
  args,
  arg,
  payer,
  proposer,
  authorizations,
  limit,
  authz,
  decode,
  tx,
} from "@onflow/fcl"
import { toast } from "react-toastify"
import * as t from "@onflow/types"
import { useAuth } from "@components/auth/AuthProvider"
import { toastStatus } from "@framework/helpers/toastStatus"

const Transfer: NextPage = () => {
  const [open, setOpen] = useState(true)

  const { user } = useAuth()

  const transfer = async () => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
        import NonFungibleToken from 0x631e88ae7f1d7c20
import BasicBeasts from 0xfa252d0aa22bf86a

transaction {
    let senderCollection: &BasicBeasts.Collection
    let aliceCollection: &BasicBeasts.Collection{BasicBeasts.BeastCollectionPublic}
    let bobCollection: &BasicBeasts.Collection{BasicBeasts.BeastCollectionPublic}

    prepare(acct: AuthAccount) {
        let alice: Address = 0x1801c3f618a511e6
        let bob: Address = 0x771519260bbe1ee6

        self.senderCollection = acct.borrow<&BasicBeasts.Collection>(from: BasicBeasts.CollectionStoragePath)
            ?? panic("borrow sender collection failed")

        self.aliceCollection = getAccount(alice)
            .getCapability(BasicBeasts.CollectionPublicPath)
            .borrow<&BasicBeasts.Collection{BasicBeasts.BeastCollectionPublic}>()
            ?? panic("borrow alice collection failed")

        self.bobCollection = getAccount(bob)
            .getCapability(BasicBeasts.CollectionPublicPath)
            .borrow<&BasicBeasts.Collection{BasicBeasts.BeastCollectionPublic}>()
            ?? panic("borrow bob collection failed")
    }

    execute {
        let aliceTokenIDs: [UInt64] = [131641608,131641628,131641648,131641668,131641613,131641633,131641653,131641673,131641618,131641638,131641658,131641678,131641698,131641693,131641623,131641643,131641663,131641683,131641703]
       for id in aliceTokenIDs {
           let beast <- self.senderCollection.withdraw(withdrawID: id)
           self.aliceCollection.deposit(token: <- beast)
       }


       let bobTokenIDs: [UInt64] = [131641688,131641708,131641728,131641748,131641713,131641733,131641753,131641718,131641738,131641758,131641723,131641743,131641763]

        for id in bobTokenIDs {
            let beast <- self.senderCollection.withdraw(withdrawID: id)
            self.bobCollection.deposit(token: <- beast)
        }
    }
}
        `),
        payer(authz),
        proposer(authz),
        authorizations([authz]),
        limit(9999),
      ]).then(decode)
      tx(res).subscribe((res: any) => {
        toastStatus(id, res.status)
      })
      await tx(res)
        .onceSealed()
        .then((result: any) => {
          toast.update(id, {
            render: "Transaction Sealed",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          })
        })
      // fetchHunterData() Don't have this otherwise /profile/user.find won't show packs and packs will be reloaded
    } catch (err) {
      toast.update(id, {
        render: () => <div>Error, try again later...</div>,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      })
      console.log(err)
    }
  }

  return (
    <div>
      <DefaultHeroSection title="For testing" description="Transfer beast" />
      <button onClick={() => transfer()}>transfer to bob and alice</button>
    </div>
  )
}

export default Transfer
