import { getModelForClass, prop } from "@typegoose/typegoose";

export class TypeDocument {

    @prop({ required: true, unique: true, lowercase: true, maxlength: 30 })
    description?: string;

    @prop({ required: true, unique: true, uppercase: true, maxlength: 2, minlength: 1 })
    type?: string;
}

const TypeDocumentModel = getModelForClass(TypeDocument);
export default TypeDocumentModel;