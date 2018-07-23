import { ApolloServer } from "apollo-server";
import { merge } from "lodash";

import * as Room from "./types/Room";
import * as Query from "./types/Query";
import * as Mutation from "./types/Mutation";

const PORT = process.env["PORT"] || 5000;

const server = new ApolloServer({
  typeDefs: [Room.typeDef, Query.typeDef, Mutation.typeDef],
  resolvers: merge(Room.resolvers)
});

server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
