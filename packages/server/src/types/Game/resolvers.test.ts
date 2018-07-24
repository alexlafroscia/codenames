import anyTest, { TestInterface } from "ava";
import Game, { resolvers as gameResolvers } from ".";
import Player from "../Player";
import DB from "../../utils/db";

const test = anyTest as TestInterface<{
  game: Game;
  requestContext: {
    currentPlayer: Player;
    games: DB<Game>;
  };
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
  const game = gameResolvers.Query.game(
    {},
    {
      id: t.context.game.id
    },
    t.context.requestContext
  );

  t.true(game instanceof Game);
});

test("it uses the current user when creating a game", t => {
  const { requestContext } = t.context;
  const game = gameResolvers.Mutation.createGame({}, {}, requestContext);

  t.true(game instanceof Game);
  t.is(game.createdBy, requestContext.currentPlayer);
});
