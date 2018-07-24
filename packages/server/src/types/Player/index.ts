import { gql } from "apollo-server";
import DB from "../../utils/db";
import generateID from "../../utils/generate-id";
import casual = require("casual");

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
    currentPlayer(_object, _args, context) {
      return context.currentPlayer;
    }
  }
};

export function context() {
  return {
    players
  };
}
