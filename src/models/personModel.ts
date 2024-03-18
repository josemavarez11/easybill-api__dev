import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { TypeDocument } from "./typeDocumentModel";
import { TypePerson } from "./typePersonModel";
import Address from "./types/Address";

export class Person {

    @prop({ required: true })
    fullname?: string;

    @prop({ required: true, unique: true, trim: true })
    email?: string;

    @prop({ type: () => Address })
    address?: Address;

    @prop({ required: true, trim: true, unique: true })
    document?: string;

    @prop({ required: true, ref: () => TypeDocument })
    type_document?: Ref<TypeDocument>;

    @prop({ required: true, timestamps: true, ref: () => TypePerson })
    type_person?: Ref<TypePerson>[]

}


const PersonModel = getModelForClass(Person);
export default PersonModel;