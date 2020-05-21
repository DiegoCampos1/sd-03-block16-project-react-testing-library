import React from 'react';
import { cleanup, fireEvent, getAllByTestId } from '@testing-library/react';
import renderWithRouter from './testService';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

test('testing next pokémon button', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);

  const nextPokeButton = getByText('Próximo pokémon');
  expect(nextPokeButton).toBeInTheDocument();
  pokemons.forEach((e) => {
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(e.name);
    fireEvent.click(nextPokeButton);
  });
});
