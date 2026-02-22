'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageLayout, MainLayout } from '@/components/layout';
import { Button, Card, FormField, Input } from '@/components/ui';
import { authService } from '@/lib/api';
import { InlineError } from '@/components/error';
import { useAuth } from '@/lib/auth/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.username.length < 3 || formData.username.length > 20) {
      newErrors.username = 'Username must be 3-20 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await register(formData.username, formData.email, formData.password);
      router.replace('/');
    } catch {
      setSubmitError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <MainLayout>
        <div className="centered-container">
          <Card
            title="Create Account"
            subtitle="Join Socialite"
            titleLarge
            footer={
              <>
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline">
                  Log in
                </Link>
              </>
            }
          >
            <form onSubmit={handleSubmit} className="form-stack">
              <FormField label="Username" htmlFor="username" error={errors.username}>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  disabled={isLoading}
                  className={errors.username ? 'form-input-error' : ''}
                />
              </FormField>

              <FormField label="Email" htmlFor="email" error={errors.email}>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  disabled={isLoading}
                  className={errors.email ? 'form-input-error' : ''}
                />
              </FormField>

              <FormField label="Password" htmlFor="password" error={errors.password}>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  disabled={isLoading}
                  className={errors.password ? 'form-input-error' : ''}
                />
              </FormField>

              <FormField
                label="Confirm Password"
                htmlFor="confirmPassword"
                error={errors.confirmPassword}
              >
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  disabled={isLoading}
                  className={errors.confirmPassword ? 'form-input-error' : ''}
                />
              </FormField>

              <InlineError message={submitError} />

              <Button variant="rectangular" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>
          </Card>
        </div>
      </MainLayout>
    </PageLayout>
  );
}
