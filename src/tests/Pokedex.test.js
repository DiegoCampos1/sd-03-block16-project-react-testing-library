import React from 'react';
import renderWithRouter from './renderWithRouter';
import { Pokedex } from '../components';
import { fireEvent } from '@testing-library/react';


// test('Next Pokemon button', () => {
//   const { getByText } = renderWithRouter(<Pokedex />);
//   const textButton = getByText(/Próximo pokémon/i);
//   expect(textButton).toBeInTheDocument();
// });

test('Value Button Pokemon', () => {
  const { dataTestId } = renderWithRouter(<Pokedex />);
  const btn = dataTestId('next-pokemon');
  expect(btn).toBeInTheDocument();
  expect(btn.value).toBe('Próximo pokémon');
});

test('CLick successives in button', () => {
  const { getByRole } = renderWithRouter(<Pokedex />);
  const clickBtn = getByRole('button');
  fireEvent.click(clickBtn);
  expect(clickBtn).toBe('');

})



