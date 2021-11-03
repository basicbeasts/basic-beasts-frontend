import type { NextPage } from "next"
import ComingSoon from "@components/ui/ComingSoon"
import PackStore from "@components/ui/PackStore"

const Store: NextPage = () => {
  return (
    <div>
      <ComingSoon
        title="Store Closed"
        description="Join Discord to receive drop updates"
      />
      <PackStore />
    </div>
  )
}

export default Store
