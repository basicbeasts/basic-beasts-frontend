import { FC, createContext, useContext, useEffect } from "react"
import * as fcl from "@onflow/fcl"
import useFUSD from "@framework/hooks/use-fusd.hook"
import useUserBeasts from "@framework/hooks/use-user-beasts.hook"
import useCurrentUser from "framework/hooks/use-current-user.hook"
import useCookie from "framework/hooks/use-cookie.hook"
import useUserPacks from "@framework/hooks/use-user-packs.hook"
import useHunterData from "@framework/hooks/use-hunter-data.hook"
import useInbox from "@framework/hooks/use-user-inbox.hook"

export interface State {}

const initialState = {}

const Context = createContext<State | any>(initialState)

const UserProvider: FC = ({ children }) => {
  const [user, address]: any = useCurrentUser()
  // const [compositeSignature, setCompositeSignature] = useCookie(
  //   "user-composite-signature",
  // )

  const { data: balance, getFUSDBalance, purchase, loading } = useFUSD(user)
  const {
    data: userBeasts,
    fetchUserBeasts,
    loadingBeast,
  } = useUserBeasts(user)
  const {
    data: userPacks,
    fetchUserPacks,
    loadingPack,
    unpack,
  } = useUserPacks(user)
  const { data: hunterData, fetchHunterData, findNames } = useHunterData()
  const {
    centralizedInbox,
    starterPacks,
    metallicPacks,
    cursedPacks,
    shinyPacks,
    claimAllMails,
    fetchInbox,
    getNumberOfPacks,
  } = useInbox(user)

  // useEffect(() => {
  //   if (compositeSignature) return
  //   if (address) {
  //     const signMessage = async () => {
  //       const MSG = Buffer.from(process.env.NEXT_PUBLIC_SIGN_MESSAGE!).toString(
  //         "hex",
  //       )
  //       const signedMessage = await fcl.currentUser().signUserMessage(MSG)
  //       if (signedMessage && signedMessage.length > 0) {
  //         setCompositeSignature(signedMessage[0])
  //       }
  //     }
  //     signMessage()
  //   }
  // }, [address, compositeSignature])

  return (
    <Context.Provider
      value={{
        balance,
        getFUSDBalance,
        purchase,
        loading,
        userBeasts,
        fetchUserBeasts,
        loadingBeast,
        userPacks,
        fetchUserPacks,
        loadingPack,
        unpack,
        hunterData,
        fetchHunterData,
        centralizedInbox,
        starterPacks,
        metallicPacks,
        cursedPacks,
        shinyPacks,
        claimAllMails,
        fetchInbox,
        getNumberOfPacks,
        findNames,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default UserProvider

export const useUser = () => {
  return useContext(Context)
}
