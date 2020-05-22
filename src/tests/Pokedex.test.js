import React from 'react';
import { Router } from 'react-router-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import pokemons from '../mockPokemons';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

afterEach(cleanup);

const allTypes = pokemons.map(({ type }) => type);
const pokemonTypes = allTypes.filter((item, index, array) => array.indexOf(item) === index);
const pokemonNames = pokemons.map(({ name }) => name);

describe('Test 1 - next button shows next pokemon', () => {
  it("1.1 - button must contain 'proximo pokemon'", () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Próximo pokémon/i)).toBeInTheDocument();
  });
  it('1.2 - multiple clicks must show next pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/Próximo pokémon/i);
    pokemonNames.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });
  it('1.3 - after last pokémon must return to the first one', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/próximo pokémon/i);
    pokemonNames.forEach(() => fireEvent.click(nextButton));
    expect(getByText(pokemonNames[0])).toBeInTheDocument();
  });
});

describe('test 2 - only one pokemon each page', () => {
  it('2.0 - shows only one pokemon at once', () => {
    const { getAllByText, getByText } = renderWithRouter(<App />);
    expect(getAllByText(/more details/i).length).toBe(1);
    expect(getAllByText(/more details/i)[1]).toBeUndefined();
    expect(getByText(/encountered pokémons/i)).toBeInTheDocument();
  });
});

describe('Test 3 - pokédex must contain filter buttons', () => {
  it('3.1 - button type must select only pokemons of that type', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const nextButton = getByText(/Próximo pokémon/i);
    pokemonTypes.forEach((type, index) => {
      const typeButton = getAllByTestId('pokemon-type-button')[index];
      fireEvent.click(typeButton);
      const clickedPokemon = pokemons.filter((e) => e.type === type);
      clickedPokemon.forEach((pokemonType) => {
        expect(getByText(pokemonType.name)).toBeInTheDocument();
        if (clickedPokemon.length > 1) fireEvent.click(nextButton);
      });
    });
  });
  it("3.2 - button label must be igual 'type'", () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    pokemonTypes.forEach((type, index) => {
      const typeButton = getAllByTestId('pokemon-type-button')[index];
      expect(typeButton).toBeInTheDocument();
      expect(typeButton).toHaveTextContent(type);
      expect(typeButton).toHaveAttribute('type', 'button');
    });
  });
});

describe('Test 4 - pokedex must contain button to reset filter', () => {
  it("4.1 - button label must be 'all'", () => {
    const { getByText } = renderWithRouter(<App />);
    const allButton = getByText(/all/i);
    expect(allButton).toBeInTheDocument();
    expect(allButton).toHaveTextContent(/all/i);
    expect(allButton).toHaveAttribute('type', 'button');
  });
  it('4.2 - click must select all pokemons', () => {
    const { getByText } = renderWithRouter(<App />);
    const allButton = getByText(/all/i);
    const nextButton = getByText(/próximo pokémon/i);
    fireEvent.click(allButton);
    pokemonNames.forEach((pokemonName) => {
      expect(getByText(pokemonName)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
    expect(getByText(pokemonNames[0])).toBeInTheDocument();
  });
  it('4.3 - first page must load filter all', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/próximo pokémon/i);
    pokemonNames.forEach((pokemonName) => {
      expect(getByText(pokemonName)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
    expect(getByText(pokemonNames[0])).toBeInTheDocument();
  });
});

describe('test 5 - pokedex must render a button filter to each type of pokemon', () => {
  it('5.1 - checking if all types were rendered', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    pokemonTypes.forEach((type) => {
      const typeButton = getAllByText(type)[1] || getByText(type);
      expect(typeButton).toBeInTheDocument();
    });
    expect(getByText(/all/i)).toBeInTheDocument();
  });
});

describe('test 6 - next button must be disabled if theres only one pokemon', () => {
  test('6.1 - disable next button', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    const nextButton = getByText(/próximo pokémon/i);
    const repeatedPokemons = allTypes.filter((item, index, array) => array.indexOf(item) !== index);
    const uniquePokemons = pokemonTypes.filter((pokemon) => !(repeatedPokemons).includes(pokemon));
    uniquePokemons.forEach((uniquePokemon) => {
      const uniqueButton = getAllByText(uniquePokemon)[1] || getByText(uniquePokemon);
      fireEvent.click(uniqueButton);
      expect(nextButton).toBeDisabled();
    });
  });
});
