import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

describe('tests PokemonDetails.js', () => {
  test('should have details from just the select pokemon', () => {
    const { getByText  } = renderWithRouter(<App />);

    data.forEach(({ name }, index) => {
      for (let i = 0; i < index; i += 1) {
        const nextPokemon = getByText('Próximo pokémon');
        fireEvent.click(nextPokemon);
      }

      const moreDetails = getByText('More details');

      fireEvent.click(moreDetails);

      const heading = getByText(`${name} Details`);

      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');

      fireEvent.click(getByText('Home'));
    });
  });

  test('link more details dont have to exist in details page', () => {
    const { getByText  } = renderWithRouter(<App />);

    data.forEach((_, index) => {
      for (let i = 0; i < index; i += 1) {
        const nextPokemon = getByText('Próximo pokémon');
        fireEvent.click(nextPokemon);
      }

      const moreDetails = getByText('More details');

      fireEvent.click(moreDetails);

      expect(moreDetails).not.toBeInTheDocument();

      fireEvent.click(getByText('Home'));
    });
  });

  test('details page should contain summary', () => {
    const { getByText  } = renderWithRouter(<App />);

    data.forEach(({ summary }, index) => {
      for (let i = 0; i < index; i += 1) {
        const nextPokemon = getByText('Próximo pokémon');
        fireEvent.click(nextPokemon);
      }

      const moreDetails = getByText('More details');

      fireEvent.click(moreDetails);

      const heading = getByText('Summary');

      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
      expect(getByText(summary)).toBeInTheDocument();
      expect(getByText(summary).tagName).toBe('P');

      fireEvent.click(getByText('Home'));
    });
  });

  test('details page should contain pokemon locations', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);

    data.forEach(({ name, foundAt }, index) => {
      for (let i = 0; i < index; i += 1) {
        const nextPokemon = getByText('Próximo pokémon');
        fireEvent.click(nextPokemon);
      }

      const moreDetails = getByText('More details');

      fireEvent.click(moreDetails);

      const heading = getByText(`Game Locations of ${name}`);

      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');

      foundAt.forEach(({ location, map }, index) => {
        const img = getAllByAltText(`${name} location`);
        expect(getByText(location)).toBeInTheDocument();
        expect(img[index].src).toBe(map);
        expect(img[index].alt).toBe(`${name} location`);
      })

      fireEvent.click(getByText('Home'));
    });
  });

  test('details page should contain a checkbox to favorite a pokemon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    data.forEach((_, index) => {
      for (let i = 0; i < index; i += 1) {
        const nextPokemon = getByText('Próximo pokémon');
        fireEvent.click(nextPokemon);
      }

      const moreDetails = getByText('More details');

      fireEvent.click(moreDetails);

      const checkbox = getByRole('checkbox');

      expect(checkbox).toBeInTheDocument();
      expect(checkbox.checked).toBeFalsy();

      fireEvent.click(checkbox);

      expect(checkbox.checked).toBeTruthy();
      expect(checkbox.parentNode.tagName).toBe('LABEL');
      expect(checkbox.parentNode.innerHTML).toMatch('Pokémon favoritado?');

      fireEvent.click(getByText('Home'));
    });
  });
});