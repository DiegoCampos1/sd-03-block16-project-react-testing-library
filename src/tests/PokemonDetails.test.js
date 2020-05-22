import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './testService';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

afterEach(cleanup);

const match = { params: { id: '25' } };

test('Testing Pokemon Details', () => {
  const { getByText } = renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={{ 25: false }}
      match={match}
      pokemons={[pokemons[0]]}
      onUpdateFavoritePokemons={() => null}
    />,
  );
  expect(getByText('Pikachu Details')).toBeInTheDocument();
});
