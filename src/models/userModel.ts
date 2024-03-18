import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Person } from './personModel';


export class User {

    @prop({ required: true })
    password?: string;

    @prop({ default: false, auto: true })
    status?: boolean;

    @prop({ lowercase: true, unique: true })
    url_image?: string;

    @prop({ required: true, unique: true, ref: () => Person })
    person?: Ref<Person>;
}

const UserModel = getModelForClass(User);
export default UserModel;