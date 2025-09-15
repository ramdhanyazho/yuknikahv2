// components/ResetPasswordModal.js

'use client';

import { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';

export default function ResetPasswordModal({ show, handleClose }) {
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setSuccess(false);
    setLoading(true);

    const formData = new FormData(e.target);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');

    if (newPassword !== confirmPassword) {
      setMessage('Password baru dan konfirmasi tidak cocok');
      setSuccess(false);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      setMessage(data.message);
      setSuccess(data.success);

      if (data.success) {
        setTimeout(() => {
          handleClose();
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setMessage('Terjadi kesalahan server');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && (
          <Alert variant={success ? 'success' : 'danger'}>{message}</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Password Saat Ini</Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password Baru</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Konfirmasi Password Baru</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Reset Password'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
