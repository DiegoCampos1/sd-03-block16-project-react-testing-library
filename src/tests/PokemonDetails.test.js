import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import App from '../App';
import pokemons from '../data';

describe('Pokemon Details test', () => {
  pokemons.forEach(({
    name, id, summary, foundAt,
  }) => {
    test(`pokemon ${name} name, Summary`, () => {
      const {
        getByText, getAllByAltText,
      } = render(
        <MemoryRouter initialEntries={[{ pathname: `/pokemons/${id}` }]}>
          <App />
        </MemoryRouter>,
      );
      expect(getByText(`${name} Details`)).toBeInTheDocument();
      expect(getByText('Summary')).toBeInTheDocument();
      expect(getByText(summary)).toBeInTheDocument();
      expect(getByText(`Game Locations of ${name}`)).toBeInTheDocument();
      const locationImage = getAllByAltText(`${name} location`);
      const favorite = getByText('Pokémon favoritado?');
      fireEvent.click(favorite);
      fireEvent.click(favorite);
      console.log(favorite.innerHTML);
      foundAt.forEach(({ location, map }) => {
        expect(getByText(location)).toBeInTheDocument();
        expect(locationImage.some(({ src }) => src === map)).toBeTruthy();
      });
    });
  });
});
