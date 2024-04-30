import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import RegisterSeeker from './../../jobseeker/RegisterSeeker';
import axios from 'axios';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('RegisterSeeker Component', () => {
  test('renders without crashing', () => {
    render(<RegisterSeeker />);
  });

  test('displays error message when submitting with empty fields', async () => {
    const { getByText } = render(<RegisterSeeker />);

    const registerButton = screen.getByText('Register');
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      screen.expect(screen.getByText('Email is required')).toBeInTheDocument();
      screen.expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

});
