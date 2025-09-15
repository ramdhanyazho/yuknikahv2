'use client';

import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { registerUser } from '@/app/actions';

export default function RegisterForm({ onSuccess }) {
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const formData = new FormData(e.target);
    const res = await registerUser(formData);

    setMessage(res.message);
    setSuccess(res.success);

    if (res.success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3 className="fw-bold mb-4 text-center font-script">
        Registrasi Akun Baru
      </h3>

      {message && (
        <Alert variant={success ? 'success' : 'danger'}>{message}</Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="name"
          placeholder="Name"
          size="lg"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          name="email"
          placeholder="Email Address"
          size="lg"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          size="lg"
          required
        />
      </Form.Group>

      <div className="d-grid">
        <Button variant="primary" type="submit" size="lg">
          Register
        </Button>
      </div>
    </Form>
  );
}
