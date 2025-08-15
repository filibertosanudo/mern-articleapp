import {Router} from 'express';
import {UsuarioController} from "../controllers/UsuarioController.js";

export const CreadorUsuarios = (modelo) => {

    const controlador = new UsuarioController(modelo);

    const usuarioRouter = Router();

    // usuarioRouter.get('/', controlador.getAll);

    // usuarioRouter.get('/:id', controlador.getOneById);

    // usuarioRouter.delete('/:id', controlador.delete);

    usuarioRouter.post('/', controlador.register);

    // usuarioRouter.put('/:id', controlador.update);

    usuarioRouter.post('/login', controlador.login);

    return usuarioRouter;
}