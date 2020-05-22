import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

test('Botão próximo funciona e volta primeiro pokemon após lista acabar', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const nextButton = getByText(/Próximo/i);
  expect(nextButton).toBeInTheDocument();
  const firstIdName = getByTestId('pokemon-name');
  pokemons.forEach(({ name }) => {
    const actualPokemonName = getByTestId('pokemon-name').innerHTML;
    expect(actualPokemonName).toBe(name);
    fireEvent.click(nextButton);
    const pokemonNext = getByTestId('pokemon-name').innerHTML;
    expect(pokemonNext).not.toBe(name);
  });
  expect(firstIdName.innerHTML).toBe(getByTestId('pokemon-name').innerHTML);
});

test('All button', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const fireButton = getByText(/fire/i);
  fireEvent.click(fireButton);
  const allButton = getByText(/All/i);
  fireEvent.click(allButton);
  expect(getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
});

test('should type buttons work', () => {
  const { getByText, getAllByTestId, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeMessage = getByText('Encountered pokémons');
  expect(homeMessage).toBeInTheDocument();
  const typeButtons = getAllByTestId('pokemon-type-button');
  const buttonArrOfTypes = [];
  typeButtons.forEach((button) => {
    const actualPokemonType = getByTestId('pokemonType');
    fireEvent.click(button);
    buttonArrOfTypes.push(button.innerHTML);
    expect(button.innerHTML).toBe(actualPokemonType.innerHTML);
  });
  const dataArrOfTypes = [];
  pokemons.forEach(({ type }) => {
    if (!dataArrOfTypes.includes(type)) {
      dataArrOfTypes.push(type);
    }
    return dataArrOfTypes;
  });
  expect(buttonArrOfTypes).toMatchObject(dataArrOfTypes);
});
