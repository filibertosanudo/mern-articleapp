import React, { use, useState } from 'react'
import { NavLink } from 'react-router-dom'

export const Login = () => {

    const [formulario, setFormulario] = useState({ });
    const [exito, setExito] = useState(false);

    const recogerForm = (e) => {
        e.preventDefault();

        let usuario = 
        {
            nick: e.target.usuario.value,
            password: e.target.password.value
        }

        setFormulario(usuario);
        buscarUsuario(usuario);
    }

    const buscarUsuario = async (usuario) => {
        try {
            const peticion = await fetch('http://localhost:1234/api/usuarios/login',
                {
                    method: 'POST',
                    body: JSON.stringify(usuario),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            
            const datos= await peticion.json();

            if (datos.status == 400) {
                setExito(false);
            }
            else {
                setExito(true);
                localStorage.setItem('usuario', JSON.stringify(datos));
            }
        }
        catch (error) {
            console.error('Error al buscar el usuario:', error);
            setFormulario({});
        }
    }

  return (
    <>
        <form onSubmit={recogerForm}>

            <label htmlFor='usuario'>Usuario</label>
            <input type='text' id='usuario' name='usuario' placeholder='Usuario'/>

            <label htmlFor='password'>Contraseña</label>
            <input type='password' id='password' name='password' placeholder='Contraseña'/>

            <input type='submit' value='Iniciar Sesión'/>

        </form>
    </>
  )
}
