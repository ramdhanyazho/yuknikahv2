// components/TemplateCard.js
'use client';

import Image from 'next/image';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

export default function TemplateCard({ template }) {
if (!template || !template.image || !template.name || !template.link || !template.id) {
return null; // atau tampilkan error UI fallback
}

return (
<Card className="mb-4 shadow-sm border-0">
<Row className="g-0">
<Col md={4}>
<Image
src={template.image}
alt={template.name}
width={300}
height={400}
className="img-fluid rounded-start w-100 h-100"
style={{ objectFit: 'cover' }}
/>
</Col>
<Col md={8}>
<Card.Body className="d-flex flex-column h-100 p-4">
<Card.Title as="h4" className="fw-bold">{template.name}</Card.Title>
<Card.Text className="text-primary small text-truncate">
<Link href={template.link} target="_blank" rel="noopener noreferrer">
{template.link}
</Link>
</Card.Text>
<div className="text-warning mb-2">★★★★★</div>
<p className="text-muted small mb-3">{template.uses ?? 0} kali Digunakan</p>
<div className="mt-auto d-flex flex-wrap gap-2">
<Button variant="outline-primary" href={template.link} target="_blank">
Preview
</Button>
<Button variant="success" href={/buat?template=${template.id}}>
Gunakan Tema Ini
</Button>
</div>
</Card.Body>
</Col>
</Row>
</Card>
);
}