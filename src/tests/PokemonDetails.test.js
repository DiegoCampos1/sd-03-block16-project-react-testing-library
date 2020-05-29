import React from 'react';
import MemoryHistory from './MemoryHistory';
import PokemonDetails from '../components/PokemonDetails';

describe('Testando o details', () => {
  it('Testando os dados de pikachu', () => {
    const pikachu = {
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
      norefactor: true,
    };
    const { getByText } = MemoryHistory(
      <PokemonDetails isFavoritePokemonById pokemons={pikachu} />);
    const lugar = getByText(`Game locations of ${pikachu.name}`);
    expect(lugar.innerText).toBe('Game locations of Pikachu');
  });
});
