import { context as Players } from "../types/Player";
import authentication from "./authenticate";

type RequestInfo = object;
type Context<T = {}> = { [P in keyof T]: T[P] };
type ContextCreator<T = {}> = (
  info: RequestInfo,
  context?: Context
) => Context<T>;

/**
 * Builds a `context` object out of an array of functions
 *
 * Each function is called with the original `context` params
 * _and the context so far_.
 *
 * This can be useful for combining multiple functions that
 * should add data to the context
 *
 * TODO: Figure out how to type the `buildContext` result as the
 * intersection of the things that all of the `ContextCreator`
 * functions return
 */
export function buildContext(...contextFunctions: ContextCreator[]): Context {
  return function(param: RequestInfo) {
    return contextFunctions.reduce((acc, fn) => {
      return { ...acc, ...fn(param, acc) };
    }, {});
  };
}

export default buildContext(Players, authentication);
