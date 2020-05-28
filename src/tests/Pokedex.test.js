import React from 'react';
import { Router } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
// import { getByAltText } from '@testing-library/jest-dom/extend-expect';
import App from '../App';

afterEach(cleanup);

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}


test('Renders Pokedex Page', () => {
  const { getByText } = renderWithRouter(<App />);
  const nextButton = getByText('Próximo pokémon');
  expect(nextButton).toBeInTheDocument();
});

test('Tests if exists a element with text `All`', () => {
  const { getByText } = renderWithRouter(<App />);
  const buttonAll = getByText('All');
  expect(buttonAll).toBeInTheDocument();
});

test('Tests if exists a element with id `pokemon-type-button`', () => {
  const { queryAllByTestId } = renderWithRouter(<App />);
  const buttonAll = queryAllByTestId('pokemon-type-button')[0];
  expect(buttonAll).toBeInTheDocument();
});

test('Tests if exists a element with text `Encountered pokémons`', () => {
  const { getByText } = renderWithRouter(<App />);
  const buttonAll = getByText('Encountered pokémons');
  expect(buttonAll).toBeInTheDocument();
});
