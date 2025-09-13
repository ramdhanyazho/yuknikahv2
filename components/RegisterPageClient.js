'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPageClient() {
  return (
    <main style={{ paddingTop: '120px', paddingBottom: '60px', backgroundColor: '#f8f9fa' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow-sm rounded-4">
              <Card.Body>
                <h3 className="mb-4 text-center">Buat Akun Baru</h3>
                <RegisterForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
