import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Register from './../../employeer/Register';
import axios from 'axios';
import '@testing-library/jest-dom';
jest.mock('axios');

describe('Register Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with all input fields', () => {
    render(<Register />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Company Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Employee ID')).toBeInTheDocument();
  });

  it('submits the form with valid input', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Register />);
  
   
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Company Name'), { target: { value: 'Example Company' } });
    fireEvent.change(screen.getByLabelText('Employee ID'), { target: { value: '12345' } });
  
   
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
  
   
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  
    
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/employeerRegister',
      {
        name: 'John Doe',
        emailId: 'john.doe@example.com',
        password: 'password123',
        companyName: 'Example Company',
        employeeId: '12345',
      }
    );
   
  });

});
