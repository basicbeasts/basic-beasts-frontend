import { FC, createContext, useContext, useEffect } from "react"
import * as fcl from "@onflow/fcl"
import useFUSD from "@framework/hooks/use-fusd.hook"
import useUserBeasts from "@framework/hooks/use-user-beasts.hook"
import useCurrentUser from "framework/hooks/use-current-user.hook"
import useCookie from "framework/hooks/use-cookie.hook"
import useUserChests from "@framework/hooks/use-user-chest.hook"
import useChestSales from "@framework/hooks/use-chest-sales.hook"
import useFUSDChestRewards from "@framework/hooks/use-fusd-chest-rewards.hook"

export interface State {}

const initialState = {}

const Context = createContext<State | any>(initialState)

const UserProvider: FC = ({ children }) => {
  const [user, address]: any = useCurrentUser()
  const [compositeSignature, setCompositeSignature] = useCookie(
    "user-composite-signature",
  )

  const { data: balance, getFUSDBalance, purchase, loading } = useFUSD(user)
  // const {
  //   data: userBeasts,
  //   fetchUserBeasts,
  //   loadingBeast,
  // } = useUserBeasts(user)

  const {
    data: stuff,
    getUserChestCollection,
    chestIDs,
    saleIDs,
    getUserSaleCollection,
    totalUserChests,
    fetchUserChests,
  } = useUserChests(user)

  const {
    data: saleOffers,
    getAllChestSaleOffers,
    floorPrice,
  } = useChestSales()

  const { getClaimedFUSDRewards, claimedFUSDRewards } = useFUSDChestRewards()

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
        chestIDs,
        getUserChestCollection,
        saleIDs,
        getUserSaleCollection,
        getAllChestSaleOffers,
        totalUserChests,
        fetchUserChests,
        saleOffers,
        floorPrice,
        claimedFUSDRewards,
        getClaimedFUSDRewards,
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
