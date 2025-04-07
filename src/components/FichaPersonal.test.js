import { render, screen } from '@testing-library/react';
import FichaPersonal from './FichaPersonal';

const mockPerson = {
  name: { first: 'John', last: 'Doe' },
  email: 'john.doe@example.com',
  location: { country: 'Colombia' },
  phone: '123-456-789',
  picture: { large: 'https://via.placeholder.com/150' },
};

describe('FichaPersonal', () => {
  it('debe mostrar los datos de una persona', () => {
    render(<FichaPersonal person={mockPerson} />);
    expect(screen.getByText(/Ficha de John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Colombia/i)).toBeInTheDocument();
    expect(screen.getByText(/123-456-789/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Foto de perfil/i)).toBeInTheDocument();
  });
});
