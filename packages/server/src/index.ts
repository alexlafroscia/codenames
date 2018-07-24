import { ApolloServer } from "apollo-server";
import { merge } from "lodash";

import * as Game from "./types/Game";
import * as Query from "./types/Query";
import * as Mutation from "./types/Mutation";
import * as Player from "./types/Player";
import context from "./context";

const PORT = process.env["PORT"] || 5000;

const server = new ApolloServer({
  typeDefs: [Game.typeDef, Query.typeDef, Mutation.typeDef, Player.typeDef],
  resolvers: merge(Game.resolvers, Player.resolvers),
  context
});

server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
