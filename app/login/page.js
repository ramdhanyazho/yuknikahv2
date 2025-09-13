// app/login/page.js
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import { Container, Row, Col, Card } from 'react-bootstrap';

export const metadata = {
  title: 'Login | yuknikah.id',
  description: 'Masuk ke akun yuknikah.id',
};

export default function LoginPage() {
  return (
    <div>
      <Header />
      <main
        style={{
          paddingTop: '120px',
          paddingBottom: '60px',
          backgroundColor: '#f8f9fa',
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} md={8}>
              <Card className="shadow-lg border-0 rounded-4">
                <Card.Body className="p-5">
                  <LoginForm />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
