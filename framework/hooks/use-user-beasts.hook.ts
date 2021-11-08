import { useEffect, useReducer } from "react"
import { GET_COLLECTION_OWNED_BEASTS } from "flow/scripts/script.get-collection-owned-beasts"
import { userBeastReducer } from "reducer/userBeastReducer"
import BeastClass from "utils/BeastClass"
import { query } from "@onflow/fcl"

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

  return {
    ...state,
    fetchUserBeasts,
  }
}
