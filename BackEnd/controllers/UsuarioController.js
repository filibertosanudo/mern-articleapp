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
        const datosAuth = request.body;
        const usuario = await this.modelo.login(datosAuth);

        if (usuario) {
            response.json(usuario);
        }
        else {
            response.status(400).json('Error al iniciar sesión: ' + usuario);
        }
    }
}