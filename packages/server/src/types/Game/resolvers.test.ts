import anyTest, { TestInterface } from "ava";
import Game, { GameContext, resolvers } from ".";
import Player from "../Player";
import { Color as TeamColor } from "../Team";
import { AuthenticatedContext } from "../../context/authenticate";
import DB from "../../utils/db";

const {
  Mutation: { createGame, joinGame, resetGame },
  Query: { game: findGame }
} = resolvers;

const test = anyTest as TestInterface<{
  game: Game;
  requestContext: GameContext & AuthenticatedContext;
}>;

test.beforeEach(t => {
  const currentPlayer = new Player();
  const game = new Game(currentPlayer);
  const games = new DB(game);

  t.context.game = game;
  t.context.requestContext = {
    currentPlayer,
    games
  };
});

test("querying for a game", t => {
  const game = findGame(
    undefined,
    { id: t.context.game.id },
    t.context.requestContext
  );

  t.true(game instanceof Game);
});

test("creating a game", t => {
  t.plan(3);

  const { requestContext } = t.context;
  const { currentPlayer } = requestContext;
  const game = createGame({}, {}, requestContext);

  t.true(game instanceof Game, "A game is returned");
  t.is(
    game.createdBy,
    currentPlayer,
    "The game was created by the current user"
  );

  if (game.startingTeam === TeamColor.Blue) {
    t.deepEqual(game.blueTeam.players, [currentPlayer]);
  } else if (game.startingTeam === TeamColor.Red) {
    t.deepEqual(game.redTeam.players, [currentPlayer]);
  }
});

test("joining a game that the player is not already in", t => {
  const newPlayer = new Player();
  t.context.requestContext.currentPlayer = newPlayer;

  const updatedGame = joinGame(
    undefined,
    { gameId: t.context.game.id },
    t.context.requestContext
  );

  t.is(updatedGame.players.length, 2, "The new player was added to the game");

  t.is(
    updatedGame.redTeam.players.length,
    updatedGame.blueTeam.players.length,
    "The new player was added to the opposite team"
  );
});

test("joining a game that the player is already in", t => {
  t.throws(
    () => {
      joinGame(
        undefined,
        { gameId: t.context.game.id },
        t.context.requestContext
      );
    },
    "User is already in game",
    "Throws an error if the user is already in the game"
  );
});

test("resetting a game", t => {
  const { game, requestContext } = t.context;

  const originalCards = [...game.cards];
  const newGame = resetGame(undefined, { gameId: game.id }, requestContext);

  t.notDeepEqual(originalCards, newGame.cards, "The cards were replaced");
});
