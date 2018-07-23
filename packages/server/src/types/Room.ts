import { gql } from "apollo-server";
import DB from "../utils/db";
import generateID from "../utils/generate-id";

class Room {
  id: String;

  constructor() {
    this.id = generateID();
  }
}

const rooms = new DB<Room>();

export const typeDef = gql`
  type Room {
    id: String!
  }
`;

export const resolvers = {
  Query: {
    room(_obj, { id }) {
      return rooms.where({ id });
    }
  },

  Mutation: {
    createRoom() {
      const room = new Room();

      rooms.insert(room);

      return room;
    }
  }
};
