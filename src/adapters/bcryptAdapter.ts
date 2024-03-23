import {
    Cryptography
} from '../interfaces/encrypter';
import bcrypt from 'bcrypt';
import message from "../json/messages.json";


class Encrypt implements Cryptography {
    private readonly salt: number | string;

    constructor(salt: number | string) {
        this.salt = salt;
    }

    /**
     * Encrypts a value using bcrypt.
     * @param value - The value to be encrypted.
     * @returns An object containing the encrypted hash or an error message.
     */
    encrypt = async (value: string) => {
        try {
            const hash = await bcrypt.hash(value, this.salt);
            return { hash };
        } catch (e: any) {
            return { error: message.error.EncryptError }
        }
    }

    /**
     * Compares a value with a hash using bcrypt.
     * @param value - The value to be compared.
     * @param compary - The hash to be compared.
     * @returns An object containing the result of the comparison or an error message.
     */
    dencrypt = async (value: string, compary: string) => {
        try {
            const isValid = await bcrypt.compare(value, compary);
            return { isValid }
        } catch (e: any) {
            return { error: message.error.CompareEncryptionError }
        }
    }
}

export default Encrypt;