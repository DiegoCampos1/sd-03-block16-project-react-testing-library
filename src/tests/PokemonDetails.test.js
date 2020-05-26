import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import App from '../App';
import pokemons from '../data';

describe('Teste Pokemon', () => {
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
      const localImagem = getAllByAltText(`${name} location`);
      const favoritos = getByText('Pokémon favoritado?');
      fireEvent.click(favoritos);
      fireEvent.click(favoritos);
      console.log(favoritos.innerHTML);
      foundAt.forEach(({ location, map }) => {
        expect(getByText(location)).toBeInTheDocument();
        expect(localImagem.some(({ src }) => src === map)).toBeTruthy();
      });
    });
  });
});
