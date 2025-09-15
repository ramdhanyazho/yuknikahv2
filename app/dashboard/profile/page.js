'use client';

import { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

export default function ProfilePage() {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  // 🔹 Ambil data user dari session API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        if (data?.user) {
          setForm({ name: data.user.name || '', phone: data.user.phone || '' });
          setImage(data.user.image || '');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Submit profil (nama & phone)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(data.message);
      setSuccess(res.ok);
    } catch (err) {
      setMessage('Gagal menyimpan profil');
      setSuccess(false);
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Upload Avatar
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSaving(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setMessage(data.message);
      setSuccess(res.ok);
      if (res.ok) setImage(data.url);
    } catch (err) {
      setMessage('Gagal upload avatar');
      setSuccess(false);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <Card className="shadow-lg border-0 rounded-4">
      <Card.Body className="p-5">
        <h3 className="fw-bold mb-4 text-center">Profil Saya</h3>

        {message && (
          <Alert variant={success ? 'success' : 'danger'}>{message}</Alert>
        )}

        <div className="text-center mb-4">
          <label htmlFor="avatar-upload" style={{ cursor: 'pointer' }}>
            {image ? (
              <img
                src={image}
                alt="Avatar"
                width={100}
                height={100}
                className="rounded-circle border"
              />
            ) : (
              <div
                className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
                style={{ width: 100, height: 100 }}
              >
                {form.name ? form.name[0].toUpperCase() : 'U'}
              </div>
            )}
          </label>
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={handleUpload}
            hidden
          />
          <p className="small text-muted mt-2">Klik avatar untuk ganti foto</p>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              size="lg"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nomor Telepon</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              size="lg"
            />
          </Form.Group>

          <div className="d-grid">
            <Button type="submit" size="lg" variant="primary" disabled={saving}>
              {saving ? 'Menyimpan...' : 'Simpan Profil'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
