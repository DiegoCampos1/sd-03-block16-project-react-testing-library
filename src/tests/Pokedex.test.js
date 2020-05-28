import React from 'react';
import { Router } from 'react-router-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
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
  const elementTest = queryAllByTestId('pokemon-type-button')[0];
  expect(elementTest).toBeInTheDocument();
});

test('Tests if exists a element with text `Encountered pokémons`', () => {
  const { getByText } = renderWithRouter(<App />);
  const h2Text = getByText('Encountered pokémons');
  expect(h2Text).toBeInTheDocument();
});

test('Tests the filters buttons`', () => {
  const { queryAllByTestId, queryByTestId, getByText } = renderWithRouter(<App />);
  const buttonFilter = queryAllByTestId('pokemon-type-button')[2];
  expect(buttonFilter).toBeInTheDocument();
  expect(buttonFilter).toHaveTextContent('Bug');
  const pokemon = queryByTestId('pokemon-name');
  fireEvent.click(buttonFilter);
  expect(pokemon).toHaveTextContent('Caterpie');
  const buttonAll = getByText('All');
  fireEvent.click(buttonAll);
  expect(buttonAll).toBeInTheDocument();
});
