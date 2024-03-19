import ExpressAdapter, {
    Response,
    Request
} from "../adapters/expressAdapter";
import TypeDocumentModel from "../models/typeDocumentModel";

const adapter = new ExpressAdapter();

const loginRouter = () => {
    const router = adapter.createRouter();

    const probe = (_req: Request, res: Response) => {
        const typeDocument = new TypeDocumentModel({
            description: 'Venezolano',
            type: 'V'
        })

        res.json({ result: typeDocument })
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