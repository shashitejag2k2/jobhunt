import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import TrackApplications from './../../jobseeker/TrackApplications';
import '@testing-library/jest-dom';
jest.mock('axios');

describe('TrackApplications', () => {
  const mockedData = [
    {
      jobId: '1',
      jobTitle: 'Software Developer',
      postedBy: 'Company A',
      appliedBy: 'John Doe',
      status: 'review',
    },
    {
      jobId: '2',
      jobTitle: 'Data Analyst',
      postedBy: 'Company B',
      appliedBy: 'Jane Smith',
      status: 'approve',
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockedData });
  });

  it('renders the component without crashing', async () => {
    render(<TrackApplications />);

    expect(await screen.findByText('Job Title')).toBeInTheDocument();
    expect(await screen.findByText('Posted By')).toBeInTheDocument();
    expect(await screen.findByText('Applied By')).toBeInTheDocument();
    expect(await screen.findByText('Status')).toBeInTheDocument();
    expect(await screen.findByText('Job ID')).toBeInTheDocument();
  });

  it('fetches and displays the job applications', async () => {
    render(<TrackApplications />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    mockedData.forEach((job) => {
      expect(screen.getByText(job.jobTitle)).toBeInTheDocument();
      expect(screen.getByText(job.postedBy)).toBeInTheDocument();
      expect(screen.getByText(job.appliedBy)).toBeInTheDocument();
      expect(screen.getByText(job.status)).toBeInTheDocument();
    });
  });

  it('navigates back to job seeker page when Back button is clicked', async () => {
    const navigateMock = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => navigateMock,
    }));

    render(<TrackApplications />);

    const backButton = screen.getByRole('button', { name: 'Back' });
    fireEvent.click(backButton);

    expect(navigateMock).toHaveBeenCalledWith('/jobseeker');
  });

  it('closes the snackbar when closed', async () => {
    axios.get.mockRejectedValueOnce({ code: 'error' });
    render(<TrackApplications />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const closeSnackbarButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeSnackbarButton);

    expect(screen.queryByText('error')).toBeNull();
  });
});
