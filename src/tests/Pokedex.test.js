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

test('Renders only one Pokemon at time', () => {
  const { queryAllByTestId } = renderWithRouter(<App />);
  expect(queryAllByTestId('pokemon-name')).toHaveLength(1);
});

test('Renders only one Pokemon at time', () => {
  const { getByText } = renderWithRouter(<App />);
  const buttonAll = getByText('All');
  expect(buttonAll).toBeInTheDocument();
});
