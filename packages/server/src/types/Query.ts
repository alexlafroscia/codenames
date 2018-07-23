import { gql } from "apollo-server";

export const typeDef = gql`
  type Query {
    game(id: String!): Game
  }
`;
