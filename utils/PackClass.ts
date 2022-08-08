class PackClass {
  id: number
  uuid: any
  packTemplateName: String
  serialNumber: number
  stockNumber: number
  opened: boolean
  beastTemplateID: number
  beastName: String
  beastGender: String
  beastSerialNumber: number
  beastDexNumber: number
  beastDescription: String
  beastMaxAdminMintAllowed: number
  beastSkin: String
  elements: any

  constructor(
    id: number,
    uuid: any,
    packTemplateName: String,
    serialNumber: number,
    stockNumber: number,
    opened: boolean,
    beastTemplateID: number,
    beastName: String,
    beastGender: String,
    beastSerialNumber: number,
    beastDexNumber: number,
    beastDescription: String,
    beastMaxAdminMintAllowed: number,
    beastSkin: String,
    elements: any,
  ) {
    this.id = id
    this.uuid = uuid || 0
    this.packTemplateName = packTemplateName
    this.serialNumber = serialNumber
    this.stockNumber = stockNumber
    this.opened = opened
    this.beastTemplateID = beastTemplateID
    this.beastName = beastName
    this.beastGender = beastGender
    this.beastSerialNumber = beastSerialNumber
    this.beastDexNumber = beastDexNumber
    this.beastDescription = beastDescription
    this.beastMaxAdminMintAllowed = beastMaxAdminMintAllowed
    this.beastSkin = beastSkin
    this.elements = elements
  }

  get type() {
    return "Pack"
  }
}

export default PackClass
