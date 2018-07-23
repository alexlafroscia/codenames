# CodeNames

## Installation

> Note: It is assumed that you already have [`yarn`](https://yarnpkg.com) installed on your computer. This project uses features available in Yarn that are not supported in `npm`, so if you need it, please install it.

1.  Clone the repo
2.  Run `yarn install` in the project root
3.  Run `yarn start` in the project root

## Development

### Project Structure

The repository contains both the API server, written with GraphQL, and the Client, written in `???`; they can be found in the `packages/server` and `packages/client` directories respectively.

### Server

The server is a Node.js application leveraging [`apollo-server`](https://www.apollographql.com/docs/apollo-server/) to implement a GraphQL interface to the game. It is written in TypeScript in order to benefit from the better development experience and increased productivity of working with well-defined types.

## Tests

Run `yarn test` in either package, or in the project root, to run the tests.
