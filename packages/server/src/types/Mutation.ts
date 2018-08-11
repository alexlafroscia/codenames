import { gql } from "apollo-server";

export const typeDef = gql`
  type Mutation {
    createGame: Game

    revealCard(gameId: ID!, index: Int!): Card
  }
`;
