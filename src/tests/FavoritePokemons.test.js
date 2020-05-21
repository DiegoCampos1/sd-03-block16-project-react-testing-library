import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import { FavoritePokémons } from '../components';

test('renders a reading with the text `No found`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
      <FavoritePokémons />
    </MemoryRouter>,
  );
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});
