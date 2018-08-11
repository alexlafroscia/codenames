import test from "ava";
import Player from "../Player";
import { Color as TeamColor } from "../Team";
import { Role as CardRole } from "../Card";
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

test("it sets up the right collection of cards", t => {
  t.plan(5);

  const player = new Player();
  const game = new Game(player);

  // There are always 25 cards total
  t.is(game.cards.length, 25);

  // Verify there is one more of the starting color's card
  const redCards = game.cards.filter(
    card => card.role === CardRole.Agent && card.color === TeamColor.Red
  );
  const blueCards = game.cards.filter(
    card => card.role === CardRole.Agent && card.color === TeamColor.Blue
  );

  if (game.startingTeam === TeamColor.Red) {
    t.is(redCards.length, 9);
    t.is(blueCards.length, 8);
  }

  if (game.startingTeam === TeamColor.Blue) {
    t.is(redCards.length, 8);
    t.is(blueCards.length, 9);
  }

  // Verify the right bystanders are generated
  const bystanders = game.cards.filter(
    card => card.role === CardRole.Bystander
  );
  t.is(bystanders.length, 7);

  // Verify that one assassin exists
  const assassins = game.cards.filter(card => card.role === CardRole.Assassin);
  t.is(assassins.length, 1);
});
