import { gql } from "apollo-server";
import casual = require("casual");
import DB from "../../utils/db";
import generateID from "../../utils/generate-id";
import { AuthenticatedContext } from "../../context/authenticate";

export default class Player {
  id: String;
  name: String;

  constructor() {
    this.id = generateID();
    this.name = casual.first_name;
  }
}

const players = new DB<Player>();

export const typeDef = gql`
  type Player {
    id: String!
    name: String!
  }
`;

export const resolvers = {
  Query: {
    currentPlayer(_object, _args, context: AuthenticatedContext) {
      return context.currentPlayer;
    }
  }
};

export type PlayerContext = {
  players: DB<Player>;
};
export function context() {
  return {
    players
  };
}
