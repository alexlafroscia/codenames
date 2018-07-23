import Stack from "./stack";

type Props<T> = { [K in keyof T]?: T[K] };

export default class DB<T> {
  /** Current contents of the DB */
  private items: T[];

  /** The history of past values */
  private history: Stack<T[]>;

  constructor(...items: T[]) {
    this.items = [...items];
    this.history = new Stack();
  }

  /** Find an item in the store that matches the given properties */
  where(props: Props<T>) {
    return this.items.find(item =>
      Object.keys(props).reduce(
        (acc, prop) => acc && item[prop] === props[prop],
        true
      )
    );
  }

  /** Remove an item */
  remove(item: T) {
    this.items = this.items.filter(i => i !== item);
  }

  /** Add an item */
  insert(item: T) {
    this.items.push(item);
  }

  /** Commit the current state to the record */
  snapshot() {
    this.history.push([...this.items]);
  }

  /** Roll state back to the previous commit */
  rollback() {
    if (this.history.length === 0) {
      throw new Error("No more snapshots available");
    }

    this.history.pop();
    this.items = this.history.head;
  }

  *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item;
    }
  }
}
