import { useEffect, useReducer } from "react"
import { mutate, query, tx } from "@onflow/fcl"
import { GET_COLLECTION_OWNED_BEASTS_IDS } from "flow/scripts/script.get-collection-owned-beasts-ids"
import { GET_COLLECTION_OWNED_BEASTS } from "flow/scripts/script.get-collection-owned-beasts"
import { userBeastReducer } from "reducer/userBeastReducer"
import BeastClass from "utils/BeastClass"

export default function useUserBeasts(user: any) {
  const [state, dispatch] = useReducer(userBeastReducer, {
    oading: false,
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
          element.data.serialNumber,
          element.data.beastTemplate.dexNumber,
          element.data.sex,
          element.data.beastTemplate.image,
          key,
        )
        mappedBeasts.push(beast)
        console.log(element.data.beastTemplate.elements)
      }
      console.log("Beast Array: " + mappedBeasts)
      dispatch({ type: "SUCCESS", payload: mappedBeasts })
    } catch (err) {
      dispatch({ type: "ERROR" })
      console.log(err)
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
  }
}
