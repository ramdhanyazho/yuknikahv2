// components/RegisterForm.js
'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { registerUser } from '@/app/actions-register';
import { Form, Button, Alert } from 'react-bootstrap';
import { signIn } from 'next-auth/react';

function RegisterButton() {
  const { pending } = useFormStatus();
  return (
    <Button variant="primary" type="submit" size="lg" disabled={pending}>
      {pending ? 'Mendaftarkan...' : 'Register'}
    </Button>
  );
}

export default function RegisterForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(registerUser, initialState);

  return (
    <Form action={dispatch}>
      <h3 className="fw-bold mb-4 text-center">Silakan registrasi untuk melanjutkan</h3>
      
      <Form.Group className="mb-3" controlId="registerName">
        <Form.Control type="text" name="name" placeholder="Name" size="lg" required />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="registerEmail">
        <Form.Control type="email" name="email" placeholder="Email Address" size="lg" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="registerPassword">
        <Form.Control type="password" name="password" placeholder="Password" size="lg" required />
      </Form.Group>
      
      <div className="d-flex justify-content-end mb-3">
        <small>Sudah punya akun? <a href="/login">Login</a></small>
      </div>

      <div className="d-grid">
        <RegisterButton />
      </div>

      {state.message && (
        <Alert variant="danger" className="mt-3">{state.message}</Alert>
      )}

      <div className="text-center text-muted my-3">or</div>

       <div className="d-grid">
         <Button 
            variant="outline-secondary"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          >
            Sign in with Google
         </Button>
      </div>
    </Form>
  );
}