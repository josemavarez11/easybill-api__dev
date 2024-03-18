import ExpressAdapter, {
    Response,
    Request
} from "../adapters/expressAdapter";

const adapter = new ExpressAdapter();

const loginRouter = () => {
    const router = adapter.createRouter();

    const probe = (_req: Request, res: Response) => {
        res.json({
            message: 'Login route'
        });
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