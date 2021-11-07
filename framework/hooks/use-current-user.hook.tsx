import { useEffect, useState } from "react"
import * as fcl from "@onflow/fcl"
import useCookie from "./use-cookie.hook"

export default function useCurrentUser() {
  const [user, setUser] = useState({ addr: null })
  const [, , removeCompositeSignature] = useCookie("user-composite-signature")

  const logIn = () => {
    fcl.authenticate()
  }

  const logOut = () => {
    removeCompositeSignature()
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
