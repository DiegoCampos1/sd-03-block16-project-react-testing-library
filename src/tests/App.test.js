import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Fixed navigation links', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homeElement = getByText('Home');
  expect(homeElement.getAttribute("href")).toBe('/');

  const aboutElement = getByText('About');
  expect(aboutElement.getAttribute("href")).toBe('/about');

  const favElement = getByText('Favorite Pokémons');
  expect(favElement.getAttribute("href")).toBe('/favorites');
})

test('Click in Home', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homeElement = getByText('Home');
  fireEvent.click(homeElement);
  const pathname = history.location.pathname;
  expect(pathname).toBe(`/`);
})

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

