/**
 * GQTY AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */
// TODO: investigate why this is needed
// @ts-nocheck
import { SchemaUnionsKey } from "gqty"

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: any
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any
}

export enum PackType {
  CURSED_BLACK = "CURSED_BLACK",
  METALLIC_SILVER = "METALLIC_SILVER",
  SHINY_GOLD = "SHINY_GOLD",
  STARTER = "STARTER",
}

export const scalarsEnumsHash: import("gqty").ScalarsEnumsHash = {
  Boolean: true,
  DateTime: true,
  HexColorCode: true,
  ID: true,
  Int: true,
  PackType: true,
  String: true,
  URL: true,
}
export const generatedSchema = {
  Beast: {
    __typename: { __type: "String!" },
    basicSkills: { __type: "[String]!" },
    colors: { __type: "BeastTemplateColor" },
    createdAt: { __type: "DateTime!" },
    description: { __type: "String!" },
    dexNumber: { __type: "Int!" },
    elementType: { __type: "[String]!" },
    generation: { __type: "Int!" },
    id: { __type: "ID!" },
    imageUrl: { __type: "URL" },
    name: { __type: "String!" },
    rarity: { __type: "String!" },
    skin: { __type: "String!" },
    starLevel: { __type: "Int!" },
    thumbnailUrl: { __type: "URL" },
    ultimateSkill: { __type: "String!" },
    updatedAt: { __type: "DateTime!" },
    videoUrl: { __type: "URL" },
  },
  BeastTemplateColor: {
    __typename: { __type: "String!" },
    buttonBackground: { __type: "HexColorCode" },
    buttonInset: { __type: "HexColorCode" },
    buttonOutset: { __type: "HexColorCode" },
    color: { __type: "HexColorCode" },
    typeTagBackground: { __type: "HexColorCode" },
    typeTagInset: { __type: "HexColorCode" },
    typeTagOutset: { __type: "HexColorCode" },
  },
  FungibleToken: {
    __typename: { __type: "String!" },
    color: { __type: "FungibleTokenTemplateColor!" },
    count: { __type: "Int!" },
    createdAt: { __type: "DateTime!" },
    description: { __type: "String!" },
    id: { __type: "ID!" },
    imageUrl: { __type: "URL!" },
    name: { __type: "String!" },
    thumbnailUrl: { __type: "URL!" },
    updatedAt: { __type: "DateTime!" },
  },
  FungibleTokenConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[FungibleTokenEdge]" },
    pageInfo: { __type: "PageInfo!" },
  },
  FungibleTokenEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String!" },
    node: { __type: "FungibleToken" },
  },
  FungibleTokenTemplateColor: {
    __typename: { __type: "String!" },
    background: { __type: "HexColorCode!" },
    boxShadow: { __type: "HexColorCode!" },
  },
  MetaNode: {
    __typename: { __type: "String!" },
    createdAt: { __type: "DateTime!" },
    updatedAt: { __type: "DateTime!" },
    $on: { __type: "$MetaNode!" },
  },
  Node: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    $on: { __type: "$Node!" },
  },
  Pack: {
    __typename: { __type: "String!" },
    beast: { __type: "Beast" },
    color: { __type: "PackTemplateColor!" },
    createdAt: { __type: "DateTime!" },
    description: { __type: "String" },
    fungibleTokens: {
      __type: "FungibleTokenConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    id: { __type: "ID!" },
    imageUrl: { __type: "URL!" },
    name: { __type: "String!" },
    thumbnailUrl: { __type: "URL!" },
    type: { __type: "String!" },
    updatedAt: { __type: "DateTime!" },
  },
  PackConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[PackEdge]" },
    pageInfo: { __type: "PageInfo!" },
  },
  PackEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String!" },
    node: { __type: "Pack" },
  },
  PackTemplateColor: {
    __typename: { __type: "String!" },
    background: { __type: "HexColorCode!" },
    boxShadow: { __type: "HexColorCode!" },
  },
  PageInfo: {
    __typename: { __type: "String!" },
    endCursor: { __type: "String" },
    hasNextPage: { __type: "Boolean!" },
    hasPreviousPage: { __type: "Boolean!" },
    startCursor: { __type: "String" },
  },
  PreOrder: {
    __typename: { __type: "String!" },
    createdAt: { __type: "DateTime!" },
    id: { __type: "ID!" },
    type: { __type: "String!" },
    updatedAt: { __type: "DateTime!" },
  },
  User: {
    __typename: { __type: "String!" },
    createdAt: { __type: "DateTime!" },
    id: { __type: "ID!" },
    openedPacks: {
      __type: "PackConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    unopenedPacks: {
      __type: "PackConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    updatedAt: { __type: "DateTime!" },
    username: { __type: "String" },
    walletAddress: { __type: "String!" },
  },
  mutation: {
    __typename: { __type: "String!" },
    openPack: { __type: "Pack", __args: { id: "ID!" } },
    preOrder: {
      __type: "PreOrder",
      __args: {
        count: "Int!",
        packType: "PackType!",
        refundable: "Boolean!",
        transactionHash: "String!",
      },
    },
  },
  query: {
    __typename: { __type: "String!" },
    beast: { __type: "Beast", __args: { id: "ID!" } },
    fungibleToken: { __type: "FungibleToken", __args: { id: "ID!" } },
    me: { __type: "User" },
    node: { __type: "Node", __args: { id: "ID!" } },
    pack: { __type: "Pack", __args: { id: "ID!" } },
  },
  subscription: {},
  [SchemaUnionsKey]: {
    MetaNode: ["Beast", "FungibleToken", "Pack", "PreOrder", "User"],
    Node: ["Beast", "FungibleToken", "Pack", "PreOrder", "User"],
  },
} as const

