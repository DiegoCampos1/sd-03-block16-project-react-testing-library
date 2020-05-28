import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';

const isPokemonFavoriteById = {
  25: true,
  65: true,
  148: true,
  78: true,
  4: false,
  23: false,
  143: false,
  151: false,
};

const favoritePokemons = data.filter(({ id }) => isPokemonFavoriteById[id]);
const notFavoritePokemons = data.filter(({ id }) => !isPokemonFavoriteById[id]);

describe('Tests "FavoritePokemons.js" file...', () => {
  test('Test if it shows a "not Found" text on the "Favorite Pokemons" page, when there are no favorite pokemons...', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />);
    const notFound = getByText('No favorite pokemon found');

    expect(notFound).toBeInTheDocument();
  });

  test('Tests if it shows all favorites pokemons cards in the "FavoritePokemons" page...', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={favoritePokemons} />,
    );
    const cards = document.querySelectorAll('.favorite-pokemon');

    expect(cards.length).toBe(4);
    favoritePokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
    });
  });

  test('Tests if it does not show any favorites pokemons cards in FavoritePokemons page', () => {
    const { queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={favoritePokemons} />,
    );

    notFavoritePokemons.forEach(({ name }) => {
      expect(queryByText(name)).toBeNull();
    });
  });
});
