import React from 'react';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import updateFavoritePokemons from '../services/pokedexService';
import data from '../data';


describe('Testes do arquivo PokemonDetails.js', () => {
  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: true,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };

  const match = {
    isExact: true,
    params: {
      id: '25',
    },
    path: '/pokemons/:id',
    url: 'pokemons/25',
  };

  /* const pokemonId = 25;
  const isFavorite = false; */

  test('Informações do Pokemon da página de detalhes', () => {
    const { getByText, queryByText, getAllByAltText } = renderWithRouter(<PokemonDetails
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
    const summaryTitle = getByText('Summary');
    expect(summaryTitle).toBeInTheDocument();
    const summaryParagraph = getByText(data[0].summary);
    expect(summaryParagraph).toBeInTheDocument();
    const gameLocation = getByText('Game Locations of Pikachu');
    expect(gameLocation).toBeInTheDocument();
    const pokemonLocations = getAllByAltText('Pikachu location');
    expect(pokemonLocations.length).toBe(2);
    expect(pokemonLocations[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokemonLocations[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    const location0 = getByText('Kanto Viridian Forest');
    expect(location0).toBeInTheDocument();
    const location1 = getByText('Kanto Power Plant');
    expect(location1).toBeInTheDocument();
  });

  test('Testando o checkbox para favoritar o pokémon', () => {
    const { getByLabelText, getByRole } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={isPokemonFavoriteById}
      match={match}
      pokemons={data}
      onUpdateFavoritePokemons={(pokemonId, isFavorite) => (
        updateFavoritePokemons(pokemonId, isFavorite)
      )}
    />);
    const labelFavorite = getByLabelText('Pokémon favoritado?');
    expect(labelFavorite).toBeInTheDocument();
    const checkboxFavorite = getByRole('checkbox');
    expect(checkboxFavorite.checked).toBe(true);
  });
});
