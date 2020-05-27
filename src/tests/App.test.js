import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

afterEach(cleanup);

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

test('full app rendering/navigating', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/home/i);
  expect(home).toBeInTheDocument();
  const about = getByText(/about/i);
  expect(about).toBeInTheDocument();
  const favorite = getByText(/Favorite Pokémons/i);
  expect(favorite).toBeInTheDocument();
});
