import { gql } from "apollo-server";

export enum Color {
  Red = "Red",
  Blue = "Blue"
}

export const typeDef = gql`
  enum TeamColor {
    Red
    Blue
  }
`;
