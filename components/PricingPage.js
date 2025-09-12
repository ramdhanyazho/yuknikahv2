// components/PricingPage.js
'use client';

import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Splide, SplideSlide } from '@splidejs/react-splide';

// Data untuk paket harga "Satuan"
const satuanPackages = [
  { name: 'Free', price: '0', description: 'Uji coba gratis tanpa batasan waktu', features: ['Akses Seluruh Tema', 'Ubah Nama Tamu', 'Tanpa Masa Aktif', 'RSVP & Ucapan'], primary: false },
  { name: 'Basic', price: '39.000', description: 'Tanpa musik, titip hadiah dan foto', features: ['Semua Fitur Free', 'Bisa Disebar'], primary: false },
  { name: 'Pro', price: '69.000', description: 'Bisa foto galery dan titip hadiah', features: ['Semua Fitur Basic', 'Foto Gallery', 'Rekening Titip Hadiah', 'Musik'], primary: true }, // Paket populer
  { name: 'Premium', price: '119.000', description: 'Semua fitur bisa dipakai tanpa batas', features: ['Semua Fitur Pro', 'Unlimited Revisi', 'Custom Musik', 'Love Story'], primary: false },
];

// Data untuk paket harga "Berlangganan"
const langgananPackages = [
    { name: '1 Bulan', price: '150.000', description: 'Bebas buat banyak undangan', features: ['Fitur Premium', 'Akses Semua Fitur', 'Export Undangan Cetak', 'Custom Domain'], primary: false },
    { name: '3 Bulan', price: '400.000', description: 'Hemat lebih banyak', features: ['Fitur Premium', 'Akses Semua Fitur', 'Export Undangan Cetak', 'Custom Domain'], primary: true },
    { name: '6 Bulan', price: '750.000', description: 'Untuk bisnis Anda', features: ['Fitur Premium', 'Akses Semua Fitur', 'Export Undangan Cetak', 'Custom Domain'], primary: false },
];

// Komponen Card untuk setiap paket
function PriceCard({ name, price, description, features, primary }) {
  // Menambahkan border dan shadow jika ini paket utama/populer
  const cardClass = primary 
    ? "shadow-lg rounded-4 border-2 border-primary h-100" 
    : "shadow rounded-4 border border-light h-100";

  return (
    <Card className={cardClass}>
      <Card.Body className="p-0 text-center d-flex flex-column">
        <div className="container text-center py-4">
          <p style={{ fontSize: '2em', fontWeight: 600 }} className="text-dark">{name}</p>
          <p style={{ fontSize: '0.8em' }} className="fst-italic text-muted">{description}</p>
        </div>
        <div className={primary ? "bg-primary text-white text-center py-3" : "bg-light text-primary text-center py-3"}>
          <p className="fw-bold m-0" style={{ fontSize: '2.8em' }}>
            <span className="fs-6 fw-light align-top">Rp.</span>{price}
          </p>
        </div>
        <div className="container px-4 text-start mt-4 flex-grow-1">
          {features.map((feature, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-circle-fill text-success" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
              <div className="ps-2 text-muted">{feature}</div>
            </div>
          ))}
        </div>
         <div className="mt-4 p-4">
            <Button variant={primary ? "primary" : "outline-primary"} className="w-100">Pilih Paket</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default function PricingPage() {
  const [isSubscription, setIsSubscription] = useState(false);
  const packages = isSubscription ? langgananPackages : satuanPackages;

  return (
    // Mengubah background utama menjadi abu-abu sangat muda (light)
    <section className="py-5 bg-light" style={{ marginTop: '70px' }}>
      <Container>
        <div className="text-center text-dark mb-5">
            <h1 className="display-4 fw-bold">Harga Undangan Online di yuknikah.id</h1>
            <p className="lead text-muted">
                Temukan paket harga undangan digital yang sesuai dengan kebutuhan Anda!
            </p>
        </div>
      
        <div className="d-flex justify-content-center align-items-center my-5">
            <label style={{ fontSize: '1.5rem' }} className={!isSubscription ? 'text-dark fw-bold' : 'text-muted'}>Satuan</label>
            <Form.Check
                type="switch"
                id="pricing-switch"
                className="mx-3"
                style={{ transform: 'scale(1.5)' }}
                checked={isSubscription}
                onChange={() => setIsSubscription(!isSubscription)}
            />
            <label style={{ fontSize: '1.5rem' }} className={isSubscription ? 'text-dark fw-bold' : 'text-muted'}>Berlangganan</label>
        </div>
      </Container>
      
      <Container>
         {/* Tampilan Desktop (Grid) */}
         <Row className="d-none d-lg-flex">
            {packages.map((pkg, index) => (
                <Col key={index} lg={3} md={6} className="mb-4">
                    <PriceCard {...pkg} />
                </Col>
            ))}
        </Row>
        
        {/* Tampilan Mobile (Carousel) */}
        <div className="d-lg-none">
            <Splide options={{
                perPage: 1,
                gap: '1rem',
                pagination: true,
                arrows: false,
                padding: '2rem',
            }}>
                {packages.map((pkg, index) => (
                    <SplideSlide key={index}>
                        <PriceCard {...pkg} />
                    </SplideSlide>
                ))}
            </Splide>
        </div>
      </Container>
    </section>
  );
}