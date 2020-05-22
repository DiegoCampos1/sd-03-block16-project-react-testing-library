import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  render, cleanup, fireEvent, waitForDomChange,
} from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';
import { Pokedex, FavoritePokemons } from '../components';
import pokemons from '../mockPokemons';
import { firstLocations, nextLocations } from '../mockLocations';
import { generations, generation1 } from '../mockGenerations';

afterEach(cleanup);

const booleanPokemons = {
  25: true,
  4: true,
  10: true,
  23: false,
  65: true,
  151: true,
  78: false,
  143: true,
  148: false,
};

const favoritedPokemons = pokemons.filter(({ id }) => booleanPokemons[id]);
const notFavoritedPokemons = pokemons.filter(({ id }) => !booleanPokemons[id]);

describe('Test 22 - favorite page should display favorite pokemons', () => {
  it('22.1 - should display all favorited pokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={favoritedPokemons} />);
    favoritedPokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
    });
  });
  it('22.2 - should not display favorited pokemons', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={favoritedPokemons} />);
    notFavoritedPokemons.forEach(({ name }) => {
      expect(queryByText(name)).not.toBeInTheDocument();
    });
  });
});