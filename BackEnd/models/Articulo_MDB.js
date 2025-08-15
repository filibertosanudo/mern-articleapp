import mongoose, { model, Schema } from "mongoose";
import { conexion } from "../helpers/conexion.js";

conexion();

const articuloSchema = new Schema(
    {
        titulo: String,
        cuerpo: String,
        usuario: String,
    },
    {
        versionKey: false,
    }
)

const Articulo = model("Articulo", articuloSchema);

export class ArticuloModel {

    static async getAll() {
        try {
            return Articulo.find();
        }
        catch (error) {
            console.error("Error al obtener los artículos:", error);
            throw new Error("Error al obtener los artículos");
        }
    }

    static async getOneById(id) {
        try {
            return Articulo.findById(id);
        }
        catch (error) {
            console.error("Error al obtener el artículo:", error);
            throw new Error("Error al obtener el artículo");
        }
    }

    static async delete(id) {
        try {
            return Articulo.deleteOne({_id: id});
        }
        catch (error) {
            console.error("Error al eliminar el artículo:", error);
            throw new Error("Error al eliminar el artículo");
        }
    }

    static async create (articulo) {
        if (!articulo.success) {
            throw new Error("Validación incorrecta");
        }
    
        const nuevoArticulo = {...articulo.data};

        const articuloGuardar = new Articulo(nuevoArticulo);

        try {
            await articuloGuardar.save();
            return nuevoArticulo;
        }
        catch (error) {
            console.error("Error al crear el artículo:", error);
            throw new Error("Error al crear el artículo");
        }
    }

    static async update(id, validacion) {
        if (!validacion.success) {
            throw new Error("Validación incorrecta");
        }

       try {
        return await Articulo.findOneAndUpdate({_id: id},
             {...validacion.data}, {new: true});
       }
       catch (error) {
            console.error("Error al actualizar el artículo:", error);
            throw new Error("Error al actualizar el artículo");
        }
    }
}