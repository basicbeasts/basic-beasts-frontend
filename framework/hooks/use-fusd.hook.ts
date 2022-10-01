import { useEffect, useReducer, useCallback } from "react"
import { defaultReducer } from "reducer/defaultReducer"
import { GET_FUSD_BALANCE } from "flow/scripts/script.get-fusd-balance"
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
import * as fcl from "@onflow/fcl"
import * as FlowTypes from "@onflow/types"
import { PURCHASE } from "flow/transactions/transaction.purchase"

export default function useFUSD(user: any) {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null,
  })

  useEffect(() => {
    if (user?.addr != null) {
      getFUSDBalance()
    }
    //eslint-disable-next-line
  }, [user?.addr])

  const getFUSDBalance = async () => {
    dispatch({ type: "PROCESSING" })

    try {
      let response = await query({
        cadence: GET_FUSD_BALANCE,
        args: (arg: any, t: any) => [arg(user?.addr, t.Address)],
      })
      dispatch({ type: "SUCCESS", payload: response })
    } catch (err) {
      dispatch({ type: "ERROR" })
      console.log(err)
    }
  }

  //TODO: Try and catch

  const purchase = async (amount: any, address: any) => {
    dispatch({ type: "PROCESSING" })

    try {
      const res = await send([
        transaction(PURCHASE),
        args([
          arg(amount, FlowTypes.UFix64),
          arg(address, FlowTypes.Address), //send to fixed wallet address
        ]),
        payer(authz),
        proposer(authz),
        authorizations([authz]),
        limit(9999),
      ]).then(decode)
      // wait for transaction to be mined
      const trx = await tx(res).onceSealed()
      // this will refetch the balance once transaction is mined
      // basically acts as a dispatcher allowing to update balance once transaction is mined
      getFUSDBalance()
      // we return the transaction body and can handle it in the component
      return trx
    } catch (err) {
      dispatch({ type: "ERROR" })
      console.log(err)
    }
  }

  return {
    ...state,
    getFUSDBalance,
    purchase,
  }
}
