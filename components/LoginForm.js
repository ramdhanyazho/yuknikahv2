'use client';

import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Validasi login (sementara log dummy)
    if (formData.email && formData.password) {
      console.log('Login data:', formData);

      // Redirect ke dashboard
      router.push('/dashboard');
    } else {
      alert('Email dan password wajib diisi!');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="fw-bold mb-4 text-center">Login</h2>

      <Form.Group controlId="email" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Masukkan email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="password" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Masukkan password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="dark" type="submit" className="w-100 mt-3 fw-semibold">
        Login
      </Button>
    </Form>
  );
}
