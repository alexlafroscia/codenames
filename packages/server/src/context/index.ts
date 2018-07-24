import { context as Players } from "../types/Player";
import authentication from "./authenticate";

/**
 * Builds a `context` object out of an array of functions
 *
 * Each function is called with the original `context` params
 * _and the context so far_.
 *
 * This can be useful for combining multiple functions that
 * should add data to the context
 */
export function buildContext(...contextFunctions) {
  return function(param) {
    return contextFunctions.reduce((acc, fn) => {
      return { ...acc, ...fn(param, acc) };
    }, {});
  };
}

export default buildContext(Players, authentication);
