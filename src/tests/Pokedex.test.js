import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';

const mockedPokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: { value: '6.0', measurementUnit: 'kg' },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      { location: 'Kanto Viridian Forest', map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' },
      { location: 'Kanto Power Plant', map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' },
    ],
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: { value: '8.5', measurementUnit: 'kg' },
    image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      { location: 'Alola Route 3', map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png' },
      { location: 'Kanto Route 3', map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png' },
      { location: 'Kanto Route 4', map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png' },
      { location: 'Kanto Rock Tunnel', map: 'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png' },
    ],
    summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
  },
  {
    id: 10,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: { value: '2.9', measurementUnit: 'kg' },
    image: 'https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
    foundAt: [
      { location: 'Johto Route 30', map: 'https://cdn.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png' },
      { location: 'Johto Route 31', map: 'https://cdn.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png' },
      { location: 'Ilex Forest', map: 'https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png' },
      { location: 'Johto National Park', map: 'https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png' },
    ],
    summary: 'For protection, it releases a horrible stench from the antennae on its head to drive away enemies.',
  },
];

const mockedFavorites = {
  25: false,
  4: false,
  10: true,
};

test('Pokédex shows next pokemon after `Próximo pokemon` button is clicked', () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter>
      <Pokedex pokemons={mockedPokemons} isPokemonFavoriteById={mockedFavorites} />
    </MemoryRouter>,
  );
  const nextPokemonBtn = getByText('Próximo pokémon');
  expect(nextPokemonBtn).toBeInTheDocument();
  expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');

  fireEvent.click(nextPokemonBtn);
  expect(getByTestId('pokemon-name').textContent).toBe('Charmander');

  fireEvent.click(nextPokemonBtn);
  expect(getByTestId('pokemon-name').textContent).toBe('Caterpie');

  fireEvent.click(nextPokemonBtn);
  expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
});

test('Pokédex shows only one pokemon at time', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <Pokedex pokemons={mockedPokemons} isPokemonFavoriteById={mockedFavorites} />
    </MemoryRouter>,
  );
  expect(getAllByTestId('pokemon-name').length).toBe(1);
});

test('Pokedéx has filter buttons', () => {
  const { getAllByTestId, getByTestId } = render(
    <MemoryRouter>
      <Pokedex pokemons={mockedPokemons} isPokemonFavoriteById={mockedFavorites} />
    </MemoryRouter>,
  );
  const filterButtons = getAllByTestId('pokemon-type-button');
  expect(filterButtons.length).toBe(3);
  expect(filterButtons[0].textContent).toBe('Electric');
  expect(filterButtons[1].textContent).toBe('Fire');
  expect(filterButtons[2].textContent).toBe('Bug');

  fireEvent.click(filterButtons[0]);
  expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
  fireEvent.click(filterButtons[1]);
  expect(getByTestId('pokemon-name').textContent).toBe('Charmander');
  fireEvent.click(filterButtons[2]);
  expect(getByTestId('pokemon-name').textContent).toBe('Caterpie');
});

test('Pokedex has `All` button to reset applied filter', () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter>
      <Pokedex pokemons={mockedPokemons} isPokemonFavoriteById={mockedFavorites} />
    </MemoryRouter>,
  );
  const resetFilterBtn = getByText('All');
  expect(resetFilterBtn).toBeInTheDocument();
  fireEvent.click(resetFilterBtn);
  expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
});

test('Pokedex disables `Próximo pokémon` button if filtered list only has one item', () => {
  const { getAllByTestId, getByText } = render(
    <MemoryRouter>
      <Pokedex pokemons={mockedPokemons} isPokemonFavoriteById={mockedFavorites} />
    </MemoryRouter>,
  );
  fireEvent.click(getAllByTestId('pokemon-type-button')[0]);
  const nextPokemonBtn = getByText('Próximo pokémon');
  expect(nextPokemonBtn).toBeDisabled();
});

test('Pokedex has proper title', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Pokedex pokemons={mockedPokemons} isPokemonFavoriteById={mockedFavorites} />
    </MemoryRouter>,
  );
  const pokedexTitle = getByText('Encountered pokémons');
  expect(pokedexTitle).toBeInTheDocument();
});
