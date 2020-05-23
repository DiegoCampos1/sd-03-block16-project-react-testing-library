import React from 'react';
import { Router, MemoryRouter } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

afterEach(cleanup);

const renderRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>), history,
  };
};

describe('file App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('home exists > to path /', () => {
    const { getByText, history } = renderRouter(<App />);
    const homeText = getByText(/home/i); // Unterminated regular expression
    expect(homeText).toBeInTheDocument();
    fireEvent.click(homeText);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('about exists > to path /about', () => {
    const { getByText, history } = renderRouter(<App />);
    const aboutText = getByText(/About/i);
    expect(aboutText).toBeInTheDocument();
    fireEvent.click(aboutText);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('Favorite Pokémons exists > to path /favorites', () => {
    const { getByText, history } = renderRouter(<App />);
    const favoriteLinkText = getByText(/Favorite Pokémons/i);
    expect(favoriteLinkText).toBeInTheDocument();
    fireEvent.click(favoriteLinkText);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
});
