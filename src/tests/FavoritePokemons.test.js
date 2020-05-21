import React from 'react';
import { render } from '@testing-library/react';
import { FavoritePokemons } from '../components';

test('favorite is empty', () => {
  const { getByText } = render(<FavoritePokemons />);
  const phrase = getByText('No favorite pokemon found');
  expect(phrase).toBeInTheDocument();
});

test('favorite pokemons', () => {
  render(<FavoritePokemons />);
  const pokemons = document.querySelectorAll('.pokemon');
  pokemons.forEach((pokemon) => {
    const fav = pokemon.querySelector('.favorite-icon');
    expect(fav).toBeInTheDocument();
  });
});
