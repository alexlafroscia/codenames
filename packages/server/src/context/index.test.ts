import test from "ava";
import { buildContext } from ".";

test("composes the results of each context function", t => {
  const contextOne = () => {
    return { foo: "foo" };
  };
  const contextTwo = () => {
    return { bar: "bar" };
  };

  const context = buildContext(contextOne, contextTwo)({});
  t.deepEqual(context, {
    foo: "foo",
    bar: "bar"
  });
});

test("the context from the previous is passed to the next", t => {
  const contextOne = () => {
    return { foo: "foo" };
  };
  const contextTwo = (_info, context) => {
    t.deepEqual(context, { foo: "foo" });
    return {};
  };

  buildContext(contextOne, contextTwo)({});
});
