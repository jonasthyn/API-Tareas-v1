import mongoose from "mongoose";
import config from './config'

(async () => {
    try {
        const db = await mongoose.connect(config.mongodbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('La Base de Datos esta conectada a:', db.connection.name);
    } catch (error) {
        console.console.error(error);
    }
})();