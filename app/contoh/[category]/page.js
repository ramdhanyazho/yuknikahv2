// app/contoh/[category]/page.js
import Header from '@/components/Header';
import TemplateCard from '@/components/TemplateCard';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';

// DATA DUMMY UNTUK DEMO
const allTemplates = [
  { id: 1, name: 'Super-Classic', category: 'pernikahan', uses: 19505, image: '/sampul/1.webp', link: '#' },
  { id: 2, name: 'Elegan-Grey', category: 'pernikahan', uses: 4275, image: '/sampul/2.webp', link: '#' },
  { id: 3, name: 'Black-Java', category: 'pernikahan', uses: 3500, image: '/sampul/3.webp', link: '#' },
  { id: 4, name: 'Sunatan Ceria', category: 'khitanan', uses: 5000, image: '/sampul/1.webp', link: '#' },
  { id: 5, name: 'Ulang Tahun Dino', category: 'ulang-tahun-anak', uses: 8900, image: '/sampul/2.webp', link: '#' },
];

export const metadata = {
  title: 'Contoh Undangan | yuknikah.id',
  description: 'Lihat berbagai contoh undangan berdasarkan kategori acara Anda.',
};

export default function CategoryContohPage({ params }) {
  const categorySlug = decodeURIComponent(params.category || 'semua');
  const formattedTitle = categorySlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const filterCategory = categorySlug.replace('undangan-', '');
  const templatesToShow = allTemplates.filter(
    (template) => template.category === filterCategory
  );

  return (
    <div>
      <Header />
      <main
        style={{ paddingTop: '100px', paddingBottom: '60px', backgroundColor: '#f8f9fa' }}
      >
        <Container>
          <div className="text-center mb-5">
            <p className="text-muted">CONTOH UNDANGAN</p>
            <h1 className="display-5 fw-bold">Contoh Undangan Kategori "{formattedTitle}"</h1>
            <p className="lead text-muted col-lg-8 mx-auto">
              Semua contoh bisa dikustom dengan mudah. Pilih desain yang kamu suka!
            </p>
          </div>

          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="mb-4">
                <InputGroup>
                  <Form.Control placeholder="Cari Contoh Undangan (Contoh: Super-Classic)" />
                  <Button variant="outline-secondary">Filter</Button>
                </InputGroup>
              </div>

              <h3 className="fw-semibold mb-3">Contoh Terpopuler</h3>
              <hr className="mb-4" />

              <div>
                {templatesToShow.length > 0 ? (
                  templatesToShow.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))
                ) : (
                  <div className="text-center py-5">
                    <p className="fs-4 text-muted">Oops!</p>
                    <p className="text-muted">Belum ada contoh untuk kategori ini.</p>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
