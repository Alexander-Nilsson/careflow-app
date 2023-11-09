import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../Login'; // Import the component to be tested

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isAuthenticated: true, // Simulate an authenticated state
    isLoading: false, // Simulate that loading has finished
  }),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('TC-login-8 (FR-010301)', () => {
  it('should redirect to /start after successful login', () => {
    const navigate = jest.fn(); // Mock the navigate function

    // Replace the mocked useNavigate with the new implementation in the test
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

    render(<Login />); // Render the Login component

    // Perform assertions
    expect(screen.queryByText('Loading...')).toBeNull(); // Make sure loading text is not displayed
    expect(screen.queryByRole('button', { name: /login/i })).toBeNull(); // Assuming the login button disappears after successful authentication

    // If the user is authenticated, it should navigate to '/start'
    expect(navigate).toHaveBeenCalledWith('/start');
  });
});

import fs from 'fs';

describe('TC-login-10 (FR-010103)', () => {
  it('should use useAuth0 hook', () => {
    const loginComponent = fs.readFileSync('src/components/Login.tsx', 'utf8');
    expect(loginComponent).toContain('useAuth0(');
  });
});