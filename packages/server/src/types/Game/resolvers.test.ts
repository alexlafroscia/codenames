import anyTest, { TestInterface } from "ava";
import Game, { GameContext, resolvers } from ".";
import Player from "../Player";
import { AuthenticatedContext } from "../../context/authenticate";
import DB from "../../utils/db";

const {
  Mutation: { createGame },
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

test("can query for a game", t => {
  const game = findGame(
    undefined,
    { id: t.context.game.id },
    t.context.requestContext
  );

  t.true(game instanceof Game);
});

test("it uses the current user when creating a game", t => {
  const { requestContext } = t.context;
  const game = createGame({}, {}, requestContext);

  t.true(game instanceof Game);
  t.is(game.createdBy, requestContext.currentPlayer);
});
