import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Person } from './personModel';

export class User {

    @prop({ required: true, type: String })
    password?: string;

    @prop({ default: false, auto: true, type: Boolean })
    status?: boolean;

    @prop({ lowercase: true, unique: true, type: String })
    url_image?: string;

    @prop({ required: true, unique: true, ref: () => Person, Type: () => Person })
    person?: Ref<Person>;
}

const UserModel = getModelForClass(User);
export default UserModel;