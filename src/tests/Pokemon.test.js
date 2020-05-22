import React from 'react';
import {
  cleanup, fireEvent,
} from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';
import pokemons from '../mockPokemons';

afterEach(cleanup);

describe('Test 1 - pokedex must display name, type, weight and image', () => {
  it("1.1 - Average weight must has the form 'Average weight: <value> <measurementUnit>'", () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    const nextButton = getByText(/próximo pokémon/i);
    pokemons.forEach(({ name, type, averageWeight: { value, measurementUnit } }) => {
      expect(getByText(name)).toBeInTheDocument();
      expect(getAllByText(type)[0]).toBeInTheDocument();
      expect(getByText(`Average weight:${value}${measurementUnit}`)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });

  it('1.2 - Image must have src with URL and alt with pokemon name', () => {
    const { getByAltText, getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/próximo pokémon/i);
    pokemons.forEach(({ name, image }) => {
      const pokemonImage = getByAltText(`${name} sprite`);
      expect(pokemonImage).toBeTruthy();
      expect(pokemonImage.src).toBe(image);
      fireEvent.click(nextButton);
    });
  });
});

describe('Test 2 - pokémon must contain link to show details', () => {
  it("2.1 - link must be direct to '/pokemon/<id>'", () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/próximo pokémon/i);
    pokemons.forEach(({ id }) => {
      const detailsButton = getByText(/more details/i);
      expect(detailsButton).toBeInTheDocument();
      expect(detailsButton.href).toMatch(`http://localhost/pokemons/${id}`);
      fireEvent.click(nextButton);
    });
  });
});

describe('Test 10 - click more details should redirect page', () => {
  it('10.1 - should redirect and change to URL /pokemon/id ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const detailsButton = getByText(/more details/i);
    expect(getByText(detailsButton.innerHTML)).toBeInTheDocument();
    let URL = history.location.pathname;
    const { id } = pokemons[0];
    expect(URL).toMatch('/');
    fireEvent.click(detailsButton);
    URL = history.location.pathname;
    expect(URL).toBe(`/pokemons/${id}`);
  });
});

describe('Test 11 - pokemon details should display name, type, weight and image', () => {
  it('11.1 - pokemon details should display average weight: value measurement unit and 11.2 - img must has src with URL image', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    pokemons.forEach(({
      name, type, averageWeight: { value, measurementUnit }, image,
    }, index) => {
      for (let i = 0; i < index; i += 1) {
        const nextButton = getByText(/próximo pokémon/i);
        fireEvent.click(nextButton);
      }
      fireEvent.click(getByText(/details/i));
      expect(getByText(name)).toBeInTheDocument();
      expect(getByText(type)).toBeInTheDocument();
      expect(getByText(`Average weight:${value}${measurementUnit}`)).toBeInTheDocument();
      expect(getByAltText(`${name} sprite`)).toBeTruthy();
      expect(getByAltText(`${name} sprite`)).toHaveAttribute('src', image);
      fireEvent.click(getByText(/home/i));
    });
  });
});

describe('Test 16 - favorited pokemons must display star icon', () => {
  it('16.1 - icon must be image with src=/star-icon.svg', () => {
    const {
      getByText, getByAltText, queryByText, getByRole,
    } = renderWithRouter(<App />);
    pokemons.forEach(({
      name,
    }, index) => {
      for (let i = 0; i < index; i += 1) {
        const nextButton = getByText(/Próximo pokémon/i);
        fireEvent.click(nextButton);
      }
      const detailsButton = queryByText(/More details/i);
      fireEvent.click(detailsButton);
      fireEvent.click(getByRole('checkbox'));
      const favStar = getByAltText(`${name} is marked as favorite`);
      expect(favStar).toHaveAttribute('src', '/star-icon.svg');
      fireEvent.click(getByRole('checkbox'));
      expect(favStar).not.toBeInTheDocument();
      fireEvent.click(getByText('Home'));
    });
  });
});
