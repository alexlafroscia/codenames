import { get } from "lodash";
import { context as Players } from "../types/Player";
import { context as Games } from "../types/Game";
import authentication from "./authenticate";

type Context<T = {}> = { [P in keyof T]: T[P] };
type RequestInfo = {
  req?: object;
  res?: object;
  connection?: {
    context?: Context;
  };
};
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
export function buildContext(
  ...contextFunctions: ContextCreator[]
): (RequestInfo) => Context {
  return function(requestInfo: RequestInfo) {
    const initialContext: Context = get(requestInfo, "connection.context", {});

    return contextFunctions.reduce((acc, fn) => {
      return { ...acc, ...fn(requestInfo, acc) };
    }, initialContext);
  };
}

export default buildContext(Games, Players, authentication);
