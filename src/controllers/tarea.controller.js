import Tarea from '../models/Tarea';
import { getPagination } from '../libs/getPagination';

export const encuentraTareas = async (req, res) => {
    try {

        const { size, page, titulo } = req.query;

        const condition = titulo ? {
            titulo: { $regex: new RegExp(titulo), $options: "i" }
        } : {};

        const { limit, offset } = getPagination(size, page)
        const data = await Tarea.paginate(condition, { offset, limit });

        res.json({
            totalItems: data.totalDocs,
            tareas: data.docs,
            totalPages: data.totalPages,
            crrentPage: data.page - 1
        });


    } catch (error) {
        res.status(500).json({
            mensaje: error.mensaje || 'Algo salio mal',
        });
    }
};


export const crearTareas = async (req, res) => {
    if (!req.body.titulo) {
        return res.status(400).send({ mensaje: 'El titulo no puede estar vacio ' })
    };
    try {
        const nuevaTarea = new Tarea({ titulo: req.body.titulo, descripcion: req.body.descripcion, done: req.body.done ? req.body.done : false });
        const tareaGuardada = await nuevaTarea.save();
        res.json(tareaGuardada);
    } catch (error) {
        res.status(500).json({
            mensaje: error.mensaje || 'Algo salio mal',
        });
    }
};

export const encontrarUnaTarea = async (req, res) => {
    try {
        const { id } = req.params;

        const tarea = await Tarea.findById(req.params.id);

        if (!tarea) return res.status(404).json({ mensaje: `la tarea No. ${id} no existe` });
        res.json(tarea);
    } catch (error) {
        res.status(500).json({
            mensaje: error.mensaje || `Error tratando de encontrar tarea No. ${id}`,
        });
    }
};

export const eliminarTarea = async (req, res) => {
    const { id } = req.params;
    try {
        await Tarea.findByIdAndDelete(id);
        res.json({ Mensaje: 'La tarea fue eliminada' });
    } catch (error) {
        res.status(500).json({
            mensaje: error.mensaje || `Error tratando de encontrar tarea No. ${id}`,
        });
    }
};

export const encTodasLasTareas = async (req, res) => {
    const tareas = await Tarea.find({ done: true });
    res.json(tareas);

};

export const actualizarTarea = async (req, res) => {
    await Tarea.findByIdAndUpdate(req.params.id, req.boy, { useFindAndModify: true });
    res.json({ Mensaje: 'La tarea fue actualizada' });
};
