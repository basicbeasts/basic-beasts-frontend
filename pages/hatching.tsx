import type { NextPage } from "next"
import DefaultHeroSection from "@components/ui/DefaultHeroSection"
import HatchingModal from "@components/ui/HatchingModal"
import { useState } from "react"

const Hatching: NextPage = () => {
  const [open, setOpen] = useState(true)
  return (
    <div>
      <DefaultHeroSection
        title="Coming Soon!"
        description="Hatch a Basic Beast to complete your Dexicon"
      />
      {/* <HatchingModal
        handleClose={() => setOpen(true)}
        RevealModalOpen={open}
        packId={"1" || "1"}
        evolvedBeastId={"2"}
      /> */}
    </div>
  )
}

export default Hatching
