import ExpressAdapter from "../adapters/expressAdapter";
import AuthController from "../controllers/authController";

import message from "../json/messages.json";

const adapter = new ExpressAdapter();

const authRouter = () => {
    const router = adapter.createRouter();
    const authController = new AuthController();

    const cannotGet = async (_req: any, res: any) => {
        return res.status(404).json({ error: message.warning.InvalidMethod });
    }

    adapter.setRouteRouter({
        method: 'get',
        route: '/login',
        router,
        callback: [cannotGet]
    });

    adapter.setRouteRouter({
        method: 'post',
        route: '/login',
        router,
        callback: [authController.login]
    });

    adapter.setRouteRouter({
        method: 'get',
        route: '/register',
        router,
        callback: [cannotGet]
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