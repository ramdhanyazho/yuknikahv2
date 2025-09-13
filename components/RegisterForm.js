"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData);

    console.log("📤 Sending:", body);

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log("📥 Response:", data);

    setMessage(data.message);
    setSuccess(data.success);
  };

  // Auto redirect jika sukses
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="border p-2 w-full"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-2 w-full"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="border p-2 w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Register
      </button>

      {message && (
        <p
          className={`mt-2 text-sm ${
            success ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
