import * as queries from "./queries"
import { GraphQLClient } from "graphql-request"

const endpoint = "https://rickandmortyapi.com/graphql"

const graphClient = new GraphQLClient(endpoint)

export default graphClient
