// components/Hero.js
'use client';
import Image from 'next/image';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Splide, SplideSlide } from '@splidejs/react-splide';

export default function Hero() {
  return (
    // Memberi jarak dari header yang fixed-top
    <section className="bg-light" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <Container>
        <Row className="align-items-center gy-4">
          {/* Kolom Teks */}
          <Col lg={6} md={6}>
            <div>
              <h1 className="display-4 fw-bolder text-body-emphasis">
                Buat Undangan <br /> Digital Gratis<br /> Tanpa Ribet!
              </h1>
              <p className="mt-3 fs-6 text-muted">
                Coba sekarang dan buat undangan digital uji coba <strong>GRATIS</strong> untuk segala acara dalam waktu <strong>5 menit</strong>.
                Gak mau ribet? Minta <strong>dibuatin admin</strong> uji coba Gratis, bayar setelah jadi.
              </p>
              <div className="mt-4">
                <Button href="/registrasi" variant="primary" size="lg" className="me-2 px-4 py-2 fw-semibold">
                  Uji Coba Gratis &gt;
                </Button>
                <Button href="#kontak-admin" variant="outline-success" size="lg" className="px-4 py-2 fw-semibold">
                  Dibuatin Admin Aja
                </Button>
              </div>
            </div>
          </Col>
          
          {/* Kolom Gambar */}
          <Col lg={6} md={6} className="d-none d-md-block">
             <Splide options={{ type: 'loop', autoplay: true, interval: 3000, arrows: false, pagination: false }}>
                <SplideSlide>
                    {/* Pastikan Anda memiliki gambar-gambar ini di folder /public/sampul/ */}
                    <Image src="/sampul/1.webp" alt="Contoh Undangan 1" width={500} height={500} className="img-fluid rounded-3" />
                </SplideSlide>
                <SplideSlide>
                    <Image src="/sampul/2.webp" alt="Contoh Undangan 2" width={500} height={500} className="img-fluid rounded-3" />
                </SplideSlide>
                 <SplideSlide>
                    <Image src="/sampul/3.webp" alt="Contoh Undangan 3" width={500} height={500} className="img-fluid rounded-3" />
                </SplideSlide>
             </Splide>
          </Col>
        </Row>
      </Container>
    </section>
  );
}