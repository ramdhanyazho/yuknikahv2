// app/template/[category]/page.js
import Header from '@/components/Header';
import TemplateCard from '@/components/TemplateCard';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';

// DATA DUMMY YANG LEBIH LENGKAP UNTUK SEMUA KATEGORI
const allTemplates = [
  // Pernikahan
  { id: 1, name: 'Super-Classic', category: 'pernikahan', uses: 19505, image: '/sampul/1.webp', link: '/s/1952/undangan/161?kpd=Bapak%20Budi' },
  { id: 2, name: 'Elegan-Grey', category: 'pernikahan', uses: 4275, image: '/sampul/2.webp', link: '/s/1952/undangan/79?kpd=Bapak%20Budi' },
  { id: 3, name: 'Black-Java', category: 'pernikahan', uses: 3500, image: '/sampul/3.webp', link: '/s/1952/undangan/82?kpd=Bapak%20Budi' },
  // Khitanan
  { id: 4, name: 'Sunatan Ceria', category: 'khitanan', uses: 5000, image: '/sampul/1.webp', link: '#' },
  // Ulang Tahun
  { id: 5, name: 'Ulang Tahun Dino', category: 'ulang-tahun-anak', uses: 8900, image: '/sampul/2.webp', link: '#' },
  { id: 6, name: 'Sweet Seventeen', category: 'ulang-tahun-dewasa', uses: 6100, image: '/sampul/3.webp', link: '#' },
  // Natal
  { id: 7, name: 'Christmas Joy', category: 'natal', uses: 12000, image: '/sampul/1.webp', link: '#' },
];

export const metadata = {
  title: 'Pilih Tema Undangan',
  description: 'Temukan tema undangan yang sesuai untuk acara spesial Anda.',
};

export default function CategoryTemplatePage({ params }) {
  // Mengambil kategori dari URL, contoh: 'undangan-pernikahan'
  const categorySlug = decodeURIComponent(params.category || 'semua');
  // Membersihkan nama kategori untuk ditampilkan, contoh: 'Undangan Pernikahan'
  const formattedTitle = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // LOGIKA FILTER BARU
  // Menghapus 'undangan-' dari slug untuk mencocokkan dengan data
  const filterCategory = categorySlug.replace('undangan-', '');
  const templatesToShow = allTemplates.filter(template => 
    template.category === filterCategory
  );

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

          <Row className="justify-content-center">
            <Col lg={10}>
                <div className="mb-4">
                    <InputGroup>
                    <Form.Control placeholder="Cari Tema (Contoh: Pandora-Classic)" />
                    <Button variant="outline-secondary">Filter</Button>
                    </InputGroup>
                </div>
                
                <h3 className="fw-semibold mb-3">Tema Terpopuler di Kategori "{formattedTitle}"</h3>
                <hr className="mb-4"/>

                <div>
                    {templatesToShow.length > 0 ? (
                        templatesToShow.map(template => (
                        <TemplateCard key={template.id} template={template} />
                        ))
                    ) : (
                        <div className="text-center py-5">
                            <p className="fs-4 text-muted">Oops!</p>
                            <p className="text-muted">Belum ada template untuk kategori ini.</p>
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