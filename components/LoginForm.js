// components/LoginForm.js
'use client';
import { Button, Form, Card } from 'react-bootstrap';

// Menerima properti onRegisterClick
export default function LoginForm({ onRegisterClick }) {
  return (
    <Card className="shadow-lg border-0 rounded-4">
      <Card.Body className="p-5">
        <h3 className="fw-bold mb-4 text-center">Silakan masuk untuk melanjutkan</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Username or Email" size="lg" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" size="lg" />
          </Form.Group>
          
          <div className="d-grid mt-4">
            <Button variant="primary" type="submit" size="lg">
              Login
            </Button>
          </div>

          <div className="d-flex justify-content-between mt-3">
            {/* Tombol ini sekarang akan memicu fungsi onRegisterClick */}
            <Button variant="link" className="p-0" onClick={onRegisterClick}>
              Registrasi Manual
            </Button>
            <a href="/lupa-password" className="small">Lupa Password?</a>
          </div>

          <div className="text-center text-muted my-3">or</div>

           <div className="d-grid">
             <Button variant="outline-secondary">
                Sign in with Google
             </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}