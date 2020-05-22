import React from 'react';
import { render, cleanup } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../helper';

const favoritePokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map:
          'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary:
      'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo:
      'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map:
          'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary:
      'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
  },
];

describe('FavoritePokemons.js component test', () => {
  afterEach(cleanup);

  test('FavoritePokemons.js renders', () => {
    const { getByText } = render(<FavoritePokemons />);
    const heading = getByText(/favorite pokémons/i);
    expect(heading).toBeInTheDocument();
  });

  test('If the user do not have favorite pokémons renders correct text', () => {
    const { container, getByText } = render(<FavoritePokemons pokemons={[]} />);
    const favoriteCardContainer = container.querySelector('.favorite-pokemons');
    const withoutFavorites = getByText(/no favorite pokemon found/i);
    expect(withoutFavorites).toBeInTheDocument();
    expect(favoriteCardContainer).not.toBeInTheDocument();
  });

  test('If user have favorite pokemons renders the correct pokémons', () => {
    const { container, history } = renderWithRouter(
      <FavoritePokemons pokemons={favoritePokemons} />,
    );
    history.push('/favorites');
    const favoriteCardContainer = container.querySelectorAll(
      '.favorite-pokemons',
    );
    const favoritePokemonCards = container.querySelectorAll(
      '.favorite - pokemon',
    );
    expect(favoriteCardContainer).not.toBeNull();
    expect(favoriteCardContainer.length).toBe(1);
    expect(favoritePokemonCards).not.toBeNull();
    expect(favoritePokemonCards.length).toBe(2);
  });
});
