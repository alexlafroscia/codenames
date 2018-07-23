import test from "ava";
import DB from "./db";

test("it can query for a single property", t => {
  let alex = { id: 1, name: "Alex" };
  let emily = { id: 2, name: "Emily" };
  let db = new DB(alex, emily);

  t.is(db.where({ id: 1 }), alex);
});

test("it can query for an item based on multiple properties", t => {
  let alex = { id: 1, name: "Alex" };
  let emily = { id: 1, name: "Emily" };
  let emily2 = { id: 2, name: "Emily" };
  let db = new DB(alex, emily, emily2);

  t.is(db.where({ id: 1, name: "Emily" }), emily);
});

test("it can remove an item", t => {
  let alex = { id: 1, name: "Alex" };
  let emily = { id: 1, name: "Emily" };
  let db = new DB(alex, emily);

  db.remove(alex);

  t.deepEqual([...db], [emily]);
});

test("it can add an item", t => {
  let alex = { id: 1, name: "Alex" };
  let emily = { id: 1, name: "Emily" };
  let db = new DB(emily);

  db.insert(alex);

  t.deepEqual([...db], [emily, alex]);
});

test("it can commit changes", t => {
  let alex = { id: 1, name: "Alex" };
  let emily = { id: 1, name: "Emily" };
  let db = new DB(alex, emily);

  db.snapshot();

  db.remove(alex);
  db.snapshot();

  db.remove(emily);
  db.snapshot();

  t.deepEqual([...db], [], "Verify current state");

  db.rollback();

  t.deepEqual([...db], [emily], "Rolled back to just Emily in the DB");

  db.rollback();

  t.deepEqual([...db], [alex, emily], "Rolled back to the initial snapshot");
});

test("it cannot revert past the initial state", t => {
  let alex = { id: 1, name: "Alex" };
  let db = new DB(alex);

  t.throws(() => {
    db.rollback();
  });
});
