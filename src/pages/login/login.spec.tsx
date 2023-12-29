import { it, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from './Login';

describe('Login page', () => {
    it('should render with required fields', () => {
        render(<LoginPage />);
        expect(screen.getByText('Sign In')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
        expect(screen.getByRole('checkbox', { name: 'Remember me' })).toBeInTheDocument();
        expect(screen.getByText('Forgot password')).toBeInTheDocument();
    });
});