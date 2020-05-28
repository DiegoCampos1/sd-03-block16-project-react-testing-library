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
  const { queryByTestId, getByText, getByAltText } = renderWithRouter(
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

  const linkMore = getByText('More details');
  expect(linkMore).toHaveAttribute('href', '/pokemons/10');

  const pokemonImg = getByAltText('Caterpie sprite');
  expect(pokemonImg).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png');

  const pokemonMarkFavorite = getByAltText('Caterpie is marked as favorite');
  expect(pokemonMarkFavorite).toBeInTheDocument();
  expect(pokemonMarkFavorite).toHaveAttribute('src', '/star-icon.svg');
});
