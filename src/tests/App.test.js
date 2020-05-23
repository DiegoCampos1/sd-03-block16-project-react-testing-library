import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
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

  const homeElement = getByText(/Home/i);
  expect(homeElement.getAttribute('href')).toBe('/');

  const aboutElement = getByText(/About/i);
  expect(aboutElement.getAttribute('href')).toBe('/about');

  const favElement = getByText(/Favorite Pokémons/i);
  expect(favElement.getAttribute('href')).toBe('/favorites');
});

test('Click in Home', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const homeElement = getByText(/Home/i);
  fireEvent.click(homeElement);
  const pathname = history.location.pathname;
  expect(pathname).toBe('/');
});

test('Click in About', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const aboutElement = getByText(/About/i);
  fireEvent.click(aboutElement);
  const pathname = history.location.pathname;
  expect(pathname).toBe('/about');
});

test('Click in Favorites', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const favElement = getByText(/Favorite Pokémons/i);
  fireEvent.click(favElement);
  const pathname = history.location.pathname;
  expect(pathname).toBe('/favorites');
});

test('Unknown page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pagina/que-nao-existe/');
  const noMatch = getByText(/Page requested not found/i);
  expect(noMatch).toBeInTheDocument();
});

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

