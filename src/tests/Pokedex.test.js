import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
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

describe('Pokedex.js component tests', () => {
  afterEach(cleanup);

  test('Pokedex renders', () => {
    const isFavorite = true;
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={favoritePokemons}
        isPokemonFavoriteById={isFavorite}
      />,
    );
    const heading = getByText(/encountered pokémons/i);

    expect(heading).toBeInTheDocument();
  });

  test('Próximo pokémon button tests', () => {
    const isFavorite = true;
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={favoritePokemons}
        isPokemonFavoriteById={isFavorite}
      />,
    );
    const nextButton = getByText(/próximo pokémon/i);

    expect(nextButton).toBeInTheDocument();
  });

  test('All button tests', () => {
    const isFavorite = true;
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={favoritePokemons}
        isPokemonFavoriteById={isFavorite}
      />,
    );
    const allTypeButton = getByText(/all/i);

    expect(allTypeButton).toBeInTheDocument();
  });

  test('Filter buttons tests', () => {
    const isFavorite = true;
    const { container } = renderWithRouter(
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={isFavorite}
      />,
    );
    const filterTypeButtons = container.querySelectorAll('.filter-button');
    expect(filterTypeButtons.length).toBe(8);
  });
});
