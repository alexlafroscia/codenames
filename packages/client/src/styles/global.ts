import { injectGlobal } from "emotion";
import { beige } from "./variables";

injectGlobal`
  body {
    background-color: ${beige};
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }
`;
