import test from "ava";
import Player from ".";

test("it generates an ID for the user", t => {
  const player = new Player();
  t.is(typeof player.id, "string");
});

test("it generates a name for the user", t => {
  const player = new Player();
  t.is(typeof player.name, "string");
});
