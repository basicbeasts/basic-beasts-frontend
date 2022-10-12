import type { NextPage } from "next"
import HeaderDark from "@components/ui/HeaderDark"
import styled from "styled-components"
import BeastMarket from "@components/ui/BeastMarket"

const Spacing = styled.div`
  @media (min-width: 1100px) {
    padding: 100px 0;
  }
`

const Marketplace: NextPage = () => {
  const dummyData = [
    {
      name: "Moon",
      nickname: "angewoman",
      serialNumber: 69,
      dexNumber: 1,
      skin: "Normal",
      starLevel: 1,
      elements: ["Electric"],
      basicSkills: ["Triple Kick", "Gravity Pull", "Moon Shock"],
      ultimateSkill: "Mega Volt Crash",
      currentOwner: "0xa38a2e5fedaed062",
      firstOwner: "0xa38a2e5fedaed062",
      sex: "Female",
      breedingCount: 1, //Fetched from another script
      numberOfMintedBeastTemplates: 300,
      beastTemplateID: 1,
      price: 200,
    },
    {
      name: "Moon",
      nickname: "hobo man",
      serialNumber: 68,
      dexNumber: 1,
      skin: "Normal",
      starLevel: 1,
      elements: ["Electric"],
      basicSkills: ["Triple Kick", "Gravity Pull", "Moon Shock"],
      ultimateSkill: "Mega Volt Crash",
      currentOwner: "0xa38a2e5fedaed062",
      firstOwner: "0xa38a2e5fedaed062",
      sex: "Female",
      breedingCount: 1, //Fetched from another script
      numberOfMintedBeastTemplates: 300,
      beastTemplateID: 1,
      price: 200,
    },
  ]

  return (
    <div>
      <HeaderDark
        title="Coming Soon!"
        description="Trade your Beasts on the Marketplace. Receive 5% royalties of all trades from a Beast by becoming its First Owner."
      />
      <BeastMarket
        beasts={dummyData}
        // fetchAllBeasts={}
      />
      <pre>{JSON.stringify(dummyData, null, 2)}</pre>
    </div>
  )
}

export default Marketplace
