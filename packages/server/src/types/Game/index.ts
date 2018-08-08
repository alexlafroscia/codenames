import { gql } from "apollo-server";
import DB from "../../utils/db";
import generateID from "../../utils/generate-id";
import Player from "../Player";
import { AuthenticatedContext } from "../../context/authenticate";

export default class Game {
  id: String;

  createdBy: Player;
  players: Player[] = [];

  constructor(createdBy: Player) {
    this.id = generateID();

    this.createdBy = createdBy;
    this.players.push(createdBy);
  }
}

export const typeDef = gql`
  type Game {
    id: String!
    createdBy: Player!
    players: [Player]
  }
`;

export const resolvers = {
  Query: {
    game(_obj, { id }, { games }: GameContext) {
      return games.where({ id });
    }
  },

  Mutation: {
    createGame(
      _obj,
      _args,
      { currentPlayer, games }: GameContext & AuthenticatedContext
    ) {
      const game = new Game(currentPlayer);

      games.insert(game);

      return game;
    }
  }
};

const gameDatabase = new DB<Game>();
export type GameContext = {
  games: DB<Game>;
};
export function context(): GameContext {
  return {
    games: gameDatabase
  };
}
