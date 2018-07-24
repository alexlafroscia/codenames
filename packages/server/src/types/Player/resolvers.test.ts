import test from "ava";
import Player, { resolvers as playerResolvers } from ".";

test("it can get the current user", t => {
  const player = new Player();
  const result = playerResolvers.Query.currentPlayer(
    {},
    {},
    {
      currentPlayer: player
    }
  );

  t.is(player, result);
});
