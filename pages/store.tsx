import type { NextPage } from "next"
import DefaultHeroSection from "@components/ui/DefaultHeroSection"
import PackStore from "@components/ui/PackStore"

const Store: NextPage = () => {
  return (
    <div>
      <DefaultHeroSection
        title="Store Closed"
        description="Join Discord to receive drop updates"
      />
      <PackStore />
    </div>
  )
}

export default Store
