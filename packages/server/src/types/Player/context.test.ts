import test from "ava";
import { context as playerContext } from ".";
import DB from "../../utils/db";

test("it exposes a DB", t => {
  const resultingContext = playerContext();
  t.true(resultingContext.players instanceof DB);
});
