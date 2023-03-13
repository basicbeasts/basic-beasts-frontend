import type { NextPage } from "next"
import { useUser } from "@components/user/UserProvider"
import BeastExplorerHero from "@components/ui/BeastExplorer/Hero"
import BeastExplorerContent from "@components/ui/BeastExplorer/Content"
import beastTemplates from "data/beastTemplates"

const BeastExplorer: NextPage = () => {
  const { beasts, hunterData } = useUser()

  const beastTemplatesArr = Object.values(beastTemplates)

  return (
    <>
      <BeastExplorerHero beasts={beasts} hunters={hunterData} />
      <BeastExplorerContent
        beasts={beasts}
        beastTemplatesArr={beastTemplatesArr}
      />
    </>
  )
}

export default BeastExplorer
