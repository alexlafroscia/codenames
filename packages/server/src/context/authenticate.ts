import { AuthenticationError } from "apollo-server";
import Player, { PlayerContext } from "../types/Player";
import { InitialSubscriptionContext } from "../subscription";

type PreAuthenticationContext = PlayerContext & InitialSubscriptionContext;

export type AuthenticatedContext = {
  currentPlayer: Player;
};

export default function authenticate(
  { req },
  context: PreAuthenticationContext
): AuthenticatedContext {
  let token = "";

  if (context.isWebsocketConnection && context.authentication) {
    token = context.authentication;
  } else if (req && req.headers && req.headers.authentication) {
    token = req.headers.authentication;
  }

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
