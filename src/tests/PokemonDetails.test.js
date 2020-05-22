import React from 'react';
import { render, cleanup } from '@testing-library/react';

import PokemonDetails from '../components/PokemonDetails';

import pokemons from '../data';

describe('PokemonDetails', () => {
  afterEach(cleanup);
  const match = { params: { id: '25' } };

  test('should have information only about the selected pokémon', () => {
    const { getByText } = render((
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={{ 25: true }}
        onUpdateFavoritePokemons={() => null}
        pokemons={[pokemons[0]]}
      />
    ));
    expect(getByText('Pikachu Details')).toBeInTheDocument();
  });

  test('should NOT have a link for details', () => {
    const { queryByText } = render((
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={{ 25: true }}
        onUpdateFavoritePokemons={() => null}
        pokemons={[pokemons[0]]}
      />
    ));
    expect(queryByText('More details')).not.toBeInTheDocument();
  });

  test('should have an Summary h2', () => {
    const { queryByText } = render((
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={{ 25: true }}
        onUpdateFavoritePokemons={() => null}
        pokemons={[pokemons[0]]}
      />
    ));
    expect(queryByText('Summary')).toBeInTheDocument();
    expect(queryByText('Summary')).toContainHTML('<h2>');
  });

  test('should have a paragrph with the PikachuDetails', () => {
    const mockedPikachuDescription = 'This intelligent Pokémon roasts hard berries ' +
      'with electricity to make them tender enough to eat.';
    const { getByText } = render((
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={{ 25: true }}
        onUpdateFavoritePokemons={() => null}
        pokemons={[pokemons[0]]}
      />
    ));
    expect(getByText(mockedPikachuDescription)).toBeInTheDocument();
  });
});
