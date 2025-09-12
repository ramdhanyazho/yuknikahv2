// components/Hero.js
import Image from 'next/image';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Hero() {
  return (
    // Tambahkan pt-5 dan style={{ marginTop: '70px' }} untuk memberi ruang di bawah header
    <section className="bg-white py-5 pt-5" style={{ marginTop: '70px' }}>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} md={6}>
            <div className="py-5">
              <h1 className="fw-bold display-4">
                Buat Undangan <br /> Digital Gratis <br /> Tanpa Ribet!
              </h1>
              <p className="mt-3 fs-6">
                Coba sekarang dan buat undangan digital uji coba <strong>GRATIS</strong> untuk segala acara dalam waktu <strong>5 menit</strong>.
                Gak mau ribet? Minta <strong>dibuatin admin</strong> uji coba Gratis, bayar setelah jadi.
              </p>
              <div className="mt-4">
                <Button variant="primary" size="lg" className="me-2">
                  Uji Coba Gratis &gt;
                </Button>
                <Button variant="outline-success" size="lg">
                  Dibuatin Admin Aja
                </Button>
              </div>
            </div>
          </Col>
          <Col lg={6} md={6} className="d-none d-md-block">
            {/* Ganti `src` dengan path ke gambar mockup Anda */}
            {/* Simpan gambar di folder `public` */}
            <Image
              src="/mockup.png" // Contoh: public/mockup.png
              alt="Mockup Undangan Digital"
              width={600}
              height={600}
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}