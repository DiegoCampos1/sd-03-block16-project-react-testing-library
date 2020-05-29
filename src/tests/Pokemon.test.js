import React from 'react';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

afterEach(cleanup);

test('Testing individual pokémon card and his correct name and type', () => {
  const { getByTestId } = renderWithRouter(<Pokemon
    pokemon={pokemons[7]}
    isFavorite={false}
  />);
  const pokemonName = getByTestId(/pokemon-name/i);
  const pokemonType = getByTestId(/pokemonType/i);
  expect(pokemonName).toBeInTheDocument();
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonName).toHaveTextContent(/Snorlax/i);
  expect(pokemonType).toHaveTextContent(`${pokemons[7].type}`);
});

test('Testing the avarage weight of pokémon on display', () => {
  const { getByTestId } = renderWithRouter(<Pokemon
    pokemon={pokemons[7]}
    isFavorite={false}
  />);
  const pokemonWeight = getByTestId('pokemon-weight');
  expect(pokemonWeight).toHaveTextContent(/Average weight:460.0kg/i);
});

test('Testing the image of pokémon on display', () => {
  const { getByRole } = renderWithRouter(<Pokemon
    pokemon={pokemons[7]}
    isFavorite={false}
  />);
  const pokemonImage = getByRole('img');
  expect(pokemonImage.src).toBe(pokemons[7].image);
  expect(pokemonImage.alt).toBe(`${pokemons[7].name} sprite`);
});

test('Testing the id of the route pokémon on display', () => {
  const { getByRole } = renderWithRouter(<Pokemon
    pokemon={pokemons[7]}
    isFavorite={false}
  />);
  const pokemonRouteToDetail = getByRole(/link/i);
  expect(pokemonRouteToDetail).toBeInTheDocument();
  expect(pokemonRouteToDetail).toHaveAttribute('href', `/pokemons/${pokemons[7].id}`);
});

test('Testing of icon and alt of favorite pokémon', () => {
  const { queryAllByRole } = renderWithRouter(<Pokemon
    pokemon={pokemons[7]}
    isFavorite
  />);
  const pokemonFavorite = queryAllByRole(/img/i)[1];
  expect(pokemonFavorite).toHaveAttribute('src', '/star-icon.svg');
  expect(pokemonFavorite).toHaveAttribute('alt', `${pokemons[7].name} is marked as favorite`);
});
