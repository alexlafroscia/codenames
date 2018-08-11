import anyTest, { TestInterface } from "ava";
import Game, { GameContext, resolvers } from ".";
import Player from "../Player";
import { AuthenticatedContext } from "../../context/authenticate";
import DB from "../../utils/db";

const {
  Mutation: { createGame, resetGame },
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
  const { requestContext } = t.context;
  const game = createGame({}, {}, requestContext);

  t.true(game instanceof Game, "A game is returned");
  t.is(
    game.createdBy,
    requestContext.currentPlayer,
    "The game was created by the current user"
  );
});

test("resetting a game", t => {
  const { requestContext } = t.context;
  const game = createGame({}, {}, requestContext);

  const originalCards = [...game.cards];
  const newGame = resetGame(undefined, { gameId: game.id }, requestContext);

  t.notDeepEqual(originalCards, newGame.cards, "The cards were replaced");
});
