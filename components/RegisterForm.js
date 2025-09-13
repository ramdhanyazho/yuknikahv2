"use client";

import { useState } from "react";
import { registerUser } from "@/app/actions/registerUser";

export default function RegisterForm() {
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log("📤 Sending form data:", Object.fromEntries(formData));

    const res = await registerUser(formData);
    console.log("📥 Response from action:", res);

    setMessage(res.message);
  };

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

      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
}
