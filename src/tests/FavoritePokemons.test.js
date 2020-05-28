import React from 'react';
import { render, cleanup } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Tests of the About file', () => {
  afterEach(cleanup);
  test('If th page not have favorites pokemons, the message NO FAVORITE POKEMON FOUND should be in the screen', () => {
    const { queryByText } = render(<FavoritePokemons />);
    const notFoundFavoritePokemons = queryByText('No favorite pokemon found');
    expect(notFoundFavoritePokemons).toBeInTheDocument();
  });
});

