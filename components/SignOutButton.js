// components/SignOutButton.js
"use client";

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

export default function SignOutButton({ onLogout }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Gagal logout");

      // Trigger callback untuk clear session di parent
      if (onLogout) onLogout();

      // Redirect ke login
      router.push("/login");
    } catch (err) {
      console.error("Logout gagal:", err);
    }
  };

  return (
    <Button
      variant="outline-danger"
      size="sm"
      className="w-100 fw-semibold"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
