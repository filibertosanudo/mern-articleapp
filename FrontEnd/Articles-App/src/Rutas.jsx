import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Login } from './Login.jsx'
import { Register } from './Register.jsx';


export const Rutas = () => {
  return (
    <BrowserRouter>

        <Routes>

            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Register />} />
            <Route path='/*' element={<h1>ERROR NO EXISTE LA PÁGINA, 404</h1>} />

        </Routes>

    </BrowserRouter>
  )
}
