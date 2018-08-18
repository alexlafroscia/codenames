import anyTest, { TestInterface } from "ava";
import Player from "../Player";
import { Color as TeamColor } from "../Team";
import Card, { Role as CardRole } from "../Card";
import Game from ".";

const test = anyTest as TestInterface<{
  game: Game;
  player: Player;
}>;

test.beforeEach(t => {
  const player = new Player();
  const game = new Game(player);

  t.context.player = player;
  t.context.game = game;
});

test("it has the correct initial state", t => {
  t.plan(8);

  const { player, game } = t.context;

  t.is(game.createdBy, player, "Sets the players that created the game");
  t.deepEqual(game.players, [player], "Computes the total set up players");
  t.is(game.winningTeam, undefined, "The winning team is not set");

  t.is(game.cards.length, 25, "There are 25 cards total");

  if (game.startingTeam === TeamColor.Red) {
    t.is(game.redCards.length, 9, "There are the right number of red cards");
    t.is(game.blueCards.length, 8, "There are the right number of blue cards");
  }

  if (game.startingTeam === TeamColor.Blue) {
    t.is(game.redCards.length, 8, "There are the right number of red cards");
    t.is(game.blueCards.length, 9, "There are the right number of blue cards");
  }

  // Verify the right bystanders are generated
  const bystanders = game.cards.filter(
    card => card.role === CardRole.Bystander
  );
  t.is(bystanders.length, 7, "There are the right number of bystanders");

  // Verify that one assassin exists
  const assassins = game.cards.filter(card => card.role === CardRole.Assassin);
  t.is(assassins.length, 1, "There is one assassin");
});

test("it detects when there is a winning team", t => {
  const { game } = t.context;

  const revealedCard = new Card("foobar", CardRole.Agent, TeamColor.Red);
  revealedCard.revealed = true;

  game.cards = [revealedCard];

  t.is(game.winningTeam, game.redTeam, "Marks the red team as the winner");

  revealedCard.color = TeamColor.Blue;

  t.is(game.winningTeam, game.blueTeam, "Marks the blue team as the winner");
});
