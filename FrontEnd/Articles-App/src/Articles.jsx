import React, { useContext } from 'react'
import { AuthContext } from './ProveedorContexto.jsx';
import { Login } from './Login.jsx';
import { ResultadoArticulos } from './ResultadoArticulos.jsx';

export const Articles = () => {

  const [usuarioAuth, setUsuarioAuth] = useContext(AuthContext);
  return (
    <>
      <div id='elementos'>
        {usuarioAuth == null ? <Login /> : <ResultadoArticulos />}
      </div>
    </>
  )
}
