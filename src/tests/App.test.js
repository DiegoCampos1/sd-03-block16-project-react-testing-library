import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return ({
    ...originalModule,
    BrowserRouter: ({ children }) => (<div>{children}</div>),
  });
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

afterEach(cleanup);

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  // const { getByText } = render(
  //   <MemoryRouter>
  //     <App />
  //   </MemoryRouter>,
  // );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('testing if links Home, About and Favorite Pokemons exists', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const homeLink = getByText(/Home/i);
  expect(homeLink).toBeInTheDocument();
  fireEvent.click(homeLink);
  expect(history.location.pathname).toBe('/');

  const aboutLink = getByText(/About/i);
  expect(aboutLink).toBeInTheDocument();
  fireEvent.click(aboutLink);
  expect(history.location.pathname).toBe('/about');
  const textAbout = getByText(/About Pokédex/i);
  expect(textAbout).toBeInTheDocument();

  const favPokemon = getByText(/Favorite/i);
  expect(favPokemon).toBeInTheDocument();
  fireEvent.click(favPokemon);
  expect(history.location.pathname).toBe('/favorites');
  const favText = getByText('Favorite pokémons');
  expect(favText).toBeInTheDocument();


});

test('testing a nonexistent page', () => {
  const { getByText } = renderWithRouter(<App />, { route: '/xablau' });
  const pageNotFound = getByText(/not found/i);
  expect(pageNotFound).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
