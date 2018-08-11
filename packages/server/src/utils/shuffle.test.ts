import { test } from "ava";
import shuffle from "./shuffle";

test("it shuffles the array without mutating the original", t => {
  const items = [];

  for (let i = 0; i < 25; i++) {
    items.push(i);
  }

  t.notDeepEqual(shuffle(items), items);
});