export interface Beast {
  __typename?: "Beast"
  basicSkills: Array<Maybe<ScalarsEnums["String"]>>
  colors?: Maybe<BeastTemplateColor>
  createdAt: ScalarsEnums["DateTime"]
  description: ScalarsEnums["String"]
  dexNumber: ScalarsEnums["Int"]
  elementType: Array<Maybe<ScalarsEnums["String"]>>
  generation: ScalarsEnums["Int"]
  /**
   * The ID of an object
   */
  id: ScalarsEnums["ID"]
  imageUrl?: Maybe<ScalarsEnums["URL"]>
  name: ScalarsEnums["String"]
  rarity: ScalarsEnums["String"]
  skin: ScalarsEnums["String"]
  starLevel: ScalarsEnums["Int"]
  thumbnailUrl?: Maybe<ScalarsEnums["URL"]>
  ultimateSkill: ScalarsEnums["String"]
  updatedAt: ScalarsEnums["DateTime"]
  videoUrl?: Maybe<ScalarsEnums["URL"]>
}

export interface BeastTemplateColor {
  __typename?: "BeastTemplateColor"
  buttonBackground?: Maybe<ScalarsEnums["HexColorCode"]>
  buttonInset?: Maybe<ScalarsEnums["HexColorCode"]>
  buttonOutset?: Maybe<ScalarsEnums["HexColorCode"]>
  color?: Maybe<ScalarsEnums["HexColorCode"]>
  typeTagBackground?: Maybe<ScalarsEnums["HexColorCode"]>
  typeTagInset?: Maybe<ScalarsEnums["HexColorCode"]>
  typeTagOutset?: Maybe<ScalarsEnums["HexColorCode"]>
}

export interface FungibleToken {
  __typename?: "FungibleToken"
  color: FungibleTokenTemplateColor
  count: ScalarsEnums["Int"]
  createdAt: ScalarsEnums["DateTime"]
  description: ScalarsEnums["String"]
  /**
   * The ID of an object
   */
  id: ScalarsEnums["ID"]
  imageUrl: ScalarsEnums["URL"]
  name: ScalarsEnums["String"]
  thumbnailUrl: ScalarsEnums["URL"]
  updatedAt: ScalarsEnums["DateTime"]
}

