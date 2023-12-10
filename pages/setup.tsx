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

const Setup: NextPage = () => {
  const [open, setOpen] = useState(true)

  const { user } = useAuth()

  const setup = async () => {
    const id = toast.loading("Initializing...")

    try {
      const res = await send([
        transaction(`
        import BasicBeasts from 0xde7a5daf9df48c65
        import NonFungibleToken from 0x1d7e57aa55817448
        import MetadataViews from 0x1d7e57aa55817448
        
        transaction() {
            prepare(signer: AuthAccount) {
                if signer.borrow<&BasicBeasts.Collection>(from: BasicBeasts.CollectionStoragePath) == nil {
                    signer.save(<-BasicBeasts.createEmptyCollection(), to: BasicBeasts.CollectionStoragePath)
        
                    signer.unlink(BasicBeasts.CollectionPublicPath)

                    signer.link<&BasicBeasts.Collection{BasicBeasts.BeastCollectionPublic, NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection}>(BasicBeasts.CollectionPublicPath, target: BasicBeasts.CollectionStoragePath)
        
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
      <DefaultHeroSection title="Setup Beastz" description="Setup collection" />
      <button onClick={() => setup()}>setup beastz collection</button>
    </div>
  )
}

export default Setup
