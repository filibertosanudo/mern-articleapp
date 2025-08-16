import React, {useContext} from 'react'
import { AuthContext } from './ProveedorContexto.jsx';
import { Login } from './Login.jsx';
import { ResultadoArticulos } from './ResultadoArticulos.jsx';

export const Articles = () => {

    const [usuarioAuth, setUsuarioAuth] = useContext(AuthContext);
  return (
    <>
    {usuarioAuth == null ? <Login /> : <ResultadoArticulos />}
    </>
  )
}
