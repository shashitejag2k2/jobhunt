// import React from 'react';
// import { render, fireEvent, waitFor, screen } from '@testing-library/react';

// import axios from 'axios';
// import JobCreationPage from './../../employeer/JobCreationPage';

// import { MemoryRouter } from "react-router-dom";
// import '@testing-library/jest-dom';



// describe('JobCreationPage', () => {
//     it('renders the component with default values', () => {
//       const { getByLabelText, getByText } = render(<JobCreationPage />);
  
//       // Check that the form fields are present
//       expect(getByLabelText('Job Title')).toBeInTheDocument();
//       expect(getByLabelText('Employee Type')).toBeInTheDocument();
//       expect(getByLabelText('Job Description')).toBeInTheDocument();
//       expect(getByLabelText('Key Skills')).toBeInTheDocument();
//       expect(getByLabelText('Minimum Experience (years)')).toBeInTheDocument();
//       expect(getByLabelText('Maximum Experience (years)')).toBeInTheDocument();
//       expect(getByLabelText('Location')).toBeInTheDocument();
//       expect(getByLabelText('Company Name')).toBeInTheDocument();
//       expect(getByLabelText('Educational Qualification')).toBeInTheDocument();
//       expect(getByLabelText('Minimum Salary')).toBeInTheDocument();
//       expect(getByLabelText('Maximum Salary')).toBeInTheDocument();
  
//       // Check that the form fields are initially empty or have default values
//       expect(getByLabelText('Job Title').value).toBe('');
//       expect(getByLabelText('Employee Type').value).toBe('');
//       expect(getByLabelText('Job Description').value).toBe('');
//       expect(getByLabelText('Key Skills').value).toBe('');
//       expect(getByLabelText('Minimum Experience (years)').value).toBe('');
//       expect(getByLabelText('Maximum Experience (years)').value).toBe('');
//       expect(getByLabelText('Location').value).toBe('');
//       expect(getByLabelText('Company Name').value).toBe('Test Company');
//       expect(getByLabelText('Educational Qualification').value).toBe('Bachelor\'s Degree');
//       expect(getByLabelText('Minimum Salary').value).toBe('');
//       expect(getByLabelText('Maximum Salary').value).toBe('');
  
//       // Check that the form is initially disabled
//       expect(getByLabelText('Job Title').closest('input')).toBeDisabled();
//       expect(getByLabelText('Employee Type').closest('select')).toBeDisabled();
//       expect(getByLabelText('Job Description').closest('textarea')).toBeDisabled();
//       expect(getByLabelText('Key Skills').closest('input')).toBeDisabled();
//       expect(getByLabelText('Minimum Experience (years)').closest('input')).toBeDisabled();
//       expect(getByLabelText('Maximum Experience (years)').closest('input')).toBeDisabled();
//       expect(getByLabelText('Location').closest('input')).toBeDisabled();
//       expect(getByLabelText('Educational Qualification').closest('select')).toBeDisabled();
//       expect(getByLabelText('Minimum Salary').closest('input')).toBeDisabled();
//       expect(getByLabelText('Maximum Salary').closest('input')).toBeDisabled();
//     });
  
//     it('enables the form when a job title is entered', () => {
//       const { getByLabelText } = render(<JobCreationPage />);
  
//       // Enter a job title
//       fireEvent.change(getByLabelText('Job Title'), { target: { value: 'Software Engineer' } });
  
//       // Check that the form is now enabled
//       expect(getByLabelText('Job Title').closest('input')).not.toBeDisabled();
//       expect(getByLabelText('Employee Type').closest('select')).not.toBeDisabled();
//       expect(getByLabelText('Job Description').closest('textarea')).not.toBeDisabled();
//       expect(getByLabelText('Key Skills').closest('input')).not.toBeDisabled();
//       expect(getByLabelText('Minimum Experience (years)').closest('input')).not.toBeDisabled();
//       expect(getByLabelText('Maximum Experience (years)').closest('input')).not.toBeDisabled();
//       expect(getByLabelText('Location').closest('input')).not.toBeDisabled();
//       expect(getByLabelText('Educational Qualification').closest('select')).not.toBeDisabled();
//       expect(getByLabelText('Minimum Salary').closest('input')).not.toBeDisabled();
//       expect(getByLabelText('Maximum Salary').closest('input')).not.toBeDisabled();
//     });
  
//     it('disables the form when the job title is cleared', () => {
//       const { getByLabelText } = render(<JobCreationPage />);
  
//       // Enter a job title
//       fireEvent.change(getByLabelText('Job Title'), { target: { value: 'Software Engineer' } });
  
