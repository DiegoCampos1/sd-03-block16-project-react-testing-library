import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

test('Favorite pokemon page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const favoritePokemomRoute = getByText(/Favorite/i);
  fireEvent.click(favoritePokemomRoute);
  const emptyList = getByText('No favorite pokemon found');
  expect(emptyList).toBeInTheDocument();

  const homeRoute = getByText(/Home/i);
  fireEvent.click(homeRoute);

  const detailsRoute = getByText(/More details/i);
  fireEvent.click(detailsRoute);
  const markAsFavorite = getByText(/Pokémon favoritado?/i);
  fireEvent.click(markAsFavorite);
  fireEvent.click(favoritePokemomRoute);
  const pikachuMarked = getByText(/Pikachu/i);
  expect(pikachuMarked).toBeInTheDocument();

//   fireEvent.click(homeRoute);
//   const fireSelector = getByText(/Fire/i);
//   fireEvent.click(fireSelector);
//   fireEvent.click(detailsRoute);
//   fireEvent.click(markAsFavorite);
//   fireEvent.click(favoritePokemomRoute);
//   const charmanderMarked = getByText(/Charmanders/i);
//   expect(charmanderMarked).toBeInTheDocument();
});
