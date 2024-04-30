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
 


  it('submits profile form with updated values', async () => {
   
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

    
    axios.put.mockResolvedValueOnce({
      data: 'Successfully updated',
    });

    render(<Profile />);

    
    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toHaveValue('John Doe');
    });

    
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Doe' } });

    
    fireEvent.click(screen.getByRole('button', { name: 'Update' }));

    
    await waitFor(() => {
      expect(screen.getByText('Succesfully Updated profile')).toBeInTheDocument();
    });
  });



  it('displays error message when profile update fails', async () => {
    



});

});