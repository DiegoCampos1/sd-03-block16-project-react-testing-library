import React from 'react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  render,
  cleanup,
  fireEvent,
  waitForDomChange,
} from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
    history,
  };
};

describe('App.js tests', () => {
  afterEach(cleanup);

  test('renders Pokédex homepage on `/` URL', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('renders links navbar', () => {
    const { queryByRole } = renderWithRouter(<App />);
    const navBar = queryByRole('navigation');
    expect(navBar).toBeInTheDocument();
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
    const { getByText } = render(
      <MemoryRouter initialEntries={['/xablau']}>
        <App />
      </MemoryRouter>,
    );

    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
