import { gql } from "apollo-server";

export const typeDef = gql`
  type Mutation {
    createRoom: Room
  }
`;
