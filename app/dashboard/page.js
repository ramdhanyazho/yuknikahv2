import { Card, Button } from 'react-bootstrap';

export default function DashboardPage() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Data Acara</h2>
          <p className="text-muted">Seluruh data Acara tersedia disini</p>
        </div>
        <div>
          <Button variant="light" className="me-2">
            Data Acara
          </Button>
          <Button variant="success">Tambah Acara</Button>
        </div>
      </div>

      <Card className="text-center p-5 border-0" style={{ backgroundColor: '#f8f9fa' }}>
        <Card.Body>
          <Card.Text>
            <span style={{ fontSize: '4rem', opacity: 0.3 }}>📄</span>
          </Card.Text>
          <Card.Title as="h3" className="fw-bold my-3">
            Belum Ada Acara
          </Card.Title>
          <Card.Text className="text-muted">
            Klik Tambah Acara, Pilih Jenis Acara, Isi Seluruh Data, Klik Simpan, Klik Preview.
          </Card.Text>
          <Button variant="success" className="mt-3 px-4">
            Tambah Acara
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
