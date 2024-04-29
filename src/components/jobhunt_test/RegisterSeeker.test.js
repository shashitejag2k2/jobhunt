import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import RegisterSeeker from './../../jobseeker/RegisterSeeker';
import '@testing-library/jest-dom';
jest.mock('axios');

describe('RegisterSeeker Component', () => {
    axios.post.mockReset(); // Reset the mocked response between tests
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('renders the component without crashing', () => {
      render(<RegisterSeeker />);
  
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByText('Register')).toBeInTheDocument();
    });
  
    it('submits the form with valid input', async () => {
      const mockedData = {
        data: {
          message: 'Registration successful',
        },
      };
  
      axios.post.mockResolvedValueOnce(mockedData);
  
      render(<RegisterSeeker />);
  
      fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
  
      fireEvent.click(screen.getByText('Register'));
  
      await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/jobSeekerRegister',
        {
          name: 'John Doe',
          emailId: 'john.doe@example.com',
          password: 'password123',
        }
      );
  
      expect(screen.getByText('Succesfully registered')).toBeInTheDocument();
    });
  
    it('displays error message for invalid input', async () => {
        const errorMessage = 'Invalid input';
        axios.post.mockRejectedValueOnce({
          response: {
            status: 400,
            statusText: 'Bad Request',
            data: {
              message: errorMessage,
            },
          },
        });
      
        render(<RegisterSeeker />);
      
        fireEvent.click(screen.getByText('Register'));
      
        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
      
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
});