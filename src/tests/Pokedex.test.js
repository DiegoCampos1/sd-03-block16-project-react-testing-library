import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import Pokedex from '../components/Pokedex';

describe('Pokedex.js tests', () => {
  const favoritePkmsMock = {
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

  const pkmsMock = [
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

  const favoriteMockedPkms = {
    4: false,
    25: false,
  };

  test('Next-pokemon button functions properly', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favoritePkmsMock} />);
    const nextBtn = getByText(/Próximo pokémon/i);
    let currentPkm = getByText(/Pikachu/i);
    expect(nextBtn).toBeInTheDocument();
    expect(currentPkm).toBeInTheDocument();

    fireEvent.click(nextBtn);

    currentPkm = getByText(/Charmander/i);
    expect(currentPkm).toBeInTheDocument();

    fireEvent.click(nextBtn);

    currentPkm = getByText(/Caterpie/i);
    expect(currentPkm).toBeInTheDocument();

    fireEvent.click(nextBtn);

    currentPkm = getByText(/Ekans/i);
    expect(currentPkm).toBeInTheDocument();

    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);

    currentPkm = getByText(/Pikachu/i);
    expect(currentPkm).toBeInTheDocument();
  });

  test('Renders only one Pokemon card', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favoritePkmsMock} />);
    const pkmnCardArray = getAllByTestId(/pokemon-name/i);
    expect(pkmnCardArray.length).toBe(1);
  });

  test('Types filter buttons functions properly', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favoritePkmsMock} />);
    const typeBtns = getAllByTestId(/pokemon-type-button/i);
    expect(typeBtns.length).toBeGreaterThan(0);
    fireEvent.click(typeBtns[1]);
    expect(getByTestId(/pokemonType/i)).toHaveProperty('innerHTML', 'Fire');
    fireEvent.click(getByTestId(/next-pokemon/i));
    expect(getByTestId(/pokemonType/i)).toHaveProperty('innerHTML', 'Fire');
  });

  test('Filter All button functions properly', () => {
    const { getByText, getByTestId, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favoritePkmsMock} />);
    const typeBtnsArray = getAllByTestId(/pokemon-type-button/i);
    const nextPkmBtn = getByTestId(/next-pokemon/i);
    expect(getByTestId(/pokemonType/i)).toHaveProperty('innerHTML', 'Electric');
    fireEvent.click(nextPkmBtn);
    expect(getByTestId(/pokemonType/i)).toHaveProperty('innerHTML', 'Fire');
    fireEvent.click(nextPkmBtn);
    expect(getByTestId(/pokemonType/i)).toHaveProperty('innerHTML', 'Bug');
    fireEvent.click(typeBtnsArray[1]);
    expect(getByTestId(/pokemonType/i)).toHaveProperty('innerHTML', 'Fire');
    fireEvent.click(getByText(/All/i));
    expect(getByTestId(/pokemonType/i)).toHaveProperty('innerHTML', 'Electric');
  });

  test('Filter buttons are generated dynamically', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={pkmsMock} isPokemonFavoriteById={favoriteMockedPkms} />);
    const typeBtnsArray = getAllByTestId(/pokemon-type-button/i);
    expect(typeBtnsArray.length).toBe(2);
    expect(typeBtnsArray[0]).toHaveProperty('innerHTML', 'Electric');
    expect(typeBtnsArray[1]).toHaveProperty('innerHTML', 'Fire');
  });

  test('If only one Pokémon, next pokemon button should be disabled', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favoritePkmsMock} />);
    const typeBtnsArray = getAllByTestId(/pokemon-type-button/i);
    fireEvent.click(typeBtnsArray[0]);
    expect(getByTestId(/next-pokemon/i)).toHaveProperty('disabled', true);
  });

  test('H2 test(?)', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favoritePkmsMock} />);
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });
});
