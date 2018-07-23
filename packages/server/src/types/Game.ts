import { gql } from "apollo-server";
import DB from "../utils/db";
import generateID from "../utils/generate-id";

class Game {
  id: String;

  constructor() {
    this.id = generateID();
  }
}

const games = new DB<Game>();

export const typeDef = gql`
  type Game {
    id: String!
  }
`;

export const resolvers = {
  Query: {
    game(_obj, { id }) {
      return games.where({ id });
    }
  },

  Mutation: {
    createGame() {
      const game = new Game();

      games.insert(game);

      return game;
    }
  }
};
