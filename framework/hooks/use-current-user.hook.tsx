import { useEffect, useState } from "react"
import * as fcl from "@onflow/fcl"

export default function useCurrentUser() {
  const [user, setUser] = useState({ addr: null })

  const logIn = () => {
    fcl.authenticate()
  }

  const logOut = () => {
    fcl.unauthenticate()
  }

  useEffect(() => {
    let cancel = false
    if (!cancel) {
      fcl.currentUser().subscribe(setUser)
    }
    return () => {
      cancel = true
    }
  }, [])

  return [user, user?.addr != null, logIn, logOut]
}
