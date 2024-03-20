import ExpressAdapter, {
    Response,
    Request
} from "../adapters/expressAdapter";
import PersonModel from "../models/personModel";

const adapter = new ExpressAdapter();

const loginRouter = () => {
    const router = adapter.createRouter();

    const probe = async (_req: Request, res: Response) => {

        const person = new PersonModel({
            address: {
                city: 'Maracaibo',
                country: 'Venezuela',
                state: 'Zulia',
                street: 'Av Cecilio Acosta'
            },
            email: 'jose@jose.com',
            fullname: 'Jose Mavarez',
            document: '30783809',
            type_document: '65f9a57a37ca727ace69f4c9',
            type_person: '65f9abc9411091ae13ce2592'
        })

        await person.save();

        res.json({
            typePerson: person
        })
    }


    adapter.setRouteRouter({
        method: 'get',
        route: '/login',
        router,
        callback: probe
    });

    return router;
}

export default loginRouter;