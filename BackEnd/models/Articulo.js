import { articulos } from "../datos/articulos.js";

let articulosDevolver = articulos;

export class Articulo{
    
    static getAll() {
        return articulosDevolver;
    }

    static getOneById(id) {
        return articulosDevolver.find(articulo => articulo.id == id);
    }

    static delete(id) {
        const nuevosArticulos = articulosDevolver.filter(articulo => articulo.id != id);

        if (nuevosArticulos.length === articulosDevolver.length) {
            return null;
        }

        articulosDevolver = nuevosArticulos;
        return articulosDevolver;
    }

    static create(articulo) {

        const nuevoArticulo = {
            ...articulo.data
        };

        articulosDevolver = [...articulosDevolver, nuevoArticulo];

        return nuevoArticulo;
    }

    static update(id, articulo) {
        if(!articulo.success) {
           response.status(400).json("Validación incorrecta");
        }

        const articuloIndice = articulosDevolver.findIndex(articulo => articulo.id == id);

        if(articuloIndice == -1) {
            return response.status(404).json('Artículo no encontrado');
        }

        const nuevoArticulo = {
            ...articulosDevolver[articuloIndice],
            ...articulo.data,
        };

        articulosDevolver[articuloIndice] = nuevoArticulo;

        return nuevoArticulo;
    }
}