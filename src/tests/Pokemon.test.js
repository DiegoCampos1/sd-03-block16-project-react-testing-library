import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import App from '../App';
import pokemons from '../data';

describe('Testando informações dos Cards Pokemon', () => {
  pokemons.forEach(({
    name, averageWeight: { value, measurementUnit }, image, type,
  }, index) => {
    test(`pokemon ${name} Card test`, async () => {
      const {
        getByText, getByAltText, getByTestId,
      } = render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      if (index === pokemons.length - 1) return null;
      Array(index).fill(index).forEach(() => fireEvent.click(getByText(/próximo pokémon/i)));

      const testeCard = () => {
        expect(getByText(name)).toBeInTheDocument();
        expect(getByTestId('pokemonType').innerHTML).toBe(type);
        expect(getByText(`Average weight:${value}${measurementUnit}`)).toBeInTheDocument();
        const imagem = getByAltText(`${name} sprite`);
        expect(imagem.alt).toMatch(`${name} sprite`);
        expect(imagem.src).toMatch(image);
      };
      return testeCard();
    });
  });

  pokemons.forEach(({ name, id }, index) => {
    test(`Detalhes de ${name}`, () => {
      let localMock;
      const {
        getByText, getByAltText, getByRole,
      } = render(
        <MemoryRouter>
          <App />
          <Route
            path="*"
            render={({ location }) => {
              localMock = location;
              return null;
            }}
          />
        </MemoryRouter>,
      );

      Array(index).fill(index).forEach(() => fireEvent.click(getByText(/Próximo pokémon/i)));
      const testeDetails = () => {
        const detalesLink = getByText('More details');
        fireEvent.click(detalesLink);
        expect(localMock.pathname.split('/pokemons/')[1]).toBe(id.toString());

        const favoriteCheckbox = getByRole('checkbox');
        fireEvent.click(favoriteCheckbox);

        const starIcon = getByAltText(`${name} is marked as favorite`);
        expect(starIcon).toBeInTheDocument();
        expect(starIcon.src).toMatch('/star-icon.svg');
      };

      return testeDetails();
    });
  });
});
