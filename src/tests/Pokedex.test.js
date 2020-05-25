import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
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
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
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
        map: 'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
  },
];
const isFavorite = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Podex tests', () => {
  afterEach(cleanup);

  test('Next pokemon button', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Pokedex pokemons={mock} isPokemonFavoriteById={isFavorite} />
      </MemoryRouter>,
    );

    expect(getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
    const nextBtn = getByTestId('next-pokemon');
    expect(nextBtn.innerHTML).toBe('Próximo pokémon');
    fireEvent.click(nextBtn);
    expect(getByTestId('pokemon-name').innerHTML).toBe('Charmander');
    fireEvent.click(nextBtn);
    expect(getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
  });

  test('Only one pokemon at a time', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <Pokedex pokemons={mock} isPokemonFavoriteById={isFavorite} />
      </MemoryRouter>,
    );

    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  test('Filter button', () => {
    const { getAllByTestId, getByTestId } = render(
      <MemoryRouter>
        <Pokedex pokemons={mock} isPokemonFavoriteById={isFavorite} />
      </MemoryRouter>,
    );

    const btns = getAllByTestId('pokemon-type-button');
    expect(btns.length).toBe(2);
    expect(btns[0].innerHTML).toBe('Electric');
    fireEvent.click(btns[0]);
    expect(getByTestId('next-pokemon')).toHaveAttribute('disabled');
  });

  test('Reset filter button', () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <Pokedex pokemons={mock} isPokemonFavoriteById={isFavorite} />
      </MemoryRouter>,
    );

    const btn = getByText('All');
    const nextBtn = getByTestId('next-pokemon');
    const pokeCard = getByTestId('pokemon-name');
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
    expect(pokeCard.innerHTML).toBe('Pikachu');
    fireEvent.click(nextBtn);
    expect(pokeCard.innerHTML).toBe('Charmander');
    fireEvent.click(nextBtn);
    expect(pokeCard.innerHTML).toBe('Pikachu');
  });

  test('Dinamic filter button', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <Pokedex pokemons={mock} isPokemonFavoriteById={isFavorite} />
      </MemoryRouter>,
    );

    const btns = getAllByTestId('pokemon-type-button');
    expect(btns.length).toBe(2);
    expect(btns[0].innerHTML).toBe('Electric');
    expect(btns[1].innerHTML).toBe('Fire');
  });

  test('Disabled next button if only one', () => {
    const { getAllByTestId, getByTestId } = render(
      <MemoryRouter>
        <Pokedex pokemons={mock} isPokemonFavoriteById={isFavorite} />
      </MemoryRouter>,
    );

    const btn = getAllByTestId('pokemon-type-button');
    expect(btn[1].innerHTML).toBe('Fire');
    fireEvent.click(btn[1]);
    const nextBtn = getByTestId('next-pokemon');
    expect(nextBtn).toHaveAttribute('disabled');
  });
});
