import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { PageBody } from '../../jobseeker/PageBody';
import axios from 'axios'; // Import axios for mocking
import '@testing-library/jest-dom';
jest.mock('axios'); // Mock axios

describe('PageBody', () => {
    it('renders without crashing', () => {
        render(<PageBody />);
        expect(screen.getByText('Search')).toBeInTheDocument();
      });

  it('search functionality', async () => {
    render(<PageBody />);
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    await screen.findByText('Search results');
    expect(screen.getByText('Search results')).toBeInTheDocument();
  });

  it('job cards rendering', async () => {
    render(<PageBody />);
    const jobCards = await screen.findAllByRole('button', { name: 'Apply' });
    expect(jobCards.length).toBeGreaterThan(0);
    fireEvent.click(jobCards[0]);
    await screen.findByText('Job Details');
    expect(screen.getByText('Job Details')).toBeInTheDocument();
  });

  it('modal functionality', async () => {
    render(<PageBody />);
    const firstJobCard = screen.getByRole('button', { name: 'Apply' });
    fireEvent.click(firstJobCard);
    const confirmApplyButton = screen.getByText('Confirm Apply');
    fireEvent.click(confirmApplyButton);
    await screen.findByText('Application submitted successfully');
    expect(screen.getByText('Application submitted successfully')).toBeInTheDocument();
  });

//   it('error handling', async () => {
//     axios.get.mockRejectedValue(new Error('Error fetching jobs')); // Mock axios to reject
//     render(<PageBody />);
//     await waitFor(() => expect(screen.getByText('Error fetching jobs')).toBeInTheDocument());
//   });

//   it('navigation', () => {
//     render(<PageBody />);
//     const viewAllButton = screen.getByText('View All');
//     fireEvent.click(viewAllButton);
//     expect(window.location.pathname).toBe('/viewAll');
//     const trackApplicationsButton = screen.getByText('Track Applications');
//     fireEvent.click(trackApplicationsButton);
//     expect(window.location.pathname).toBe('/trackApplications');
//   });
});
