class BeastClass {
  name: String
  beastID: number
  serialNumber: number
  dexNumber: number
  gender: String
  imageURL: String
  basicSkills: [String]
  elements: String[]
  key: any

  constructor(
    name: String,
    beastID: number,
    serialNumber: number,
    dexNumber: number,
    gender: String,
    imageURL: String,
    basicSkills: [String],
    elements: String[],
    key: any,
  ) {
    this.name = name
    this.beastID = beastID
    this.serialNumber = serialNumber
    this.dexNumber = dexNumber
    this.gender = gender
    this.imageURL = imageURL
    this.basicSkills = basicSkills
    this.elements = elements
    this.key = key || 0
  }

  get type() {
    return "Beast"
  }
}

export default BeastClass
