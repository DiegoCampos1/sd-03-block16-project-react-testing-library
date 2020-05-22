import React from 'react';
import { render, cleanup } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);

test('testing wether there are no favourite pokeoms', () => {
  const { getByText } = render(<FavoritePokemons />);
  const text = getByText('No favorite pokemon found');
  expect(text).toBeInTheDocument();
});

test('testing wether there are two favourite pokeoms', () => {
  const { getAllByText } = renderWithRouter(<FavoritePokemons pokemons={[data[1], data[2]]} />);
  const cards = getAllByText('More details');
  expect(cards.length).toBe(2);
});
