import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('should show the main page of Pokedex', () => {
  afterEach(cleanup);

  test('the title of the page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App/>
      </MemoryRouter>
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});
