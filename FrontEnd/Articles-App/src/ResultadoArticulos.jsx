import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from './ProveedorContexto.jsx';
import { Login } from './Login.jsx';

export const ResultadoArticulos = () => {

    const [usuarioAuth, setUsuarioAuth] = useContext(AuthContext);
    const [articulosState, setArticulosState] = useState({});
    const [exito, setExito] = useState(false);

    useEffect(() => {
        resultados();
    },[])

    const resultados = async () => {
        try {
            const peticion = await fetch('http://localhost:1234/api/articulos',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': usuarioAuth.token
                    }
                }
            );

            const datos = await peticion.json();

            if (peticion.status === 404) {
                setExito(false);
            } else {
                setExito(true);
                setArticulosState(datos);
            }
        }
        catch (error) {
            console.error('Error al obtener los artículos:', error);
            setExito(false);
        }
    }

  return (
    <>

        <ul>
            {exito ? articulosState.map((articulo) => {
                return (
                    <li key={articulo._id}>{articulo.titulo}</li>
                );
            }): <Login />}
        </ul>

    </>
  )
}
