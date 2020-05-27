import { fireEvent } from '@testing-library/react';

function forFunction(index, getByText) {
  for (let i = 0; i < index; i += 1) {
    const nextPokemon = getByText('Próximo pokémon');
    fireEvent.click(nextPokemon);
  }
}

export default forFunction;
