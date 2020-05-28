import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import Pokedex from '../components/Pokedex';

const mock = [
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
        map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  },
];
const isFavorite = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Podex tests', () => {
  afterEach(cleanup);

  test('Correct name', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Pokedex pokemons={mock} isPokemonFavoriteById={isFavorite} />
      </MemoryRouter>,
    );

    const name = getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name.innerHTML).toBe('Pikachu');
  });

  test('Correct type', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Pokedex pokemons={mock} isPokemonFavoriteById={isFavorite} />
      </MemoryRouter>,
    );

    const type = getByTestId('pokemonType');
    expect(type).toBeInTheDocument();
    expect(type.innerHTML).toBe('Electric');
  });

  test('Average weight', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Pokedex pokemons={mock} isPokemonFavoriteById={isFavorite} />
      </MemoryRouter>,
    );

    const weight = getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight.innerHTML).toBe('Average weight:6.0kg');
  });

  test('Pokemon image', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Pokedex pokemons={mock} isPokemonFavoriteById={isFavorite} />
      </MemoryRouter>,
    );

    const link = getByText('More details');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/pokemons/25');
  });

  test('Pokemon image', async () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Pokedex pokemons={mock} isPokemonFavoriteById={isFavorite} />
      </MemoryRouter>,
    );

    const image = getByAltText('Pikachu sprite');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Favorite image', async () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Pokedex pokemons={mock} isPokemonFavoriteById={isFavorite} />
      </MemoryRouter>,
    );

    const image = getByAltText('Pikachu is marked as favorite');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/star-icon.svg');
  });
});
