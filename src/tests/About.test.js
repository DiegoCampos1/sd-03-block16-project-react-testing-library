import React from 'react';
// import { Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import { cleanup } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './testService';


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

test('testing information about Pokedex', () => {
  const { getByText, getByRole, queryAllByRole } = renderWithRouter(<About />);

  const h2Exists = getByRole('heading');
  expect(h2Exists).toBeInTheDocument();
  expect(h2Exists.tagName).toBe('H2');

  const pokedexText = getByText('About Pokédex');
  expect(pokedexText).toBeInTheDocument();

  const allParagraphs = queryAllByRole('region');
  expect(allParagraphs.length).toBe(2);

  const imgPokedex = getByRole('img');
  expect(imgPokedex.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
