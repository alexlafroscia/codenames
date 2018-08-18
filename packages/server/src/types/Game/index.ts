import { ApolloError, gql } from "apollo-server";
import DB from "../../utils/db";
import generateID from "../../utils/generate-id";
import shuffle from "../../utils/shuffle";
import Player from "../Player";
import Team from "../Team";
import Card, { Role as CardRole } from "../Card";
import { Color as TeamColor } from "../Team";
import { AuthenticatedContext } from "../../context/authenticate";

export default class Game {
  id: String = generateID();

  createdBy: Player;

  cards: Card[] = [];

  startingTeam: TeamColor;
  redTeam: Team = new Team(TeamColor.Red);
  blueTeam: Team = new Team(TeamColor.Blue);

  constructor(createdBy: Player) {
    this.createdBy = createdBy;

    this.start();

    if (this.startingTeam === TeamColor.Red) {
      this.redTeam.players.push(createdBy);
    } else {
      this.blueTeam.players.push(createdBy);
    }
  }

  get players() {
    return [...this.redTeam.players, ...this.blueTeam.players];
  }

  /**
   * Handles generating a the starting team randomly and generating a set
   * of 25 cards
   */
  start() {
    // Randomly set the starting team to Red or Blue
    this.startingTeam = Math.random() < 0.5 ? TeamColor.Red : TeamColor.Blue;

    const cardHolder = [];

    for (let i = 0; i < 8; i++) {
      cardHolder.push(new Card("foo", CardRole.Agent, TeamColor.Red));
    }

    for (let i = 0; i < 8; i++) {
      cardHolder.push(new Card("foo", CardRole.Agent, TeamColor.Blue));
    }

    // Add an extra agent for the starting team
    cardHolder.push(new Card("foo", CardRole.Agent, this.startingTeam));

    // Add a bunch of bystanders
    for (let i = 0; i < 7; i++) {
      cardHolder.push(new Card("foo", CardRole.Bystander));
    }

    // Add one assassin
    cardHolder.push(new Card("foo", CardRole.Assassin));

    this.cards = shuffle(cardHolder);
  }
}

export const typeDef = gql`
  type Game {
    id: String!
    createdBy: Player!
    redTeam: Team!
    blueTeam: Team!
    cards: [Card]!
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
    },

    joinGame(
      _obj,
      { gameId: id },
      { currentPlayer, games }: GameContext & AuthenticatedContext
    ) {
      const game = games.where({ id });

      if (game.players.find(player => player === currentPlayer)) {
        throw new ApolloError("User is already in game");
      }

      if (game.blueTeam.players.length >= game.redTeam.players.length) {
        game.redTeam.players.push(currentPlayer);
      } else {
        game.blueTeam.players.push(currentPlayer);
      }

      return game;
    },

    resetGame(_obj, { gameId: id }, { games }: GameContext) {
      const game = games.where({ id });
      game.start();

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
