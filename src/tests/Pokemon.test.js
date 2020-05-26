import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Pokemon from '../components/Pokemon';

const mockedPokemon = {
  id: 10,
  name: 'Caterpie',
  type: 'Bug',
  averageWeight: { value: '2.9', measurementUnit: 'kg' },
  image: 'https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
  foundAt: [
    { location: 'Johto Route 30', map: 'https://cdn.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png' },
    { location: 'Johto Route 31', map: 'https://cdn.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png' },
    { location: 'Ilex Forest', map: 'https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png' },
    { location: 'Johto National Park', map: 'https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png' },
  ],
  summary: 'For protection, it releases a horrible stench from the antennae on its head to drive away enemies.',
};

const mockedFavorite = true;

test('Displays a card with correct information about a pokemon', () => {
  const { getByTestId, getByText, getByAltText } = render(
    <MemoryRouter>
      <Pokemon pokemon={mockedPokemon} isFavorite={mockedFavorite} />
    </MemoryRouter>,
  );
  const pokemonName = getByTestId('pokemon-name').textContent;
  expect(pokemonName).toBe('Caterpie');

  const pokemonType = getByTestId('pokemonType').textContent;
  expect(pokemonType).toBe('Bug');

  const pokemonWeight = getByTestId('pokemon-weight').textContent;
  expect(pokemonWeight).toBe('Average weight:2.9kg');

  const pokemonDetailsLink = getByText('More details');
  expect(pokemonDetailsLink.href).toMatch(/pokemons/);

  const pokemonImage = getByAltText('Caterpie sprite');
  expect(pokemonImage.alt).toBe('Caterpie sprite');
  expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png');

  const pokedexFavoriteStar = getByAltText('Caterpie is marked as favorite');
  expect(pokedexFavoriteStar).toBeInTheDocument();
  expect(pokedexFavoriteStar.src).toMatch('/star-icon.svg');
});
