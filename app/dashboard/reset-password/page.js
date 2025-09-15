// app/dashboard/reset-password/page.js

'use client';

import { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

export default function ResetPasswordPage() {
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const formData = new FormData(e.target);
    const oldPassword = formData.get('oldPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');

    if (newPassword !== confirmPassword) {
      setMessage('Password baru dan konfirmasi tidak sama!');
      setSuccess(false);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        body: JSON.stringify({ oldPassword, newPassword }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      setMessage(data.message);
      setSuccess(res.ok);
    } catch (err) {
      console.error(err);
      setMessage('Terjadi kesalahan server.');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-0 rounded-4">
      <Card.Body className="p-5">
        <h3 className="fw-bold mb-4 text-center">Reset Password</h3>

        {message && (
          <Alert variant={success ? 'success' : 'danger'}>{message}</Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="oldPassword"
              placeholder="Password Lama"
              size="lg"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="newPassword"
              placeholder="Password Baru"
              size="lg"
              required
              minLength={6}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Konfirmasi Password Baru"
              size="lg"
              required
              minLength={6}
            />
          </Form.Group>

          <div className="d-grid">
            <Button type="submit" size="lg" variant="primary" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan Password'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
