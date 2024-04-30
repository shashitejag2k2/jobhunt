import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios'; // Import axios for mocking API calls
import JobSeekerPageBody from './../../jobseeker/PageBody'; // Assuming the component is in the same directory

// Mocking dependencies
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('PageBody component', () => {
  // Test case for rendering and displaying jobs
  test('renders and displays jobs', async () => {
    const jobsData = [
      {
        jobId: '1',
        jobTitle: 'Software Engineer',
        experience: '2yrs-5yrs',
        description: 'Job description for Software Engineer',
      },
      // Add more job data as needed
    ];

    // Mock API response for fetching jobs
    axios.get.mockResolvedValueOnce({ data: jobsData });

    render(<JobSeekerPageBody />);

    // Wait for API call to complete and update the UI
    await waitFor(() => {
      // Check if job titles are rendered
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
      // Add more assertions for other job details if needed
    });
  });

  
});
