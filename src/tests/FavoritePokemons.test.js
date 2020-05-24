import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';

const isPokemonFavoriteById = {
  25: true,
  4: false,
  10: true,
  23: false,
  65: true,
  151: false,
  78: true,
  143: false,
  148: true,
};

const favoritePokemons = data.filter(({ id }) => isPokemonFavoriteById[id]);
const notFavoritePokemons = data.filter(({ id }) => !isPokemonFavoriteById[id]);

describe('tests FavoritePokemons.js', () => {
  test('shows Favorites Pokemons page', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={favoritePokemons} />,
      { route: '/favorites' },
    );

    const heading = getByText('Favorite pokémons');

    expect(heading).toBeInTheDocument();
  });

  test('shows notFound text in FavoritePokemons page when dont have fav pokemons', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={[]} />,
      { route: '/favorites' },
    );

    const notFound = getByText('No favorite pokemon found');

    expect(notFound).toBeInTheDocument();
  });

  test('shows favorites pokemons cards in FavoritePokemons page', () => {
    const { getByText, container } = renderWithRouter(
      <FavoritePokemons pokemons={favoritePokemons} />,
      { route: '/favorites' },
    );

    const cards = container.querySelectorAll('.favorite-pokemon');

    expect(cards.length).toBe(5);
    favoritePokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
    });
  });

  test('dont shows not favorites pokemons cards in FavoritePokemons page', () => {
    const { queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={favoritePokemons} />,
      { route: '/favorites' },
    );

    notFavoritePokemons.forEach(({ name }) => {
      expect(queryByText(name)).toBeNull();
    });
  });
});
