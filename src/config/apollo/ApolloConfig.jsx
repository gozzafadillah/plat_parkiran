import { ApolloClient, InMemoryCache } from "@apollo/client";
import CONST from "../../helper/Constant";

const client = new ApolloClient({
  uri: CONST.BASE_URL,
  cache: new InMemoryCache(),
});

export default client;
