import React, { use, useState } from 'react'
import { NavLink } from 'react-router-dom';

export const Register = () => {

    const [formulario, setFormulario] = useState({});
    const [exito, setExito] = useState(false);

    const recogerForm = (e) => {
        e.preventDefault();
        let usuario = {
            nick: e.target.usuario.value,
            email: e.target.email.value,
            password: e.target.password.value
        }

        setFormulario(usuario);

        registrarUsuario(usuario);
    }

    const registrarUsuario = async (usuario) => {
        try {
            const peticion = await fetch('http://localhost:1234/api/usuarios',
                {
                    method: 'POST',
                    body: JSON.stringify(usuario),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            const datos = await peticion.json();

            !datos?setExito(false) : setExito(true);
        }
        catch (error) {
            console.error('Error al registrar el usuario:', error);
            setFormulario({});
        }
    }

  return (
    <>
        <form onSubmit={recogerForm}>

            <label htmlFor='usuario'>Usuario</label>
            <input type='text' id='usuario' name='usuario' placeholder='Usuario'/>

            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' placeholder='Email'/>

            <label htmlFor='password'>Contraseña</label>
            <input type='password' id='password' name='password' placeholder='Contraseña'/>

            <input type='submit' value='Registrarse'/>

        </form>
    </>
  )
}
