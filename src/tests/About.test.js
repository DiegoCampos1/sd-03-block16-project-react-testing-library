import About from '../components/About';
import { render } from '@testing-library/react';
import App from '../App';


test('Testando se o componente contém o texto', () => {
  const { getBytext } = render(<App />)
  const h2Text = getBytext('About Pokédex');
});