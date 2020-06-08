import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import data from '../data';

afterEach(cleanup);

describe('Pokemon card tests', () => {
  test('Verify pokemon card informations', () => {
    const { container } = renderWithRouter(<App />);
    const pokemonDivCard = container.querySelectorAll('.pokemon');

    expect(pokemonDivCard[0]).toBeInTheDocument();
    expect(pokemonDivCard.length).toBe(1);
  });

  test('Verify the name of the pokemon', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const nextButton = getByText('Próximo pokémon');

    data.forEach(({ name }) => {
      expect(getByTestId('pokemon-name').textContent).toBe(name);
      fireEvent.click(nextButton);
    });
  });

  test('Verify the type of the pokemon', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const nextButton = getByText('Próximo pokémon');

    data.forEach(({ type }) => {
      expect(getByTestId('pokemonType').textContent).toBe(type);
      fireEvent.click(nextButton);
    });
  });

  test('Verify the weight of the pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText('Próximo pokémon');

    data.forEach(({ averageWeight: { value, measurementUnit } }) => {
      expect(getByText(`Average weight:${value}${measurementUnit}`)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });

  test('Verify the image source and the alt text', () => {
    const { container, getByText } = renderWithRouter(<App />);
    const nextButton = getByText('Próximo pokémon');
    const img = container.querySelector('IMG');

    data.forEach(({ name, image }) => {
      expect(img.src).toBe(image);
      expect(img.alt).toBe(`${name} sprite`);
      fireEvent.click(nextButton);
    });
  });

  test('Verify the href on the more details link', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText('Próximo pokémon');
    const detailsButton = getByText('More details');

    data.forEach(({ id }) => {
      expect(detailsButton.href).toBe(`http://localhost/pokemons/${id}`);
      fireEvent.click(nextButton);
    });
  });

  test('Verify the path from the pokemon detail', () => {
    const { getByText, history } = renderWithRouter(<App pokemon={data[0]} />);
    const detailsButton = getByText('More details');

    fireEvent.click(detailsButton);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Should contain favorite icon with correct alt', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={data[0]} isFavorite />,
    );
    const favIcon = getByAltText('Pikachu is marked as favorite');
    expect(favIcon).toBeInTheDocument();
    expect(favIcon.src).toMatch(/\/star-icon.svg/);
  });
});
