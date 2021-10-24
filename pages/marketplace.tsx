import type { NextPage } from "next"
import ComingSoon from "@components/ui/ComingSoon"

const Marketplace: NextPage = () => {
  return (
    <div>
      <ComingSoon
        title="Coming Soon!"
        description="Trade your Beasts on the Marketplace. Receive 5% royalties of all trades from a Beast by becoming its First Owner."
      />
    </div>
  )
}

export default Marketplace
