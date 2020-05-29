import React from 'react';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import pokemons from '../data';
import PokemonDetails from '../components/PokemonDetails';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

const match = { params: { id: '143' } };

afterEach(cleanup);

test('Testing the name of the pokémon in Details', () => {
  const { getByText } = renderWithRouter(<PokemonDetails
    pokemons={[ pokemons[7]]}
    isPokemonFavoriteById={{ 143: false }}
    match={match}
    onUpdateFavoritePokemon={() => null}
  />);
  const detailsRoute = getByText(`${pokemons[7].name} Details`);
  expect(detailsRoute).toBeInTheDocument();
});

test('Testing the link in the pokémon page of Details', () => {
  const { queryByRole } = renderWithRouter(<PokemonDetails
    pokemons={[pokemons[7]]}
    isPokemonFavoriteById={{ 143: false }}
    match={match}
    onUpdateFavoritePokemon={() => null}
  />);
  const testLink = queryByRole('link', { name: 'More Details' });
  expect(testLink).not.toBeInTheDocument();
});

test('Testing the header in the pokémon page of Details', () => {
  const { getByText } = renderWithRouter(<PokemonDetails
    pokemons={[pokemons[7]]}
    isPokemonFavoriteById={{ 143: false }}
    match={match}
    onUpdateFavoritePokemon={() => null}
  />);
  const h2Header = getByText(/Summary/i);
  expect(h2Header).toBeInTheDocument();
  expect(h2Header.tagName).toBe('H2');
});

test('Testing the paragraph in the pokémon page of Details', () => {
  const { getByText } = renderWithRouter(<PokemonDetails
    pokemons={[pokemons[7]]}
    isPokemonFavoriteById={{ 143: false }}
    match={match}
    onUpdateFavoritePokemon={() => null}
  />);
  const h2Header = getByText(/Summary/i);
  expect(h2Header.nextSibling).toBeInTheDocument();
  expect(h2Header.nextSibling.tagName).toBe('P');
  expect(h2Header.nextSibling).toHaveTextContent(pokemons[7].summary);
});

test('Testing the map in the pokémon page of Details', () => {
  const { getByText, queryAllByRole, queryAllByAltText } = renderWithRouter(<PokemonDetails
    pokemons={[pokemons[7]]}
    isPokemonFavoriteById={{ 143: false }}
    match={match}
    onUpdateFavoritePokemon={() => null}
  />);
  const h2Header = getByText(/Game Locations of Snorlax/i);
  expect(h2Header).toBeInTheDocument();
  expect(h2Header.tagName).toBe('H2');

  const pokemonLocation = pokemons[7].foundAt;
  expect(h2Header.nextSibling.childNodes.length).toBe(pokemonLocation.length);

  const locationImg = queryAllByRole('img');
  const altTextImg = queryAllByAltText(`${pokemons[7].name} location`);
  expect(locationImg.length).toBeGreaterThanOrEqual(pokemonLocation.length);
  expect(altTextImg.length).toBe(pokemons[7].foundAt.length);

  altTextImg.forEach((_, index) => {
    expect(altTextImg[index].src).toBe(pokemonLocation[index].map);
    expect(altTextImg[index].alt).toBe(`${pokemons[7].name} location`);
  });
});

test('Testing favoritebox in the pokémon page of Details', () => {
  const { getByText, queryByRole } = renderWithRouter(<PokemonDetails
    pokemons={[pokemons[7]]}
    isPokemonFavoriteById={{ 143: false }}
    match={match}
    onUpdateFavoritePokemon={() => null}
  />);
  const checkbox = queryByRole(/checkbox/i);
  expect(checkbox).toBeInTheDocument();
  expect(checkbox.type).toBe('checkbox');

  const checkboxLabel = getByText(/Pokémon favoritado?/i);
  expect(checkboxLabel).toBeInTheDocument(pokemons[7].summary);
});
