// components/PricingPage.js
'use client';

import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Splide, SplideSlide } from '@splidejs/react-splide';

// Data untuk paket harga "Satuan"
const satuanPackages = [
  { name: 'Free', price: '0', description: 'Uji coba gratis tanpa batasan waktu', features: { "Akses Seluruh Tema": true, "Ubah Nama Tamu": true, "Tanpa Masa Aktif": true, "RSVP & Ucapan": true, "Lokasi Maps": true, "Unlimited Penerima": true, "Countdown & Save To Calendar": true, "Foto Gallery": false } },
  { name: 'Basic', price: '39.000', description: 'Tanpa musik, titip hadiah dan foto', features: { "Semua Fitur Free": true, "Bisa Disebar": true, "Foto Gallery": false, "Rekening Titip Hadiah": false, "Musik": false } },
  { name: 'Pro', price: '69.000', description: 'Bisa foto galery dan titip hadiah', features: { "Semua Fitur Basic": true, "Musik": true, "Titip Kado Fisik": true, "Virtual Gift": true, "Foto Gallery": true, "Rekening Titip Hadiah": true }, primary: true },
  { name: 'Premium', price: '119.000', description: 'Semua fitur bisa dipakai tanpa batas', features: { "Semua Fitur Pro": true, "Unlimited Revisi": true, "Custom Musik": true, "Love Story": true } },
];

// Komponen Card untuk setiap paket
function PriceCard({ name, price, description, features, primary }) {
  const cardClass = primary ? "shadow-lg rounded-4 border-2 border-primary h-100" : "shadow-sm rounded-4 border border-light h-100";

  return (
    <Card className={cardClass}>
      <Card.Body className="p-0 text-center d-flex flex-column">
        <div className="container text-center py-4">
          <p style={{ fontSize: '2em', fontWeight: 600 }} className="text-dark mb-1">{name}</p>
          <p style={{ fontSize: '0.9em' }} className="text-muted px-2">{description}</p>
        </div>
        <div className={primary ? "bg-primary text-white text-center py-3" : "bg-light text-primary text-center py-3"}>
          <p className="fw-bold m-0" style={{ fontSize: '2.8em' }}>
            <span className="fs-6 fw-light align-top">Rp.</span>{price}
          </p>
        </div>
        <div className="container px-4 text-start mt-4 flex-grow-1">
          {Object.entries(features).map(([feature, enabled], index) => (
            <div key={index} className={`d-flex align-items-center mb-2 ${enabled ? '' : 'text-decoration-line-through text-muted'}`}>
              {enabled ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-circle-fill text-success flex-shrink-0" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle-fill text-danger flex-shrink-0" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                </svg>
              )}
              <div className="ps-2">{feature}</div>
            </div>
          ))}
        </div>
         <div className="mt-auto p-4">
            <Button variant={primary ? "primary" : "outline-primary"} className="w-100 fw-bold py-2">Pilih Paket</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default function PricingPage() {
  const [isSubscription, setIsSubscription] = useState(false);
  const packages = satuanPackages;
  
  return (
    <section className="py-5" style={{ marginTop: '70px' }}>
      <Container>
        <div className="text-center text-dark mb-4">
            <h1 className="display-5 fw-bold">Harga Undangan Online di yuknikah.id</h1>
            <p className="lead text-muted col-lg-8 mx-auto">
                Temukan paket harga undangan digital yang sesuai dengan kebutuhan Anda!
            </p>
        </div>
        <div className="text-center text-dark my-5">
            <h2 className="fw-bold">Harga Terjangkau untuk Buat Undangan Online</h2>
             <div className="d-flex justify-content-center align-items-center mt-4">
                <label style={{ fontSize: '1.2rem' }} className={!isSubscription ? 'fw-bold' : 'text-muted'}>Satuan</label>
                <Form.Check
                    type="switch"
                    id="pricing-switch"
                    className="mx-3"
                    style={{ transform: 'scale(1.4)' }}
                    checked={isSubscription}
                    onChange={() => setIsSubscription(!isSubscription)}
                />
                <label style={{ fontSize: '1.2rem' }} className={isSubscription ? 'fw-bold' : 'text-muted'}>Berlangganan</label>
            </div>
        </div>
      </Container>
      
      <Container>
         <div className="d-none d-lg-block">
             <Row>
                {packages.map((pkg, index) => (
                    <Col key={index} lg={3} md={6} className="mb-4">
                        <PriceCard {...pkg} />
                    </Col>
                ))}
            </Row>
         </div>
        
        <div className="d-lg-none">
            <Splide options={{ perPage: 1, gap: '1rem', pagination: true, arrows: false, padding: '2rem' }}>
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