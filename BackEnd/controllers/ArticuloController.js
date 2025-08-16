import { validarArticulo, validarParcial } from '../helpers/zod.js';

export class ArticuloController {

    constructor(modelo) {
        this.modelo = modelo;
    }

    getAll = async (request, response) => {
        {
            response.json(await this.modelo.getAll());
        }
    }

    getOneById = async (request, response) => {
        {
            const id = request.params.id;
            const articulo = await this.modelo.getOneById(id);

            if (articulo) {
                response.json(articulo);
            } else {
                response.status(404).json({ error: 'Artículo no encontrado' });
            }
        }
    }

    delete = async (request, response) => {
        const id = request.params.id;
        const nuevosArticulos = await this.modelo.delete(id);

        if (nuevosArticulos) {
            response.json(nuevosArticulos);
        } else {
            response.status(404).json({ error: 'Artículo no encontrado' });
        }
    }


    create = async (request, response) => {
        const articulo = validarArticulo(request.body);

        if (!articulo.success) {
            return response.status(400).json("Validación incorrecta");
        }

        const nuevoArticulo = await this.modelo.create(articulo);
        response.json(nuevoArticulo);
    }

    update = async (request, response) => {
        {
            const id = request.params.id;
            const articuloValidado = validarParcial(request.body);

            const nuevoArticulo = await this.modelo.update(id, articuloValidado);

            response.json(nuevoArticulo);
        }
    }
}