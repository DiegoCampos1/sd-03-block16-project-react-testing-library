import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';
import forFunction from '../components/forFunction';

describe('tests Pokemon.js', () => {
  test('should have one pokemon card in the page', () => {
    const { container, getByText } = renderWithRouter(<App />);

    const nextPokemon = getByText('Próximo pokémon');

    data.forEach(({ name }) => {
      const card = container.querySelectorAll('.pokemon');
      const pokemon = getByText(name);
      expect(card.length).toBe(1);
      expect(pokemon).toBeInTheDocument();
      fireEvent.click(nextPokemon);
    });
  });

  test('card should contain the pokemon type', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);

    const nextPokemon = getByText('Próximo pokémon');

    data.forEach(({ type }) => {
      expect(getAllByText(type)[1]).toBeInTheDocument();
      fireEvent.click(nextPokemon);
    });
  });

  test('card should contain the pokemon weight', () => {
    const { getByText } = renderWithRouter(<App />);

    const nextPokemon = getByText('Próximo pokémon');

    data.forEach(({ averageWeight: { value, measurementUnit } }) => {
      const averageWeight = getByText(
        `Average weight: ${value}${measurementUnit}`,
      );
      expect(averageWeight).toBeInTheDocument();
      fireEvent.click(nextPokemon);
    });
  });

  test('card should contain the pokemon image', () => {
    const { container, getByText } = renderWithRouter(<App />);

    const nextPokemon = getByText('Próximo pokémon');

    data.forEach(({ name, image }) => {
      const img = container.querySelector('IMG');
      expect(img.src).toBe(image);
      expect(img.alt).toBe(`${name} sprite`);
      fireEvent.click(nextPokemon);
    });
  });

  test('card should contain a link for more details', () => {
    const { getByText } = renderWithRouter(<App />);

    const nextPokemon = getByText('Próximo pokémon');
    const moreDetails = getByText('More details');

    data.forEach(({ id }) => {
      expect(moreDetails.href).toBe(`http://localhost/pokemons/${id}`);
      fireEvent.click(nextPokemon);
    });
  });

  test('a clink in more details should redirect for `/pokemons/id`', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const moreDetails = getByText('More details');
    const { id } = data[0];

    fireEvent.click(moreDetails);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('fav pokemons should have a star icon', () => {
    const {
      getByText,
      getByAltText,
    } = renderWithRouter(<App />);

    data.forEach(({ name }, index) => {
      forFunction(index, getByText);

      const moreDetails = getByText('More details');

      fireEvent.click(moreDetails);
      fireEvent.click(getByText('Pokémon favoritado?'));

      const favStar = getByAltText(`${name} is marked as favorite`);

      expect(favStar).toHaveAttribute('src', '/star-icon.svg');
      expect(favStar).toBeInTheDocument();

      fireEvent.click(getByText('Home'));
    });
  });
});
