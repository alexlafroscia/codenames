import { gql } from "apollo-server";
import { Color } from "../Team";

export enum Role {
  Agent = "Agent",
  Assassin = "Assassin",
  Bystander = "Bystander"
}

export default class Card {
  word: String;
  role: Role;
  color?: Color;

  constructor(word: String, role: Role, color?: Color) {
    this.role = role;
    this.word = word;
    this.color = color;
  }
}

export const typeDef = gql`
  enum CardRole {
    Agent
    Assassin
    Bystander
  }

  type Card {
    role: CardRole!
    word: String!
    color: TeamColor
  }
`;
