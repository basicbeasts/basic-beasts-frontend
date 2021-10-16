import { useEffect, useReducer, useCallback } from 'react'
import { defaultReducer } from 'reducer/defaultReducer'
import { GET_FUSD_BALANCE } from 'flow/scripts/script.get-fusd-balance'
import { query,send,transaction,args,arg,payer,proposer,authorizations,limit,authz,decode,tx } from '@onflow/fcl'
import * as fcl from '@onflow/fcl';
import * as FlowTypes from '@onflow/types';
import { PURCHASE } from 'flow/transactions/transaction.purchase'

export default function useFUSD(user: any) {
	const [state, dispatch] = useReducer(defaultReducer, {
		loading: true,
		error: false,
		data: null
	  })

	  useEffect(() => {
		getFUSDBalance();
		//eslint-disable-next-line 
	  }, [user?.addr])

	  const getFUSDBalance = async () => {
		dispatch({ type: 'PROCESSING' })
	
		try {
		  let response = await query({
			cadence: GET_FUSD_BALANCE,
			args: (arg:any, t:any) => [
				arg(user?.addr, t.Address)
			]
		  })
		  dispatch({ type: 'SUCCESS', payload: response })
		} catch (err) {
		  dispatch({ type: 'ERROR' })
		  console.log(err)
		}
	  }

      //TODO: Try and catch
	  /*
	  const purchaseStarter = async (amount: any, address: any) => {
			const res = await send([
				transaction(PURCHASE),
				args([
					arg(amount, FlowTypes.UFix64),
				  	arg("0xac70648174bc9884", FlowTypes.Address) //send to fixed wallet address
			]),
				payer(authz),
				proposer(authz),
				authorizations([authz]),
				limit(9999),
			])
			.then(decode);
			return tx(res).onceSealed();
	  };
	  */

	  const purchase = async (amount: any, address: any) => {
		const res = await send([
			transaction(PURCHASE),
			args([
				arg(amount, FlowTypes.UFix64),
				arg(address, FlowTypes.Address) //send to fixed wallet address
		]),
			payer(authz),
			proposer(authz),
			authorizations([authz]),
			limit(9999),
		])
		.then(decode);
		return tx(res).onceSealed();
  };

	  return {
		...state,
		getFUSDBalance,
		purchase
	  }

}