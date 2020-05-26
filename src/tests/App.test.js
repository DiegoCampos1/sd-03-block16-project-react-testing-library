import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
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

test('aplicação deve ser redirecionada para a página inicial', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeLink = getByText('Home');
  fireEvent.click(homeLink);
  expect(getByText(/Encountered pokémons/i));
});

test('aplicação deve ser redirecionada para a página de About', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const aboutLink = getByText(/About/);
  fireEvent.click(aboutLink);
  expect(getByText(/About Pokédex/i));
});

test('aplicação deve ser redirecionada para a página de pokémons favoritados', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const favoritesLink = getByText(/Favorite Pokémons/);
  fireEvent.click(favoritesLink);
  expect(getByText(/Favorite pokémons/));
});
