import React from 'react';
import { fireEvent } from '@testing-library/react';
import MemoryHistory from './MemoryHistory';
import Pokemon from '../components/Pokemon';

describe('Testando o componente Pokemon', () => {
  it('Testando o caso Pikachu', () => {
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
    };
    const { getByTestId, getByAltText } = MemoryHistory(<Pokemon pokemon={pikachu} isFavorite />);
    const nome = getByTestId('pokemon-name');
    const tipo = getByTestId('pokemonType');
    const peso = getByTestId('pokemon-weight');
    const pikature = getByAltText('Pikachu');
    const favorito = getByAltText('Pikachu is marked as favorite');
    expect(nome.innerText).toBe('Pikachu');
    expect(tipo.innerText).toBe('Electric');
    expect(peso.innerText).toBe('Average weight:6.0kg');
    expect(pikature.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(favorito.src).toBe('/star-icon.svg');
    fireEvent.click(pikature);
  });
});
