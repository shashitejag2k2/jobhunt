import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import Login from './../Login';
import axios from 'axios'; 
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

    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'employer@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    
    fireEvent.submit(screen.getByText('Submit'));

    
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    
  });

  it('submits form with valid job seeker credentials', async () => {
    axios.post.mockResolvedValueOnce({ data: 'Success' });

    const { getByLabelText, getByText } = render(<Login />);

    
    fireEvent.click(screen.getByText('Job Seeker'));

    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jobseeker@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    
    fireEvent.submit(screen.getByText('Submit'));

   
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    
  });

  
 

  // Add more test cases for other scenarios as needed
});
