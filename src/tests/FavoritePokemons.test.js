import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Tests of the About file', () => {
  afterEach(cleanup);

  test('If th page not have favorites pokemons, the message NO FAVORITE POKEMON FOUND should be in the screen', () => {
    const { queryByText } = render(<FavoritePokemons />);
    const notFoundFavoritePokemons = queryByText('No favorite pokemon found');
    expect(notFoundFavoritePokemons).toBeInTheDocument();
  });

  test('The page should not display any non-favored Pokémon cards ', () => {
    const { queryByAltText } = render(<FavoritePokemons />);

  });

  test('The About page should have a specific image', () => {

  });
});

