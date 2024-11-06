import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './styles/Form.css';

function Form({ callback }) {
    const [email, setEmail] = useState('');  // Cambiado a email
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const goTo = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/login', { email, password });

            if (response.status === 200) {
                const data = response.data;
                callback(data.role);

                // Store the token in sessionStorage
                sessionStorage.setItem('token', data.token);

                if (data.role === 'user') {
                    goTo("/user");
                }
            }
        } catch (error) {
            console.error('Error en la autenticación:', error);
            setError(error.response?.data?.message || 'Error al intentar iniciar sesión.');
        }
    };

    const goToCreateAccount = () => {
        goTo('/registro');
    };

    return (
        <div>
        <form onSubmit={validateUser}>
            <h1>Bienvenido a la App de Premios</h1>
            <h4>Correo Electrónico</h4>  
            <input
                type="email"  // Cambiado a tipo email para validar correos electrónicos
                value={email}  // Cambiado a email
                onChange={(e) => setEmail(e.target.value)}
                required
            /><br />
            <h4>Contraseña</h4>  
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br />
            <button type="submit" className="btn">Ingresar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="button" onClick={goToCreateAccount}>
                Registrarse
            </button>
        </form>
        <Link to="/admin">
            <button>Administrar</button>
        </Link>
  </div>
        
    );
}

export default Form;