//       // Check that the form is now enabled
//       expect(getByLabelText('Job Title').closest('input')).not.toBeDisabled();
//       expect(getByLabelText('Employee Type').closest('select')).not.toBeDisabled();
//       expect(getByLabelText('Job Description').closest('textarea')).not.toBeDisabled();
//       expect(getByLabelText('Key Skills').closest('input')).not.toBeDisabled();
//       expect(getByLabelText('Minimum Experience (years)').closest('input')).not.toBeDisabled();
//       expect(getByLabelText('Maximum Experience (years)').closest('input')).not.toBeDisabled();
//       expect(getByLabelText('Location').closest('input')).not.toBeDisabled();
//       expect(getByLabelText('Educational Qualification').closest('select')).not.toBeDisabled();
//       expect(getByLabelText('Minimum Salary').closest('input')).not.toBeDisabled();
//       expect(getByLabelText('Maximum Salary').closest('input')).not.toBeDisabled();
  
//       // Clear the job title
//       fireEvent.change(getByLabelText('Job Title'), { target: { value: '' } });
  
//       // Check that the form is now disabled
//       expect(getByLabelText('Job Title').closest('input')).toBeDisabled();
//       expect(getByLabelText('Employee Type').closest('select')).toBeDisabled();
//       expect(getByLabelText('Job Description').closest('textarea')).toBeDisabled();
//       expect(getByLabelText('Key Skills').closest('input')).toBeDisabled();
//       expect(getByLabelText('Minimum Experience (years)').closest('input')).toBeDisabled();
//       expect(getByLabelText('Maximum Experience (years)').closest('input')).toBeDisabled();
//       expect(getByLabelText('Location').closest('input')).toBeDisabled();
//       expect(getByLabelText('Educational Qualification').closest('select')).toBeDisabled();
//       expect(getByLabelText('Minimum Salary').closest('input')).toBeDisabled();
//       expect(getByLabelText('Maximum Salary').closest('input')).toBeDisabled();
//     });
  
//     it('submits the form with valid input', async () => {
//       const { getByLabelText, getByText } = render(<JobCreationPage />);
  
//       // Enter valid input
//       fireEvent.change(getByLabelText('Job Title'), { target: { value: 'Software Engineer' } });
//       fireEvent.change(getByLabelText('Employee Type'), { target: { value: 'Full-time' } });
//       fireEvent.change(getByLabelText('Job Description'), { target: { value: 'Design, develop, and maintain software applications.' } });
//       fireEvent.change(getByLabelText('Key Skills'), { target: { value: 'Java, JavaScript, React, Node.js' } });
//       fireEvent.change(getByLabelText('Minimum Experience (years)'), { target: { value: 2 } });
//       fireEvent.change(getByLabelText('Maximum Experience (years)'), { target: { value: 5 } });
//   fireEvent.change(getByLabelText('Location'), { target: { value: 'New York, NY' } });
//       fireEvent.change(getByLabelText('Educational Qualification'), { target: { value: 'Bachelor\'s Degree' } });
//       fireEvent.change(getByLabelText('Minimum Salary'), { target: { value: 80000 } });
//       fireEvent.change(getByLabelText('Maximum Salary'), { target: { value: 120000 } });
  
//       // Submit the form
//       fireEvent.click(getByText('Submit'));
  
//       // Check that the form was submitted successfully
//       expect(getByText('Job successfully created')).toBeInTheDocument();
//     });
  
//     it('displays an error message when the form is submitted with invalid input', async () => {
//       const { getByLabelText, getByText } = render(<JobCreationPage />);
  
//       // Enter invalid input
//       fireEvent.change(getByLabelText('Job Title'), { target: { value: 'Software Engineer' } });
//       fireEvent.change(getByLabelText('Employee Type'), { target: { value: '' } });
//       fireEvent.change(getByLabelText('Job Description'), { target: { value: '' } });
//       fireEvent.change(getByLabelText('Key Skills'), { target: { value: '' } });
//       fireEvent.change(getByLabelText('Minimum Experience (years)'), { target: { value: 0 } });
//       fireEvent.change(getByLabelText('Maximum Experience (years)'), { target: { value: 1 } });
//       fireEvent.change(getByLabelText('Location'), { target: { value: '' } });
//       fireEvent.change(getByLabelText('Educational Qualification'), { target: { value: '' } });
//       fireEvent.change(getByLabelText('Minimum Salary'), { target: { value: 0 } });
//       fireEvent.change(getByLabelText('Maximum Salary'), { target: { value: 0 } });
  
//       // Submit the form
//       fireEvent.click(getByText('Submit'));
  
//       // Check that an error message is displayed
//       expect(getByText('Please fix the following errors:')).toBeInTheDocument();
//       expect(getByText('Employee type is required')).toBeInTheDocument();
//       expect(getByText('Job description is required')).toBeInTheDocument();
//       expect(getByText('Key skills are required')).toBeInTheDocument();
//       expect(getByText('Minimum work experience is required')).toBeInTheDocument();
//       expect(getByText('Maximum work experience is required')).toBeInTheDocument();
//       expect(getByText('Location is required')).toBeInTheDocument();
//       expect(getByText('Educational qualification is required')).toBeInTheDocument();
//       expect(getByText('Minimum salary is required')).toBeInTheDocument();
//       expect(getByText('Maximum salary is required')).toBeInTheDocument();
//     });
//   });