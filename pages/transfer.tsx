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
    // let bobCollection: &BasicBeasts.Collection{BasicBeasts.BeastCollectionPublic}

    prepare(acct: AuthAccount) {
        // let alice: Address = 0x1801c3f618a511e6
        let alice: Address = 0xbca26f5091cd39ec //admin
        // let bob: Address = 0x771519260bbe1ee6

        self.senderCollection = acct.borrow<&BasicBeasts.Collection>(from: BasicBeasts.CollectionStoragePath)
            ?? panic("borrow sender collection failed")

        self.aliceCollection = getAccount(alice)
            .getCapability(BasicBeasts.CollectionPublicPath)
            .borrow<&BasicBeasts.Collection{BasicBeasts.BeastCollectionPublic}>()
            ?? panic("borrow alice collection failed")

        // self.bobCollection = getAccount(bob)
        //     .getCapability(BasicBeasts.CollectionPublicPath)
        //     .borrow<&BasicBeasts.Collection{BasicBeasts.BeastCollectionPublic}>()
        //     ?? panic("borrow bob collection failed")
    }

    execute {
        let aliceTokenIDs: [UInt64] = [133176368,133176388,133176408,133176428,133176448,133176468,133176488,133176508,133176528,133176548,133176568,133176588,133176608,133176628,133176648,133176668,133176688,133176708,133176728,133176748,133176768,133176788,133176808,133176828,133176373,133176393,133176413,133176433,133176453,133176473,133176493,133176513,133176533,133176553,133176573,133176593,133176613,133176633,133176653,133176673,133176693,133176713,133176733,133176753,133176773,133176793,133176813,133176833,133176378,133176398,133176418,133176438,133176458,133176478,133176498,133176518,133176538,133176558,133176578,133176598,133176618,133176638,133176658,133176678,133176698,133176718,133176738,133176758,133176778,133176798,133176818,133176838,133176383,133176403,133176423,133176443,133176463,133176483,133176503,133176523,133176543,133176563,133176583,133176603,133176623,133176643,133176663,133176683,133176703,133176723,133176743,133176763,133176783,133176803,133176823,133176843]
       for id in aliceTokenIDs {
           let beast <- self.senderCollection.withdraw(withdrawID: id)
           self.aliceCollection.deposit(token: <- beast)
       }


      //  let bobTokenIDs: [UInt64] = [131641688,131641708,131641728,131641748,131641713,131641733,131641753,131641718,131641738,131641758,131641723,131641743,131641763]

      //   for id in bobTokenIDs {
      //       let beast <- self.senderCollection.withdraw(withdrawID: id)
      //       self.bobCollection.deposit(token: <- beast)
      //   }
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
