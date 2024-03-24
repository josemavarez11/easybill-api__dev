import { pre, prop, getModelForClass, Ref, ReturnModelType } from '@typegoose/typegoose'
import { Person } from './personModel';
import { IUser } from '../interfaces/IUser';
import message from '../json/messages.json'
import Encrypt from '../adapters/bcryptAdapter';
import dotenv from "dotenv";
import getEnvPath from '../utils/getEnvPath';

dotenv.config({ path: getEnvPath() });

const salt = process.env.SALT ?? 11;
const encrypt = new Encrypt(salt);

@pre<User>('save', async function (next) {
    if (!this.isModified("password")) return next();

    const { hash } = await encrypt.encrypt(this.password as string);
    this.password = hash;
    next();
})
export class User {

    @prop({ required: true, type: String })
    password?: string;

    @prop({ default: true, type: Boolean })
    status?: boolean;

    @prop({ lowercase: true, unique: true, type: String })
    url_image?: string;

    @prop({ required: true, unique: true, ref: () => Person, type: () => Person })
    person?: Ref<Person>;

    static async findUserByEmail(this: ReturnModelType<typeof User>, email: string) {

        try {
            const user = await this.findOne({ email })
                .populate('person', 'email'
                    + ' -fullname'
                    + ' -address'
                    + ' -document'
                    + ' -type_document'
                    + ' -type_person'
                    + ' -_id'
                )
                .select('person.email') as IUser;

            return { user };

        } catch (e: any) {
            console.error('Error making query', e.message);
            return { error: message.error.RequestDBError }
        }
    }
}

const UserModel = getModelForClass(User);
export default UserModel;