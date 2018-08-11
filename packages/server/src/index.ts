import { ApolloServer } from "apollo-server";
import { merge } from "lodash";

import * as Card from "./types/Card";
import * as Game from "./types/Game";
import * as Mutation from "./types/Mutation";
import * as Player from "./types/Player";
import * as Query from "./types/Query";
import * as Team from "./types/Team";
import context from "./context";

const PORT = process.env["PORT"] || 5000;

const server = new ApolloServer({
  typeDefs: [
    Card.typeDef,
    Game.typeDef,
    Mutation.typeDef,
    Player.typeDef,
    Query.typeDef,
    Team.typeDef
  ],
  resolvers: merge(Game.resolvers, Card.resolvers, Player.resolvers),
  context
});

server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
