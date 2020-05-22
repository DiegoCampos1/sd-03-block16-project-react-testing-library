import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../mockPokemons';

afterEach(cleanup);

const booleanPokemons = {
  25: true,
  4: true,
  10: true,
  23: false,
  65: true,
  151: true,
  78: false,
  143: true,
  148: false,
};

const favoritedPokemons = pokemons.filter(({ id }) => booleanPokemons[id]);
const notFavoritedPokemons = pokemons.filter(({ id }) => !booleanPokemons[id]);

describe('Test 22 - favorite page should display favorite pokemons', () => {
  it('22.1 - should display all favorited pokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={favoritedPokemons} />);
    favoritedPokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
    });
  });
  it('22.2 - should not display favorited pokemons', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={notFavoritedPokemons} />);
    favoritedPokemons.forEach(({ name }) => {
      expect(queryByText(name)).toBeNull();
    });
  });
  it('22.4 - should not display favorited pokemons', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={pokemons} />);
    expect(queryByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
});
