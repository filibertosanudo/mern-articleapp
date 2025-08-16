import { response } from "express";
import { validarUsuario } from "../helpers/zodUsers.js";

export class UsuarioController {

    constructor(modelo) {
        this.modelo = modelo;
    }

    register = async (request, response) => {
        const usuario = validarUsuario(request.body);

        const nuevoUsuario = await this.modelo.register(usuario);

        if (nuevoUsuario == Error) {
            return response.status(400).json('Error al crear el usuario');
        }

        response.json(nuevoUsuario);
    }

    login = async (request, response) => {
        try {
            const datosAuth = request.body;
            const usuario = await this.modelo.login(datosAuth);

            if (usuario) {
                return response.json(usuario);
            } else {
                return response.status(400).json({ error: 'Usuario o contraseña incorrectos' });
            }
        } catch (error) {
            console.error("Error en login:", error);
            return response.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}