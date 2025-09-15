'use client';

import { useState } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';

export default function ProfilPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle update profil
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal update profil');

      setMessage({ type: 'success', text: 'Profil berhasil diperbarui ✅' });
    } catch (err) {
      setMessage({ type: 'danger', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Handle upload avatar
  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    if (!avatar) {
      setMessage({ type: 'warning', text: 'Pilih file avatar dulu!' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', avatar);

      const res = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal upload avatar');

      setMessage({ type: 'success', text: 'Avatar berhasil diperbarui ✅' });
    } catch (err) {
      setMessage({ type: 'danger', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm p-4">
      <h3 className="mb-4">Profil Saya</h3>

      {message && <Alert variant={message.type}>{message.text}</Alert>}

      {/* Form Update Profil */}
      <Form onSubmit={handleUpdate} className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Nama Lengkap</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nomor Telepon</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan nomor telepon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : 'Update Profil'}
        </Button>
      </Form>

      {/* Form Upload Avatar */}
      <Form onSubmit={handleAvatarUpload}>
        <Form.Group className="mb-3">
          <Form.Label>Upload Avatar</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </Form.Group>

        <Button type="submit" variant="success" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : 'Upload Avatar'}
        </Button>
      </Form>
    </Card>
  );
}
