import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

test('Shows `No favorite pokemon found` message when user has no favorites', () => {
  const { getByText, queryByTestId } = render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );
  const favoritesArr = queryByTestId('pokemon-name');
  expect(favoritesArr).not.toBeInTheDocument();

  const notFoundMessage = getByText('No favorite pokemon found');
  expect(notFoundMessage).toBeInTheDocument();
});

test('Shows favorite pokemons cards', () => {
  const favoritePokemons = [
    {
      id: 4,
      name: 'Charmander',
      type: 'Fire',
      averageWeight: { value: '8.5', measurementUnit: 'kg' },
      image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
      foundAt: [
        { location: 'Alola Route 3', map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png' },
        { location: 'Kanto Route 3', map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png' },
        { location: 'Kanto Route 4', map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png' },
        { location: 'Kanto Rock Tunnel', map: 'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png' },
      ],
      summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
    },
    {
      id: 151,
      name: 'Mew',
      type: 'Psychic',
      averageWeight: { value: '4.0', measurementUnit: 'kg' },
      image: 'https://cdn.bulbagarden.net/upload/4/43/Spr_5b_151.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
      foundAt: [
        { location: 'Faraway Island', map: 'https://cdn.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png' },
      ],
      summary: 'Apparently, it appears only to those people who are pure of heart and have a strong desire to see it.',
    }];

  const { getAllByTestId } = render(
    <MemoryRouter>
      <FavoritePokemons pokemons={favoritePokemons} />
    </MemoryRouter>,
  );

  const favoritesArr = getAllByTestId('pokemon-name');
  expect(favoritesArr[0]).toBeInTheDocument();
  expect(favoritesArr[0].textContent).toBe('Charmander');
  expect(favoritesArr[1]).toBeInTheDocument();
  expect(favoritesArr[1].textContent).toBe('Mew');
});
