import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './testService';
import App from '../App';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

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
  const { getByText, getByTestId } = renderWithRouter(<App />);

  const nextPokeButton = getByText('Próximo pokémon');
  const typeButtonFire = getByText('Fire');
  expect(typeButtonFire).toBeInTheDocument();
  fireEvent.click(typeButtonFire);
  pokemons.filter((e) => e.type === 'Fire').forEach((e) => {
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(e.name);
    fireEvent.click(nextPokeButton);
  });
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
