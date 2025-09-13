// components/LoginForm.js
'use client';
import { Form, Button } from 'react-bootstrap';

export default function LoginForm() {
  return (
    <Form>
      <h3 className="fw-bold mb-4 text-center">Login ke akun Anda</h3>
      
      <Form.Group className="mb-3" controlId="loginEmail">
        <Form.Control type="email" placeholder="Email Address" size="lg" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="loginPassword">
        <Form.Control type="password" placeholder="Password" size="lg" />
      </Form.Group>

      <div className="d-flex justify-content-end mb-3">
        <small>Belum punya akun? <a href="/registrasi">Registrasi</a></small>
      </div>

      <div className="d-grid">
        <Button variant="primary" type="submit" size="lg">
          Login
        </Button>
      </div>

      <div className="text-center text-muted my-3">or</div>

      <div className="d-grid">
        <Button variant="outline-secondary">
          Sign in with Google
        </Button>
      </div>
    </Form>
  );
}
