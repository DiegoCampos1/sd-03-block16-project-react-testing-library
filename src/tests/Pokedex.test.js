import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

const mockPokemons = [
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
  {
    id: 10,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: {
      value: '2.9',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Johto Route 30',
        map: 'https://cdn.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
      },
      {
        location: 'Johto Route 31',
        map: 'https://cdn.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
      },
      {
        location: 'Ilex Forest',
        map: 'https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
      },
      {
        location: 'Johto National Park',
        map: 'https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
      },
    ],
    summary: 'For protection, it releases a horrible stench from the antennae on its head to drive away enemies.',
  },
  {
    id: 23,
    name: 'Ekans',
    type: 'Poison',
    averageWeight: {
      value: '6.9',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/1/18/Spr_5b_023.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Goldenrod Game Corner',
        map: 'https://cdn.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
      },
    ],
    summary: 'It can freely detach its jaw to swallow large prey whole. It can become too heavy to move, however.',
  },
  {
    id: 65,
    name: 'Alakazam',
    type: 'Psychic',
    averageWeight: {
      value: '48.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Unova Accumula Town',
        map: 'https://cdn.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
      },
    ],
    summary: 'Closing both its eyes heightens all its other senses. This enables it to use its abilities to their extremes.',
  },
  {
    id: 143,
    name: 'Snorlax',
    type: 'Normal',
    averageWeight: {
      value: '460.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/4/40/Spr_5b_143.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Vermillion City',
        map: 'https://cdn.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png',
      },
    ],
    summary: 'What sounds like its cry may actually be its snores or the rumblings of its hungry belly.',
  },
  {
    id: 148,
    name: 'Dragonair',
    type: 'Dragon',
    averageWeight: {
      value: '16.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Johto Route 45',
        map: 'https://cdn.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png',
      },
      {
        location: 'Johto Dragon\'s Den',
        map: 'https://cdn.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png',
      },
    ],
    summary: 'They say that if it emits an aura from its whole body, the weather will begin to change instantly.',
  },
];

const typeButtons = () => mockPokemons.reduce((acc, e) => {
  if (acc.includes(e.type)) {
    return acc;
  }
  acc.push(e.type);
  return acc;
}, []);

const mockIsPokemonFavoriteById = {
  25: false,
  4: false,
  10: false,
  23: false,
  65: false,
  143: false,
  148: false,
};

afterEach(cleanup);

test('Testing the reset of the next pokemon button ', () => {
  const { getByTestId } = renderWithRouter(<App />);

  const nextButton = getByTestId(/next-pokemon/i);
  expect(nextButton).toBeInTheDocument();
  expect(nextButton).toHaveTextContent(/Próximo pokémon/i);
  mockPokemons.forEach((elem) => {
    const pokemonName = getByTestId(/pokemon-name/i);
    const pokemonType = getByTestId(/pokemonType/i);
    const pokemonWeight = getByTestId(/pokemon-weight/i);
    expect(pokemonName).toHaveTextContent(elem.name);
    expect(pokemonType).toHaveTextContent(elem.type);
    expect(pokemonWeight).toHaveTextContent(`Average weight:${elem.averageWeight.value}${elem.averageWeight.measurementUnit}`);
    fireEvent.click(nextButton);
  });
});

test('Testing just one pokémon on display ', () => {
  const { queryAllByTestId } = renderWithRouter(<Pokedex
    pokemons={mockPokemons}
    isPokemonFavoriteById={mockIsPokemonFavoriteById}
  />);
  const displayOfPokemons = queryAllByTestId(/pokemon-name/i);
  expect(displayOfPokemons).toHaveLength(1);
});

test('Testing the type buttons ', () => {
  const { getAllByTestId } = renderWithRouter(<Pokedex
    pokemons={mockPokemons}
    isPokemonFavoriteById={mockIsPokemonFavoriteById}
  />);
  const pokemonTypeButton = getAllByTestId(/pokemon-type-button/i);
  const renderPokemonTypeButton = pokemonTypeButton.map((elem) => elem.textContent);
  expect(pokemonTypeButton).toHaveLength(typeButtons().length);
  expect(renderPokemonTypeButton).toStrictEqual(typeButtons());
});

test('Testing the reset button all ', () => {
  const { getByText, getByTestId, getAllByTestId } = renderWithRouter(<Pokedex
    pokemons={mockPokemons}
    isPokemonFavoriteById={mockIsPokemonFavoriteById}
  />);
  const allButton = getByText(/All/i);
  expect(allButton).toBeInTheDocument();
  const pokemonTypeButton = getAllByTestId(/pokemon-type-button/i);
  fireEvent.click(pokemonTypeButton[5]);
  const pokemonName = getByTestId(/pokemon-name/i);
  expect(pokemonName).toHaveTextContent(/Snorlax/i);
  fireEvent.click(allButton);
  expect(pokemonName).toHaveTextContent(/Pikachu/i);
});

test('Testing the disable next button ', () => {
  const { getByTestId, getAllByTestId } = renderWithRouter(<Pokedex
    pokemons={mockPokemons}
    isPokemonFavoriteById={mockIsPokemonFavoriteById}
  />);
  const nextButton = getByTestId(/next-pokemon/i);
  const pokemonTypeButton = getAllByTestId(/pokemon-type-button/i);
  fireEvent.click(pokemonTypeButton[5]);
  expect(nextButton).toBeDisabled();
});
