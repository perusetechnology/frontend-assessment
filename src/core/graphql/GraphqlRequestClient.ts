import {GraphqlClient} from "./GraphqlClient";
import {GraphQLClient, RequestDocument} from "graphql-request";

export class GraphqlRequestClient implements GraphqlClient {
    private client: any;

    constructor(private readonly uri: string) {
        this.client = new GraphQLClient(uri, {headers: {}});
    }

    exec(query: RequestDocument, variables?: any): Promise<any> {
        return this.client.request(query, variables);
    }
}