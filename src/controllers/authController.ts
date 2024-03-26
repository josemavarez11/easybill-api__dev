import {
    Request,
    Response
} from "../adapters/expressAdapter";
import PersonModel from "../models/personModel";
import UserModel from "../models/userModel";
import TypePersonModel from "../models/typePersonModel";
import Encrypt from "../adapters/bcryptAdapter";

import message from "../json/messages.json";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import getEnvPath from "../utils/getEnvPath";
import { TYPE_PERSON } from "../enum/TYPE_PERSON";
import { Types } from "mongoose";


dotenv.config({ path: getEnvPath() });

const salt = process.env.SALT ?? "11";
const encrypt = new Encrypt(salt);

class AuthController {

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: message.error.MissingParameters });

        try {
            const { user } = await UserModel.findUserByEmailOrDocument(email);
            const { isValid } = await encrypt.compare(password, user?.password || '');

            if (!user || !isValid) {
                return res.status(400).json({
                    message: message.error.InvalidCredentials
                });
            }

            if (!user?.status) return res.status(400).json({ message: message.error.UserNotActive });

            const token = jwt.sign(
                { userId: user?._id },
                process.env.JWT_SECRET as jwt.Secret,
                { expiresIn: '30m' }
            );

            console.log(`Se ha loguedo correctamente ${user?.person?.email}`);
            return res.status(200).json({
                message: message.success.LoginSuccessfull,
                token
            });

        } catch (e: any) {
            return res.status(500).json({ message: message.error.RequestDBError });
        }

    }

    register = async (req: Request, res: Response) => {
        const { fullname, address, document, idTypeDocument, email, password, phoneNumber } = req.body;

        if (!fullname || !address || !document || !idTypeDocument || !email || !password || !phoneNumber)
            return res.status(400).json({ error: message.error.MissingParameters });

        try {
            const { user } = await UserModel.findUserByEmailOrDocument(email, document);
            if (user) return res.status(400).json({ message: message.warning.UserExist });

            console.log('El usuario aun no existe');

            const { person } = await PersonModel.findPersonByDocument(document);
            if (!person) {

                const { person } = await this.insertPerson({
                    fullname,
                    address,
                    document,
                    idTypeDocument,
                    email,
                    phoneNumber
                })
                if (!person) return res.status(500).json({ message: message.error.RequestDBError });

                const user = await this.insertUser({ password, idPerson: person?._id });
                if (!user) return res.status(500).json({ error: message.error.RequestDBError });

                return res.status(201).json({ message: message.success.RegisterSuccessfull });
            }

            const isCashier = person?.type_person?.some((type) => type.description === TYPE_PERSON.CASHIER);
            if (isCashier) return res.status(400).json({ message: message.warning.UserExist });

            const { newPerson } = await this.updatePerson({
                idPerson: person?._id?.toString() || '',
                typePerson: TYPE_PERSON.CASHIER
            })

            if (!newPerson) return res.status(500).json({ message: message.error.RequestDBError });

            const newUser = await this.insertUser({ password, idPerson: newPerson._id.toString() })
            if (!newUser) return res.status(500).json({ message: message.error.RequestDBError });

            return res.status(201).json({ message: message.success.RegisterSuccessfull });
        } catch (e: any) {
            console.error('Ocurrio un error en el EndPoint Register', e.message);
            return { message: message.error.RequestDBError }
        }
    }

    static logout = async (_req: Request, res: Response) => {
        res.clearCookie('token')
            .status(200)
            .json({ message: message.success.LogoutSuccessfull });
    }

    private updatePerson = async ({ idPerson, typePerson }: { idPerson: string, typePerson: string }) => {
        try {
            const idType = await TypePersonModel.findOne({ description: typePerson });
            const newPerson = await PersonModel.findByIdAndUpdate(idPerson,
                { $push: { type_person: idType } },
                { new: true }
            );

            return { newPerson };
        } catch (e: any) {
            console.error('Error al actualizar persona', e.message)
            return { error: message.error.RequestDBError };
        }
    }

    private insertPerson = async ({ address, document, email, fullname, idTypeDocument, phoneNumber }:
        { address: object, document: string, email: string, fullname: string, idTypeDocument: string, phoneNumber: string }
    ) => {
        try {
            const typePerson = await TypePersonModel.findOne({ description: TYPE_PERSON.CASHIER })

            const person = new PersonModel({
                address,
                document,
                email,
                fullname,
                phoneNumber,
                type_document: idTypeDocument,
                type_person: [typePerson?._id]
            })

            const savePerson = await person.save();
            return { person: savePerson };
        } catch (e: any) {
            console.error('Error al insertar person', e.message)
            return { error: message.error.RequestDBError }
        }
    }

    private insertUser = async ({ password, idPerson }:
        { password: string, idPerson: Types.ObjectId }
    ) => {
        try {
            const user = new UserModel({
                password,
                person: idPerson
            })

            await user.save();

            return true;
        } catch (e: any) {
            console.log('Ocurrio un error al insertar usuario', e.message);
            return false;
        }
    }
}

export default AuthController;