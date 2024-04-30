import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Profile from './../../employeer/Profile';
import '@testing-library/jest-dom';
jest.mock('axios');
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));
describe('Profile component', () => {
  beforeEach(() => {
    localStorage.clear();
  });
 
//   it('renders profile form with initial values', async () => {
//     // Mock the response for fetching the profile
//     axios.get.mockResolvedValueOnce({
//       data: {
//         name: 'John Doe',
//         jobSeekerId: '123',
//         emailId: 'john@example.com',
//         collegeName: 'XYZ University',
//         skills: 'React, Node.js',
//         experience: '3 years',
//       },
//     });

//     render(<Profile />);

//     // Wait for the profile to be fetched and form fields to be populated
//     await waitFor(() => {
//       expect(screen.getByLabelText('Name')).toHaveValue('John Doe');
//       screen.expect(screen.getByLabelText('Jobseeker ID')).toHaveValue('123');
//       screen.expect(screen.getByLabelText('Email ID')).toHaveValue('john@example.com');
//       screen.expect(screen.getByLabelText('College Name')).toHaveValue('XYZ University');
//       screen.expect(screen.getByLabelText('Skills')).toHaveValue('React, Node.js');
//       screen.expect(screen.getByLabelText('Experience')).toHaveValue('3 years');
//     });
//   });

  it('submits profile form with updated values', async () => {
    // Mock the response for fetching the profile
    axios.get.mockResolvedValueOnce({
      data: {
        name: 'John Doe',
        jobSeekerId: '123',
        emailId: 'john@example.com',
        collegeName: 'XYZ University',
        skills: 'React, Node.js',
        experience: '3 years',
      },
    });

    // Mock the response for updating the profile
    axios.put.mockResolvedValueOnce({
      data: 'Successfully updated',
    });

    render(<Profile />);

    // Wait for the profile to be fetched
    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toHaveValue('John Doe');
    });

    // Update the name field
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Doe' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Update' }));

    // Wait for the success message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Succesfully Updated profile')).toBeInTheDocument();
    });
  });



  it('displays error message when profile update fails', async () => {
    
//     // Mock the response for fetching the profile
//     axios.get.mockResolvedValueOnce({
//       data: {
//         name: 'John Doe',
//         jobSeekerId: '123',
//         emailId: 'john@example.com',
//         collegeName: 'XYZ University',
//         skills: 'React, Node.js',
//         experience: '3 years',
//       },
//     });

//     // Mock the response for updating the profile with an error
//     axios.put.mockRejectedValueOnce(new Error('Error updating profile'));

//     render(<Profile />);

//     // Wait for the profile to be fetched
//     await waitFor(() => {
//       expect(screen.getByLabelText('Name')).toHaveValue('John Doe');
//     });

//     // Submit the form
//     fireEvent.click(screen.getByRole('button', { name: 'Update' }));

//     // Wait for the error message to be displayed
//     await waitFor(() => {
//       expect(screen.getByText('Error while updating profile')).toBeInTheDocument();
//     });
//   });


});

});