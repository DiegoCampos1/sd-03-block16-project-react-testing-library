/* import React from 'react';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import updateFavoritePokemons from '../services/pokedexService';
import data from '../data';

describe('Testes do arquivo PokemonDetails.js', () => {
  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };

  const match = {
    isExact: true,
    params: {
      id: 25,
    },
    path: "/pokemons/:id",
    url: "pokemons/25"
  }

  const pokemonId = 25;
  const isFavorite = false;

  test('', () => {
    const { getByText, queryByText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={isPokemonFavoriteById}
      match={match}
      pokemons={data}
      onUpdateFavoritePokemons={(pokemonId, isFavorite) => (
        updateFavoritePokemons(pokemonId, isFavorite)
      )}
    />);

    const pokemonName = getByText('Pikachu Details');
    expect(pokemonName).toBeInTheDocument();
    const moreDetails = queryByText('More details');
    expect(moreDetails).not.toBeInTheDocument();
  });
}) */
