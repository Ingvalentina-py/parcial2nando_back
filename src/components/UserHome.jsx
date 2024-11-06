import { useState, useEffect } from "react";
import axios from 'axios';
import './styles/UserHome.css';

function UserHome() {
    const [codigo, setCodigo] = useState('');
    const [registros, setRegistros] = useState([]);
    const [mensaje, setMensaje] = useState('');


    useEffect(() => {
        cargarCodigosRegistrados();
    }, []);

    const cargarCodigosRegistrados = async () => {
        try {
            const response = await axios.get('/codigos-registrados');
            setRegistros(response.data);
        } catch (error) {
            console.error('Error al cargar códigos registrados:', error);
        }
    };
  
    const handleRegistrarCodigo = async () => {
        if (!/^\d{3}$/.test(codigo)) {
            setMensaje('El código debe ser un número de 3 dígitos entre 000 y 999.');
            return;
        }

        try {
            const response = await axios.post('/codigos', { codigo });
            setMensaje(response.data.message);
            if (response.data.success) {
                setRegistros([...registros, response.data]);
            }
            setCodigo('');
            cargarCodigosRegistrados();
        } catch (error) {
            setMensaje(error.response?.data?.message || 'Error al procesar la solicitud.');
        }
    };
  
    return (
        <div className="user-container">
            <h2>Registro de Códigos</h2>
            <input
                type="text"
                placeholder="Ingresa un código (000 - 999)"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
            />
            <button onClick={handleRegistrarCodigo}>Validar Código</button>
            {mensaje && <p>{mensaje}</p>}
            
            <h3>Códigos Registrados</h3>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Premio Obtenido</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((registro, index) => (
                        <tr key={index}>
                            <td>{registro.codigo}</td>
                            <td>{new Date(registro.fecha).toLocaleDateString()}</td>
                            <td>{new Date(registro.fecha).toLocaleTimeString()}</td>
                            <td>{registro.premio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => (window.location.href = '/')}>Volver al Inicio</button>
        </div>
    );
}

export default UserHome;
