import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const tareaSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    done: {
        type: Boolean,
        default: false
    },
}, {
    versionKey: false,
    timestamps: true
});

tareaSchema.plugin(mongoosePaginate);
export default model('Tarea', tareaSchema)


