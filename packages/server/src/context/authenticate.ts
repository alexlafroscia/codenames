import Player from "../types/Player";
import { AuthenticationError } from "apollo-server";

export type AuthenticatedContext = {
  currentPlayer: Player;
};
export default function authenticate({ req }, context): AuthenticatedContext {
  const token = req.headers.authentication || "";
  let currentPlayer = context.players.where({
    id: token
  });

  if (token && !currentPlayer) {
    throw new AuthenticationError("Token provided but the user does not exist");
  }

  if (!currentPlayer) {
    currentPlayer = new Player();
    context.players.insert(currentPlayer);
  }

  return { currentPlayer };
}
