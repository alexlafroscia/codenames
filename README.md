# CodeNames

[![Build Status](https://travis-ci.com/alexlafroscia/codenames.svg?branch=master)](https://travis-ci.com/alexlafroscia/codenames)

## Installation

> Note: It is assumed that you already have [`yarn`][yarn] installed on your computer. This project uses features available in `yarn` that are not supported in `npm`, so if you need it, please install it.

1.  Clone the repo
2.  Run `yarn install` in the project root

## Development

### Running Locally

Run `yarn start` in the project root to start both the server and client.

`yarn start` can also be run in either package individually, to run just that part of the project.

### Project Structure

The repository contains both the API server, written with GraphQL, and the Client, written in `???`; they can be found in the `packages/server` and `packages/client` directories respectively.

These packages are managed by [`lerna`][lerna], a tool that helps packages within a single repository depend on each other. It also provides helpful commands for running commands within each package from the top level. Additionally, this project leverages [`yarn` workspaces][yarn workspaces] to make managing dependencies through [`lerna`][lerna] easier.

### Server

The server is a Node.js application leveraging [`apollo-server`][apollo-server] to implement a GraphQL interface to the game. It is written in TypeScript in order to benefit from the better development experience and increased productivity of working with well-defined types.

## Tests

Run `yarn test` in either package, or in the project root, to run the tests.

[yarn]: https://yarnpkg.com
[yarn workspaces]: https://yarnpkg.com/lang/en/docs/workspaces/
[lerna]: https://lernajs.io/
[apollo-server]: https://www.apollographql.com/docs/apollo-server/
