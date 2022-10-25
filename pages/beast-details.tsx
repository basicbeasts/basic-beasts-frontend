import type { NextPage } from "next"
import ProductBeastView from "@components/ui/ProductBeastView"

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
    description:
      "A moon slightly resembles a bunny. with strange ears in it's head it shocks everything around it.",
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
  {
    name: "Moon",
    nickname: "pikachu",
    serialNumber: 67,
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
    nickname: "Polly",
    serialNumber: 70,
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
    nickname: "Pacman",
    serialNumber: 73,
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
    nickname: "Char Metallic",
    serialNumber: 72,
    dexNumber: 1,
    skin: "Metallic Silver",
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
    nickname: "Popo Cursed",
    serialNumber: 71,
    dexNumber: 1,
    skin: "Cursed Black",
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

const BeastDetails: NextPage = () => {
  return (
    <div>
      <ProductBeastView beast={dummyData[0]} beasts={dummyData} />
    </div>
  )
}

export default BeastDetails
