/* /app/dashboard/profil/page.js */

'use client';

import { useState } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { signOut } from "next-auth/react";

// Helper agar aman parsing JSON
async function safeFetchJson(res) {
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return await res.json();
  } else {
    const text = await res.text();
    return { error: text }; // biar gak crash kalau bukan JSON
  }
}

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
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);

      const res = await fetch('/api/update-profile', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await safeFetchJson(res);
      if (!res.ok) throw new Error(data.error || 'Gagal update profil');

      setMessage({ type: 'success', text: data.message || 'Profil berhasil diperbarui ✅' });
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
        credentials: 'include',
      });

      const data = await safeFetchJson(res);
      if (!res.ok) throw new Error(data.error || 'Gagal upload avatar');

      setMessage({ type: 'success', text: data.message || 'Avatar berhasil diperbarui ✅' });
      setAvatar(null); // reset input file
    } catch (err) {
      setMessage({ type: 'danger', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (res.ok) {
        await signOut({ callbackUrl: "/" });
      } else {
        console.error("Gagal logout:", await res.text());
      }
    } catch (err) {
      console.error("Logout error:", err);
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
      <Form onSubmit={handleAvatarUpload} className="mb-4">
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

      {/* Tombol Logout */}
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </Card>
  );
}
