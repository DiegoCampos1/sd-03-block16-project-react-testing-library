import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { pokemons, isPokemonFavoriteById } from './mock';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from './renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('test file PokemonDetails.js', () => {
  const match = { params: { id: '78' } };
  test('Contain "<name> Details" text, where <name> is the name of the pokémon', () => {
    const { getByText } = render((
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={isPokemonFavoriteById}
        onUpdateFavoritePokemons={() => null}
        pokemons={[pokemons[2]]}
      />
    ));
    expect(getByText('Rapidash Details')).toBeInTheDocument();
  });

  test('shouldnt contain navigation link ', () => {
    const { queryByText } = render((
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={isPokemonFavoriteById}
        onUpdateFavoritePokemons={() => null}
        pokemons={[pokemons[2]]}
      />
    ));
    expect(queryByText('More details')).not.toBeInTheDocument();
  });

  test('Contain a h2 heading with "Summary" text', () => {
    const { getByText } = render((
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={isPokemonFavoriteById}
        onUpdateFavoritePokemons={() => null}
        pokemons={[pokemons[2]]}
      />
    ));
    const heading = getByText('Summary');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('Contain a paragraph with a resume of selected pokémon', () => {
    const { getByText } = render((
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={isPokemonFavoriteById}
        onUpdateFavoritePokemons={() => null}
        pokemons={[pokemons[2]]}
      />
    ));
    const resume = getByText('At full gallop, its four hooves barely touch the ground because it moves so incredibly fast.');
    expect(resume).toBeInTheDocument();
  });

  test('Contain a section  pokémon', () => {
    const { getByText, getAllByAltText } = render((
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={isPokemonFavoriteById}
        onUpdateFavoritePokemons={() => null}
        pokemons={[pokemons[2]]}
      />
    ));
    const heading = getByText('Game Locations of Rapidash');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
    expect(getByText('Kanto Route 28')).toBeInTheDocument();
    expect(getByText('Johto Mount Silver')).toBeInTheDocument();
    const locationsImages = getAllByAltText('Rapidash location');
    expect(locationsImages.length).toBe(2);
    expect(locationsImages[0].src).toBe('https://cdn.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png');
    expect(locationsImages[1].src).toBe('https://cdn.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png');
  });

  test('Page must allow favorite and unfavorite Pokémon', () => {
    const { queryByAltText, getByText, getByLabelText } = renderWithRouter(<App />);
    const pokemonDetailLink = getByText(/More details/i);
    fireEvent.click(pokemonDetailLink);
    const favoriteCheckButton = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteCheckButton);
    expect(queryByAltText(/is marked as favorite/i)).toBeInTheDocument();
    fireEvent.click(favoriteCheckButton);
    expect(queryByAltText(/is marked as favorite/i)).not.toBeInTheDocument();
  });
});
