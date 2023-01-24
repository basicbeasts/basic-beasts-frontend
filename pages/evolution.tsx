import type { NextPage } from "next"
import DefaultHeroSection from "@components/ui/DefaultHeroSection"
import EvolutionModal from "@components/ui/EvolutionModal"
import { useState } from "react"

const Evolution: NextPage = () => {
  const [open, setOpen] = useState(true)
  return (
    <div>
      <DefaultHeroSection
        title="Coming Soon!"
        description="Evolve your Basic Beasts to complete your Dexicon"
      />
      <EvolutionModal
        handleClose={() => setOpen(true)}
        RevealModalOpen={open}
        packId={"1" || "1"}
        evolvedBeastId={"2"}
      />
    </div>
  )
}

export default Evolution
