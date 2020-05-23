import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

test('testing wether page shows npokemon name', () => {
  const { getByText, getAllByAltText, getByAltText, queryByText } = renderWithRouter(<App />);
  const btn = getByText('More details');
  fireEvent.click(btn);
  const name = getByText('Pikachu Details');
  expect(name).toBeInTheDocument();
  const details = queryByText(/more details/i);
  expect(details).toBeNull();
  const heading = getByText('Summary');
  expect(heading).toBeInTheDocument();
  expect(heading.tagName).toBe('H2');
  const phrase = getByText(/this intelligent/i);
  expect(phrase).toBeInTheDocument();
  const location = getByText(/Game Locations/);
  expect(location).toBeInTheDocument();
  expect(location.textContent).toBe('Game Locations of Pikachu');
  const img = getAllByAltText('Pikachu location');
  expect(img.length).toBeGreaterThan(0);
  expect(img[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(img[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  const subtitle = getByText(/Kanto Viridian/);
  expect(subtitle).toBeInTheDocument();
  const subtitle2 = getByText(/Kanto Power/);
  expect(subtitle2).toBeInTheDocument();
  const favorite = getByText(/favoritado/);
  expect(favorite).toBeInTheDocument();
  fireEvent.click(favorite, { target: { checked: true } });
  const star = getByAltText(/marked as/);
  expect(star).toBeInTheDocument();
});
