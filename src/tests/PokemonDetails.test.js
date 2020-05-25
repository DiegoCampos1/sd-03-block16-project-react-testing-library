import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

afterEach(cleanup);

const match = { params: { id: '25' } };

describe('Testing Pokemon Details', () => {
  test('Testing Pokemon Details', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={{ 25: false }}
        match={match}
        pokemons={[pokemons[0]]}
        onUpdateFavoritePokemons={() => null}
      />,
    );
    expect(getByText('Pikachu Details')).toBeInTheDocument();
  });

  test('More details Link', () => {
    const { queryByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={{ 25: false }}
        match={match}
        pokemons={[pokemons[0]]}
        onUpdateFavoritePokemons={() => null}
      />,
    );
    expect(queryByRole('link', { name: /More Details/i })).not.toBeInTheDocument();
  });

  test('h2 heading with text Summary', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={{ 25: false }}
        match={match}
        pokemons={[pokemons[0]]}
        onUpdateFavoritePokemons={() => null}
      />,
    );
    const h2Summary = getByText(/Summary/i);
    expect(h2Summary).toBeInTheDocument();
    expect(h2Summary.tagName).toBe('H2');
  });

  test('paragraph with more details about pokemon', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={{ 25: false }}
        match={match}
        pokemons={[pokemons[0]]}
        onUpdateFavoritePokemons={() => null}
      />,
    );
    const h2Summary = getByText(/Summary/i);
    expect(h2Summary.nextSibling).toBeInTheDocument();
    expect(h2Summary.nextSibling.tagName).toBe('P');
    expect(h2Summary.nextSibling).toHaveTextContent(pokemons[0].summary);
    // const paragraphSummary = getByRole('')
  });

  test('testing map with pokemons location', () => {
    const { getByText, queryAllByRole, queryAllByAltText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={{ 25: false }}
        match={match}
        pokemons={[pokemons[0]]}
        onUpdateFavoritePokemons={() => null}
      />,
    );

    const h2Location = getByText(/Game Locations of Pikachu/i);
    expect(h2Location).toBeInTheDocument();
    expect(h2Location.tagName).toBe('H2');

    const pokemonLocationsQuantity = pokemons[0].foundAt.length;
    expect(h2Location.nextSibling.childNodes.length).toBe(pokemonLocationsQuantity);

    const imgLocation = queryAllByRole('img');
    expect(imgLocation.length).toBeGreaterThanOrEqual(pokemonLocationsQuantity);
    const imgAltText = queryAllByAltText(/Pikachu location/i);
    expect(imgAltText.length).toBe(pokemonLocationsQuantity);

    // expect(imgAltText[0].src).toBe(pokemons[0].foundAt[0].map);
    imgAltText.forEach((_, index) => {
      expect(imgAltText[index].src).toBe(pokemons[0].foundAt[index].map);
      expect(imgAltText[index].alt).toBe('Pikachu location');
    });
  });

  test('testing favoriting checkbox', () => {
    const { getByText, queryByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={{ 25: false }}
        match={match}
        pokemons={[pokemons[0]]}
        onUpdateFavoritePokemons={() => null}
      />,
    );

    const checkboxExists = queryByRole('checkbox');
    expect(checkboxExists).toBeInTheDocument();
    expect(checkboxExists.type).toBe('checkbox');

    const checkboxLabel = getByText(/Pokémon favoritado?/i);
    expect(checkboxLabel).toBeInTheDocument();
  });
});
