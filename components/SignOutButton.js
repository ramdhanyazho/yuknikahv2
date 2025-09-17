// components/SignOutButton.js
"use client";

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

export default function SignOutButton({ className = "", redirectTo = "/" }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Gagal logout");

      // 🔹 Clear cache session Next.js App Router
      router.push(redirectTo);
      router.refresh(); // penting biar AvatarDropdown refetch /api/auth/session
    } catch (err) {
      console.error("Logout gagal:", err);
    }
  };

  return (
    <Button
      variant="outline-danger"
      size="sm"
      className={`fw-semibold ${className}`}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
