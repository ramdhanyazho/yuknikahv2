// app/template/[category]/page.js
import Header from '@/components/Header';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';

// CONTOH DATA TEMPLATE - Nanti Anda akan mengambil ini dari database
const dummyTemplates = [
  { id: 1, name: 'Super-Classic', category: 'pernikahan', popular: true, uses: 19505, image: '/sampul/1.webp', link: '/s/1952/undangan/161?kpd=Bapak%20Budi' },
  { id: 2, name: 'Elegan-Grey', category: 'pernikahan', popular: false, uses: 4275, image: '/sampul/2.webp', link: '/s/1952/undangan/79?kpd=Bapak%20Budi' },
  { id: 3, name: 'Black-Java', category: 'pernikahan', popular: false, uses: 3500, image: '/sampul/3.webp', link: '/s/1952/undangan/82?kpd=Bapak%20Budi' },
  { id: 4, name: 'Aesthetic-Romance', category: 'pernikahan', popular: false, uses: 3210, image: '/sampul/1.webp', link: '/s/1952/undangan/199?kpd=Bapak%20Budi' },
  // Tambahkan contoh template lain untuk kategori lain jika perlu
];

// Komponen untuk satu kartu template
function TemplateCard({ template }) {
    return (
        <Card className="mb-4 shadow-sm border-0">
            <Row className="g-0">
                <Col md={4}>
                    <Image src={template.image} alt={template.name} width={300} height={400} className="img-fluid rounded-start" />
                </Col>
                <Col md={8}>
                    <Card.Body className="d-flex flex-column h-100">
                        <Card.Title as="h4" className="fw-bold">{template.name}</Card.Title>
                        <Card.Text className="text-muted">
                            <Link href={template.link} target="_blank">{template.link}</Link>
                        </Card.Text>
                        <div className="d-flex align-items-center text-warning mb-2">
                           {/* Bintang Rating */}
                           ★★★★★
                        </div>
                        <p className="text-muted small">{template.uses} kali Digunakan</p>
                        <div className="mt-auto d-flex gap-2">
                            <Button variant="outline-primary" href={template.link} target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill me-1" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg>
                                Preview
                            </Button>
                            <Button variant="success" href={`/buat?template=${template.id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill me-1" viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-4.995-3.178 11.25-6.972Z"/></svg>
                                Sebar Dengan Tema Ini
                            </Button>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}


export default function CategoryTemplatePage({ params }) {
  // Mengambil kategori dari URL, contoh: 'pernikahan'
  const categoryName = decodeURIComponent(params.category || 'Semua');
  const formattedTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).replace(/-/g, ' ');

  // Nanti, Anda akan filter template dari database berdasarkan kategori
  const templates = dummyTemplates;

  return (
    <div>
      <Header />
      <main style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        <Container>
          <div className="text-center mb-5">
            <p className="text-muted">PILIH TEMA</p>
            <h1 className="display-5 fw-bold">Sesuaikan Tema Undanganmu</h1>
            <p className="lead text-muted col-lg-8 mx-auto">
              Gak perlu capek edit-edit tampilan, temanya bisa kalian ubah sesuka hati!
            </p>
          </div>

          <div className="mb-4">
            <InputGroup>
              <Form.Control
                placeholder="Cari Tema (Contoh: Pandora-Classic)"
                aria-label="Cari Tema"
              />
              <Button variant="outline-secondary">Filter</Button>
            </InputGroup>
          </div>
          
          <h3 className="fw-semibold">Tema Terpopuler di Kategori "{formattedTitle}"</h3>
          <hr/>

          <div>
            {templates.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

        </Container>
      </main>
    </div>
  );
}