// components/ResetPasswordModal.js
'use client';

import { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

export default function ResetPasswordModal({ show, handleClose }) {
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const email = e.target.email.value;
    const newPassword = e.target.newPassword.value;

    const res = await fetch('/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword }),
    });

    const data = await res.json();
    setMessage(data.message);
    setSuccess(data.success);

    if (data.success) {
      e.target.reset();
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
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>Password Baru</Form.Label>
            <Form.Control type="password" name="newPassword" required />
          </Form.Group>
          <div className="d-grid">
            <Button type="submit" variant="primary">
              Reset Password
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
