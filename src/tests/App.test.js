import React from 'react';
import { Router } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

// test('renders a reading with the text `Pokédex`', () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>,
//   );
//   const heading = getByText(/Pokédex/i);
//   expect(heading).toBeInTheDocument();
// });

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return ({
    ...originalModule,
    BrowserRouter: ({ children }) => (<div>{children}</div>),
  });
});

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

describe('Testes no arquivo App.js', () => {
  afterEach(cleanup);

  test('1.1 - Ao carregar a aplicação no caminho de URL “/”, a página principal da Pokédex deve ser mostrada', () => {
    const { getByText } = renderWithRouter(<App />);
    const header = getByText(/Encountered pok/i);
    expect(header).toBeInTheDocument();
  });

  test('1.2 - Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('Home'));
    expect(getByText('Pokédex')).toBeInTheDocument();
  });

  test('1.3 - Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de About, na URL "/about"', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    expect(getByText(/This applic/i)).toBeInTheDocument();
  });

  test('1.3 - Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Po/i));
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
  });

  test('1.4 - Entrar em uma URL desconhecida exibe a página Not Found', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/lmmm' });
    expect(getByText(/😭/i)).toBeInTheDocument();
  });
});
