import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';

describe('Testes do arquivo Pokemon.js', () => {
  const pokemon = {
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

  test('Testando as informações do card com o Pokémon passado como props', () => {
    const { getByText, getByTestId, getByAltText, history } = renderWithRouter(<Pokemon
      pokemon={pokemon}
      isFavorite={false}
    />);

    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonName.textContent).toBe('Pikachu');
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight.textContent).toBe('Average weight:6.0kg');
    const pokemonAltImg = getByAltText(`${pokemonName.textContent} sprite`);
    expect(pokemonAltImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const moreDetailsButton = getByText('More details');
    let pathname = history.location.pathname;
    expect(pathname).toBe('/');
    fireEvent.click(moreDetailsButton);
    pathname = history.location.pathname;
    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
  });

  test('Testando a vizualização da imagem estrela caso o Pokémon seja favorito', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={pokemon}
      isFavorite={pokemon.id}
    />);

    const pokemonAltImg = getByAltText(`${pokemon.name} is marked as favorite`);
    expect(pokemonAltImg.src).toBe('http://localhost/star-icon.svg');
  });
});
