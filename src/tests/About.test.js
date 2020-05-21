import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import { About } from '../components';

test('renders a reading with the text `About Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
      <About />
    </MemoryRouter>,
  );
  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('look for the image', () => {
  const { getByAltText } = render(
    <MemoryRouter>
      <App />
      <About />
    </MemoryRouter>,
  );
  const img = getByAltText('Pokédex');
  expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
