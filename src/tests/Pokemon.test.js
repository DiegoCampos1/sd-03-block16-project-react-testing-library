import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import App from '../App';
import pokemons from '../data';

describe('Tesing all pokemons info to be on the card', () => {
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

      const testCard = () => {
        expect(getByText(name)).toBeInTheDocument();
        expect(getByTestId('pokemonType').innerHTML).toBe(type);
        expect(getByText(`Average weight:${value}${measurementUnit}`)).toBeInTheDocument();
        const imageNode = getByAltText(`${name} sprite`);
        expect(imageNode.alt).toMatch(`${name} sprite`);
        expect(imageNode.src).toMatch(image);
      };
      return testCard();
    });
  });
  pokemons.forEach(({ name, id }, index) => {
    test(`details and favorite from ${name}`, () => {
      let locationMock;
      const {
        getByText, getByAltText, getByRole,
      } = render(
        <MemoryRouter>
          <App />
          <Route
            path="*"
            render={({ location }) => {
              locationMock = location;
              return null;
            }}
          />
        </MemoryRouter>,
      );
      Array(index).fill(index).forEach(() => fireEvent.click(getByText(/Próximo pokémon/i)));
      const testDetails = () => {
        const detailsLink = getByText('More details');
        fireEvent.click(detailsLink);
        expect(locationMock.pathname.split('/pokemons/')[1]).toBe(id.toString());

        const favoriteCheckbox = getByRole('checkbox');
        fireEvent.click(favoriteCheckbox);

        const starIcon = getByAltText(`${name} is marked as favorite`);
        expect(starIcon).toBeInTheDocument();
        expect(starIcon.src).toMatch('/star-icon.svg');
        // const homeLink = getByText('Home');
      };
      return testDetails();
    });
  });
});
