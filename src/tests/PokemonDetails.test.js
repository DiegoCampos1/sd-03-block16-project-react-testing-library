import React from 'react';
import { Router } from 'react-router-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

afterEach(cleanup);

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

test('Renders PokemonDetails', () => {
  const { getByText, getAllByAltText } = renderWithRouter(<App />);

  const filterButton = getByText('Bug');
  fireEvent.click(filterButton);

  const link = getByText('More details');
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', '/pokemons/10');
  fireEvent.click(link);
  const linkCaterpie = getByText('Caterpie Details');
  expect(linkCaterpie).toHaveTextContent('Caterpie Details');

  const h2GameLocations = getByText('Game Locations of Caterpie');
  expect(h2GameLocations).toBeInTheDocument();

  const location1 = getByText('Johto National Park');
  expect(location1).toBeInTheDocument();

  const resume = getByText('Summary');
  expect(resume).toBeInTheDocument();

  const resumeText = getByText('For protection, it releases a horrible stench from the antennae on its head to drive away enemies.');
  expect(resumeText).toBeInTheDocument();

  const checkFavoritePokemon = getByText('Pokémon favoritado?');
  expect(checkFavoritePokemon).toBeInTheDocument();

  const imageLocation = getAllByAltText('Caterpie location')[3];
  expect(imageLocation).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png');
});
