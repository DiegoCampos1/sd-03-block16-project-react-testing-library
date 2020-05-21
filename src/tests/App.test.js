import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
    history,
  };
};

describe('App.js tests', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App/>);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('renders links navbar', () => {
    const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);

    const navBar = getByRole('navigation');
    const {links} = navBar;
    expect(navBar).toBeInTheDocument();
    expect(navBar.links.length).toBe(3);
  });
});
