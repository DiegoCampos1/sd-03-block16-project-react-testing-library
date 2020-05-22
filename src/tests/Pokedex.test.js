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
  expect(getByText('ID')).not.toBeInTheDocument();
});

