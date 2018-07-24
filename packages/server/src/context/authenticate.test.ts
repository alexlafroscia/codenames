import anyTest, { TestInterface } from "ava";
import { AuthenticationError } from "apollo-server";
import DB from "../utils/db";
import Player from "../types/Player";
import authenticate from "./authenticate";

const test = anyTest as TestInterface<{
  currentPlayer: Player;
  info: {
    req: {
      headers: {
        authentication: String;
      };
    };
  };
}>;

test.beforeEach(t => {
  const currentPlayer = new Player();

  t.context.currentPlayer = currentPlayer;
  t.context.info = { req: { headers: { authentication: currentPlayer.id } } };
});

test("it sets the user based on the `authentication` header", t => {
  const { currentPlayer } = t.context;
  const context = {
    players: new DB(currentPlayer)
  };

  const resultingContext = authenticate(t.context.info, context);
  t.deepEqual(resultingContext, {
    currentPlayer
  });
});

test("it throws an error if there is a header that does not match a user", t => {
  t.context.info.req.headers.authentication = "foobar";
  const context = {
    players: new DB(t.context.currentPlayer)
  };

  t.throws(() => {
    authenticate(t.context.info, context);
  }, AuthenticationError);
});

test("it assigns a new user if there is no header", t => {
  t.context.info.req.headers.authentication = "";
  const context = {
    players: new DB()
  };

  const resultingContext = authenticate(t.context.info, context);
  t.true(resultingContext.currentPlayer instanceof Player);
  t.not(resultingContext.currentPlayer, t.context.currentPlayer);
});
