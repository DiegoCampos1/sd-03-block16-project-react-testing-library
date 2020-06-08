import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

describe('PokemonDetails page tests', () => {
  test('Verify if the page just shows one pokemon', () => {
    const { container } = renderWithRouter(<App pokemon={data[0]} />, { route: '/pokemons/25' });
    const pageContainer = container.querySelectorAll('.pokemon-details');

    expect(pageContainer.length).toBe(1);
  });

  test('Verify if the page just shows the details of the selected pokemon', () => {
    const { getByText } = renderWithRouter(<App pokemon={data[0]} />, { route: '/pokemons/25' });
    const heading = getByText('Pikachu Details');

    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('Verify if the page just shows the details of the selected pokemon', () => {
    const { queryByText } = renderWithRouter(<App pokemon={data[0]} />, { route: '/pokemons/25' });
    const detailsButton = queryByText('More Details');

    expect(detailsButton).toBeNull();
  });

  test('Verify if the page just has a Summary title text', () => {
    const { getByText } = renderWithRouter(<App pokemon={data[0]} />, { route: '/pokemons/25' });
    const headingSummary = getByText('Summary');

    expect(headingSummary).toBeInTheDocument();
    expect(headingSummary.tagName).toBe('H2');
  });

  test('Verify if the page has the summary paragraph of the pokemon', () => {
    const { getByText } = renderWithRouter(<App pokemon={data[0]} />, { route: '/pokemons/25' });
    const { summary } = data[0];

    expect(getByText(summary)).toBeInTheDocument();
    expect(getByText(summary).tagName).toBe('P');
  });

  test('Verify if the page has the location title', () => {
    const { getByText } = renderWithRouter(<App pokemon={data[0]} />, { route: '/pokemons/25' });

    expect(getByText('Game Locations of Pikachu')).toBeInTheDocument();
    expect(getByText('Game Locations of Pikachu').tagName).toBe('H2');
  });

  test('Verify if the page shows all the locations', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);

    data.forEach(({ name, foundAt }, index) => {
      for (let i = 0; i < index; i += 1) {
        const nestButton = getByText('Próximo pokémon');
        fireEvent.click(nestButton);
      }

      const moreDetails = getByText('More details');

      fireEvent.click(moreDetails);

      const heading = getByText(`Game Locations of ${name}`);

      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');

      foundAt.forEach(({ location, map }, indice) => {
        const img = getAllByAltText(`${name} location`);
        expect(getByText(location)).toBeInTheDocument();
        expect(img[indice].src).toBe(map);
        expect(img[indice].alt).toBe(`${name} location`);
      });
      fireEvent.click(getByText('Home'));
    });
  });

  test('Verify the image on the page', () => {
    const { container, getAllByAltText } = renderWithRouter(<App pokemon={data[0]} />, { route: '/pokemons/25' });
    const img = container.querySelectorAll('IMG');
    expect(img[0]).toBeInTheDocument();
    expect(img[1]).toBeInTheDocument();
    expect(getAllByAltText('Pikachu location')[0]).toBeInTheDocument();
  });

  test('Verify the checkbox element in the page', () => {
    const { getByRole } = renderWithRouter(<App pokemon={data[0]} />, { route: '/pokemons/25' });
    const checkbox = getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBeFalsy();

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBeTruthy();
    expect(checkbox.parentNode.tagName).toBe('LABEL');
    expect(checkbox.parentNode.innerHTML).toMatch('Pokémon favoritado?');
  });
});
