export type InitialSubscriptionContext = {
  /**
   * Added to the context when the WebSocket connects, to denote the source
   * of the connection
   */
  isWebsocketConnection?: true;

  /**
   * If the connection came from a WebSocket, this header _might_ be provided
   * on the request.
   *
   * For WebSocket connections, the regular `req` object does not exist
   */
  authentication?: string;
};

export type ConnectionParams = {
  authentication?: string;
};

export function onConnect({
  authentication
}: ConnectionParams): InitialSubscriptionContext {
  return {
    authentication: authentication,
    isWebsocketConnection: true
  };
}
