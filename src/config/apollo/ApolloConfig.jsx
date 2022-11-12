import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import CONST from "../../helper/Constant";

const httpLink = new HttpLink({
  uri: CONST.BASE_URL,
  headers: {
    "x-hasura-admin-secret": CONST.ADMIN_SECRET,
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: CONST.BASE_URL_WS,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": CONST.ADMIN_SECRET,
      },
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
