'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageLayout, MainLayout } from '@/components/layout';
import { Button, Card, FormField, Input } from '@/components/ui';
import { authService } from '@/lib/api';
import { InlineError } from '@/components/error';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!formData.username || !formData.password) {
      setErrors({
        username: !formData.username ? 'Username is required' : '',
        password: !formData.password ? 'Password is required' : '',
      });
      return;
    }

    setIsLoading(true);
    try {
      await authService.login({
        username: formData.username,
        password: formData.password,
      });
    } catch {
      setSubmitError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <MainLayout>
        <div className="centered-container">
          <Card
            title="Log In"
            titleLarge
            footer={
              <>
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-primary hover:underline">
                  Sign up
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
                  placeholder="Enter your username"
                  disabled={isLoading}
                  className={errors.username ? 'form-input-error' : ''}
                />
              </FormField>

              <FormField label="Password" htmlFor="password" error={errors.password}>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  disabled={isLoading}
                  className={errors.password ? 'form-input-error' : ''}
                />
              </FormField>

              <InlineError message={submitError} />

              <Button variant="rectangular" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>
            </form>
          </Card>
        </div>
      </MainLayout>
    </PageLayout>
  );
}
