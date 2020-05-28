import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('', () => {
  afterEach(cleanup);
  const isPokemonFavoriteById = {
    25: false,
    4: false,
    10: false,
    23: false,
    65: false,
    151: false,
    78: false,
    143: false,
    148: false,
  };
  test('', () => {
    const { getAllByTestId } = render(<Pokedex
      pokemons={pokemons}
      isPokemonFavoriteById={isPokemonFavoriteById}
    />);
  });
})
