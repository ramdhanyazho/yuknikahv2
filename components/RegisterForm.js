'use client';

import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    konfirmasiPassword: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.konfirmasiPassword) {
      alert('Password tidak cocok!');
      return;
    }

    console.log('Registrasi data:', formData);

    // Redirect ke dashboard setelah registrasi sukses
    router.push('/dashboard');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="fw-bold mb-4 text-center">Registrasi</h2>

      <Form.Group controlId="nama" className="mb-3">
        <Form.Label>Nama Lengkap</Form.Label>
        <Form.Control
          type="text"
          name="nama"
          placeholder="Masukkan nama lengkap"
          value={formData.nama}
          onChange={handleChange}
          required
        />
      </Form.Group>

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

      <Form.Group controlId="konfirmasiPassword" className="mb-3">
        <Form.Label>Konfirmasi Password</Form.Label>
        <Form.Control
          type="password"
          name="konfirmasiPassword"
          placeholder="Ulangi password"
          value={formData.konfirmasiPassword}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="dark" type="submit" className="w-100 mt-3 fw-semibold">
        Registrasi
      </Button>
    </Form>
  );
}
