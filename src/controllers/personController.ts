import { Request, Response } from "express";
import messages from '../json/messages.json';
import PersonModel from "../models/personModel";
import TypePersonModel from "../models/typePersonModel";
import { TYPE_PERSON } from "../enum/TYPE_PERSON";
import TypeDocumentModel from "../models/typeDocumentModel";

class PersonController {

    typeDocuments = async (_req: Request, res: Response) => {
        try {
            const typesDocuments = await TypeDocumentModel.find({});

            if (typesDocuments.length === 0) {
                return res.status(404).json({ message: messages.warning.NoData });
            }

            const arrayDocuments = typesDocuments.map(typeDocument => {
                return {
                    id: typeDocument._id,
                    description: typeDocument.description,
                    type: typeDocument.type
                }
            })
            console.log(arrayDocuments)
            return res.status(200).json({
                message: messages.success.RequestSuccess,
                response: arrayDocuments
            });
        } catch (error: any) {
            return res.status(500).json({ message: messages.error.RequestDBError });
        }
    }

    async createCustomer(req: Request, res: Response) {
        const { document, idTypeDocument, fullname, phoneNumber, address } = req.body;
        if (!document || !idTypeDocument || !fullname || !phoneNumber || !address) {
            return res.status(400).json({ message: messages.error.MissingParameters });
        }

        try {
            const person = await PersonModel.findOne({ document });
            if (person) return res.status(400).json({ message: messages.warning.PersonExists });

            const idTypePerson = await TypePersonModel.findOne({ description: TYPE_PERSON.CUSTOMER });
            const newPerson = new PersonModel({
                document,
                type_document: idTypeDocument,
                fullname,
                phoneNumber,
                address,
                type_person: [idTypePerson?._id]
            });
            const result = await newPerson.save();
            return res.status(201).json({
                message: messages.success.RegisterSuccessfull,
                person: result
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default PersonController;