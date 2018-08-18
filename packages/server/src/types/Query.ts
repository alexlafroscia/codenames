import { gql } from "apollo-server";

export const typeDef = gql`
  type Query {
    # Player stuff
    currentPlayer: Player!

    # Game stuff
    game(id: ID!): Game
  }
`;
