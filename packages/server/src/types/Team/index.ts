import { gql } from "apollo-server";

import Player from "../Player";

export enum Color {
  Red = "Red",
  Blue = "Blue"
}

export default class Team {
  color: Color;

  players: Array<Player> = [];

  constructor(color: Color) {
    this.color = color;
  }
}

export const typeDef = gql`
  enum TeamColor {
    Red
    Blue
  }

  type Team {
    color: TeamColor!
    players: [Player!]!
  }
`;
