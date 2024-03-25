import ExpressAdapter, { Response, Request } from "../adapters/expressAdapter";
import AuthController from "../controllers/authController";
import PersonModel from "../models/personModel";

const adapter = new ExpressAdapter();

const authRouter = () => {
    const router = adapter.createRouter();
    const authController = new AuthController();

    const probe = async (_req: Request, res: Response) => {

        const person = await PersonModel.find({})
            .populate('type_document', 'description type -_id')
            .populate('type_person')

        console.log('Aqui prueba', person);

        return res.status(200).json({ message: 'Prueba correcta' });
    }

    adapter.setRouteRouter({
        method: 'get',
        route: '/prueba',
        router,
        callback: [probe]
    });

    adapter.setRouteRouter({
        method: 'post',
        route: '/login',
        router,
        callback: [authController.middlewareLogin, authController.login]
    });

    adapter.setRouteRouter({
        method: 'post',
        route: '/register',
        router,
        callback: [authController.register]
    });


    return router;
}

export default authRouter;