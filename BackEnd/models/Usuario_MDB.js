import mongoose, { model, Schema } from "mongoose";
import { conexion } from "../helpers/conexion.js";
import bcrypt from "bcrypt";
import { crearToken } from "../helpers/jwt_users.js";

conexion();

const usuarioSchema = new Schema(
    {
        nick: String,
        password: String,
        email: String,
    },
    {
        versionKey: false,
    }
)

const Usuario = model("Usuario", usuarioSchema);

export class UsuarioModel {

    static register = async (usuario) => {
        if (!usuario.success) {
            throw new Error("Validación incorrecta");
        }

        const nuevoUsuario = {...usuario.data};

        const usuarioExiste = await Usuario.findOne({$or: [{nick: nuevoUsuario.nick}, {email: nuevoUsuario.email}]});
        
        if (usuarioExiste) {
            throw new Error("Usuario o email ya existente");
        }

        try {
            nuevoUsuario.password = await bcrypt.hash(nuevoUsuario.password, 10);

            const usuarioGuardar = new Usuario(nuevoUsuario);

            await usuarioGuardar.save();
        }
        catch (error) {
            console.error("Error al registrar el usuario:", error);
            throw new Error("Error al registrar el usuario");
        }

        return {
            nick: nuevoUsuario.nick,
            email: nuevoUsuario.email,
            message: "Usuario registrado correctamente"
        };
    }

    static login = async (usuario) => {
        let usuarioEncontrado = usuario;

        try {
            usuarioEncontrado = await Usuario.findOne({nick: usuarioEncontrado.nick});

            if (!usuarioEncontrado) {
                throw new Error("Usuario no encontrado");
            }

            const pwd = await bcrypt.compare(usuario.password, usuarioEncontrado.password);
            
            if (!pwd) {
                throw new Error("Contraseña incorrecta");
            }

            const token = crearToken(usuarioEncontrado);

            const usuarioFormateado = {
                nick: usuarioEncontrado.nick,
                email: usuarioEncontrado.email,
                token: token
            }

            return usuarioFormateado;
        }
        catch (error) {
            console.error("Error en el login:", error);
            throw error;
        }
    }
}