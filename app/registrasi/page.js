// app/registrasi/page.js
import Header from '@/components/Header';
import RegisterForm from '@/components/RegisterForm';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Image from 'next/image';

export const metadata = {
  title: 'Registrasi | yuknikah.id',
  description: 'Daftar akun baru di yuknikah.id',
};

export default function RegisterPage() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: '120px', paddingBottom: '60px', backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <Card className="shadow-lg border-0 rounded-4">
                <Card.Body className="p-5">
                  <RegisterForm />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}