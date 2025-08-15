import {React, createContext, use, useEffect, useState} from 'react'

export const AuthContext = createContext();

export const ProveedorContexto = (props) => {

    const [usuarioAuth, setUsuarioAuth] = useState(null);

    useEffect( async () => {
            const usuario = localStrorage.getItem('usuario');

            if (!usuario) {
                return false;
            }

            setUsuarioAuth(JSON.parse(usuario));
        }, []
    )

    return (
        <AuthContext.Provider value={[usuarioAuth, setUsuarioAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}
