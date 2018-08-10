import * as React from "react";
import styled from "react-emotion";

const Header = styled("header")`
  display: flex;
`;

const Title = styled("h1")`
  flex-grow: 1;
`;

export default () => (
  <Header>
    <Title>CodeNames</Title>
  </Header>
);
