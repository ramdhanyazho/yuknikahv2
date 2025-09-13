// components/RegisterModal.js
'use client';
import { Form, Button, Modal } from 'react-bootstrap';

export default function RegisterModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Registrasi Akun Baru</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <p className="text-muted text-center mb-4">Silakan registrasi untuk melanjutkan</p>
          
          <Form.Group className="mb-3" controlId="registerName">
            <Form.Control type="text" placeholder="Name" size="lg" required />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="registerEmail">
            <Form.Control type="email" placeholder="Email Address" size="lg" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="registerPassword">
            <Form.Control type="password" placeholder="Password" size="lg" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="registerConfirmPassword">
            <Form.Control type="password" placeholder="Confirm Password" size="lg" required />
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
      </Modal.Body>
    </Modal>
  );
}