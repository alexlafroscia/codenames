import Player from "../types/Player";
import { AuthenticationError } from "apollo-server";

export default function authenticate({ req }, context) {
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
