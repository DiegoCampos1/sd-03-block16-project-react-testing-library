import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Card Pokemons', () => {
  const { getByText } = renderWithRouter(<App />);
  const cardPokemon = getByText(/Encountered pokémons/i);
  expect(cardPokemon).toBeInTheDocument();
});

test('Name pokemon in homepage', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();
});

// test('Test img in card', () => {
//   const { getByTestId } = renderWithRouter(<App />);
//   const img = getByTestId(`pokemons/${id}`);
//   expect(img).toBeInTheDocument();
//   const 
// });

test('Avarege weigth of the pokemon', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const avaregeWeigth = getByTestId('pokemon-weight');
  expect(avaregeWeigth).toBeInTheDocument();
});
