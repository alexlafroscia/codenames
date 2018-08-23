import { gql } from "apollo-server";

export const typeDef = gql`
  type CardRevealedPayload {
    card: Card!
    index: Int!
  }

  type Subscription {
    # Card stuff
    cardRevealed(gameId: ID!): CardRevealedPayload!
  }
`;