/**
 * A connection to a list of items.
 */
export interface FungibleTokenConnection {
  __typename?: "FungibleTokenConnection"
  /**
   * A list of edges.
   */
  edges?: Maybe<Array<Maybe<FungibleTokenEdge>>>
  /**
   * Information to aid in pagination.
   */
  pageInfo: PageInfo
}

/**
 * An edge in a connection.
 */
export interface FungibleTokenEdge {
  __typename?: "FungibleTokenEdge"
  /**
   * A cursor for use in pagination
   */
  cursor: ScalarsEnums["String"]
  /**
   * The item at the end of the edge
   */
  node?: Maybe<FungibleToken>
}

export interface FungibleTokenTemplateColor {
  __typename?: "FungibleTokenTemplateColor"
  background: ScalarsEnums["HexColorCode"]
  boxShadow: ScalarsEnums["HexColorCode"]
}

export interface MetaNode {
  __typename?: "Beast" | "FungibleToken" | "Pack" | "PreOrder" | "User"
  createdAt: ScalarsEnums["DateTime"]
  updatedAt: ScalarsEnums["DateTime"]
  $on: $MetaNode
}

/**
 * An object with an ID
 */
export interface Node {
  __typename?: "Beast" | "FungibleToken" | "Pack" | "PreOrder" | "User"
  /**
   * The id of the object.
   */
  id: ScalarsEnums["ID"]
  $on: $Node
}

export interface Pack {
  __typename?: "Pack"
  beast?: Maybe<Beast>
  color: PackTemplateColor
  createdAt: ScalarsEnums["DateTime"]
  description?: Maybe<ScalarsEnums["String"]>
  fungibleTokens: (args?: {
    /**
     * Returns the items in the list that come after the specified cursor.
     */
    after?: Maybe<Scalars["String"]>
    /**
     * Returns the items in the list that come before the specified cursor.
     */
    before?: Maybe<Scalars["String"]>
    /**
     * Returns the first n items from the list.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Returns the last n items from the list.
     */
    last?: Maybe<Scalars["Int"]>
  }) => Maybe<FungibleTokenConnection>
  /**
   * The ID of an object
   */
  id: ScalarsEnums["ID"]
  imageUrl: ScalarsEnums["URL"]
  name: ScalarsEnums["String"]
  thumbnailUrl: ScalarsEnums["URL"]
  type: ScalarsEnums["String"]
  updatedAt: ScalarsEnums["DateTime"]
}

/**
 * A connection to a list of items.
 */
export interface PackConnection {
  __typename?: "PackConnection"
  /**
   * A list of edges.
   */
  edges?: Maybe<Array<Maybe<PackEdge>>>
  /**
   * Information to aid in pagination.
   */
  pageInfo: PageInfo
}

/**
 * An edge in a connection.
 */
export interface PackEdge {
  __typename?: "PackEdge"
  /**
   * A cursor for use in pagination
   */
  cursor: ScalarsEnums["String"]
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Pack>
}

export interface PackTemplateColor {
  __typename?: "PackTemplateColor"
  background: ScalarsEnums["HexColorCode"]
  boxShadow: ScalarsEnums["HexColorCode"]
}

/**
 * Information about pagination in a connection.
 */
export interface PageInfo {
  __typename?: "PageInfo"
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums["String"]>
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums["Boolean"]
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums["Boolean"]
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums["String"]>
}

export interface PreOrder {
  __typename?: "PreOrder"
  createdAt: ScalarsEnums["DateTime"]
  /**
   * The ID of an object
   */
  id: ScalarsEnums["ID"]
  type: ScalarsEnums["String"]
  updatedAt: ScalarsEnums["DateTime"]
}

