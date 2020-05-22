import React from 'react';
import {
  cleanup, fireEvent,
} from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';
import pokemons from '../mockPokemons';


afterEach(cleanup);

const allTypes = pokemons.map(({ type }) => type);
const pokemonTypes = allTypes.filter((item, index, array) => array.indexOf(item) === index);
const pokemonNames = pokemons.map(({ name }) => name);

describe('test 2 - only one pokemon each page', () => {
  it('2.0 - shows only one pokemon at once', () => {
    const { getAllByText } = renderWithRouter(<App />);
    expect(getAllByText(/more details/i).length).toBe(1);
    expect(getAllByText(/more details/i)[1]).toBeUndefined();
  });
});

describe('Test 3 - next button shows next pokemon', () => {
  it("3.1 - button must contain 'proximo pokemon'", () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Próximo pokémon/i)).toBeInTheDocument();
  });
  it('3.2 - multiple clicks must show next pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/próximo pokémon/i);
    pokemonNames.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });
  it('3.3 - after last pokémon must return to the first one', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/próximo pokémon/i);
    pokemonNames.forEach(() => fireEvent.click(nextButton));
    expect(getByText(pokemonNames[0])).toBeInTheDocument();
  });
});

describe('Test 4 - pokédex must contain filter buttons', () => {
  it('4.1 - button type must select only pokemons of that type', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    const nextButton = getByText(/Próximo pokémon/i);
    pokemonTypes.forEach((type) => {
      const typeButton = getAllByText(type)[1] || getByText(type);
      fireEvent.click(typeButton);
      const clickedPokemon = pokemons.filter((e) => e.type === type);
      clickedPokemon.forEach((pokemonType) => {
        expect(getByText(pokemonType.name)).toBeInTheDocument();
        if (clickedPokemon.length > 1) fireEvent.click(nextButton);
      });
    });
  });
  it("4.2 - button label must be igual 'type'", () => {
    const { getAllByText, getByText } = renderWithRouter(<App />);
    pokemonTypes.forEach((type) => {
      const typeButton = getAllByText(type)[1] || getByText(type);
      expect(typeButton).toBeInTheDocument();
      expect(typeButton).toHaveTextContent(type);
      expect(typeButton).toHaveAttribute('type', 'button');
    });
  });
});

describe('Test 5 - pokedex must contain button to reset filter', () => {
  it("5.1 - button label must be 'all'", () => {
    const { getByText } = renderWithRouter(<App />);
    const allButton = getByText(/all/i);
    expect(allButton).toBeInTheDocument();
    expect(allButton).toHaveTextContent(/all/i);
    expect(allButton).toHaveAttribute('type', 'button');
  });
  it('5.2 - click must select all pokemons', () => {
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
  it('5.3 - first page must load filter all', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/próximo pokémon/i);
    pokemonNames.forEach((pokemonName) => {
      expect(getByText(pokemonName)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
    expect(getByText(pokemonNames[0])).toBeInTheDocument();
  });
});

describe('test 6 - pokedex must render a button filter to each type of pokemon', () => {
  it('6.1 - checking if all types were rendered', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    pokemonTypes.forEach((type) => {
      const typeButton = getAllByText(type)[1] || getByText(type);
      expect(typeButton).toBeInTheDocument();
    });
    expect(getByText(/all/i)).toBeInTheDocument();
  });
});

describe('test 7 - next button must be disabled if theres only one pokemon', () => {
  test('7.1 - disable next button', () => {
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
