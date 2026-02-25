import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/auth/register', { name, email, password });
    alert('Registered Successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} /><br />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;