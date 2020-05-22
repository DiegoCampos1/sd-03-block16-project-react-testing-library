import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../helper';

const testPokemon = {
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
  summary:
    'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
};

const {
  averageWeight, name, image, id, type,
} = testPokemon;
const { value, measurementUnit } = averageWeight;

describe('Pokemon.js component tests', () => {
  afterEach(cleanup);

  test('renders one card with favorite pokemon info, and details link', () => {
    const {
      container,
      getByAltText,
      getByTestId,
      getByRole,
    } = renderWithRouter(
      <Pokemon pokemon={testPokemon} showDetailsLink isFavorite />,
    );
    const pokemonContainer = container.querySelectorAll('.pokemon');
    const pokemonOverview = container.querySelectorAll('.pokemon-overview');
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    const pokemonAverageWeight = getByTestId('pokemon-weight');
    const detailsLink = getByRole('link');
    const pokemonImage = getByAltText(`${name} sprite`);
    const favoriteIcon = getByAltText(`${name} is marked as favorite`);

    expect(pokemonContainer.length).toBe(1);
    expect(pokemonOverview.length).toBe(1);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.textContent).toBe(name);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.textContent).toBe(type);
    expect(pokemonAverageWeight).toBeInTheDocument();
    expect(pokemonAverageWeight.textContent).toBe(
      `Average weight:${value}${measurementUnit}`,
    );
    expect(detailsLink).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe(image);
    expect(pokemonImage.alt).toBe(`${name} sprite`);
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.alt).toBe(`${name} is marked as favorite`);
    expect(favoriteIcon.src).not.toBe('');
  });

  test('renders one card with not favorite pokemon info, , and details link', () => {
    const {
      container,
      queryByAltText,
      getByTestId,
      getByRole,
    } = renderWithRouter(
      <Pokemon pokemon={testPokemon} showDetailsLink isFavorite={false} />,
    );
    const pokemonContainer = container.querySelectorAll('.pokemon');
    const pokemonOverview = container.querySelectorAll('.pokemon-overview');
    const pokemonName = getByTestId('pokemon-name');
    const pokemonAverageWeight = getByTestId('pokemon-weight');
    const detailsLink = getByRole('link');
    const pokemonImage = queryByAltText(`${name} sprite`);
    const favoriteIcon = queryByAltText(`${name} is marked as favorite`);

    expect(pokemonContainer.length).toBe(1);
    expect(pokemonOverview.length).toBe(1);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.textContent).toBe(name);
    expect(pokemonAverageWeight).toBeInTheDocument();
    expect(pokemonAverageWeight.textContent).toBe(
      `Average weight:${value}${measurementUnit}`,
    );
    expect(detailsLink).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe(image);
    expect(pokemonImage.alt).toBe(`${name} sprite`);
    expect(favoriteIcon).not.toBeInTheDocument();
  });

  test('test pokemon details link functionality', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={testPokemon} isFavorite />,
    );

    const detailsLink = getByText(/more details/i);
    expect(detailsLink).toBeInTheDocument();

    expect(history.location.pathname).toBe('/');

    fireEvent.click(detailsLink);

    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });
});
