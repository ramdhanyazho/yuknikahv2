'use client';

import Image from 'next/image';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

export default function TemplateCard({ template }) {
  return (
    <Card className="mb-4 shadow-sm border-0">
      <Row className="g-0">
        <Col md={4}>
          <div className="w-100 h-100 position-relative" style={{ minHeight: 200 }}>
            <Image 
              src={template.image || '/placeholder.png'} 
              alt={template.name || 'Template Image'} 
              layout="fill"
              className="img-fluid rounded-start"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </Col>
        <Col md={8}>
          <Card.Body className="d-flex flex-column h-100 p-4">
            <Card.Title as="h4" className="fw-bold">
              {template.name}
            </Card.Title>

            <Card.Text className="text-primary small text-truncate">
              <Link href={template.link} passHref legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                  {template.link}
                </a>
              </Link>
            </Card.Text>

            <div className="text-warning mb-2">★★★★★</div>

            <p className="text-muted small mb-3">
              {template.uses?.toLocaleString('id-ID') || 0} kali Digunakan
            </p>

            <div className="mt-auto d-flex flex-wrap gap-2">
              <Button 
                variant="outline-primary"
                as="a"
                href={template.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview
              </Button>

              <Link href={`/buat?template=${template.id}`} passHref legacyBehavior>
                <Button variant="success" as="a">
                  Gunakan Tema Ini
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
