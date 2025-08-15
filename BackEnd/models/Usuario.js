import { usuarios } from "../datos/usuarios.js";
import bcrypt from "bcrypt";
import { crearToken } from "../helpers/jwt_users.js";

let usuariosDevolver = usuarios;

export class Usuario {
    static register = async (usuario) => {
        if (!usuario.success) {
            return new Error("Validación incorrecta");
        }

        const nuevoUsuario = {
            ...usuario.data
        };

        if (
            usuariosDevolver.find(u => u.nick === nuevoUsuario.nick) ||
            usuariosDevolver.find(u => u.email === nuevoUsuario.email)
        ) {
            return "Usuario o email ya existente";
        }

        nuevoUsuario.password = await bcrypt.hash(nuevoUsuario.password, 10);

        usuariosDevolver = [...usuariosDevolver, nuevoUsuario];

        return nuevoUsuario;
    }

    static login = async (usuario) => {
        let usuarioRecibido = usuario;

        let usuarioRegistrado = usuariosDevolver.find((usuario) => 
            usuario.nick === usuarioRecibido.nick)

        if (!usuarioRegistrado) {
            return "Usuario no encontrado";
        }

        let pwd = await bcrypt.compare(usuarioRecibido.password, usuarioRegistrado.password);

        if (!pwd) {
            return "Contraseña incorrecta";
        }
        const token = crearToken(usuarioRegistrado);

        const usuarioFormateado = {
            nick: usuarioRegistrado.nick,
            email: usuarioRegistrado.email,
            token: token
        }

        return usuarioFormateado;
    }
}
