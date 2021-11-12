import { useEffect, useState } from "react"
import * as fcl from "@onflow/fcl"
import useCookie from "./use-cookie.hook"
import { SIGN_COOKIE_KEY } from "../cookies"

export default function useCurrentUser() {
  const [user, setUser] = useState({ addr: null })
  const [, , removeCompositeSignature] = useCookie(SIGN_COOKIE_KEY)

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
