import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import PokemonDetails from '../components/PokemonDetails';
import App from '../App';

describe('PokemonDetails.js tests', () => {
  const favoritePkmsMock = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: true,
  };

  const match = { params: { id: '25' } };

  test('Renders correct pokemon name', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        pokemons={pokemons}
        match={match}
        isPokemonFavoriteById={favoritePkmsMock}
        onUpdateFavoritePokemons={() => null}
      />);
    expect(getByText(/Pikachu Details/i)).toBeInTheDocument();
  });

  test('Page should not have details link', () => {
    const { queryByText } = renderWithRouter(
      <PokemonDetails
        pokemons={pokemons}
        match={match}
        isPokemonFavoriteById={favoritePkmsMock}
        onUpdateFavoritePokemons={() => null}
      />);
    expect(queryByText(/More details/i)).not.toBeInTheDocument();
  });

  test('Renders H2 with correct text', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        pokemons={pokemons}
        match={match}
        isPokemonFavoriteById={favoritePkmsMock}
        onUpdateFavoritePokemons={() => null}
      />);
    expect(getByText(/Summary/i).tagName).toBe('H2');
  });

  test('Renders one <p> with short description', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        pokemons={pokemons}
        match={match}
        isPokemonFavoriteById={favoritePkmsMock}
        onUpdateFavoritePokemons={() => null}
      />);
    const pElement = getByText(/Summary/i).nextSibling;
    expect(pElement).toBeInTheDocument();
    expect(pElement.tagName).toBe('P');
    expect(pElement.innerHTML).toBe(pokemons[0].summary);
  });

  test('Renders location maps with correct content', () => {
    const { getByText, getAllByAltText } = renderWithRouter(
      <PokemonDetails
        pokemons={pokemons}
        match={match}
        isPokemonFavoriteById={favoritePkmsMock}
        onUpdateFavoritePokemons={() => null}
      />);
    const locations = getAllByAltText(/Pikachu location/i);
    expect(getByText(/Game Locations of Pikachu/i).tagName).toBe('H2');
    expect(locations.length).toBe(2);
    expect(locations[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[0].nextSibling.textContent).toBe('Kanto Viridian Forest');
    expect(locations[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(locations[1].nextSibling.textContent).toBe('Kanto Power Plant');
  });

  test('Favoriting through the details functions correctly', () => {
    const { getByLabelText, getByText, getByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByLabelText(/Pokémon favoritado?/i));
    expect(getByAltText(/Pikachu is marked as favorite/i)).toBeInTheDocument();
  });
});
