import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
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
    const { getByText } = render((
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    ));
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('exist on the top links to', () => {
  test('Home page', () => {
    const { getByText } = render((
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    ));
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('details page', () => {
    const { getByText } = render((
      <MemoryRouter initialEntries={['/pokemons/25'] /* Pikachu details*/}>
        <App />
      </MemoryRouter>
    ));
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('favorites page', () => {
    const { getByText } = render((
      <MemoryRouter initialEntries={['/favorites']}>
        <App />
      </MemoryRouter>
    ));
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('about page', () => {
    const { getByText } = render((
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    ));
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});

describe('clicking on link', () => {
  const HomeText = 'Encountered pokémons';
  const AboutText = 'About Pokédex';
  const FavoriteText = 'Favorite pokémons';
  test('Home', () => {
    const { getByText } = render((
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    ));
    expect(getByText(HomeText)).toBeInTheDocument();

    fireEvent.click(getByText('Home'));

    expect(getByText(HomeText)).toBeInTheDocument();
  });

  test('About', () => {
    const { getByText, queryByText } = render((
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    ));
    expect(getByText(HomeText)).toBeInTheDocument();

    fireEvent.click(getByText('About'));

    expect(queryByText(HomeText)).not.toBeInTheDocument();
    expect(getByText(AboutText)).toBeInTheDocument();
  });

  test('Favorite Pokémons', () => {
    const { getByText, queryByText } = render((
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    ));
    expect(getByText(HomeText)).toBeInTheDocument();

    fireEvent.click(getByText('Favorite Pokémons'));

    expect(queryByText(HomeText)).not.toBeInTheDocument();
    expect(getByText(FavoriteText)).toBeInTheDocument();
  });
});
