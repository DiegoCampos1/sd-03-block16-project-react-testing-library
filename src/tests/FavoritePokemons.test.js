import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
import App from '../App';

// function renderWithRouter(
//   ui,
//   { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
// ) {
//   return {
//     ...render(<Router history={history}>{ui}</Router>),
//     history,
//   };
// }

afterEach(cleanup);

test('testing favorite pokémons page', () => {
  // const { getByText } = renderWithRouter(<App />);

  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const favPokeLink = getByText(/Favorite/i);
  fireEvent.click(favPokeLink);
  const noFavFound = getByText('No favorite pokemon found');
  expect(noFavFound).toBeInTheDocument();

  const homeLink = getByText(/Home/i);
  fireEvent.click(homeLink);

  const detailsLink = getByText(/More details/i);
  fireEvent.click(detailsLink);
  const checkboxFav = getByText(/Pokémon favoritado?/i);
  fireEvent.click(checkboxFav);
  fireEvent.click(favPokeLink);
  const pokemonFav = getByText(/Pikachu/i);
  expect(pokemonFav).toBeInTheDocument();
});
