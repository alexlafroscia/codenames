import anyTest, { TestInterface } from "ava";
import { resolvers } from "./index";
import Player from "../Player";
import Game, { GameContext } from "../Game";
import DB from "../../utils/db";

const {
  Mutation: { revealCard }
} = resolvers;

const test = anyTest as TestInterface<{
  game: Game;
  requestContext: GameContext;
}>;

test.beforeEach(t => {
  const player = new Player();
  const game = new Game(player);
  const games = new DB(game);

  t.context.game = game;
  t.context.requestContext = {
    games
  };
});

test("revealing a card", t => {
  const { game } = t.context;
  const index = 0;

  t.is(game.cards[index].revealed, false, "The card starts off not revealed");

  const updatedCard = revealCard(
    undefined,
    { gameId: game.id, index },
    t.context.requestContext
  );

  t.is(updatedCard, game.cards[index], "The updated card is returned");
  t.is(updatedCard.revealed, true, "The card has been updated");
});
