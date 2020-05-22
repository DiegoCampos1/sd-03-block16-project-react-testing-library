import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './testService';
import App from '../App';
// import Pokedex from '../components/Pokedex';
import pokemons from '../data';

// const mockPokemons = [
//   {
//     id: 25,
//     name: 'Pikachu',
//     type: 'Electric',
//     averageWeight: {
//       value: '6.0',
//       measurementUnit: 'kg',
//     },
//     image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
//     moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
//     foundAt: [
//       {
//         location: 'Kanto Viridian Forest',
//         map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
//       },
//       {
//         location: 'Kanto Power Plant',
//         map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
//       },
//     ],
//     summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
//   },
//   {
//     id: 4,
//     name: 'Charmander',
//     type: 'Fire',
//     averageWeight: {
//       value: '8.5',
//       measurementUnit: 'kg',
//     },
//     image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
//     moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
//     foundAt: [
//       {
//         location: 'Alola Route 3',
//         map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
//       },
//       {
//         location: 'Kanto Route 3',
//         map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
//       },
//       {
//         location: 'Kanto Route 4',
//         map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
//       },
//       {
//         location: 'Kanto Rock Tunnel',
//         map: 'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
//       },
//     ],
//     summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
//   },
// ];

// const mockIsPokemonFavoriteById = {
//   id: true,
//   id: false,
// };

// {/* <Pokedex
//   pokemons={pokemons}
//   isPokemonFavoriteById={isPokemonFavoriteById}
// /> */}

afterEach(cleanup);

test('testing next pokémon button', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);

  const nextPokeButton = getByText('Próximo pokémon');
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
  const { queryAllByTestId } = renderWithRouter(<App />);
  expect(queryAllByTestId('pokemon-name')).toHaveLength(1);
});

test('testing if pokedex has filter buttons with type name', () => {
  const { getByText } = renderWithRouter(<App />);

  // const nextPokeButton = getByText('Próximo pokémon');
  const typeButtonFire = getByText('Fire');
  expect(typeButtonFire).toBeInTheDocument();
  fireEvent.click(typeButtonFire);
  // pokemons.filter((e) => e.type === 'Fire').forEach((e) => {
  //   const pokemonName = getByTestId('pokemon-name');
  //   expect(pokemonName).toHaveTextContent(e.name);
  //   fireEvent.click(nextPokeButton);
  // });
});

test('testinf if pokedex has button all', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);

  const nextPokeButton = getByText('Próximo pokémon');
  const typeButtonFire = getByText('Fire');
  const buttonAll = getByText('All');
  const pokemonName = getByTestId('pokemon-name');
  expect(buttonAll).toBeInTheDocument();
  fireEvent.click(typeButtonFire);
  expect(pokemonName).toHaveTextContent('Charmander');
  fireEvent.click(buttonAll);
  pokemons.forEach((e) => {
    expect(pokemonName).toHaveTextContent(e.name);
    fireEvent.click(nextPokeButton);
  });
});

test('testing dinamicaly generated buttons', () => {

});
