/**
 * GQTY AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

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
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any
}

export const scalarsEnumsHash: import("gqty").ScalarsEnumsHash = {
  Boolean: true,
  DateTime: true,
  ID: true,
  Int: true,
  String: true,
  URL: true,
}
export const generatedSchema = {
  Beast: {
    __typename: { __type: "String!" },
    basicSkills: { __type: "[String]!" },
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
    ultimateSkill: { __type: "String!" },
    updatedAt: { __type: "DateTime!" },
    videoUrl: { __type: "URL" },
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
    createdAt: { __type: "DateTime!" },
    id: { __type: "ID!" },
    imageUrl: { __type: "URL" },
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
  PageInfo: {
    __typename: { __type: "String!" },
    endCursor: { __type: "String" },
    hasNextPage: { __type: "Boolean!" },
    hasPreviousPage: { __type: "Boolean!" },
    startCursor: { __type: "String" },
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
  },
  query: {
    __typename: { __type: "String!" },
    beast: { __type: "Beast", __args: { id: "ID!" } },
    me: { __type: "User" },
    node: { __type: "Node", __args: { id: "ID!" } },
    user: { __type: "User", __args: { walletAddress: "ID!" } },
  },
  subscription: {},
  [SchemaUnionsKey]: {
    MetaNode: ["Beast", "Pack", "User"],
    Node: ["Beast", "Pack", "User"],
  },
} as const

export interface Beast {
  __typename?: "Beast"
  basicSkills: Array<Maybe<ScalarsEnums["String"]>>
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
  ultimateSkill: ScalarsEnums["String"]
  updatedAt: ScalarsEnums["DateTime"]
  videoUrl?: Maybe<ScalarsEnums["URL"]>
}

export interface MetaNode {
  __typename?: "Beast" | "Pack" | "User"
  createdAt: ScalarsEnums["DateTime"]
  updatedAt: ScalarsEnums["DateTime"]
  $on: $MetaNode
}

/**
 * An object with an ID
 */
export interface Node {
  __typename?: "Beast" | "Pack" | "User"
  /**
   * The id of the object.
   */
  id: ScalarsEnums["ID"]
  $on: $Node
}

export interface Pack {
  __typename?: "Pack"
  beast?: Maybe<Beast>
  createdAt: ScalarsEnums["DateTime"]
  /**
   * The ID of an object
   */
  id: ScalarsEnums["ID"]
  imageUrl?: Maybe<ScalarsEnums["URL"]>
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
}

export interface Query {
  __typename?: "Query"
  beast: (args: { id: Scalars["ID"] }) => Maybe<Beast>
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
  user: (args: { walletAddress: Scalars["ID"] }) => Maybe<User>
}

export interface Subscription {
  __typename?: "Subscription"
}

export interface SchemaObjectTypes {
  Beast: Beast
  Mutation: Mutation
  Pack: Pack
  PackConnection: PackConnection
  PackEdge: PackEdge
  PageInfo: PageInfo
  Query: Query
  Subscription: Subscription
  User: User
}
export type SchemaObjectTypesNames =
  | "Beast"
  | "Mutation"
  | "Pack"
  | "PackConnection"
  | "PackEdge"
  | "PageInfo"
  | "Query"
  | "Subscription"
  | "User"

export interface $MetaNode {
  Beast?: Beast
  Pack?: Pack
  User?: User
}

export interface $Node {
  Beast?: Beast
  Pack?: Pack
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

export interface ScalarsEnums extends MakeNullable<Scalars> {}
