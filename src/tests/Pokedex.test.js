import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemon from '../data';

test('Botão Pokemon', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);

  const btn = getByText('Próximo pokémon');
  expect(btn).toBeInTheDocument();

  const btnAll = getByText('All');
  expect(btnAll).toBeInTheDocument();

  fireEvent.click(btnAll);
  pokemon.forEach((e) => {
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument(e.name);
    fireEvent.click(btn);
  });
});

test('Botão título', () => {
  const { getAllByText } = renderWithRouter(<App />);
  const buttonType = getAllByText('All', 'Eletric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon');
  buttonType.forEach((elem) => {
    expect(elem).toBeInTheDocument();
  });
});

test('Pokédex botão filter', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const typeBtn = getAllByRole('button');
  expect(typeBtn.value).not.toBeNull();
});

test('Texto H2', () => {
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
