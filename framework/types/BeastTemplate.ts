import { Image } from "./common"

export type BeastTemplate = {
  dexNumber: number
  name: string
  type: string
  description: string
  starLevel: number
  basicSkills: [string]
  ultimateSkill: string
  image?: Image
  color: string
  buttonBackground: string
  buttonOutset: string
  buttonInset: string
  typeTagBackground: string
  typeTagOutset: string
  typeTagInset: string
}
