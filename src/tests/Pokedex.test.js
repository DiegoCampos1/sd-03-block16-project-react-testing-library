import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

test('When pressing the next button, the page should display the next pokémon in the list', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const nextPokemonButton = getByText('Próximo pokémon');
  expect(nextPokemonButton).toBeInTheDocument();
  pokemons.forEach((elem) => {
    const namePokemon = getByTestId('pokemon-name');
    expect(namePokemon).toBeInTheDocument(elem.name);
    fireEvent.click(nextPokemonButton);
  });
});
test('the Pokédex must contain filter buttons', () => {
  const { getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const filterButton = getAllByText('All', 'Eletric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon');
  filterButton.forEach((elem) => {
    expect(elem).toBeInTheDocument();
  });
});

test('no error', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const erro = 'TypeError: Cannot read property `id` of undefined';
  expect(getByText(erro)).not.toBeInTheDocument();
});

test('text `encountered`', () => {
  const { getAllByTestId, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const getClass = getAllByTestId('pokemon-type-button');

  expect(getClass.length).toBe(7);
  expect(getByText('All')).toBeInTheDocument();
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('disable', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const Poison = getByText('Poison');
  fireEvent.click(Poison);
  const nextPokemon = getByText('Próximo pokémon');
  expect(nextPokemon).toHaveAttribute('disabled');
});
