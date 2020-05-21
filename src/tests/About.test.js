import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, getNodeText } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

test('About needs contains a header `About Pokédex`', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');
  const header = document.getElementsByTagName('h2');
  const aboutText = getNodeText(header[0]);
  expect(header.length).toBe(1);
  expect(aboutText).toBe('About Pokédex');
});

test('About needs contains two paragraphs', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');
  const paragraph = document.getElementsByTagName('p');
  expect(paragraph.length).toBe(2);
});

test('Testing image address of image on About Page', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  history.push('/about');
  const image = getByRole('img');
  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
