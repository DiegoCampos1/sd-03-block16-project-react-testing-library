import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('FavoritePokemons.js component test', () => {
  test('If the user do not have favorite pokémons renders correct text', () => {
    const { getByText } = render(<FavoritePokemons pokemons={[]} />);
    const withoutFavorites = getByText(/no favorite pokemon found/i);
    expect(withoutFavorites).toBeInTheDocument();
  });


});
