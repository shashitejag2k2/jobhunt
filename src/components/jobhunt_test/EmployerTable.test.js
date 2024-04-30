import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import axios from 'axios';
import EmployerTable from '../../Admin/EmployerTable';
import '@testing-library/jest-dom'
jest.mock('axios');

describe('EmployerTable Component', () => {
  // Rendering Test
  test('renders without crashing', () => {
    render(<EmployerTable />);
  });

  // Form Submission Test
  test('submits subscription form', async () => {
    // Mock successful form submission
    axios.put.mockResolvedValueOnce({ data: 'Subscription updated successfully' });

    const { getByLabelText, getByText } = render(<EmployerTable />);

    // Fill out the form fields
    const subscriptionTypeInput = screen.getByLabelText('Subscription Type');
    fireEvent.change(subscriptionTypeInput, { target: { value: 'Premium' } });

    const numberOfJobsInput = screen.getByLabelText('Number of Jobs');
    fireEvent.change(numberOfJobsInput, { target: { value: '10' } });

    const priceInput = screen.getByLabelText('Price');
    fireEvent.change(priceInput, { target: { value: '100' } });

    // Submit the form
    const submitButton = screen.getByText('Update');
    fireEvent.click(submitButton);

    // Wait for the success message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Succesfully updated subscription!')).toBeInTheDocument();
    });
  });

  // API Interaction Test
 

    test('fetches employers and subscriptions from API', async () => {
      const employersResponse = {
        data: [
          {
            employeeId: 1,
            name: 'John Doe',
            emailId: 'john@example.com',
            companyName: 'ABC Inc.',
            subscriptionType: 'Basic',
          },
        ],
      };
  
      const subscriptionsResponse = {
        data: [
          {
            id: 1,
            subscriptionType: 'Basic',
            numberOfJobs: 5,
            price: 50,
          },
        ],
      };
  
      axios.get.mockResolvedValueOnce(employersResponse);
      axios.get.mockResolvedValueOnce(subscriptionsResponse);
  
      render(<EmployerTable />);
  
      // Wait for the component to fetch and render employer data
      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });
  
      // Wait for the component to fetch and render subscription data
      await waitFor(() => {
        expect(screen.getAllByText('Basic')).toBeInTheDocument();
      });

      
    });



  });

  // Pagination Test
  test('navigates pages correctly', async () => {
    const employersResponse = {
      data: [
        { employeeId: 1, name: 'John Doe', companyName: 'ABC Inc.', subscriptionType: 'Basic' },
        { employeeId: 2, name: 'Jane Smith', companyName: 'XYZ Corp.', subscriptionType: 'Premium' },
        { employeeId: 3, name: 'Alice Johnson', companyName: '123 Corp.', subscriptionType: 'Basic' },
      ],
    };

    axios.get.mockResolvedValueOnce(employersResponse);

    const { getByLabelText, getByText } = render(<EmployerTable />);

    // Wait for the component to fetch and render data
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Go to the next page
    const nextPageButton = screen.getByLabelText('next page');
    fireEvent.click(nextPageButton);

    // Verify that the next page is rendered
    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

