import type { NextPage } from "next"
import ComingSoon from "@components/ui/ComingSoon"
import EvolutionSet from "@components/ui/EvolutionSet"

const Dexicon: NextPage = () => {
  return (
    <div>
      <ComingSoon
        title="Coming Soon!"
        description="Dexicon shows all discovered Basic Beasts"
      />
      <EvolutionSet />
    </div>
  )
}

export default Dexicon
