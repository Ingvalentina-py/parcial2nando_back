import './App.css';
import Form from './components/Form';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import CreateAccount from './components/CreateAccount';
import CreateAdmin from './components/CreateAdmin';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import axios from 'axios';

// Set up axios defaults
axios.defaults.baseURL = 'https://parcialdos-back.vercel.app/api'; // Set your API base URL

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set up axios interceptor
    const interceptor = axios.interceptors.request.use(function (config) {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    // Clean up function to eject the interceptor when the component unmounts
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  return (  
    <BrowserRouter>
      <Routes>
        <Route index element={<Form callback={setUser}/>}></Route>
        <Route path='/registro' element={<CreateAccount />}></Route>
        <Route path='/user' element={<UserHome user={user}/>}></Route>
        <Route path='/admin' element={<AdminHome user={user}/>}></Route>
        <Route path='/crear-admin' element={<CreateAdmin />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;