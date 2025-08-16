import zod from 'zod';

const articuloSchema = zod.object({
    id: zod.number().optional(), // <-- opcional
    titulo: zod.string().min(1, "El título es obligatorio"),
    cuerpo: zod.string().min(1, "El cuerpo es obligatorio"),
    usuario: zod.string().min(1, "El usuario es obligatorio"),
})

export const validarArticulo = (articulo) => {
    return articuloSchema.safeParse(articulo);
}

export const validarParcial = (articulo) => {
    return articuloSchema.partial().safeParse(articulo);
}