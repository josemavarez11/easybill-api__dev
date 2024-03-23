import {
    Request,
    Response,
    NextFunction
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
import { ObjectId } from "mongoose";


dotenv.config({ path: getEnvPath() });

const salt = process.env.SALT ?? 11;
const encrypt = new Encrypt(salt);

class AuthController {

    //Middleware Login
    middlewareLogin = async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body;

        try {
            const { user } = await UserModel.findUserByEmail(email);

            if (!user?.status) res.status(400).json({ error: message.error.UserNotActive });

            return next();

        } catch (e: any) {
            console.error('Error al hacer la consulta', e.message);
            return res.status(500).json({ error: message.error.RequestDBError });
        }

    }


    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const { user } = await UserModel.findUserByEmail(email);
        const isValidPassword = await encrypt.dencrypt(password, user?.password || '');

        if (!user || !isValidPassword)
            res.status(400).json({ error: message.error.InvalidCredentials });

        const token = jwt.sign(
            { userId: user?._id },
            process.env.JWT_SECRET as jwt.Secret,
            { expiresIn: '10m' }
        );

        console.log(`Se ha loguedo correctamente ${user?.person?.email}`);
        return res.status(200).json({ token })
    }

    //Register
    register = async (req: Request, res: Response) => {
        const { fullname, address, document, idTypeDocument, email, password, url_image } = req.body;

        try {
            const existsPerson = await PersonModel.findOne({ document })

            if (!existsPerson) {
                await this.insertPerson({ fullname, address, document, idTypeDocument, email })
                await this.inserUser({ password, url_image, email })

                return res.status(200).json({ message: `${message.success.RegisterSuccessfull}` })
            }

            const { person } = await PersonModel.findPersonByDocument(document);
            const isCustomer = person?.type_person?.includes({ description: TYPE_PERSON.CUSTOMER });

            if (!isCustomer) {
                await PersonModel.findByIdAndUpdate(person?._id,
                    { $push: { type_person: [TYPE_PERSON.CUSTOMER] } },
                    { new: true });
                await this.inserUser({ password, url_image, email })
                return res.status(201).json({ message: message.success.RequestSuccess });
            }

            return res.status(201).json({ message: message.warning.UserExist });
        } catch (e: any) {
            console.error('Ocurrio un error en el EndPoint Register', e.message);
            return { error: message.error.RequestDBError }
        }

    }


    //Logout
    static logout = async (_req: Request, res: Response) => {
        res.clearCookie('token')
            .status(200)
            .json({ message: message.success.LogoutSuccessfull });
    }

    //!Forgot Password
    /*static forgotPassword = async (req: Request, res: Response) => {

    }*/

    private insertPerson = async ({ address, document, email, fullname, idTypeDocument }:
        { address: object, document: string, email: string, fullname: string, idTypeDocument: string }
    ) => {

        try {
            const typePerson = await TypePersonModel.findOne({ description: TYPE_PERSON.CUSTOMER })

            const person = new PersonModel({
                address,
                document,
                email,
                fullname,
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

    private inserUser = async ({ password, url_image, email }:
        { password: string, url_image: string, email: string }
    ) => {
        try {
            const person = await PersonModel.findOne({ email })

            const user = new UserModel({
                password,
                url_image,
                person: person?._id
            })

            const saveUser = await user.save();

            return { user: saveUser }
        } catch (e: any) {
            console.log('Ocurrio un error al insertar usuario', e.message);
            return { error: message.error.RequestDBError }
        }
    }


}

export default AuthController;