import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import TrackApplications from './../../jobseeker/TrackApplications';
import '@testing-library/jest-dom';
jest.mock('axios');
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));
describe('TrackApplications component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [] }); // Mock initial data fetch
  });


  test('fetches and displays job data', async () => {
    const mockData = [
      { jobId: 1, jobTitle: 'Software Engineer', postedBy: 'Company A', appliedBy: 'User A', status: 'review' },
      { jobId: 2, jobTitle: 'Data Analyst', postedBy: 'Company B', appliedBy: 'User B', status: 'pending' },
    ];
    axios.get.mockResolvedValueOnce({ data: mockData });
    render(<TrackApplications />);
    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Data Analyst')).toBeInTheDocument();
    });
  });

  test('handles pagination correctly', async () => {
    const mockData = Array.from({ length: 15 }, (_, index) => ({
      jobId: index + 1,
      jobTitle: `Job ${index + 1}`,
      postedBy: `Company ${index + 1}`,
      appliedBy: `User ${index + 1}`,
      status: 'review',
    }));
    axios.get.mockResolvedValueOnce({ data: mockData });
    render(<TrackApplications />);
    
    // Wait for the first page of data to be rendered
    await waitFor(() => {
      expect(screen.getByText('Job 1')).toBeInTheDocument();
    });
  
    // Ensure Job 6 is not visible initially
    expect(screen.queryByText('Job 6')).not.toBeInTheDocument();
  
    // Click next page
    fireEvent.click(screen.getByRole('button', { name: 'next page' }));
  
    // Wait for the second page of data to be rendered
    await waitFor(() => {
      expect(screen.getByText('Job 6')).toBeInTheDocument();
    });
  
    // Ensure Job 11 is not visible initially
    expect(screen.queryByText('Job 11')).not.toBeInTheDocument();
  });
  

 
});
