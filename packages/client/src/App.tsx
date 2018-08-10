import * as React from "react";
import { Router } from "@reach/router";
import styled from "react-emotion";

import NavBar from "./components/NavBar";

import { Route as HomePage } from "./pages/Home";
import { Route as GamePage } from "./pages/Game";
import { Route as NotFound } from "./pages/NotFound";

const Wrapper = styled("div")`
  box-sizing: border-box;
  padding: 0 1em;
  margin: 0 auto;
  max-width: 800px;
`;

class App extends React.Component {
  public render() {
    return (
      <Wrapper>
        <NavBar />

        <Router>
          <HomePage path="/" />
          <GamePage path="/:id" />
          <NotFound default />
        </Router>
      </Wrapper>
    );
  }
}

export default App;
