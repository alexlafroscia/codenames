export default class Stack<T> {
  private items: T[];

  constructor(...items: T[]) {
    this.items = [...items];
  }

  /** Add an item to the stack */
  push(item: T) {
    this.items.unshift(item);
  }

  /** Remove and return an item from the stack */
  pop() {
    return this.items.shift();
  }

  /** The top of the stack */
  get head() {
    return this.items[0];
  }

  get length() {
    return this.items.length;
  }
}
