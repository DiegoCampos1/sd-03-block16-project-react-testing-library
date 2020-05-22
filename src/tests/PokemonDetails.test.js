import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';
import pokemons from '../mockPokemons';

afterEach(cleanup);

describe('Test 1 - pokemon details should display pokemon summary', () => {
  it('1.1 - pokemon details must contain heading h2 and 13.2 - text summary', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);
    pokemons.forEach(({
      summary, name,
    }, index) => {
      for (let i = 0; i < index; i += 1) {
        const nextButton = getByText(/Próximo pokémon/i);
        fireEvent.click(nextButton);
      }
      const detailsButton = queryByText(/More details/i);
      fireEvent.click(detailsButton);
      expect(getByText('Summary')).toBeInTheDocument();
      expect(getByText('Summary').tagName).toBe('H2');
      expect(getByText(`${name} Details`)).toBeInTheDocument();
      expect(getByText(summary)).toBeInTheDocument();
      expect(getByText(summary).tagName).toBe('P');
      fireEvent.click(getByText('Home'));
    });
  });
});
describe('Test 2 - pokemon details must display maps', () => {
  it('2.0 - must contain h2 with text <Game Locations of <pokemon>', () => {
    const { getByText, getAllByAltText, queryByText } = renderWithRouter(<App />);
    pokemons.forEach(({
      name, foundAt,
    }, index) => {
      for (let i = 0; i < index; i += 1) {
        const nextButton = getByText(/Próximo pokémon/i);
        fireEvent.click(nextButton);
      }
      const detailsButton = queryByText(/More details/i);
      fireEvent.click(detailsButton);
      expect(getByText(`Game Locations of ${name}`)).toBeInTheDocument();
      expect(getByText(`Game Locations of ${name}`).tagName).toBe('H2');
      expect(getAllByAltText(`${name} location`).length).toBe(foundAt.length);
      for (let i = 0; i < foundAt.length; i += 1) {
        const location = getAllByAltText(`${name} location`)[i];
        expect(getByText(foundAt[i].location)).toBeInTheDocument(); // 14.3
        expect(location.src).toBe(foundAt[i].map); // 14.4
        expect(location.alt).toBe(`${name} location`); // 14.5
      }
      fireEvent.click(getByText('Home'));
    });
  });
});

describe('Test 3 - pokemon details must display fav button', () => {
  it('3.1 - must contain checkbox and enable/disable working', () => {
    const {
      getByText, queryByText, getByRole,
    } = renderWithRouter(<App />);
    pokemons.forEach((index) => {
      for (let i = 0; i < index; i += 1) {
        const nextButton = getByText(/Próximo pokémon/i);
        fireEvent.click(nextButton);
      }
      const detailsButton = queryByText(/More details/i);
      fireEvent.click(detailsButton);
      const favButton = getByRole('checkbox');
      expect(favButton).toBeInTheDocument();
      expect(favButton.checked).toBeFalsy();
      fireEvent.click(favButton);
      expect(favButton.checked).toBeTruthy();
      fireEvent.click(favButton);
      expect(favButton.checked).toBeFalsy();
      expect((favButton.parentNode).tagName).toBe('LABEL');
      expect((favButton.parentNode).innerHTML).toMatch(/Pokémon favoritado/i);
      fireEvent.click(getByText('Home'));
    });
  });
});
