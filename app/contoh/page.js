// app/contoh/page.js
import Header from '@/components/Header';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Disable prerender untuk cegah error build di Vercel
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Contoh Undangan Digital | yuknikah.id',
  description: 'Lihat berbagai contoh undangan digital untuk acara kamu.',
};

// Daftar kategori undangan
const categories = [
  "Undangan Pernikahan", "Undangan Khitanan", "Undangan Natal", "Undangan Aqiqah",
  "Undangan Mepandes", "Undangan Tasyakuran", "Undangan Halal Bi Halal", "Undangan Formal",
  "Undangan Peresmian", "Undangan 3 Bulanan", "Undangan Wisuda", "Undangan Ulang Tahun (Anak)",
  "Undangan Ulang Tahun (Dewasa)"
];

export default function ContohPage() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: '100px', paddingBottom: '60px', backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <p className="text-muted mb-2">CONTOH UNDANGAN</p>
              <h1 className="display-5 fw-bold">Contoh Undangan Digital</h1>
              <p className="lead text-muted mt-3">
                Gak perlu capek edit-edit tampilan, temanya bisa kalian ubah sesuka hati!
              </p>
              <h2 className="mt-5 mb-4 fw-semibold">Semua Contoh Undangan</h2>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={9}>
              <div className="d-grid gap-3">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    href={`/contoh/${category.toLowerCase().replace(/\s/g, '-').replace(/[()/]/g, '')}`}
                    variant="primary"
                    size="lg"
                    className="text-start p-3 fw-semibold"
                  >
                    {category}
                  </Button>
                ))}
                <Button
                  href="/template" // bisa diarahkan ke page eksplor lainnya
                  variant="success"
                  size="lg"
                  className="text-start p-3 mt-3 fw-semibold"
                >
                  Jelajahi Tema Lainnya
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
