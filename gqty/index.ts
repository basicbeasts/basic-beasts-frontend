import { createClient } from "gqty"
import { createReactClient } from "@gqty/react"
import type { QueryFetcher } from "gqty"
import type {
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from "./schema.generated"
import { generatedSchema, scalarsEnumsHash } from "./schema.generated"

const queryFetcher: QueryFetcher = async function (query, variables) {
  // Modify "/api/graphql" if needed
  const response = await fetch("http://localhost:3001/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
