import { gql } from "apollo-server";

export const typeDef = gql`
  type Mutation {
    createGame: Game
    resetGame(gameId: ID!): Game

    revealCard(gameId: ID!, index: Int!): Card
  }
`;
