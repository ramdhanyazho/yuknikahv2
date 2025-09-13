// components/RegisterForm.js
'use client';
import { Form, Button } from 'react-bootstrap';

export default function RegisterForm() {
  return (
    <Form>
      <h3 className="fw-bold mb-4 text-center">Silakan registrasi untuk melanjutkan</h3>
      
      <Form.Group className="mb-3" controlId="registerName">
        <Form.Control type="text" placeholder="Name" size="lg" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="registerEmail">
        <Form.Control type="email" placeholder="Email Address" size="lg" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="registerPassword">
        <Form.Control type="password" placeholder="Password" size="lg" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="registerConfirmPassword">
        <Form.Control type="password" placeholder="Confirm Password" size="lg" />
      </Form.Group>
      
      <div className="d-flex justify-content-end mb-3">
        <small>Sudah punya akun? <a href="/login">Login</a></small>
      </div>

      <div className="d-grid">
        <Button variant="primary" type="submit" size="lg">
          Register
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