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
    return nextPokeName = getNodeText(nextPoke);
  });

  expect(nextPokeName).toBe(firstPokeName);
});

test('Pokédex must show one pokemon per time', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const showPoke = getAllByTestId('pokemon-name');
  expect(showPoke.length).toBe(1);
});

test('Pokedex must have filter buttons', () => {
});