export interface User {
  __typename?: "User"
  createdAt: ScalarsEnums["DateTime"]
  /**
   * The ID of an object
   */
  id: ScalarsEnums["ID"]
  openedPacks: (args?: {
    /**
     * Returns the items in the list that come after the specified cursor.
     */
    after?: Maybe<Scalars["String"]>
    /**
     * Returns the items in the list that come before the specified cursor.
     */
    before?: Maybe<Scalars["String"]>
    /**
     * Returns the first n items from the list.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Returns the last n items from the list.
     */
    last?: Maybe<Scalars["Int"]>
  }) => Maybe<PackConnection>
  unopenedPacks: (args?: {
    /**
     * Returns the items in the list that come after the specified cursor.
     */
    after?: Maybe<Scalars["String"]>
    /**
     * Returns the items in the list that come before the specified cursor.
     */
    before?: Maybe<Scalars["String"]>
    /**
     * Returns the first n items from the list.
     */
    first?: Maybe<Scalars["Int"]>
    /**
     * Returns the last n items from the list.
     */
    last?: Maybe<Scalars["Int"]>
  }) => Maybe<PackConnection>
  updatedAt: ScalarsEnums["DateTime"]
  username?: Maybe<ScalarsEnums["String"]>
  walletAddress: ScalarsEnums["String"]
}

export interface Mutation {
  __typename?: "Mutation"
  /**
   * Open a pack
   */
  openPack: (args: { id: Scalars["ID"] }) => Maybe<Pack>
  /**
   * Order a pack
   */
  preOrder: (args: {
    count: Scalars["Int"]
    packType: string
    refundable: Scalars["Boolean"]
    transactionHash: Scalars["String"]
  }) => Maybe<PreOrder>
}

export interface Query {
  __typename?: "Query"
  beast: (args: { id: Scalars["ID"] }) => Maybe<Beast>
  fungibleToken: (args: { id: Scalars["ID"] }) => Maybe<FungibleToken>
  /**
   * Current user
   */
  me?: Maybe<User>
  /**
   * Fetches an object given its ID
   */
  node: (args: {
    /**
     * The ID of an object
     */
    id: Scalars["ID"]
  }) => Maybe<Node>
  pack: (args: { id: Scalars["ID"] }) => Maybe<Pack>
}

export interface Subscription {
  __typename?: "Subscription"
}

export interface SchemaObjectTypes {
  Beast: Beast
  BeastTemplateColor: BeastTemplateColor
  FungibleToken: FungibleToken
  FungibleTokenConnection: FungibleTokenConnection
  FungibleTokenEdge: FungibleTokenEdge
  FungibleTokenTemplateColor: FungibleTokenTemplateColor
  Mutation: Mutation
  Pack: Pack
  PackConnection: PackConnection
  PackEdge: PackEdge
  PackTemplateColor: PackTemplateColor
  PageInfo: PageInfo
  PreOrder: PreOrder
  Query: Query
  Subscription: Subscription
  User: User
}
export type SchemaObjectTypesNames =
  | "Beast"
  | "BeastTemplateColor"
  | "FungibleToken"
  | "FungibleTokenConnection"
  | "FungibleTokenEdge"
  | "FungibleTokenTemplateColor"
  | "Mutation"
  | "Pack"
  | "PackConnection"
  | "PackEdge"
  | "PackTemplateColor"
  | "PageInfo"
  | "PreOrder"
  | "Query"
  | "Subscription"
  | "User"

export interface $MetaNode {
  Beast?: Beast
  FungibleToken?: FungibleToken
  Pack?: Pack
  PreOrder?: PreOrder
  User?: User
}

export interface $Node {
  Beast?: Beast
  FungibleToken?: FungibleToken
  Pack?: Pack
  PreOrder?: PreOrder
  User?: User
}

export interface GeneratedSchema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined
}

export interface ScalarsEnums extends MakeNullable<Scalars> {
  PackType: PackType | undefined
}
