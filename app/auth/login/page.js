'use client';

import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

export default function LoginPage() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div style={{ maxWidth: '420px', width: '100%' }}>
          <LoginForm onRegisterClick={() => setShowRegister(true)} />
        </div>
      </div>

      {/* Modal Register */}
      <Modal show={showRegister} onHide={() => setShowRegister(false)}>
        <Modal.Body>
          <RegisterForm onSuccess={() => setShowRegister(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
}
