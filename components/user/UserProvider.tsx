import { FC, createContext, useContext, useState, useEffect } from 'react'
import useFUSD from 'framework/hooks/use-fusd-balance.hook'
import useCurrentUser from "framework/hooks/use-current-user.hook"

export interface State {}

const initialState = {} 

const Context = createContext<State | any>(initialState)

const UserProvider: FC = ({ children }) => {
    const [user]:any =  useCurrentUser()
    const { data: balance, getFUSDBalance, purchase } = useFUSD(user)

    return (
        <Context.Provider 
            value={{
                balance,
                getFUSDBalance,
                purchase,
                
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
