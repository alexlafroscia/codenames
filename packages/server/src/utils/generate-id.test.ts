import test from "ava";
import generateID from "./generate-id";

test("generates a 6-character ID", t => {
  let result = generateID();

  t.is(result.length, 6);
});
