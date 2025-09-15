/* components/LoginForm.js */

'use client';

import { useState } from 'react';
import { Button, Form, Card, Alert } from 'react-bootstrap';
import { signIn } from 'next-auth/react';

export default function LoginForm({ onRegisterClick }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/dashboard',
    });

    setLoading(false);

    if (res?.error) {
      setErrorMessage('Email atau password salah');
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <Card className="shadow-lg border-0 rounded-4">
      <Card.Body className="p-5">
        <h3 className="fw-bold mb-4 text-center font-script">
          Silakan masuk untuk melanjutkan
        </h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email Address"
              size="lg"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              size="lg"
              required
            />
          </Form.Group>

          <div className="d-grid mt-4">
            <Button variant="primary" type="submit" size="lg" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <Button
              variant="link"
              className="p-0"
              type="button"
              onClick={onRegisterClick}
            >
              Registrasi Manual
            </Button>
            <a href="/lupa-password" className="small">
              Lupa Password?
            </a>
          </div>

          {errorMessage && (
            <Alert variant="danger" className="mt-3">
              {errorMessage}
            </Alert>
          )}
        </Form>

        <div className="text-center text-muted my-3">atau</div>

        <div className="d-grid">
          <Button
            variant="outline-secondary"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          >
            Sign in dengan Google
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
