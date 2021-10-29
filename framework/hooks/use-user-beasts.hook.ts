import { useEffect, useReducer } from "react"
import { GET_COLLECTION_OWNED_BEASTS_IDS } from "flow/scripts/script.get-collection-owned-beasts-ids"
import { GET_COLLECTION_OWNED_BEASTS } from "flow/scripts/script.get-collection-owned-beasts"
import { userBeastReducer } from "reducer/userBeastReducer"
import BeastClass from "utils/BeastClass"
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
import * as FlowTypes from "@onflow/types"
import { TRANSFER } from "flow/transactions/transaction.transfer"

export default function useUserBeasts(user: any) {
  const [state, dispatch] = useReducer(userBeastReducer, {
    loading: false,
    error: false,
    data: [],
  })

  useEffect(() => {
    fetchUserBeasts()
    //eslint-disable-next-line
  }, [user?.addr])

  const fetchUserBeasts = async () => {
    dispatch({ type: "PROCESSING" })
    try {
      let res = await query({
        cadence: GET_COLLECTION_OWNED_BEASTS,
        args: (arg: any, t: any) => [arg(user?.addr, t.Address)],
      })
      let mappedBeasts = []

      for (let key in res) {
        const element = res[key]
        let beast = new BeastClass(
          element.data.beastTemplate.name,
          element.id,
          element.data.serialNumber,
          element.data.beastTemplate.dexNumber,
          element.data.sex,
          element.data.beastTemplate.image,
          element.data.beastTemplate.basicSkills,
          Object.keys(element.data.beastTemplate.elements),
          element.uuid,
        )
        console.log("Beast: " + beast)
        console.log(
          "Element keys:" + Object.keys(element.data.beastTemplate.elements),
        )
        mappedBeasts.push(beast)
      }
      dispatch({ type: "SUCCESS", payload: mappedBeasts })
    } catch (err) {
      dispatch({ type: "ERROR" })
      console.log(err)
    }
  }

  const transferBeast = async (address: any, beastID: any) => {
    dispatch({ type: "PROCESSING" })

    try {
      const res = await send([
        transaction(TRANSFER),
        args([arg(address, FlowTypes.Address), arg(beastID, FlowTypes.UInt64)]),
        payer(authz),
        proposer(authz),
        authorizations([authz]),
        limit(9999),
      ]).then(decode)
      // wait for transaction to be mined
      const trx = await tx(res).onceSealed()
      // this will refetch the balance once transaction is mined
      // basically acts as a dispatcher allowing to update balance once transaction is mined
      fetchUserBeasts()
      // we return the transaction body and can handle it in the component
      return trx
    } catch (err) {
      dispatch({ type: "ERROR" })
    }
  }

  /*
  
  const fetchUserBeasts = async () => {
    dispatch({ type: "PROCESSING" })
    try {
      let res = await query({
        cadence: GET_COLLECTION_OWNED_BEASTS_IDS,
        args: (arg: any, t: any) => [arg(user?.addr, t.Address)],
      })
      dispatch({ type: "SUCCESS", payload: res })
      console.log(res)
    } catch (err) {
      dispatch({ type: "ERROR" })
      console.log(err)
    }
  }
  
  */

  return {
    ...state,
    fetchUserBeasts,
    transferBeast,
  }
}
