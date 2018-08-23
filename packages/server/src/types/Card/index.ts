import { PubSub, gql, withFilter } from "apollo-server";
import { Color } from "../Team";
import { GameContext } from "../Game";

const pubSub = new PubSub();
const CARD_REVEALED = "CARD_REVEALED";

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

      pubSub.publish(CARD_REVEALED, {
        gameId,
        cardRevealed: {
          index,
          card
        }
      });

      return card;
    }
  },

  Subscription: {
    cardRevealed: {
      subscribe: withFilter(
        () => pubSub.asyncIterator(CARD_REVEALED),
        (payload, variables) => {
          return payload.gameId === variables.gameId;
        }
      )
    }
  }
};
