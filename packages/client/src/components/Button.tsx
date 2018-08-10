import styled from "react-emotion";
import { darken } from "polished";

import { blue } from "../styles/variables";

type ButtonProps = {
  color?: string;
};

function getColor(props: ButtonProps): string {
  return props.color || blue;
}

export default styled("button")<ButtonProps>`
  background: ${props => getColor(props)};
  border-radius: 5px;
  border: 2px solid ${props => darken(0.2, getColor(props))};
  box-sizing: border-box;
  color: white;
  font-size: 1em;
  padding: 0.7em 1em;
`;
