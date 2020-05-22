import React from 'react';
import {
  render, cleanup, fireEvent,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import pokemons from '../data';
import { Pokedex } from '../components';


afterEach(cleanup);
test('Pokedex', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const nextButton = getByText('Próximo pokémon');
  const pika = getByText('Pikachu');
  expect(pika).toBeInTheDocument();
  fireEvent.click(nextButton);
  const sno = getByText('Charmander');
  expect(sno).toBeInTheDocument();
});

test('One at a time', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const pok = document.querySelectorAll('.pokemon');
  expect(pok.length).toBe(1);
});

test('at', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const pyshButton = getByText('Psychic');
  fireEvent.click(pyshButton);
  const pokeType = getByTestId('pokemonType');
  expect(pokeType).toBeInTheDocument();
  expect(pokeType).toHaveTextContent('Psychic');
});

test('all filter', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const firstFilter = getByTestId('pokemonType').textContent;
  const nextButton = getByText('Próximo pokémon');
  fireEvent.click(nextButton);
  const secondFilter = getByTestId('pokemonType').textContent;
  expect(firstFilter).not.toEqual(secondFilter);


  const pyshButton = getByText('Psychic');
  const allButton = getByText('All');
  fireEvent.click(pyshButton);
  fireEvent.click(allButton);

  const firstFilteragain = getByTestId('pokemonType').textContent;
  fireEvent.click(nextButton);
  const secondFilteragain = getByTestId('pokemonType').textContent;
  expect(firstFilteragain).not.toEqual(secondFilteragain);
});

test('new Pokemon filter', () => {
  const newPok = {
    id: 12354,
    name: 'MachoMan',
    type: 'Fighter',
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
  const { getByText, getAllByTestId } = render(
    <MemoryRouter>
      <Pokedex pokemons={[...pokemons, newPok]} isPokemonFavoriteById={{ 25: true }} />
    </MemoryRouter>,
  );
  const newButton = getAllByTestId('pokemon-type-button');
  expect(newButton).toHaveLength(8);
  fireEvent.click(newButton[7]);
  const prox = getByText('Próximo pokémon');
  expect(prox).toBeDisabled();

  const title = getByText('Encountered pokémons');
  expect(title).toBeInTheDocument();
});
