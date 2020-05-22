import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, getNodeText, fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

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
  const { getByTestId, getAllByRole, getAllByText } = renderWithRouter(<App />);
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
  });

  const filterButtons = allButtons.splice(1,7);

  filterButtons.map((e, index) => {
    const actualButton = getAllByText(e);
    actualButton.length === 2
      ? fireEvent.click(actualButton[1])
      : fireEvent.click(actualButton[0]);

    const pokeType = getByTestId('pokemonType');
    expect(getNodeText(pokeType)).toBe(filterButtons[index]);
  });
});
