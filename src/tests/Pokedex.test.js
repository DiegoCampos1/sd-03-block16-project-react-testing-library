import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemon from '../data';
// import Pokedex from '../components/Pokedex';

test('Value Button Pokemon', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);

  const btn = getByText(/Próximo pokémon/i);
  expect(btn).toBeInTheDocument();

  const buttonAll = getByText('All');
  expect(buttonAll).toBeInTheDocument();

  fireEvent.click(buttonAll);
  pokemon.forEach((elem) => {
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument(elem.name);
    fireEvent.click(btn);
  });
});

test('Test buttons for each title', () => {
  const { getAllByText } = renderWithRouter(<App />);
  const buttonType = getAllByText('All', 'Eletric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon');
  buttonType.forEach((elem) => {
    expect(elem).toBeInTheDocument();
  });
});

test('Pokédex container button filter', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const typeBtn = getAllByRole('button');
  expect(typeBtn.value).not.toBeNull();
});

test('Text h2 container', () => {
  const { getByText } = renderWithRouter(<App />);
  const titleH2 = getByText('Encountered pokémons');
  expect(titleH2).toBeInTheDocument();
});

const mockedPokemonFavoriteById = { 25: false };

test('filter type Pokémon', () => {
  const { getByText, getAllByTestId, getByTestId } = renderWithRouter(
    <App isPokemonFavoriteById={mockedPokemonFavoriteById} pokemon={pokemon} />,
  );

  const filterButton = getAllByTestId('pokemon-type-button');
  const nextPokemonButton = getByText('Próximo pokémon');

  expect(filterButton[1]).toContainHTML('Fire');
  fireEvent.click(filterButton[1]);
  expect(nextPokemonButton).toBeEnabled();
  fireEvent.click(nextPokemonButton);
  expect(getByTestId('pokemonType')).toContainHTML('Fire');
});
