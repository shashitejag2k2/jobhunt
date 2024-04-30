import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import Login from './../Login';
import axios from 'axios'; // Mock axios for handling API requests
import '@testing-library/jest-dom';
jest.mock('axios');
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));
describe('Login component', () => {
  it('submits form with valid employer credentials', async () => {
    axios.post.mockResolvedValueOnce({ data: 'Success' });

    const { getByLabelText, getByText } = render(<Login />);

    // Fill out the form with valid employer credentials
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'employer@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.submit(screen.getByText('Submit'));

    // Ensure that API request is made
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Ensure that it navigates to the employer dashboard page
    // You may need to mock the useNavigate hook for testing navigation
    // Example: jest.mock('react-router-dom', () => ({
    //   ...jest.requireActual('react-router-dom'),
    //   useNavigate: jest.fn(() => jest.fn())
    // }));
  });

  it('submits form with valid job seeker credentials', async () => {
    axios.post.mockResolvedValueOnce({ data: 'Success' });

    const { getByLabelText, getByText } = render(<Login />);

    // Switch to the job seeker tab
    fireEvent.click(screen.getByText('Job Seeker'));

    // Fill out the form with valid job seeker credentials
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jobseeker@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.submit(screen.getByText('Submit'));

    // Ensure that API request is made
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Ensure that it navigates to the job seeker dashboard page
    // You may need to mock the useNavigate hook for testing navigation
  });

  
 

  // Add more test cases for other scenarios as needed
});
