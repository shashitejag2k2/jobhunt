
import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Profile from './../../employeer/Profile';
import { Snackbar } from '@mui/material';
import '@testing-library/jest-dom';
jest.mock('axios');

describe('Profile', () => {
    it('renders without crashing', () => {
        render(<Profile />, { wrapper: MemoryRouter });
      });

      it('submits the form with valid input', async () => {
        const mockedData = {
          data: {
            name: 'John Doe',
            jobSeekerId: '12345',
            emailId: 'john.doe@example.com',
            collegeName: 'Example University',
            skills: 'React, JavaScript',
            experience: '2 years',
          },
        };
    
        axios.get.mockResolvedValueOnce(mockedData);
        axios.put.mockResolvedValueOnce({});
        localStorage.getItem = jest.fn(() => 'john.doe@example.com');
    
        const { getByLabelText } = render(<Profile />, { wrapper: MemoryRouter });
    
        // Wait for axios.get to resolve
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    
        // Fill out the form
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText('Email ID'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText('College Name'), { target: { value: 'Example University' } });
        fireEvent.change(screen.getByLabelText('Skills'), { target: { value: 'React, JavaScript' } });
        fireEvent.change(screen.getByLabelText('Experience'), { target: { value: '2 years' } });
    
        // Submit the form
        fireEvent.submit(screen.getByLabelText('Update profile'));
    
        // Wait for axios.put to resolve
        await waitFor(() => expect(axios.put).toHaveBeenCalledTimes(1));
    
        // Assert that the form was submitted successfully
        expect(axios.put).toHaveBeenCalledWith(
          'http://localhost:8080/updateProfile',
          {
            name: 'John Doe',
            jobSeekerId: '12345',
            emailId: 'john.doe@example.com',
            collegeName: 'Example University',
            skills: 'React, JavaScript',
            experience: '2 years',
          }
        );
      });

//   it('displays error message when there is an error updating the profile', async () => {
//     axios.get.mockRejectedValueOnce(new Error('Failed to fetch profile'));
//     const { getByText } = render(<Profile />);

//     // Wait for the error message to appear
//     await waitFor(() => expect(getByText('Failed to fetch profile')).toBeInTheDocument());
//   });

it('closes the snackbar when closed', async () => {
    axios.put.mockResolvedValueOnce({});
    render(<Profile />);
    
    // Wait for axios.put to resolve
    await waitFor(() => expect(axios.put).toHaveBeenCalledTimes(1));
    
    // Close the snackbar
    fireEvent.click(screen.getByText('Close'));
    
    // Assert that the snackbar is closed
    expect(screen.queryByText('Succesfully Updated profile')).toBeNull();
  });
});
