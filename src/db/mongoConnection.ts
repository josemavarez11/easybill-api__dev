import mongoose from 'mongoose';
import messages from '../json/messages.json';
/**
 * Establishes a connection to the MongoDB database.
 * @returns {Promise<{ success: boolean } | { error: any }>} A promise that resolves to an object with either a success or error property.
 */
const connectionDB = async (): Promise<Object> => {
    try {
        const mongoURI = process.env.MONGO_URI || '';

        await mongoose.connect(mongoURI);
        console.log(`Conexión a la base de datos establecida a ${mongoURI}`);
        return { success: true }
    } catch (e: any) {
        console.log(`Error al conectar con MongoDB ${e}`);
        return { error: messages.error.ConnectionDBError.description }
    }
}

export default connectionDB;