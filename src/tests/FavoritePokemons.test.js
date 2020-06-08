import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';

const favoritedById = {
  4: false,
  10: true,
  23: false,
  25: true,
  65: false,
  78: true,
  143: false,
  148: true,
  151: false,
};

const favorited = data.filter(({ id }) => favoritedById[id]);
const notFavorited = data.filter(({ id }) => !favoritedById[id]);

describe('Favorite Pokemons page tests', () => {
  test('shows Favorites Pokemons page', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={favorited} />,
      { route: '/favorites' },
    );

    const heading = getByText('Favorite pokémons');

    expect(heading).toBeInTheDocument();
  });

  test('Verify no favorited pokémons message', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={[]} />,
      { route: '/favorites' },
    );

    const notFound = getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  test('Case no favorite pokemons, shows no card', () => {
    const { queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={favorited} />,
      { route: '/favorites' },
    );

    notFavorited.forEach(({ name }) => {
      expect(queryByText(name)).toBeNull();
    });
  });

  test('Case favorite pokemons, shows all favorites cards', () => {
    const { getByText, container } = renderWithRouter(
      <FavoritePokemons pokemons={favorited} />,
      { route: '/favorites' },
    );

    const pokemonCard = container.querySelectorAll('.favorite-pokemon');

    expect(pokemonCard.length).toBe(4);
    favorited.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
    });
  });
});
