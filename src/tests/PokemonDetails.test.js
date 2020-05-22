import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import App from '../App';
import PokemonDetails from '../components/PokemonDetails';

import pokemons from '../data';

describe('PokemonDetails', () => {
  afterEach(cleanup);
  const match = { params: { id: '25' } };

  test('should have information only about the selected pokémon', () => {
    const { getByText } = render((
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={{ 25: true }}
        onUpdateFavoritePokemons={() => null}
        pokemons={[pokemons[0]]}
      />
    ));
    expect(getByText('Pikachu Details')).toBeInTheDocument();
  });

  test('should NOT have a link for details', () => {
    const { queryByText } = render((
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={{ 25: true }}
        onUpdateFavoritePokemons={() => null}
        pokemons={[pokemons[0]]}
      />
    ));
    expect(queryByText('More details')).not.toBeInTheDocument();
  });

  test('should have an Summary h2', () => {
    const { queryByText } = render((
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={{ 25: true }}
        onUpdateFavoritePokemons={() => null}
        pokemons={[pokemons[0]]}
      />
    ));
    expect(queryByText('Summary')).toBeInTheDocument();
    expect(queryByText('Summary')).toContainHTML('<h2>');
  });

  test('should have a paragrph with the PikachuDetails', () => {
    const mockedPikachuDescription = 'This intelligent Pokémon roasts hard berries ' +
      'with electricity to make them tender enough to eat.';
    const { getByText } = render((
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={{ 25: true }}
        onUpdateFavoritePokemons={() => null}
        pokemons={[pokemons[0]]}
      />
    ));
    expect(getByText(mockedPikachuDescription)).toBeInTheDocument();
  });

  describe('pokemon location', () => {
    test('should have a title of the location', () => {
      const { getByText } = render((
        <PokemonDetails
          match={match}
          isPokemonFavoriteById={{ 25: true }}
          onUpdateFavoritePokemons={() => null}
          pokemons={[pokemons[0]]}
        />
      ));
      expect(getByText('Game Locations of Pikachu')).toBeInTheDocument();
    });

    test('should render all the locations of the pokemon', () => {
      const { getAllByAltText } = render((
        <PokemonDetails
          match={match}
          isPokemonFavoriteById={{ 25: true }}
          onUpdateFavoritePokemons={() => null}
          pokemons={[pokemons[0]]}
        />
      ));
      expect(getAllByAltText('Pikachu location').length).toBe(2);
    });

    test('image by alt and confirm src', () => {
      const image1 = 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
      const image2 = 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
      const { getAllByAltText } = render((
        <PokemonDetails
          match={match}
          isPokemonFavoriteById={{ 25: true }}
          onUpdateFavoritePokemons={() => null}
          pokemons={[pokemons[0]]}
        />
      ));
      expect(getAllByAltText('Pikachu location')[0]).toHaveAttribute('src', image1);
      expect(getAllByAltText('Pikachu location')[1]).toHaveAttribute('src', image2);
    });

    test('should have the correct name and title', () => {
      const { queryByText } = render((
        <PokemonDetails
          match={match}
          isPokemonFavoriteById={{ 25: true }}
          onUpdateFavoritePokemons={() => null}
          pokemons={[pokemons[0]]}
        />
      ));
      expect(queryByText('Kanto Viridian Forest')).toBeInTheDocument();
      expect(queryByText('Kanto Power Plant')).toBeInTheDocument();
    });
  });

  describe('Favorite checkbox', () => {
    test('should exist', () => {
      const { queryByLabelText } = render((
        <PokemonDetails
          match={match}
          isPokemonFavoriteById={{ 25: true }}
          onUpdateFavoritePokemons={() => null}
          pokemons={[pokemons[0]]}
        />
      ));
      expect(queryByLabelText('Pokémon favoritado?')).toHaveAttribute('type', 'checkbox');
    });

    test('should change the status of the pokemon', () => {
      const { getByLabelText, getByText } = render((
        <Router history={createMemoryHistory()}>
          <App />
        </Router>
      ));

      fireEvent.click(getByText('More details'));
      const favoriteButton = getByLabelText('Pokémon favoritado?');

      fireEvent.click(favoriteButton);
      expect(favoriteButton).toBeChecked();

      fireEvent.click(favoriteButton);
      expect(favoriteButton).not.toBeChecked();
    });
  });
});
