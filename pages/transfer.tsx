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
        let alice: Address = 0x2432e062f9f14295 //admin
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
        let aliceTokenIDs: [UInt64] = [136311421,136311441,136311461,136311481,136311501,136311521,136311541,136311561,136311581,136311601,136311621,136311641,136311661,136311681,136311701,136311721,136311741,136311761,136311781,136311801,136311821,136311841,136311861,136311881,136311901,136311921,136311941,136311961,136311981,136312001,136312021,136312041,136311426,136311446,136311466,136311486,136311506,136311526,136311546,136311566,136311586,136311606,136311626,136311646,136311666,136311686,136311706,136311726,136311746,136311766,136311786,136311806,136311826,136311846,136311866,136311886,136311906,136311926,136311946,136311966,136311986,136312006,136312026,136312046,136311431,136311451,136311471,136311491,136311511,136311531,136311551,136311571,136311591,136311611,136311631,136311651,136311671,136311691,136311711,136311731,136311751,136311771,136311791,136311811,136311831,136311851,136311871,136311891,136311911,136311931,136311951,136311971,136311991,136312011,136312031,136312051,136311436,136311456,136311476,136311496,136311516,136311536,136311556,136311576,136311596,136311616,136311636,136311656,136311676,136311696,136311716,136311736,136311756,136311776,136311796,136311816,136311836,136311856,136311876,136311896,136311916,136311936,136311956,136311976,136311996,136312016,136312036,136312056]
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
