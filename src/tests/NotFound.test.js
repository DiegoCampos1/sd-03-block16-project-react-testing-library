import React from 'react';
import { Router } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
// import { getByAltText } from '@testing-library/jest-dom/extend-expect';
import NotFound from '../components/NotFound';

afterEach(cleanup);

function renderWithRouter(
  ui,
  { route = '/asdfasdf', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}


test('renders a notfound Page`', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const N404 = getByText('Page requested not found');
  expect(N404).toBeInTheDocument();
});

test('check if renders image', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const pikachuCrying = getByAltText('Pikachu crying because the page requested was not found');
  expect(pikachuCrying).toBeInTheDocument();
  const img = pikachuCrying.src;
  expect(img).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
