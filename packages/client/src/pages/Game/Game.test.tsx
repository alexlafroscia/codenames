import * as React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import wait from '../../test-helpers/waait';
import Game, { FETCH_GAME } from './index';

const mocks = [
  {
    request: {
      query: FETCH_GAME,
      variables: {
        id: 'foobar'
      }
    },
    result: {
      data: {
        game: {
          id: 'foobar'
        }
      }
    }
  }
]

it('it renders a game', async () => {
  const game = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Game id="foobar" />
    </MockedProvider>
  );

  await wait();

  expect(game.text()).toEqual("foobar");
});
