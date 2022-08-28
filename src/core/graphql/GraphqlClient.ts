import {RequestDocument} from "graphql-request";

export interface GraphqlClient {
    exec(query: RequestDocument, variables?: any): Promise<any>;
}