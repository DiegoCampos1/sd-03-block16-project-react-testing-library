import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import { Pokedex } from '../components';

describe('5. Testes do arquivo Pokedex.js', () => {
  test('5.1 - Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    const { getByRole } = render(<Pokedex />);
    const botProx = getByRole('button');
    expect(botProx).toHaveTextContent('Próximo pokémon');
    fireEvent.click(botProx);
  });

});

