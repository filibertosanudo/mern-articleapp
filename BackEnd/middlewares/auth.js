import jwt from 'jwt-simple';
import 'dotenv/config';

export const auth = (request, response, next) => {
    const tokenRecibido = request.headers.authorization;
    if (!tokenRecibido) {
        return response.status(401).json({ message: 'Error de autenticación' });
    }

    const token = tokenRecibido.replace(/['"]+/g,'');
    let payload;
    try {
        payload = jwt.decode(token, process.env.SECRET_KEY);
        if (payload.exp <= Date.now()) {
            return response.status(401).json({ message: 'El token ha expirado' });
        }
    }
    catch (e) {
        return response.stauts(404).json('Error de autenticación');
    }

    request.usuario = payload;

    next();

}