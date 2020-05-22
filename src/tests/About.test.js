import React from 'react';
import { render, cleanup } from '@testing-library/react';
import About from '../components/About';

afterEach(cleanup);

test('testing wether about pages render info', () => {
  const { getByText } = render(<About />);
  const text = getByText('About Pokédex');
  expect(text).toBeInTheDocument();
});

test('testing wether about pages render h2', () => {
  const { getByRole } = render(<About />);
  const text = getByRole('heading');
  expect(text.tagName).toBe('H2');
  expect(text.textContent).toBe('About Pokédex');
  const img = getByRole('img');
  expect(img).toBeInTheDocument();
  expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
