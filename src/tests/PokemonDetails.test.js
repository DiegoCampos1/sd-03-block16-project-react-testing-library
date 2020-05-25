import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import data from '../data';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from './renderWithRouter';
import App from '../App';

afterEach(cleanup);

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const match = { params: { id: '25' } };

test('h2 header with Name Details', () => {
  const { getByText } = render((
    <PokemonDetails
      match={match}
      isPokemonFavoriteById={isPokemonFavoriteById}
      onUpdateFavoritePokemons={() => null}
      pokemons={[data[0]]}
    />
  ));
  expect(getByText(`${data[0].name} Details`)).toBeInTheDocument();
});

test('Summary', () => {
  const { getByText } = render((
    <PokemonDetails
      match={match}
      isPokemonFavoriteById={isPokemonFavoriteById}
      onUpdateFavoritePokemons={() => null}
      pokemons={[data[0]]}
    />
  ));
  const heading = getByText('Summary');
  expect(heading).toBeInTheDocument();
});

test('Summary must be present', () => {
  const { getByText } = render((
    <PokemonDetails
      match={match}
      isPokemonFavoriteById={isPokemonFavoriteById}
      onUpdateFavoritePokemons={() => null}
      pokemons={[data[0]]}
    />
  ));
  const summary = getByText(data[0].summary);
  expect(summary).toBeInTheDocument();
});

test('Contain a section  pokémon', () => {
  const { getByText, getAllByAltText } = render((
    <PokemonDetails
      match={match}
      isPokemonFavoriteById={isPokemonFavoriteById}
      onUpdateFavoritePokemons={() => null}
      pokemons={[data[0]]}
    />
  ));
  const locationTitle = getByText(`Game Locations of ${data[0].name}`);
  expect(locationTitle).toBeInTheDocument();
  expect(getByText(data[0].foundAt[0].location)).toBeInTheDocument();
  expect(getByText(data[0].foundAt[1].location)).toBeInTheDocument();
  const locationImages = getAllByAltText(`${data[0].name} location`);
  expect(locationImages.length).toBe(2);
  expect(locationImages[0].src).toBe(data[0].foundAt[0].map);
  expect(locationImages[1].src).toBe(data[0].foundAt[1].map);
});

test('Favorite Pokémon', () => {
  const { queryByAltText, getByText, getByLabelText } = renderWithRouter(<App />);
  const detailsLink = getByText(/More details/i);
  fireEvent.click(detailsLink);
  const favButton = getByLabelText('Pokémon favoritado?');
  fireEvent.click(favButton);
  expect(queryByAltText(/is marked as favorite/i)).toBeInTheDocument();
  fireEvent.click(favButton);
  expect(queryByAltText(/is marked as favorite/i)).not.toBeInTheDocument();
});
