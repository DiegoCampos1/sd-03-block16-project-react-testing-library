import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testes do arquivo FavoritePokemons.js', () => {
  test('Teste de mensagem caso não tenha favoritos', () => {
    const { getByText, queryByTestId } = renderWithRouter(<FavoritePokemons />);
    const pokemonName = queryByTestId('pokemon-name');
    expect(pokemonName).not.toBeInTheDocument();
    const favoriteNoFound = getByText('No favorite pokemon found');
    expect(favoriteNoFound).toBeInTheDocument();
  });

  test('Teste de exibição de cards marcados como favorito', () => {
    const pokemons = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Kanto Viridian Forest',
            map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
          },
          {
            location: 'Kanto Power Plant',
            map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
          },
        ],
        summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
      },
      {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: {
          value: '8.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Alola Route 3',
            map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
          },
          {
            location: 'Kanto Route 3',
            map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
          },
          {
            location: 'Kanto Route 4',
            map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
          },
          {
            location: 'Kanto Rock Tunnel',
            map: 'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
          },
        ],
        summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
      },
    ];
    const { getAllByTestId } = renderWithRouter(<FavoritePokemons pokemons={pokemons} />);
    const namesTestId = getAllByTestId('pokemon-name');
    expect(namesTestId[0]).toBeInTheDocument();
    expect(namesTestId[0].textContent).toBe('Pikachu');
    expect(namesTestId[1]).toBeInTheDocument();
    expect(namesTestId[1].textContent).toBe('Charmander');
  });
});
