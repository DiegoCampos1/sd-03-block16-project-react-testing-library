import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  const { getByText } = renderWithRouter(<App />);

  const nextButton = getByText('Próximo pokémon');
  expect(nextButton).toBeInTheDocument();

  fireEvent.click(getByText(/Próximo pokémon/i));
  const nextPokemon1 = getByText('Charmander');
  expect(nextPokemon1).toBeInTheDocument();

  fireEvent.click(getByText(/Próximo pokémon/i));
  const nextPokemon2 = getByText('Caterpie');
  expect(nextPokemon2).toBeInTheDocument();
});

test('A Pokédex deve exibir apenas um pokémon por vez.', () => {
  const { getAllByTestId } = renderWithRouter(<App />);

  const onlyOnePokemon = getAllByTestId('pokemon-name');
  expect(onlyOnePokemon).toHaveLength(1);
});

test('Deve conter botões de filtro por tipo e um botão para resetar o filtro.', () => {
  const { queryAllByTestId, getByText, getByTestId } = renderWithRouter(<App />);

  const typeButton = queryAllByTestId('pokemon-type-button')[1];
  expect(typeButton).toBeInTheDocument();
  expect(typeButton.textContent).toBe('Fire');

  fireEvent.click(getByText(/Fire/i));
  const firstPokemon = getByTestId('pokemon-name');
  expect(firstPokemon.textContent).toBe('Charmander');
  fireEvent.click(getByText(/Próximo pokémon/i));
  const secondPokemon = getByTestId('pokemon-name');
  expect(secondPokemon.textContent).toBe('Rapidash');

  const allButton = getByText('All');
  expect(allButton).toBeInTheDocument();
  fireEvent.click(getByText(/All/i));
  const initialPokemon = getByTestId('pokemon-name');
  expect(initialPokemon.textContent).toBe('Pikachu');
  fireEvent.click(getByText(/Próximo pokémon/i));
  const nextPokemon = getByTestId('pokemon-name');
  expect(nextPokemon.textContent).toBe('Charmander');
});

test('Deve conter um heading com o texto Encountered pokémons.', () => {
  const { getByText } = renderWithRouter(<App />);

  const headEncountered = getByText('Encountered pokémons');
  expect(headEncountered).toBeInTheDocument();
});
