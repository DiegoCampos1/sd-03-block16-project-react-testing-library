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

describe('links in the top', () => {
  test('in the Home page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App/>
      </MemoryRouter>
    );
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('in the details page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/pokemons/25'] /* Pikachu details*/}>
        <App/>
      </MemoryRouter>
    );
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('in the favorites page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/favorites']}>
        <App/>
      </MemoryRouter>
    );
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('in the about page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <App/>
      </MemoryRouter>
    );
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});
