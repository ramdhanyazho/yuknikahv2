// components/RegisterForm.js
'use client';

import { useFormState } from 'react-dom';
import { registerUser } from '@/app/actions-register';

export default function RegisterForm() {
  const initialState = { message: null, success: false };
  const [state, dispatch] = useFormState(registerUser, initialState);

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <h3>DEBUG Register Form</h3>

      {/* Notifikasi dari server action */}
      {state.message && (
        <div style={{ 
          background: state.success ? "#d4edda" : "#f8d7da", 
          padding: 10, 
          borderRadius: 4, 
          marginBottom: 10 
        }}>
          {state.message}
        </div>
      )}

      <form action={dispatch}>
        <input type="text" name="name" placeholder="Name" required style={{ display: "block", marginBottom: 10, width: "100%" }} />
        <input type="email" name="email" placeholder="Email" required style={{ display: "block", marginBottom: 10, width: "100%" }} />
        <input type="password" name="password" placeholder="Password" required style={{ display: "block", marginBottom: 10, width: "100%" }} />

        <button type="submit" style={{ padding: "10px 20px" }}>Register</button>
      </form>
    </div>
  );
}
