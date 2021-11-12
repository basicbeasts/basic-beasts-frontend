// @ts-expect-error TODO: investigate why we get circular dependency here
import { createClient, QueryFetcher } from "gqty"
import { createReactClient } from "@gqty/react"
import type {
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from "./schema.generated"
import { generatedSchema, scalarsEnumsHash } from "./schema.generated"
import { cookies, SIGN_COOKIE_KEY } from "../framework/cookies"

const queryFetcher: QueryFetcher = async function (query: any, variables: any) {
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-user-composite-sign":
        JSON.stringify(cookies.get(SIGN_COOKIE_KEY)) ?? "",
      "X-flow-access-node": process.env.NEXT_PUBLIC_ACCESS_NODE_API!,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    mode: "cors",
  })

  const json = await response.json()

  return json
}

export const client = createClient<
  GeneratedSchema,
  SchemaObjectTypesNames,
  SchemaObjectTypes
>({
  schema: generatedSchema,
  scalarsEnumsHash,
  queryFetcher,
})

if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  import("@gqty/logger").then(({ createLogger }) => {
    const logger = createLogger(client, {
      // Custom options...
    })
    logger.start()
  })
}

export const {
  query,
  mutation,
  mutate,
  subscription,
  resolved,
  refetch,
  track,
} = client

export const {
  graphql,
  useQuery,
  usePaginatedQuery,
  useTransactionQuery,
  useLazyQuery,
  useRefetch,
  useMutation,
  useMetaState,
  prepareReactRender,
  useHydrateCache,
  prepareQuery,
} = createReactClient<GeneratedSchema>(client, {
  defaults: {
    // Set this flag as "true" if your usage involves React Suspense
    // Keep in mind that you can overwrite it in a per-hook basis
    suspense: false,

    // Set this flag based on your needs
    staleWhileRevalidate: false,
  },
})

export * from "./schema.generated"
