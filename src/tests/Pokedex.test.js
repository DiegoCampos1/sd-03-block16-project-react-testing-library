import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './testService';
import App from '../App';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const mockPokemons = [
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
    summary: 'This intelligent Pokémon roasts hard berries ',
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
    summary: 'The flame on its tail shows the strength of its life force.',
  },
];

const labelButtons = () => pokemons.reduce((acc, e) => {
  if (acc.includes(e.type)) {
    return acc;
  }
  acc.push(e.type);
  return acc;
}, []);


const mockIsPokemonFavoriteById = {
  25: false,
  4: false,
};

// {/* <Pokedex
//   pokemons={pokemons}
//   isPokemonFavoriteById={isPokemonFavoriteById}
// /> */}

afterEach(cleanup);

test('testing next pokémon button', () => {
  const { getByTestId } = renderWithRouter(<App />);

  const nextPokeButton = getByTestId('next-pokemon');
  expect(nextPokeButton).toBeInTheDocument();
  expect(nextPokeButton).toHaveTextContent('Próximo pokémon');
  pokemons.forEach((e) => {
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(e.name);
    fireEvent.click(nextPokeButton);
  });
  expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
});

test('testing if pokedex has only one pokemon displayed', () => {
  const { queryAllByTestId } = renderWithRouter(
    <Pokedex
      pokemons={mockPokemons}
      isPokemonFavoriteById={mockIsPokemonFavoriteById}
    />,
  );
  expect(queryAllByTestId('pokemon-name')).toHaveLength(1);
});

test('testing if Encountered pokémons exists', () => {
  const { getByText } = renderWithRouter(
    <Pokedex
      pokemons={mockPokemons}
      isPokemonFavoriteById={mockIsPokemonFavoriteById}
    />,
  );

  const nextPokeButton = getByText('Encountered pokémons');
  expect(nextPokeButton).toBeInTheDocument();
});

test('testing if pokedex has button all', () => {
  // const { getByText, getByTestId } = renderWithRouter(<App />);
  const { getByText, getByTestId, getAllByTestId } = renderWithRouter(
    <Pokedex
      pokemons={mockPokemons}
      isPokemonFavoriteById={mockIsPokemonFavoriteById}
    />,
  );

  // const nextPokeButton = getByTestId('next-pokemon');
  const typeButtonFire = getAllByTestId('pokemon-type-button');
  console.log(typeButtonFire[0].textContent);
  const buttonAll = getByText('All');
  const pokemonName = getByTestId('pokemon-name');
  expect(buttonAll).toBeInTheDocument();
  fireEvent.click(typeButtonFire[1]);
  expect(pokemonName).toHaveTextContent('Charmander');
  fireEvent.click(buttonAll);
  expect(pokemonName).toHaveTextContent('Pikachu');
  // pokemons.forEach((e) => {
  //   expect(pokemonName).toHaveTextContent(e.name);
  //   fireEvent.click(nextPokeButton);
  // });
});

test('testing dinamicaly generated buttons', () => {
  const { queryAllByTestId } = renderWithRouter(<App />);

  const typesButton = queryAllByTestId('pokemon-type-button');
  const typesInScreen = typesButton.map((e) => e.textContent);
  expect(typesButton).toHaveLength(labelButtons().length);
  expect(typesInScreen).toStrictEqual(labelButtons());
});

test('testing Próximo Pokémon', () => {
  const { getByTestId, getAllByTestId } = renderWithRouter(
    <Pokedex
      pokemons={mockPokemons}
      isPokemonFavoriteById={mockIsPokemonFavoriteById}
    />,
  );

  const nextPokeButton = getByTestId('next-pokemon');
  const typeButtonFire = getAllByTestId('pokemon-type-button');
  fireEvent.click(typeButtonFire[1]);
  expect(nextPokeButton).toBeDisabled();
});
