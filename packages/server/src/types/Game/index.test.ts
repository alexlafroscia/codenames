import test from "ava";
import Player from "../Player";
import Game from ".";

test("it sets the created player on the game", t => {
  const player = new Player();
  const game = new Game(player);

  t.is(game.createdBy, player);
});

test("it adds the created user to the players", t => {
  const player = new Player();
  const game = new Game(player);

  t.deepEqual(game.players, [player]);
});
