import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './styles/AdminHome.css';

function AdminHome({ user }) {
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(user?.role === 'admin');
    const [winners, setWinners] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            fetchWinners();
        }
    }, [isLoggedIn]);

    const fetchWinners = async () => {
        try {
            const response = await axios.get('/winners');
            setWinners(response.data);
        } catch (error) {
            console.error('Error fetching winners:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { email: adminEmail, password: adminPassword });
            if (response.data.role === 'admin') {
                setIsLoggedIn(true);
                sessionStorage.setItem('token', response.data.token);
                alert("¡Inicio de sesión exitoso!");
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Error al iniciar sesión");
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/admin');
    };

    const handleCreateAdmin = () => {
        navigate('/crear-admin');
    };

    if (!isLoggedIn) {
        return (
            <div className="admin-login-container">
                <h2>Inicio de Sesión Admin</h2>
                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required style={{ color: 'black' }} />

                    <label>Contraseña:</label>
                    <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required style={{ color: 'black' }} />
                    
                    <button type="submit" className="btn">Entrar</button>
                    <button type="button" onClick={handleCreateAdmin}>Crear Administrador</button>
                </form>
            </div>
        );
    }


    return (
        <div className="admin-home-container">
            <h2>Bienvenido, Admin</h2>
            <button onClick={handleLogout} className="logout-button">Salir</button>
            <h3>Tabla de Ganadores</h3>
            <table className="winners-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Cédula</th>
                        <th>Teléfono</th>
                        <th>Código</th>
                        <th>Premio</th>
                    </tr>
                </thead>
                <tbody>
                    {winners.map((winner, index) => (
                        <tr key={index}>
                            <td>{new Date(winner.fecha).toLocaleDateString()}</td>
                            <td>{winner.cedula}</td>
                            <td>{winner.telefono}</td>
                            <td>{winner.codigo}</td>
                            <td>{winner.premio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default AdminHome;
