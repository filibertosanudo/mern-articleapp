import jwt from 'jwt-simple';
import 'dotenv/config';

const caducidad = 1000 * 60 * 60 * 24; // 24 horas

export const crearToken = (usuario) => {
    const payload = {
        id: usuario.id,
        nick: usuario.nick,
        email: usuario.email,
        iat: Date.now(),
        exp: Date.now() + caducidad
    };

    return jwt.encode(payload, process.env.SECRET_KEY);
}