import React from 'react';
import { render, waitFor, fireEvent,screen } from '@testing-library/react';
import axios from 'axios';
import TrackApplications from './../../jobseeker/TrackApplications';

// Mocking axios
jest.mock('axios');
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('TrackApplications Component', () => {
  test('renders without crashing', () => {
    render(<TrackApplications />);
  });

  test('fetches data from API and renders table rows', async () => {
    const mockData = [
      { jobId: 1, jobTitle: 'Software Developer', postedBy: 'Company A', appliedBy: 'John Doe', status: 'review' },
      { jobId: 2, jobTitle: 'Data Analyst', postedBy: 'Company B', appliedBy: 'Jane Doe', status: 'approve' },
    ];
    axios.get.mockResolvedValueOnce({ data: mockData });

    const { getByText } = render(<TrackApplications />);

    // Wait for API call to complete and render table
    await waitFor(() => {
      mockData.forEach((data) => {
        expect(screen.getByText(data.jobTitle)).toBeInTheDocument();
      });
    });
  });

//   test('displays snackbar on API error', async () => {
//     const errorMessage = 'Failed to fetch data';
//     axios.get.mockRejectedValueOnce({ message: errorMessage });

//     const { getByText } = render(<TrackApplications />);

//     // Wait for API call to complete and display snackbar
//     await waitFor(() => {
//       expect(screen.getByText(errorMessage)).toBeInTheDocument();
//     });
//   });
test('displays empty state when API returns no data', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    const { getByText } = render(<TrackApplications />);

    await waitFor(() => {
        expect(() => screen.getByText('No Data')).toThrow();
    });
  });

  test('navigates back on button click', () => {
    const { getByText } = render(<TrackApplications />);
    const backButton = screen.getByText('Back');

    fireEvent.click(backButton);

    // Add assertion for navigation if using react-router
  });

  // Add more test cases as needed...
});
