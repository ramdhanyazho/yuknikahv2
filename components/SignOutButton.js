// components/SignOutButton.js
'use client';

import { Button } from 'react-bootstrap';
import { handleSignOut } from '@/app/actions';

export default function SignOutButton() {
  return (
    <form action={handleSignOut} className="mt-auto">
      <Button type="submit" variant="outline-danger" className="w-100 fw-medium">
        Logout
      </Button>
    </form>
  );
}