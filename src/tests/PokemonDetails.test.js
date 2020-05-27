import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './testRenderService';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const match = { params: { id: '25' } };

describe('Testing PokemonDetails file', () => {
  afterEach(cleanup);

  test('testing information Pokemons selected', () => {
    const { getByText, queryByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={{ 25: false }}
        match={match}
        pokemons={[pokemons[0]]}
        onUpdateFavoritePokemons={() => null}
      />,
    );

    const pokemonDetails = getByText('Pikachu Details');
    expect(pokemonDetails).toBeInTheDocument();

    const pokemonLink = queryByRole(/More Details/i);
    expect(pokemonLink).not.toBeInTheDocument();

    const h2Sumary = getByText(/Summary/i);
    expect(h2Sumary).toBeInTheDocument();
    expect(h2Sumary.tagName).toBe('H2');
    expect(h2Sumary.nextSibling).toBeInTheDocument();
    expect(h2Sumary.nextSibling.tagName).toBe('P');
    expect(h2Sumary.nextSibling).toHaveTextContent(pokemons[0].summary);
  });

  test('testing pokemon location', () => {
    const { queryAllByRole, getByText, queryAllByAltText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={{ 25: false }}
        match={match}
        pokemons={[pokemons[0]]}
        onUpdateFavoritePokemons={() => null}
      />,
    );

    const location = getByText(/Game Locations of Pikachu/i);
    expect(location).toBeInTheDocument();
    expect(location.tagName).toBe('H2');

    const locationQuanty = pokemons[0].foundAt.length;
    expect(location.nextSibling.childNodes.length).toBe(locationQuanty);

    const locationImg = queryAllByRole('img');
    expect(locationImg.length).toBeGreaterThanOrEqual(locationQuanty);
    const textImg = queryAllByAltText(/Pikachu location/i);
    expect(textImg.length).toBe(locationQuanty);

    textImg.forEach((_, indx) => {
      expect(textImg[indx].src).toBe(pokemons[0].foundAt[indx].map);
      expect(textImg[indx].alt).toBe('Pikachu location');
    });
  });

  test('testing checkbox', () => {
    const { queryByRole, getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={{ 25: false }}
        match={match}
        pokemons={[pokemons[0]]}
        onUpdateFavoritePokemons={() => null}
      />,
    );

    const checkBox = queryByRole('checkbox');
    expect(checkBox).toBeInTheDocument();
    expect(checkBox.type).toBe('checkbox');

    const checkBoxLabel = getByText('Pokémon favoritado?');
    expect(checkBoxLabel).toBeInTheDocument();
  });
});
