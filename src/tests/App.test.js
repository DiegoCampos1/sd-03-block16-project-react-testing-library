import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helper';

describe('App.js tests', () => {
  afterEach(cleanup);

  test('renders Pokédex homepage on `/` URL', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('renders navigation links', () => {
    const { queryAllByRole } = renderWithRouter(<App />);
    const links = queryAllByRole('link');
    expect(links.length).toBe(4);
    expect(links[0].textContent).toBe('Home');
    expect(links[1].textContent).toBe('About');
    expect(links[2].textContent).toBe('Favorite Pokémons');
  });

  test('redirects to `/` URL after click Home link', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/home/i));

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('redirects to `/about` URL after click About link', async () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/about/i));

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('redirects to `/favorites` URL after click Favorite Pokémons link', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/favorite pokémons/i));

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('redirects to Not Found page after use invalid URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/xablau');
    const notFound = getByText(/page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
