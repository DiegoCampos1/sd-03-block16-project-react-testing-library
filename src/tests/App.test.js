import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText, getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
  const links = getAllByRole('link');
  expect(links[0]).toBeInTheDocument();
  expect(links[0]).toHaveAttribute('href', '/');
  expect(links[0]).toHaveTextContent('Home');

  expect(links[1]).toBeInTheDocument();
  expect(links[1]).toHaveAttribute('href', '/about');
  expect(links[1]).toHaveTextContent('About');

  expect(links[2]).toBeInTheDocument();
  expect(links[2]).toHaveAttribute('href', '/favorites');
  expect(links[2]).toHaveTextContent('Favorite Pokémons');
});
