import React from 'react';
import Favorite from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

test('No favorite pokemon found', () => {
  const { getByText } = renderWithRouter(<Favorite />);
  const heading = getByText('Favorite pokémons');
  expect(heading).toBeInTheDocument();
});
