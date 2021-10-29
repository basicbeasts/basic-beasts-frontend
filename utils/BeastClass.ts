class BeastClass {
  name: String
  serialNumber: number
  dexNumber: number
  gender: String
  imageURL: String
  key: any

  constructor(
    name: String,
    serialNumber: number,
    dexNumber: number,
    gender: String,
    imageURL: String,
    key: any,
  ) {
    this.name = name
    this.serialNumber = serialNumber
    this.dexNumber = dexNumber
    this.gender = gender
    this.imageURL = imageURL
    this.key = key || 0
  }

  get type() {
    return "Beast"
  }
}

export default BeastClass
