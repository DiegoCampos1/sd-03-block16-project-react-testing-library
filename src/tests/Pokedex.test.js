import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, getNodeText, fireEvent } from '@testing-library/react';
import App from '../App';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);
const favorites = {
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

test('Test if button shows the next Pokemon', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const button = getByText('Próximo pokémon');
  const firstPoke = getByTestId('pokemon-name');
  const firstPokeName = getNodeText(firstPoke);
  let nextPokeName = '';

  pokemons.map((e, index) => {
    const poke = getByTestId('pokemon-name');
    const pokeName = getNodeText(poke);
    expect(pokeName).toBe(pokemons[index].name);
    fireEvent.click(button);
    const nextPoke = getByTestId('pokemon-name');
    nextPokeName = getNodeText(nextPoke);
    return ('ok');
  });

  expect(nextPokeName).toBe(firstPokeName);
});

test('Pokédex must show one pokemon per time', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const showPoke = getAllByTestId('pokemon-name');
  expect(showPoke.length).toBe(1);
});

test('Pokedex must have filter buttons', () => {
  const { getAllByRole } = renderWithRouter(
    <Pokedex
      pokemons={pokemons} isPokemonFavoriteById={favorites}
    />);

  const allButtons = [
    'All',
    'Electric',
    'Fire',
    'Bug',
    'Poison',
    'Psychic',
    'Normal',
    'Dragon',
    'Próximo pokémon',
  ];
  const buttons = getAllByRole('button');
  expect(buttons.length).toBe(9);

  buttons.map((e, index) => {
    expect(getNodeText(e)).toBe(allButtons[index]);
    return ('ok');
  });
});

test('Testing if filtered have displayed only filtered pokemon type', () => {
  const { getByTestId, getAllByText } = renderWithRouter(
    <Pokedex
      pokemons={pokemons} isPokemonFavoriteById={favorites}
    />);

  const allButtons = [
    'All',
    'Electric',
    'Fire',
    'Bug',
    'Poison',
    'Psychic',
    'Normal',
    'Dragon',
    'Próximo pokémon',
  ];

  const filterButtons = allButtons.splice(1, 7);

  filterButtons.map((e) => {
    const actualButton = getAllByText(e);
    let presentButton;
    if (actualButton.length === 2) {
      presentButton = actualButton[1];
      fireEvent.click(presentButton);
    } else {
      presentButton = actualButton[0];
      fireEvent.click(presentButton);
    }
    const nextButton = getByTestId('next-pokemon');
    const ativate = nextButton.disabled;
    const pokeType = getByTestId('pokemonType');
    if (ativate) {
      for (let i = 0; i < filterButtons.length; i += 1) {
        fireEvent.click(presentButton);
        const selectedType = getByTestId('pokemonType');
        expect(pokeType).toBe(selectedType);
      }
    }
    return ('ok');
  });
});

test('Testing reset filter button', () => {
  const { getByTestId, getByText } = renderWithRouter(
    <Pokedex
      pokemons={pokemons} isPokemonFavoriteById={favorites}
    />);
  const resetButton = getByText('All');
  expect(resetButton).toBeInTheDocument();
  fireEvent.click(resetButton);

  const button = getByText('Próximo pokémon');
  pokemons.map((e, index) => {
    const poke = getByTestId('pokemon-name');
    const pokeName = getNodeText(poke);
    expect(pokeName).toBe(pokemons[index].name);
    fireEvent.click(button);
    return ('ok');
  });
});

test('Test if filter buttons are generate automatically', () => {
  const { getAllByTestId } = renderWithRouter(
    <Pokedex
      pokemons={pokemons} isPokemonFavoriteById={favorites}
    />);
  const typesOfPokemons = [];
  let uniqueTypesOfPokemons = [];
  pokemons.map((e) => typesOfPokemons.push(e.type));
  uniqueTypesOfPokemons = [...new Set(typesOfPokemons)];
  const button = getAllByTestId('pokemon-type-button');
  expect(uniqueTypesOfPokemons.length).toBe(button.length);
  button.map((e) => {
    const buttonText = getNodeText(e);
    expect(uniqueTypesOfPokemons.includes(buttonText)).toBe(true);
    return ('ok');
  });
});

test('Test if renders title `Encountered pokémons`', () => {
  const { getByRole } = renderWithRouter(
    <Pokedex
      pokemons={pokemons} isPokemonFavoriteById={favorites}
    />);
  const title = getByRole('heading');
  expect(getNodeText(title)).toBe('Encountered pokémons');
});
