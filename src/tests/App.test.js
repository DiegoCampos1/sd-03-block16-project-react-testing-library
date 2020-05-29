import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import { NotFound } from '../components';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Testes do arquivo App.js', () => {
  it('Ao clicar no link na barra de navegação, a aplicação deve ser redirecionada para a página', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
    expect(home).toHaveAttribute('href', '/');

    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
    expect(about).toHaveAttribute('href', '/about');

    const favorites = getByText(/Favorite Pokémons/i);
    expect(favorites).toBeInTheDocument();
    expect(favorites).toHaveAttribute('href', '/favorites');

    fireEvent.click(favorites);

    const favoritePokemon = getByText('Favorite pokémons');
    expect(favoritePokemon).toBeInTheDocument();

    fireEvent.click(about);

    const aboutResult = getByText('About');
    expect(aboutResult).toBeInTheDocument();
  });

  it('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Entrar em uma URL desconhecida exibe a página Not Found', () => {
    const { getByText } = render(<NotFound />);
    const pageNotFound = getByText(/not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
