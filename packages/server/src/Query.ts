import { gql } from "apollo-server";

export const typeDef = gql`
  type Query {
    room(id: String!): Room
  }
`;
