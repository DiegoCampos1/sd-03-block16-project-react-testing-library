import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
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

test('should redirect to the right route', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeLink = getByText('Home');
  fireEvent.click(homeLink);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();

  const aboutLink = getByText('About');
  fireEvent.click(aboutLink);
  expect(getByText('About Pokédex')).toBeInTheDocument();

  const favLink = getByText('Favorite Pokémons');
  fireEvent.click(favLink);
  expect(getByText('Favorite pokémons')).toBeInTheDocument();
});

test('not Found', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/random']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Page requested not found')).toBeInTheDocument();
});
