import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/CreateAccount.css';

function CreateAccount() {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = (event) => {
    event.preventDefault();

    fetch('https://parcialdos-back.vercel.app/api/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        fechaNacimiento,
        cedula,
        email,
        celular,
        ciudad,
        password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Cuenta creada con éxito');
        } else {
          alert('Error al crear la cuenta');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleCreateAccount} className="create-account-form">
      <h2>Registro para Sorteos</h2>
      
      <label>Nombre</label>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

      <label>Fecha de Nacimiento</label>
      <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />

      <label>Cédula</label>
      <input type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} required />

      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Celular</label>
      <input type="tel" value={celular} onChange={(e) => setCelular(e.target.value)} required />

      <label>Ciudad</label>
      <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required />

      <label>Contraseña</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <button type="submit">Guardar</button>
      <Link to="/">
        <button>Volver</button>
      </Link>
    </form>
  );
}

export default CreateAccount;
