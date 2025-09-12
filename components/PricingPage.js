// components/PricingPage.js
'use client';

import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Splide, SplideSlide } from '@splidejs/react-splide';

// Data untuk paket harga "Satuan"
const satuanPackages = [
  { name: 'Free', price: '0', description: 'Uji coba gratis tanpa batasan waktu', features: ['Akses Seluruh Tema', 'Ubah Nama Tamu', 'Tanpa Masa Aktif', 'RSVP & Ucapan'] },
  { name: 'Basic', price: '39.000', description: 'Tanpa musik, titip hadiah dan foto', features: ['Semua Fitur Free', 'Bisa Disebar'] },
  { name: 'Pro', price: '69.000', description: 'Bisa foto galery dan titip hadiah', features: ['Semua Fitur Basic', 'Foto Gallery', 'Rekening Titip Hadiah', 'Musik'] },
  { name: 'Premium', price: '119.000', description: 'Semua fitur bisa dipakai tanpa batas', features: ['Semua Fitur Pro', 'Unlimited Revisi', 'Custom Musik', 'Love Story'] },
];

// Data untuk paket harga "Berlangganan"
const langgananPackages = [
    { name: '1 Bulan', price: '150.000', description: 'Bebas buat banyak undangan', features: ['Fitur Premium', 'Akses Semua Fitur', 'Export Undangan Cetak', 'Custom Domain'] },
    { name: '3 Bulan', price: '400.000', description: 'Hemat lebih banyak', features: ['Fitur Premium', 'Akses Semua Fitur', 'Export Undangan Cetak', 'Custom Domain'] },
    { name: '6 Bulan', price: '750.000', description: 'Untuk bisnis Anda', features: ['Fitur Premium', 'Akses Semua Fitur', 'Export Undangan Cetak', 'Custom Domain'] },
];

// Komponen Card untuk setiap paket
function PriceCard({ name, price, description, features }) {
  return (
    <Card className="shadow-lg card-pricelist rounded-4 pb-4 mb-4 border-0 h-100">
      <Card.Body className="p-0 text-center">
        <div className="container text-center py-4">
          <p style={{ fontSize: '2em', fontWeight: 600 }}>{name}</p>
          <p style={{ fontSize: '0.8em' }} className="fst-italic text-center">{description}</p>
        </div>
        <div className="bg-primary text-center py-2">
          <p className="text-white fw-normal m-0" style={{ fontSize: '3em' }}>
            <span className="fs-6 fw-light">Rp.</span>{price}
          </p>
        </div>
        <div className="container px-4 text-start mt-4">
          {features.map((feature, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#03BB16" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd"></path>
              </svg>
              <div className="ps-2">{feature}</div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

export default function PricingPage() {
  const [isSubscription, setIsSubscription] = useState(false);
  const packages = isSubscription ? langgananPackages : satuanPackages;

  return (
    <section className="py-5" style={{ marginTop: '70px' }}>
      <Container>
        <div className="text-center">
            <h1>Harga Undangan Online di yuknikah.id</h1>
            <p className="lead">
                Temukan paket harga undangan digital yang sesuai dengan kebutuhan Anda!
            </p>
        </div>
      
        <div className="d-flex justify-content-center align-items-center my-5">
            <label style={{ fontSize: '1.5rem' }} className={!isSubscription ? '' : 'text-muted'}>Satuan</label>
            <Form.Check
                type="switch"
                id="pricing-switch"
                className="mx-3"
                style={{ transform: 'scale(1.5)' }}
                checked={isSubscription}
                onChange={() => setIsSubscription(!isSubscription)}
            />
            <label style={{ fontSize: '1.5rem' }} className={isSubscription ? '' : 'text-muted'}>Berlangganan</label>
        </div>
      </Container>
      
      <Container>
         {/* Tampilan Desktop (Grid) */}
         <Row className="d-none d-lg-flex">
            {packages.map((pkg, index) => (
                <Col key={index} lg={3} md={6}>
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