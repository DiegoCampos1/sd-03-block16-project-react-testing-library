import { fireEvent } from '@testing-library/react';

function componentFunction(index, getByText) {
  for (let i = 0; i < index; i += 1) {
    const nextPokemon = getByText('Próximo pokémon');
    fireEvent.click(nextPokemon);
  }
};

export default componentFunction;
