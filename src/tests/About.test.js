import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import About from '../components/About';

afterEach(cleanup);

test('Renders information about Pokédex', () => {
  const { getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  expect(getByText(/About Pokédex/i)).toBeInTheDocument();
});

test('Header must be h2 tag', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
});

test('Check if page has 2 p tags', () => {
  const { container } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  expect(container.querySelectorAll('p').length).toBe(2);
});

test('Check source of image', () => {
  const { getByAltText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  const source = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(getByAltText('Pokédex')).toHaveAttribute('src', source);
});
