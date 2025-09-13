// app/template/page.js
import Header from '@/components/Header';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Daftar kategori template sesuai contoh referensi
const categories = [
    "Undangan Pernikahan", "Undangan Khitanan", "Undangan Natal", "Undangan Aqiqah",
    "Undangan Mepandes", "Undangan Tasyakuran", "Undangan Halal Bi Halal", "Undangan Formal",
    "Undangan Peresmian", "Undangan 3 Bulanan", "Undangan Wisuda", "Undangan Ulang Tahun (Anak)",
    "Undangan Ulang Tahun (Dewasa)"
];

export const metadata = {
  title: 'Pilih Tema Undangan Digital | yuknikah.id',
  description: 'Temukan tema undangan online untuk berbagai jenis acara.',
};

export default function TemplatePage() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: '100px', paddingBottom: '60px', backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <p className="text-muted mb-2">PILIH TEMA</p>
              <h1 className="display-5 fw-bold">Sesuaikan Tema Undanganmu</h1>
              <p className="lead text-muted mt-3">
                Gak perlu capek edit-edit tampilan, temanya bisa kalian ubah sesuka hati!
              </p>
              <h2 className="mt-5 mb-4 fw-semibold">Lihat Contoh Undangan</h2>
            </Col>
          </Row>

          {/* Grid untuk daftar tombol kategori */}
          <Row className="justify-content-center">
            <Col lg={9}>
                <div className="d-grid gap-3">
                    {categories.map((category, index) => (
                        <Button 
                            key={index}
                            // Membuat link dinamis ke halaman detail kategori
                            href={`/template/${category.toLowerCase().replace(/\s/g, '-').replace(/[()/]/g, '')}`} 
                            variant="primary" 
                            size="lg"
                            className="text-start p-3 fw-semibold"
                        >
                            {category}
                        </Button>
                    ))}
                     <Button 
                        href="/contoh" // Link ke halaman pencarian umum
                        variant="success" 
                        size="lg"
                        className="text-start p-3 mt-3 fw-semibold"
                    >
                        Cari Undangan Lainnya
                    </Button>
                </div>
            </Col>
          </Row>
        </Container>
      </main>
      {/* Footer bisa ditambahkan di sini nanti */}
    </div>
  );
}