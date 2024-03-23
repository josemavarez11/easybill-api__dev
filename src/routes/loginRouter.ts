import ExpressAdapter, {
    Response,
    Request,
} from "../adapters/expressAdapter";
import PersonModel from "../models/personModel";
import message from "../json/messages.json";

const adapter = new ExpressAdapter();

const loginRouter = () => {
    const router = adapter.createRouter();

    // const probe = async (_req: Request, _res: Response, next: NextFunction) => {
    //     console.log("Paso por el middleware de login");
    //     next();
    // }

    // const probe2 = async (_req: Request, _res: Response, next: NextFunction) => {
    //     console.log("Paso por el middleware de login 2");
    //     next();
    // }

    const probe3 = async (_req: Request, res: Response) => {
        try {
            const person = new PersonModel({
                email: "jose@jose.com",
                fullname: "Jose Mavarez",
                address: {
                    street: "Calle 123",
                    city: "Maracaibo",
                    state: "Zulia",
                    country: "Venezuela",
                },
                document: "30498431",
                type_document: "65f9a57a37ca727ace69f4c9",
                type_person: ["65f9aa62faa1d365755a31fc", "65f9abc9411091ae13ce2592", "65fe4ecaadcce5d0250a3557"],
            })

            const p = await person.save();
            return res.status(200).json({ p });

        } catch (e: any) {
            console.error('Error al hacer la consulta', e.message);
            return res.status(500).json({ error: message.error.RequestDBError });
        }
    }


    adapter.setRouteRouter({
        method: 'get',
        route: '/login',
        router,
        callback: [probe3]
    });

    return router;
}

export default loginRouter;