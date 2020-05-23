import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from '../helper';
import pokemons from '../data';

const mockedPokemons = [{ ...pokemons[0] }, { ...pokemons[2] }];
const mockedFavoriteID = { 25: true, 10: false };
const match = { params: { id: '25' } };

describe('PokemonDetails.js component tests', () => {
  afterEach(cleanup);

  test('component renders only one pokemon detailed information', () => {
    const { container } = render(
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={mockedFavoriteID}
        pokemons={mockedPokemons}
        onUpdateFavoritePokemons={() => undefined}
      />,
    );

    const pokemonContainer = container.querySelectorAll('.pokemon-details');
    expect(pokemonContainer.length).toBe(1);
  });

  test('render a text which contains `<name> Details`, where name is the name of pokémon', () => {
    const { getByText } = render(
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={mockedFavoriteID}
        pokemons={[mockedPokemons[0]]}
        onUpdateFavoritePokemons={() => undefined}
      />,
    );

    const pokemonName = getByText(`${mockedPokemons[0].name} Details`);

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.textContent).toBe(`${mockedPokemons[0].name} Details`);
    expect(pokemonName.textContent).not.toBe('\'\' Details');
    expect(pokemonName.tagName).toBe('H2');
  });

  test('do not render details link', () => {
    const { queryByRole } = render(
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={mockedFavoriteID}
        pokemons={mockedPokemons}
        onUpdateFavoritePokemons={() => undefined}
      />,
    );

    const detailsLink = queryByRole('link');

    expect(detailsLink).not.toBeInTheDocument();
  });

  test('The details section have a heading, with a h2 tag and the text `Summary`', () => {
    const { getByText } = render(
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={mockedFavoriteID}
        pokemons={mockedPokemons}
        onUpdateFavoritePokemons={() => undefined}
      />,
    );

    const summaryHeading = getByText('Summary');

    expect(summaryHeading).toBeInTheDocument();
    expect(summaryHeading.tagName).toBe('H2');
  });

  test('Details sections have a paragraph, with tag <p>, which contains pokémon informations', () => {
    const { getByText } = render(
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={mockedFavoriteID}
        pokemons={[mockedPokemons[0]]}
        onUpdateFavoritePokemons={() => undefined}
      />,
    );
    const summaryText = getByText(`${mockedPokemons[0].summary}`);
    expect(summaryText).toBeInTheDocument();
    expect(summaryText.textContent).toBe(`${mockedPokemons[0].summary}`);
  });

  test('renders location section with correct info', () => {
    const { getByText, getAllByAltText } = render(
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={mockedFavoriteID}
        pokemons={[mockedPokemons[0]]}
        onUpdateFavoritePokemons={() => undefined}
      />,
    );

    const locationHeading = getByText(
      `Game Locations of ${mockedPokemons[0].name}`,
    );
    expect(locationHeading).toBeInTheDocument();
    expect(locationHeading.textContent).toBe(
      `Game Locations of ${mockedPokemons[0].name}`,
    );
    expect(locationHeading.tagName).toBe('H2');
    const locationMaps = getAllByAltText(`${mockedPokemons[0].name} location`);
    expect(locationMaps.length).toBe(2);
    expect(locationMaps[0]).toHaveAttribute(
      'src',
      `${mockedPokemons[0].foundAt[0].map}`,
    );
    expect(locationMaps[1]).toHaveAttribute(
      'src',
      `${mockedPokemons[0].foundAt[1].map}`,
    );
  });

  test('Detail page renders favorite checkbox', () => {
    const { getByLabelText } = render(
      <PokemonDetails
        match={match}
        isPokemonFavoriteById={mockedFavoriteID}
        pokemons={[mockedPokemons[0]]}
        onUpdateFavoritePokemons={() => undefined}
      />,
    );
    const favoriteCheckBox = getByLabelText(/pokémon favoritado/i);

    expect(favoriteCheckBox).toBeInTheDocument();
  });

  test('PokemonDetails page permits favorite the pokémon', () => {
    const { getByLabelText, getByText } = renderWithRouter(<App />);

    const detailsButton = getByText(/more details/i);
    fireEvent.click(detailsButton);

    const favoriteCheckBox = getByLabelText(/pokémon favoritado/i);
    expect(favoriteCheckBox).toBeInTheDocument();
    fireEvent.click(favoriteCheckBox);
    expect(favoriteCheckBox).toBeChecked();

    fireEvent.click(favoriteCheckBox);
    expect(favoriteCheckBox).not.toBeChecked();
  });
});
