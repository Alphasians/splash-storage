import { ASTNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import { Variables } from "graphql-request/dist/types";
import { print } from "graphql/language/printer";
require("dotenv").config();

const client = new GraphQLClient(`${process.env.GRAPHQL_ENGINE_BASE_URL}/v1/graphql`, {
  get headers() {
    return process.env.HASURA_GRAPHQL_ADMIN_SECRET
      ? { "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET }
      : undefined;
  },
});

/**
 * To take advantage of syntax highlighting and auto-formatting
 * for GraphQL template literal tags (`gql`) in `src/utils/queries.ts`,
 * you need to `print()` queries before passing them to `graphql-request`.
 * https://github.com/prisma-labs/graphql-request/issues/10
 */
export async function request<T extends unknown>(
  query: ASTNode,
  variables?: Variables
): Promise<T> {
  try {
    return (await client.request(print(query), variables)) as T;
  } catch (err) {
    console.log(err);
    throw new Error("Could not perform request");
  }
}
