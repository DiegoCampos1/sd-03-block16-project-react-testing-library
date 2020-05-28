import React from 'react';
import { Router } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
// import { getByAltText } from '@testing-library/jest-dom/extend-expect';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

afterEach(cleanup);

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

test('Renders Pokemon Cards', () => {
  const { queryByTestId } = renderWithRouter(
    <Pokemon
      pokemon={pokemons[2]}
      showDetailsLink
      isFavorite
    />,
  );
  const pokemonName = queryByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();
  console.log(pokemonName.innerHTML);

  expect(pokemonName.innerHTML).toEqual('Caterpie');

  const pokemonType = queryByTestId('pokemonType');
  expect(pokemonType.innerHTML).toEqual('Bug');

  const pokemonAveWeight = queryByTestId('pokemon-weight');
  expect(pokemonAveWeight.innerHTML).toEqual('Average weight:2.9kg');
});
