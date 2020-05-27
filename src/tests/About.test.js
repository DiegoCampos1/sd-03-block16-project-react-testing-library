import React from 'react';
import { Router } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';
import About from '../components/About';

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


test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<About />);
  const about = getByText(/About Pokédex/i);
  expect(about).toBeInTheDocument();
});
