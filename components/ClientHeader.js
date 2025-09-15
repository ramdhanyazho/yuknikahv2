'use client';

import { Dropdown, Image } from 'react-bootstrap';
import { signOut } from 'next-auth/react';

export default function ClientHeader({ user }) {
  const avatar = user?.image;
  const name = user?.name || "Klien Anda";

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="d-flex justify-content-end align-items-center mb-3">
      <Dropdown align="end">
        <Dropdown.Toggle
          variant="light"
          className="d-flex align-items-center border-0 bg-transparent"
          id="dropdown-user"
        >
          {avatar ? (
            <Image
              src={avatar}
              alt="avatar"
              roundedCircle
              width={36}
              height={36}
            />
          ) : (
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: "#6c757d",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              {initials}
            </div>
          )}
          <span className="ms-2 fw-semibold">{name}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className="shadow-sm rounded-3">
          <Dropdown.Item href="/dashboard/profil">
            <i className="bi bi-person me-2"></i> Profil Saya
          </Dropdown.Item>
          <Dropdown.Item href="/dashboard/change-password">
            <i className="bi bi-key me-2"></i> Ganti Password
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-danger"
          >
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
