import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Pokedex from '../components/Pokedex';

import pokemons from '../data';

const renderWithRouter = (ui, history = createMemoryHistory()) =>
  render(<Router history={history}>{ui}</Router>);

const mockedPokemonFavoriteById = { 0: false };

describe('Pokedex', () => {
  afterEach(cleanup);

  test('Button of next Pokémon', () => {
    const { getByText } = renderWithRouter((
      <Pokedex isPokemonFavoriteById={mockedPokemonFavoriteById} pokemons={pokemons} />
    ));
    const button = getByText('Próximo pokémon');

    expect(button).toBeInTheDocument();
  });

  test('should pass to the next pokemon of data', () => {
    const { getByText } = renderWithRouter((
      <Pokedex isPokemonFavoriteById={mockedPokemonFavoriteById} pokemons={pokemons} />
    ));
    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Charmander')).toBeInTheDocument();
    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Caterpie')).toBeInTheDocument();
    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Ekans')).toBeInTheDocument();
  });

  test('should have a cicle behavior', () => {
    const { getByText } = renderWithRouter((
      <Pokedex
        isPokemonFavoriteById={mockedPokemonFavoriteById}
        pokemons={[pokemons[0], pokemons[1]]}
      />
    ));
    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Charmander')).toBeInTheDocument();
    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('only on pokemon at time', () => {
    const { getAllByTestId } = renderWithRouter((
      <Pokedex isPokemonFavoriteById={mockedPokemonFavoriteById} pokemons={pokemons} />
    ));
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });
});
