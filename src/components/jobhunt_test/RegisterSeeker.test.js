import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import RegisterSeeker from './../../jobseeker/RegisterSeeker';
import axios from 'axios';
import '@testing-library/jest-dom';
// Mocking axios
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

//   test('displays success message on successful registration', async () => {
//     // Mocking the successful registration response
//     const successMessage = 'Successfully saved JobSeeker';
//     axios.post.mockResolvedValueOnce({ data: successMessage });
  
//     const { getByLabelText, getByText } = render(<RegisterSeeker />);
  
//     // Fill out the form fields
//     const nameInput = screen.getByLabelText('Name');
//     fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  
//     const emailInput = screen.getByLabelText('Email');
//     fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
  
//     const passwordInput = screen.getByLabelText('Password');
//     fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
//     // Submit the form
//     const registerButton = screen.getByText('Register');
//     fireEvent.click(registerButton);
  
//     // Wait for the success message to be displayed
//     await waitFor(() => {
//       expect(screen.getByText(successMessage)).toBeInTheDocument();
//     });
//   });
  

//   test('displays error message for invalid email format', async () => {
//     const { getByLabelText, getByText } = render(<RegisterSeeker />);

//     const emailInput = screen.getByLabelText('Email');
//     fireEvent.change(emailInput, { target: { value: 'invalidemail' } });

//     const registerButton = screen.getByText('Register');
//     fireEvent.click(registerButton);

//     await waitFor(() => {
//       expect(screen.getByText('Invalid email address')).toBeInTheDocument();
//     });
//   });

//   test('displays error message on failed registration', async () => {
//     const errorMessage = 'Failed to register';
//     axios.post.mockRejectedValueOnce({ response: { data: errorMessage } });

//     const { getByLabelText, getByText } = render(<RegisterSeeker />);

//     const nameInput = screen.getByLabelText('Name');
//     fireEvent.change(nameInput, { target: { value: 'John Doe' } });

//     const emailInput = screen.getByLabelText('Email');
//     fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });

//     const passwordInput = screen.getByLabelText('Password');
//     fireEvent.change(passwordInput, { target: { value: 'password123' } });

//     const registerButton = screen.getByText('Register');
//     fireEvent.click(registerButton);

//     await waitFor(() => {
//       expect(screen.getByText(errorMessage)).toBeInTheDocument();
//     });
//   });

  // Add more test cases as needed...
});
