import * as queries from "./queries"
import { GraphQLClient } from "graphql-request"

type FetcherArgs = keyof typeof queries

const endpoint = "https://rickandmortyapi.com/graphql"

const graphClient = new GraphQLClient(endpoint)

export default graphClient
