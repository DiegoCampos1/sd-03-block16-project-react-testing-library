import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';


test('Page About container information', () => {
  const { getByText } = renderWithRouter(<About />);
  const getInformation = getByText(/About Pokédex/i);
  expect(getInformation).toBeInTheDocument();
});

test('Page container h2', () => {
  const { findByTitle } = renderWithRouter(<About />);
  const getTitleH2 = findByTitle(/About Pokédex/i);
  expect(getTitleH2).not.toBeNull();
});

// test('Page Container 1 paragraphe', () => {
//   const { getByText } = renderWithRouter(<About />);
//   const acessFirtText = getByText(
//  'This application simulates a Pokédex, a digital encliclopedia containing all Pokémons');
//   expect(acessFirtText).toBeInTheDocument();
// });

// test('Page Container 2 paragraphe', () => {
//   const { getByText } = renderWithRouter(<About />);
//   const acessSecondText = getByText(
//  'One can filter Pokémons by type, and see more details for each one of them');
//   expect(acessSecondText).toBeInTheDocument();
// });

test('Page container 2 paragraphs', () => {
  render(<About />);
  const paragraphs = document.querySelectorAll('p');
  expect(paragraphs.length).toBe(2);
});

test('Container Img', () => {
  const { getByAltText } = renderWithRouter(<About />);
  const image = getByAltText('Pokédex');
  expect(image).toBeInTheDocument();
  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
