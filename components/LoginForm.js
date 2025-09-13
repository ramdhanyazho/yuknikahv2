// components/LoginForm.js
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/actions';
import { Button, Form, Card, Alert } from 'react-bootstrap';

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button variant="primary" type="submit" size="lg" disabled={pending}>
      {pending ? 'Loading...' : 'Login'}
    </Button>
  );
}

export default function LoginForm({ onRegisterClick }) {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <Card className="shadow-lg border-0 rounded-4">
      <Card.Body className="p-5">
        <h3 className="fw-bold mb-4 text-center">Silakan masuk untuk melanjutkan</h3>
        
        <Form action={dispatch}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Control type="email" name="email" placeholder="Email Address" size="lg" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Control type="password" name="password" placeholder="Password" size="lg" required />
          </Form.Group>
          
          <div className="d-grid mt-4">
            <LoginButton />
          </div>

          <div className="d-flex justify-content-between mt-3">
            <Button variant="link" className="p-0" onClick={onRegisterClick}>
              Registrasi Manual
            </Button>
            <a href="/lupa-password" className="small">Lupa Password?</a>
          </div>
          
          {errorMessage && (
            <Alert variant="danger" className="mt-3">{errorMessage}</Alert>
          )}
        </Form>

        <div className="text-center text-muted my-3">or</div>

        <div className="d-grid">
          {/* Tambahkan onClick untuk signIn via Google nanti */}
          <Button variant="outline-secondary">
            Sign in with Google
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}