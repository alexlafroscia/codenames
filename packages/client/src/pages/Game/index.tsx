import * as React from "react";
import { RouteComponentProps } from "@reach/router";

import gql from "graphql-tag";
import { Query } from "react-apollo";

export const FETCH_GAME = gql`
  query FetchGame($id: String!) {
    game(id: $id) {
      id
    }
  }
`;

interface GamePageProps {
  id: string;
}

export default class GamePage extends React.Component<GamePageProps> {
  public render() {
    const { id } = this.props;

    return (
      <>
        <Query query={FETCH_GAME} variables={{ id }}>
          {({ loading, data }) => (loading ? null : data.game.id)}
        </Query>
      </>
    );
  }
}

export const Route = (props: RouteComponentProps<GamePageProps>) => (
  <GamePage id={props.id!} />
);
