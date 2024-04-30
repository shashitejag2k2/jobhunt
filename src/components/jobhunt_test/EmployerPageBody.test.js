import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom for additional matchers
import EmployerPageBody from './../../employeer/PageBody';
// Mocking dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Use actual implementation of hooks and methods
  useNavigate: () => jest.fn(), // Mock useNavigate hook
}));

jest.mock('axios'); // Mocking axios

describe('EmployerPageBody component', () => {
  beforeEach(() => {
    // Mock localStorage getItem method
    jest.spyOn(global.Storage.prototype, 'getItem').mockReturnValue(JSON.stringify({ subscriptionType: 'Basic' }));
  });

  afterEach(() => {
    // Restore mock
    jest.clearAllMocks();
  });

  test('renders the component with initial state', () => {
    render(<EmployerPageBody />);
    expect(screen.getByText('Create A Job')).toBeInTheDocument();
    expect(screen.getByText('No. of Applications')).toBeInTheDocument();
    expect(screen.getByText('No. of Remaining')).toBeInTheDocument();
    expect(screen.getByText('My Subscription')).toBeInTheDocument();
  });


});
