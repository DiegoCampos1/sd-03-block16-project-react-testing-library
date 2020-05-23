import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';
import isPokemonFavoriteById from '../components/mocks';

const favoritePokemon = data.filter(({ id }) => isPokemonFavoriteById[id]);
const notFavoritePokemon = data.filter(({ id }) => !isPokemonFavoriteById[id]);

describe('FavoritePokemons.js', () => {
  test('Favorite Pokemon', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={favoritePokemon} />,
      { route: '/favorites' },
    );
    const heading = getByText('Favorite pokémons');
    expect(heading).toBeInTheDocument();
  });

  test('notFound text in FavoritePokemons', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={[]} />,
      { route: '/favorites' },
    );
    const notFound = getByText('favorite pokemon not found');
    expect(notFound).toBeInTheDocument();
  });

  test('favorite pokemon card', () => {
    const { getByText, container } = renderWithRouter(
      <FavoritePokemons pokemons={favoritePokemon} />,
      { route: '/favorites' },
    );
    const cards = container.querySelectorAll('.favorite-pokemon');
    expect(cards.length).toBe(5);
    favoritePokemon.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
    });
  });

  test('favorite pokemon card > FavoritePokemons page', () => {
    const { queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={favoritePokemon} />,
      { route: '/favorites' },
    );
    notFavoritePokemon.forEach(({ name }) => {
      expect(queryByText(name)).toBeNull();
    });
  });
});
