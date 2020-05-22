import React from 'react';
import { cleanup, fireEvent, 
} from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

import pokemons from '../mockPokemons';


afterEach(cleanup);

describe('Test 13 - pokemon details should display pokemon summary', () => {
  it('13.1 - pokemon details must contain heading h2 and 13.2 - text summary', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);
    pokemons.forEach(({
      name, type, averageWeight: { value, measurementUnit }, image, summary, foundAt,
    }, index) => {
      for (let i = 0; i < index; i += 1) {
        const nextButton = getByText(/Próximo pokémon/i);
        fireEvent.click(nextButton);
      }
      const detailsButton = queryByText(/More details/i);
      fireEvent.click(detailsButton);
      expect(getByText('Summary')).toBeInTheDocument();
      expect(getByText('Summary').tagName).toBe('H2');
      expect(getByText(summary)).toBeInTheDocument();
      expect(getByText(summary).tagName).toBe('P');
      fireEvent.click(getByText('Home'));
    });
  });
});
describe('Test 14 - pokemon details must display maps', () => {
  it('14.1 to 14.5 - must contain h2 with text <Game Locations of <pokemon>', () => {
    const { getByText, getAllByAltText, queryByText } = renderWithRouter(<App />);
    pokemons.forEach(({
      name, type, averageWeight: { value, measurementUnit }, image, summary, foundAt,
    }, index) => {
      for (let i = 0; i < index; i += 1) {
        const nextButton = getByText(/Próximo pokémon/i);
        fireEvent.click(nextButton);
      }
      const detailsButton = queryByText(/More details/i);
      fireEvent.click(detailsButton);
      // 14.1
      expect(getByText(`Game Locations of ${name}`)).toBeInTheDocument();
      expect(getByText(`Game Locations of ${name}`).tagName).toBe('H2');
      // 14.2
      expect(getAllByAltText(`${name} location`).length).toBe(foundAt.length);
      // 14.3, 14.4 e 14.5
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
describe('Test 15 - pokemon details must display fav button', () => {
  it('15.1 - must contain checkbox and enable/disable working', () => {
    const {
      getByText, queryByText, getByRole,
    } = renderWithRouter(<App />);
    pokemons.forEach(({
      name, type, averageWeight: { value, measurementUnit }, image, summary, foundAt,
    }, index) => {
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
