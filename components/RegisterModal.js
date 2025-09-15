/* components/RegisterModal.js */

'use client';

import { Modal, Button } from 'react-bootstrap';
import RegisterForm from './RegisterForm';

export default function RegisterModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Registrasi Akun Baru</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <RegisterForm
          onSuccess={() => {
            handleClose(); // auto-close setelah register sukses
          }}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
