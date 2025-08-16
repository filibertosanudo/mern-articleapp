import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Login.jsx'
import { Register } from './Register.jsx';
import { ProveedorContexto } from './ProveedorContexto.jsx';
import { Articles } from './Articles.jsx';


export const Rutas = () => {
  return (
    <BrowserRouter>
      <ProveedorContexto>

        <Routes>

          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Register />} />
          <Route path='/articulos' element={<Articles />} />
          <Route path='/*' element={<h1>ERROR NO EXISTE LA PÁGINA, 404</h1>} />

        </Routes>

      </ProveedorContexto>

    </BrowserRouter>
  )
}
