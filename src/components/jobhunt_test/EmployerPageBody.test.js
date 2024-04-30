import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import EmployerPageBody from './../../employeer/PageBody';
// Mocking dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => jest.fn(), 
}));

jest.mock('axios'); 

describe('EmployerPageBody component', () => {
  beforeEach(() => {
    
    jest.spyOn(global.Storage.prototype, 'getItem').mockReturnValue(JSON.stringify({ subscriptionType: 'Basic' }));
  });

  afterEach(() => {
   
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
