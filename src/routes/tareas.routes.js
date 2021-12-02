import { Router } from "express";

import * as tareasController from '../controllers/tarea.controller'

const router = Router();

router.post('/', tareasController.crearTareas ); // ruta para crear tareas

router.get('/', tareasController.encuentraTareas);  // ruta para encontrar tareas

router.get('/done', tareasController.encTodasLasTareas); // ruta para encontrar tareas con la propiedad 'done'

router.get('/:id', tareasController.encontrarUnaTarea);

router.delete('/:id', tareasController.eliminarTarea);

router.put('/:id', tareasController.actualizarTarea);


export default router;