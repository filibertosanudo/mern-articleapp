import zod from 'zod';

const usuarioSchema = zod.object({
    id: zod.number(),
    nick: zod.string().min(1, "El nick es obligatorio"),
    password: zod.string().min(1, "La contraseña es obligatoria"),
    email: zod.string().min(1, "El email es obligatorio"),
})

export const validarUsuario = (usuario) => {
    return usuarioSchema.safeParse(usuario);
}
