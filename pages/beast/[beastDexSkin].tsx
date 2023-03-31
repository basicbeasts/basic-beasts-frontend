import type { NextPage } from "next"
import { useUser } from "@components/user/UserProvider"
import { useRouter } from "next/router"
import useBeastMarket from "@framework/hooks/use-beast-market.hook"
import BeastTemplateHero from "@components/ui/BeastTemplateHero"
import BeastTemplateContent from "@components/ui/BeastTemplateContent"
import beastTemplates from "data/beastTemplates"
import { useEffect } from "react"

const BeastDetails: NextPage = () => {
  const { beasts, hunterData } = useUser()
  const { loading } = useBeastMarket()

  const router = useRouter()

  const { beastDexSkin } = router.query // e.g. 001-normal = 1
  const url = beastDexSkin as string
  const parts = url.split("-")

  let newDexNumber: string = ""
  let skinName: string = ""

  function getDexSkin() {
    const partsCount = parts.length

    switch (partsCount) {
      case 2:
        newDexNumber = parts[0]
        skinName =
          parts[1][0].toUpperCase() + parts[1].slice(1, parts[1].length)
        break
      case 3:
        newDexNumber = parts[0]
        const skinFirst =
          parts[1][0].toUpperCase() + parts[1].slice(1, parts[1].length)
        const skinSecond =
          parts[2][0].toUpperCase() + parts[2].slice(1, parts[2].length)
        skinName = skinFirst + " " + skinSecond
        break
      default:
        break
    }

    return { newDexNumber, skinName }
  }

  getDexSkin()

  const beastTemplatesArr = Object.values(beastTemplates)
  //Get the beast that is to be displayed on the page
  const newBeast = beastTemplatesArr.filter(
    (index: any) => index.dexNumber == newDexNumber && index.skin == skinName,
  )[0]

  //Get array of beasts with the same dexNumber
  const newBeastsByDex = beastTemplatesArr?.filter(
    (index: any) => index.dexNumber == newBeast.dexNumber,
  )

  return (
    <div>
      {beastDexSkin != null && (
        <>
          <BeastTemplateHero beast={newBeast} beasts={beasts} />
          <BeastTemplateContent
            currBeast={newBeast}
            beastsArr={newBeastsByDex}
            beasts={beasts}
            beastTemplatesArr={beastTemplatesArr}
          />
        </>
      )}
    </div>
  )
}

export default BeastDetails
