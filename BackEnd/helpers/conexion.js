import mongoose from "mongoose";

export const conexion = async () => {
    try {
        await mongoose.connect("mongodb+srv://filibertosanudo:AeD90y2yTsn0DREV@cluster0.3vrscfi.mongodb.net/MERN-Article")
        console.log("Conexión a MongoDB exitosa");
    }
    catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
}