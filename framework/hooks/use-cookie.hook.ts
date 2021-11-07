import { useState } from "react"
import Cookies from "universal-cookie"

const useCookie = (key: string) => {
  const cookies = new Cookies()
  const [item, setItemValue] = useState(() => {
    if (cookies.get(key)) {
      return cookies.get(key)
    }
    return null
  })

  const setValue = (value: String, options: Record<string, any>) => {
    setItemValue(value)
    cookies.set(key, value, options)
  }

  const removeItem = () => cookies.remove(key)

  return [item, setValue, removeItem]
}

export default useCookie
