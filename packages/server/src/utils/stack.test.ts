import test from "ava";
import Stack from "./stack";

test("can initialize with a set of items", t => {
  let stack = new Stack("foo", "bar");

  t.is(stack.length, 2);
});

test("can retrieve the first item", t => {
  let stack = new Stack("foo", "bar");

  t.is(stack.head, "foo");
});

test("it can remove an item from the stack", t => {
  let stack = new Stack("foo", "bar");

  t.is(stack.pop(), "foo");
  t.is(stack.length, 1);
});

test("it can add an item to the stack", t => {
  let stack = new Stack("foo");
  stack.push("bar");

  t.is(stack.length, 2);
  t.is(stack.head, "bar");
});
