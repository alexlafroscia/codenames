import * as React from "react";
import { RouteComponentProps, navigate } from "@reach/router";

import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

import Button from "../../components/Button";

const CREATE_GAME_MUTATION = gql`
  mutation CreateGame {
    createGame {
      id
    }
  }
`;

class CreateGameMutation extends Mutation<{
  createGame: {
    id: string;
  };
}> {}

export default class HomePage extends React.Component {
  public render() {
    return (
      <>
        <CreateGameMutation mutation={CREATE_GAME_MUTATION}>
          {createGame => (
            <form
              onSubmit={async event => {
                event.preventDefault();

                const result = await createGame();

                if (result && result.data) {
                  navigate(`/${result.data.createGame.id}`);
                } else {
                  throw new Error("There was an error creating the game");
                }
              }}
            >
              <Button type="submit">Create New Game</Button>
            </form>
          )}
        </CreateGameMutation>
      </>
    );
  }
}

export const Route = (_props: RouteComponentProps) => <HomePage />;
