import { gql } from "apollo-server";
import { Color } from "../Team";
import { GameContext } from "../Game";

export enum Role {
  Agent = "Agent",
  Assassin = "Assassin",
  Bystander = "Bystander"
}

export default class Card {
  word: String;
  role: Role;
  color?: Color;
  revealed: Boolean = false;

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
    revealed: Boolean!
  }
`;

export const resolvers = {
  Mutation: {
    revealCard(_obj, { gameId, index }, { games }: GameContext) {
      const game = games.where({ id: gameId });
      const card = game.cards[index];

      card.revealed = true;

      return card;
    }
  }
};
