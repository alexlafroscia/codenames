import { gql } from "apollo-server";

export const typeDef = gql`
  type Mutation {
    # Game Mutations
    createGame: Game!
    joinGame(gameId: ID!): Game
    resetGame(gameId: ID!): Game

    # Card Mutations
    revealCard(gameId: ID!, index: Int!): Card
  }
`;
