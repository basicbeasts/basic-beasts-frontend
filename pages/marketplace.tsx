import type { NextPage } from "next"
import DefaultHeroSection from "@components/ui/DefaultHeroSection"

const Marketplace: NextPage = () => {
  return (
    <div>
      <DefaultHeroSection
        title="Coming Soon!"
        description="Trade your Beasts on the Marketplace. Receive 5% royalties of all trades from a Beast by becoming its First Owner."
      />
    </div>
  )
}

export default Marketplace
